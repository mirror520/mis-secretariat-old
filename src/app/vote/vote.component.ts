import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';

import { VoteService } from './vote.service';
import { Candidate } from './model/candidate';
import { Session } from './model/session';
import { timeCheckValidator,
         departmentMatchValidator,
         candidateMatchValidator } from './shared/validator.directive';

import { UserService } from '../user/user.service';
import { User } from '../user/model/user';
import { Department } from '../user/model/department';
import { Result } from '../user/model/result';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: [VoteService, UserService]
})
export class VoteComponent implements OnInit {
  private nextMethod: any;
  private parameter: any;
  private _session: Session;
  private _candidates: Candidate[];
  private _currentCandidate: Candidate;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  startTime: Date = new Date('2017-12-19T09:00:00+0800');
  endTime: Date   = new Date('2017-12-19T16:00:00+0800');
  today: Observable<Date>;

  filteredCandidates: Observable<any[]>;
  submitted = false;
  votingResult: Result;

  constructor(private formBuilder: FormBuilder,
              private voteService: VoteService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.today = Observable.timer(0, 1000)
                           .map(() => {
                             const now = new Date();
                             if (this.firstFormGroup != null) {
                               this.firstFormGroup.patchValue({ timer: now });
                             }
                             return now;
                           });
  }

  ngOnInit() {
    this.getSessions(1);
    this.getCandidates();

    this.firstFormGroup = this.formBuilder.group({
      name: [
        {
          value: (this.currentUser) ? this.currentUser.name : '',
          disabled: true
        },
        Validators.required
      ],
      department: [
        {
          value: (this.currentUser) ? this.currentUser.department.department : '',
          disabled: false
        },
        departmentMatchValidator(this.currentUser)
      ],
      timer: [
        null,
        timeCheckValidator(this.startTime, this.endTime)
      ]
    });

    this.secondFormGroup = this.formBuilder.group({
      candidate: [
        null,
        [
          Validators.required,
          candidateMatchValidator(this.candidates)
        ]
      ]
    });
  }

  filterCandidates(targetCandidate: string) {
    return this.candidates.filter(candidate =>
      candidate.candidate.indexOf(targetCandidate) === 0
    );
  }

  login() {
    this.userService.redirectUrl = this.router.url;
    this.router.navigate(['/login']);
  }

  getSessions(vsid: number) {
    this.voteService.getSessions(vsid)
                    .subscribe({
                      next: (value: Session) => {
                        this.session = value;
                      }
                    });
  }

  getCandidates() {
    this.voteService.getCandidates()
                    .subscribe({
                      next: (value: Candidate[]) => {
                        this.candidates = value;
                        this.filteredCandidates =
                          this.secondFormGroup.get('candidate').valueChanges
                                              .pipe(
                                                startWith(''),
                                                map(candidate => candidate ? this.filterCandidates(candidate) : this.candidates.slice())
                                              );
                      },
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.getCandidates;
                            this.parameter = null;
                            this.refreshToken(this.currentUser);
                          }
                        }
                      }
                    });
  }

  voting() {
    this.submitted = true;

    this.voteService.insertVoting(this.currentUser, this.currentCandidate)
                    .subscribe({
                      next: (value: Result) => {
                        this.votingResult = Object.assign(new Result(), value);
                        this.snackBar.open(this.votingResult.info[0], '確定', {
                          duration: 2000
                        });
                      },
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.voting;
                            this.parameter = null;
                            this.refreshToken(this.currentUser);
                          }
                        }
                      }
                    });
  }

  refreshToken(user: User) {
    this.userService.refreshToken(user)
                    .subscribe({
                      next: (value) => {
                        this.userService.currentUser.token = value;
                        this.nextMethod(this.parameter);
                        this.nextMethod = null;
                        this.parameter = null;
                      },
                      error: (error) => console.error(error)
                    });
  }

  selectionChangeHandler(candidate: Candidate) {
    this.currentCandidate = candidate;
  }

  checkCurrentCandidate(targetCandidate: string) {
    if ((this.currentCandidate == null) ||
        (this.currentCandidate.candidate !== targetCandidate)) {
      for (const candidate of this.candidates) {
        if (candidate.candidate === targetCandidate) {
          this.currentCandidate = candidate;
          break;
        }
      }
    }
  }

  public get session(): Session {
    return this._session;
  }
  public set session(value: Session) {
    this.firstFormGroup.get('timer')
                       .setValidators([
                         timeCheckValidator(value.startTime, value.endTime)
                       ]);
    this._session = value;
  }

  public get candidates(): Candidate[] {
    return this._candidates;
  }
  public set candidates(value: Candidate[]) {
    this.secondFormGroup.get('candidate')
                        .setValidators([
                          Validators.required,
                          candidateMatchValidator(value)
                        ]);
    this._candidates = value;
  }

  public get currentCandidate(): Candidate {
    return this._currentCandidate;
  }
  public set currentCandidate(value: Candidate) {
    this._currentCandidate = value;
  }

  get currentUser(): User {
    return this.userService.currentUser;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
}
