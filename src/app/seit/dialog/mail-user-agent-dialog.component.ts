import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SeitService, MailUserAgentDataSource } from '../seit.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';
import { Mail } from '../model/mail';
import { UserAgent } from '../model/user-agent';

@Component({
  selector: 'app-mail-user-agent-dialog',
  templateUrl: './mail-user-agent-dialog.component.html',
  styleUrls: ['./mail-user-agent-dialog.component.scss'],
  providers: [SeitService, UserService]
})
export class MailUserAgentDialogComponent implements OnInit {
  private nextMethod: any;
  private parameter: any;
  private _userAgents: UserAgent[];

  public dataSource: MailUserAgentDataSource;

  constructor(
    private seitService: SeitService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.getMailUserAgents(this.data.mail as Mail);
  }

  getMailUserAgents(mail: Mail) {
    this.seitService.getMailUserAgents(this.data.mail)
                    .subscribe({
                      next: (value) => this.userAgents = value,
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          if ((this.currentUser != null) &&
                              (this.currentUser.token.expiresIn > new Date())) {
                            this.nextMethod = this.getMailUserAgents;
                            this.parameter = mail;
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

  public get userAgents(): UserAgent[] {
    return this._userAgents;
  }
  public set userAgents(value: UserAgent[]) {
    const dataChange = new BehaviorSubject<UserAgent[]>([]);
    let copiedData;

    for (const ua of value) {
      copiedData = dataChange.value.slice();
      copiedData.push(ua);
      dataChange.next(copiedData);
    }
    this.dataSource = new MailUserAgentDataSource(dataChange);

    this._userAgents = value;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }
}
