import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';

import { MailUserAgentDialogComponent } from './dialog/mail-user-agent-dialog.component';
import { SeitService, MailDataSource } from './seit.service';
import { UserService } from '../user/user.service';
import { User } from '../user/model/user';
import { Token } from '../user/model/token';
import { Result } from '../user/model/result';
import { Institution } from './model/institution';
import { Department } from './model/department';
import { Mail } from './model/mail';
import { UserAgent } from './model/user-agent';

@Component({
  selector: 'app-seit-dashboard',
  templateUrl: './seit-dashboard.component.html',
  styleUrls: ['./seit-dashboard.component.scss'],
  providers: [SeitService, UserService]
})
export class SeitDashboardComponent implements OnInit {
  private nextMethod: any;
  private parameter: any;

  private _institutions: Institution[];
  private _currentInstitution: Institution;
  private _currentDepartment: Department;
  private _currentMails: Mail[];

  public dataSource: MailDataSource;

  constructor(private seitService: SeitService,
              private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getMails();
  }

  startScheduleSendMails() {
    const readyMails: Mail[] = new Array();
    for (const mail of this.currentMails) {
      if (mail.mail_status === 'ready') {
        readyMails.push(mail);
      }
    }

    Observable.from(readyMails)
              .concatMap((mail: Mail) => Observable.of(this.sendMail(mail))
                                                   .delay(Math.random() * 5000 + 5000)
             ).subscribe({
               next: (value) => console.log(value),
               error: (error) => console.error(error),
               complete: () => console.log(`complete`)
             });
}

  getMails() {
    this.seitService.getMailsFromInstitution()
                    .subscribe({
                      next: (value) => this.institutions = value,
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.getMails;
                            this.parameter = null;
                            this.refreshToken(this.currentUser);
                          }
                        }
                      }
                    });
  }

  sendMail(mail: Mail): Mail {
    this.seitService.sendMail(mail)
                    .subscribe({
                      next: (value: Result) => {
                        const data: Mail = Object.assign(new Mail(), value.data);
                        mail.delivery_time = data.delivery_time / 1000;
                        mail.mail_status = data.mail_status;
                      },
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.sendMail;
                            this.parameter = mail;
                            this.refreshToken(this.currentUser);
                          }
                        }
                      }
                    });
    return mail;
  }

  updateMail(mail: Mail) {
    this.seitService.updateMail(mail)
                    .subscribe({
                      next: (value: Mail) => {
                        const data: Mail = Object.assign(new Mail(), value);
                        mail.test_status = data.test_status;
                      },
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                              this.nextMethod = this.sendMail;
                              this.parameter = mail;
                              this.refreshToken(this.currentUser);
                          }
                        }
                      }
                    });
  }

  openMailUserAgentDialog(mail: Mail) {
    const dialogRef = this.dialog.open(MailUserAgentDialogComponent, {
      width: '80%',
      data: { mail: mail }
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

  public get institutions(): Institution[] {
    return this._institutions;
  }
  public set institutions(value: Institution[]) {
    this._institutions = value;
  }

  public get currentInstitution(): Institution {
    return this._currentInstitution;
  }
  public set currentInstitution(value: Institution) {
    let mails: Mail[] = new Array();
    for (const department of value.departments) {
      mails = mails.concat(department.mails);
    }
    this.currentMails = mails;

    this._currentInstitution = value;
  }

  public get currentDepartment(): Department {
    return this._currentDepartment;
  }
  public set currentDepartment(value: Department) {
    this.currentMails = value.mails;

    this._currentDepartment = value;
  }

  public get currentMails(): Mail[] {
    return this._currentMails;
  }
  public set currentMails(value: Mail[]) {
    const dataChange = new BehaviorSubject<Mail[]>([]);
    let copiedData;

    for (const mail of value) {
      copiedData = dataChange.value.slice();
      copiedData.push(mail);
      dataChange.next(copiedData);
    }
    this.dataSource = new MailDataSource(dataChange);

    this._currentMails = value;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }
}
