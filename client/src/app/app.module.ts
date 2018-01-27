import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppHeader, MenuHeader } from './components/header/header.component';
import { CallbackComponent } from './directives/callback/callback.component';
import { BlenderLogComponent } from './components/blenderLog/blenderLog.component';
import { NewLogComponent } from './components/blenderLog/newLog/newLog.component';

import { AuthService } from './services/auth/auth.service'
import { ApiService } from './services/api/api.service';
import { AlertsDirective } from './directives/alerts/alerts.directive';
import { AlertsService } from './services/alert/alert.service';

import { IsAuthenticatedGuard } from './guard/auth.guard';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatMenuModule, MatSidenavModule } from '@angular/material';

import { SignaturePadModule } from 'angular2-signaturepad';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    //AlertsDirective,
    HomeComponent,
    BlenderLogComponent,
    CallbackComponent,
    NewLogComponent,
    MenuHeader
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MatSelectModule,
    SignaturePadModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  exports: [

  ],
  providers: [AuthService, ApiService, AlertsService, IsAuthenticatedGuard],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
