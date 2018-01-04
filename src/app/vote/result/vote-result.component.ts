import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { VoteService, ResultDataSource } from '../vote.service';
import { Result as VoteResult } from '../model/result';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';
import { Result } from '../../user/model/result';

@Component({
  selector: 'app-result',
  templateUrl: './vote-result.component.html',
  styleUrls: ['./vote-result.component.scss'],
  providers: [VoteService, UserService]
})
export class VoteResultComponent implements OnInit {
  private nextMethod: any;
  private parameter: any;
  private _voteResults: VoteResult[];

  public dataSource: ResultDataSource;

  constructor(private voteService: VoteService,
              private userService: UserService) { }

  ngOnInit() {
    this.getVoteResults();
  }

  getVoteResults() {
    this.voteService.getResult()
                    .subscribe({
                      next: (value: VoteResult[]) => {
                        this.voteResults = value;
                      },
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.getVoteResults;
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
                        this.userService.currentToken = value;
                        this.nextMethod(this.parameter);
                        this.nextMethod = null;
                        this.parameter = null;
                      },
                      error: (error) => console.error(error)
                    });
  }

  public get voteResults(): VoteResult[] {
    return this._voteResults;
  }
  public set voteResults(value: VoteResult[]) {
    const dataChange = new BehaviorSubject<VoteResult[]>([]);
    let copiedData;

    for (const result of value) {
      copiedData = dataChange.value.slice();
      copiedData.push(result);
      dataChange.next(copiedData);
    }
    this.dataSource = new ResultDataSource(dataChange);

    this._voteResults = value;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }

  public get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
}
