import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { UserService } from '../user/user.service';
import { User } from '../user/model/user';
import { Result } from '../user/model/result';
import { Candidate } from './model/candidate';
import { Session } from './model/session';
import { Result as VoteResult } from './model/result';

@Injectable()
export class VoteService {
  private baseUrl = 'https://api.secret.taichung.gov.tw/v1.0';

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getSessions(vsid: number): Observable<Session> {
    return this.http.get(this.baseUrl + `/vote/sessions/${vsid}`)
                    .map((value: Session[]) => {
                      return Object.assign(new Session, value[0]);
                    });
  }

  getResult(): Observable<VoteResult[]> {
    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.get(this.baseUrl + '/vote/result', { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: VoteResult[]) => {
                      const result: VoteResult[] = new Array();
                      for (const temp of value) {
                        result.push(Object.assign(new VoteResult, temp));
                      }
                      return result;
                    });
  }

  getCandidates(): Observable<Candidate[]> {
    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.get(this.baseUrl + '/vote/candidates', { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: Candidate[]) => {
                      const candidates: Candidate[] = new Array();
                      for (const temp of value) {
                        candidates.push(Object.assign(new Candidate, temp));
                      }
                      return candidates;
                    });
  }

  insertVoting(targetUser: User, targetCandidate: Candidate): Observable<Result> {
    const body = {
      'tccg_account': targetUser.account
    };

    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.post(this.baseUrl + `/vote/candidates/${targetCandidate.vcid}/voting`, body,
                          { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: Result) => Object.assign(new Result(), value));
  }
}

export class ResultDataSource extends DataSource<any> {
  constructor(private subject: BehaviorSubject<VoteResult[]>) {
    super();
  }
  connect(): Observable<VoteResult[]> {
    return this.subject;
  }
  disconnect() {}
}
