import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Config } from '../shared/model/config';
import { User } from './model/user';
import { Token } from './model/token';

@Injectable()
export class UserService {
  private static _currentUser: User;
  private static _currentToken: Token;
  private static _isLoggedIn = false;
  private static _redirectUrl = null;

  private baseUrl = Config.baseUrl;

  constructor(private http: HttpClient) { }

  // getToken(username: string, password: string): Observable<Token> {
  //   const body = {
  //     'username': username,
  //     'password': password
  //   };

  //   return this.http.patch<Token>(this.baseUrl + '/users/login', body)
  //                   .map((value: Token) => Object.assign(new Token(), value));
  // }

  refreshToken(user: User): Observable<Token> {
    const body = JSON.stringify(user);

    return this.http.patch<Token>(this.baseUrl + `/tccg/users/${user.account}/token/refresh`, body,
                                  { headers: new HttpHeaders().set('Content-Type', 'application/json') })
                    .map((token: Token) => Object.assign(new Token(), token));
  }

  getTccgUser(account: string, password: string): Observable<User>  {
    const body = {
      'account': account,
      'password': password
    };

    return this.http.patch<User>(this.baseUrl + '/tccg/users/login', body)
                    .map((value: User) => Object.assign(new User(), value));
  }

  set currentUser(value: User) {
    this.isLoggedIn = (value != null);

    UserService._currentUser = value;
  }
  get currentUser(): User {
    return UserService._currentUser;
  }

  set currentToken(value: Token) {
    UserService._currentToken = value;
  }
  get currentToken(): Token {
    return UserService._currentToken;
  }

  set isLoggedIn(value: boolean) {
    UserService._isLoggedIn = value;
  }

  get isLoggedIn(): boolean {
    return UserService._isLoggedIn;
  }

  set redirectUrl(value: string) {
    UserService._redirectUrl = value;
  }
  get redirectUrl(): string {
    return UserService._redirectUrl;
  }
}
