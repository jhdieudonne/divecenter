import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppHeader } from './components/header/header.component';

import { AuthService } from './services/auth/auth.service'
import { HomeComponent } from './components/home/home.component';
import { BlenderLogComponent } from './components/blenderLog/blenderLog.component';

import { ROUTES } from './app.routes';
import { CallbackComponent } from './directives/callback/callback.component';
import { ApiService } from './services/api/api.service';
import { AlertsDirective } from './directives/alerts/alerts.directive';
import { AlertsService } from './services/alert/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AlertsDirective,
    HomeComponent,
    BlenderLogComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [AuthService, ApiService, AlertsService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
