import { DataSource } from '@angular/cdk/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../shared/model/config';
import { UserService } from '../user/user.service';
import { Institution } from './model/institution';
import { Mail } from './model/mail';
import { UserAgent } from './model/user-agent';
import { Token } from '../user/model/token';
import { Result } from '../user/model/result';

@Injectable()
export class SeitService {
  private baseUrl = Config.baseUrl;

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getMailsFromInstitution(): Observable<Institution[]> {
    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.get(this.baseUrl + '/seit/mails?showTree=true', { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: Institution[]) => {
                      const institutions: Institution[] = new Array();
                      for (const temp of value) {
                        institutions.push(Object.assign(new Institution(), temp));
                      }
                      return institutions;
                    });
  }

  sendMail(mail: Mail): Observable<Result> {
    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.patch(this.baseUrl + `/seit/mails/${mail.mid}/send`, null,
                           { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: Result) => Object.assign(new Result(), value));
  }

  updateMail(mail: Mail): Observable<Mail> {
    const body = {
      'test_status': 'correct'
    };

    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.patch(this.baseUrl + `/seit/mails/${mail.mid}`, body,
                           { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: Mail) => Object.assign(new Mail(), value));
  }

  getMailUserAgent(mail: Mail): Observable<UserAgent[]> {
    const token = (this.userService.currentUser != null) ? this.userService.currentUser.token.access_token : null;
    return this.http.get(this.baseUrl + `/seit/mails/${mail.mid}/ua`,
                           { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
                    .map((value: UserAgent[]) => {
                      const uas: UserAgent[] = new Array();
                      for (const ua of value) {
                        uas.push(Object.assign(new UserAgent(), ua));
                      }
                      return uas;
                    });
  }
}

export class MailDataSource extends DataSource<any> {
  constructor(private subject: BehaviorSubject<Mail[]>) {
    super();
  }
  connect(): Observable<Mail[]> {
    return this.subject;
  }
  disconnect() {}
}
