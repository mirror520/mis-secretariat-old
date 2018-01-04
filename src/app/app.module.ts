import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AuthGuardService } from './user/auth-guard.service';
import { LoginComponent } from './user/login/login.component';
import { SeitDashboardComponent } from './seit/dashboard/seit-dashboard.component';
import { UserService } from './user/user.service';
import { VoteComponent } from './vote/vote.component';
import { VoteResultComponent } from './vote/result/vote-result.component';
import { ValidatorDirective } from './vote/shared/validator.directive';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'seit', component: SeitDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'vote', component: VoteComponent },
  { path: 'vote/result', component: VoteResultComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeitDashboardComponent,
    VoteComponent,
    VoteResultComponent,
    ValidatorDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CdkTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
