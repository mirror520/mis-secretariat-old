import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { User } from '../model/user';
import { Result } from '../model/result';

import { MociaService } from '../../mocia/mocia.service';
import { Pkcs11 } from '../../mocia/model/pkcs11';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, MociaService]
})
export class LoginComponent implements OnInit {
  pkcs11Info: Pkcs11;
  hide = true;

  failureResult: Result;

  userLoginFormGroup: FormGroup;

  constructor(
    private userService: UserService,
    private mociaService: MociaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userLoginFormGroup = this.formBuilder.group({
      account: [
        null,
        Validators.required
      ],
      password: [
        null,
        Validators.required
      ]
    });
  }

  selectChangeHandler(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getPkcs11Info();
    }
  }

  getPkcs11Info() {
    this.mociaService.getPkcs11Info()
                     .subscribe({
                       next: (value) => {
                         this.pkcs11Info = value;
                         console.log(value);
                       },
                        error: (error) => console.error(error),
                        complete: () => console.log(`complete`)
                      });
  }

  loginUserByTccg(username: string, password: string) {
    this.failureResult = null;
    this.currentUser = null;

    this.userService.getTccgUser(username, password)
                    .subscribe({
                      next: (value) => this.loginResultHandler(value),
                      error: (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                          this.failureResult = Object.assign(new Result(), error.error);
                          this.snackBar.open(this.failureResult.info[0], '確定', {
                            duration: 2000
                          });
                        }
                      }
                    });
  }

  loginUserByMocia(pincode: string) {
  }

  private loginResultHandler(value: User): void {
    this.currentUser = value;
    if (this.userService.redirectUrl != null) {
      this.router.navigate([this.userService.redirectUrl]);
      this.userService.redirectUrl = null;
    }
  }

  set currentUser(value: User) {
    this.userService.currentUser = value;
  }
  get currentUser(): User {
    return this.userService.currentUser;
  }
}
