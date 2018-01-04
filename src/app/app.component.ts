import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { User } from './user/model/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'SecretariatMIS';
  width = document.documentElement.clientWidth;
  screenWidth: Observable<number>;

  constructor(private userService: UserService,
              private router: Router,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.screenWidth = Observable.fromEvent(window, 'resize')
                                 .map(() => {
                                   return document.documentElement.clientWidth;
                                 }).debounceTime(200);

    iconRegistry.addSvgIcon(
      'mark-github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mark-github.svg')
    );
  }

  ngOnInit() {
    this.screenWidth.subscribe(data => {
      this.width = data;
    });
  }

  logout() {
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get currentUser(): User {
    return this.userService.currentUser;
  }
}
