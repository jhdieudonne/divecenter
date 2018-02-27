import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppHeader, MenuHeader } from './components/header/header.component';
import { CallbackComponent } from './directives/callback/callback.component';
import { BlenderLogComponent } from './components/blenderLog/blenderLog.component';
import { NewLogComponent } from './components/blenderLog/newLog/newLog.component';

import { JwtModule } from '@auth0/angular-jwt'

import { AuthService } from './services/auth/auth.service'
import { ApiService } from './services/api/api.service';
import { AlertsDirective } from './directives/alerts/alerts.directive';
import { AlertsService } from './services/alert/alert.service';

import { IsAuthenticatedGuard } from './guard/auth.guard';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatCardModule, 
  MatListModule, MatIconModule, MatMenuModule, MatSidenavModule, MatExpansionModule, MatDialogModule, MatSlideToggleModule, 
  MatSliderModule } from '@angular/material';

import { SignaturePadModule } from 'angular2-signaturepad';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MaterialComponent } from './components/material/material.component';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BlenderGaugeComponent } from './components/blenderLog/blenderTool/blenderGauge/blenderGauge.component';
import { BlenderMixComponent } from './components/blenderLog/blenderTool/blenderMix/blenderMix.component';
import { BlenderToolComponent } from './components/blenderLog/blenderTool/blenderTool.component';
import { CustBoxComponent } from './modules/crm/cust-box/cust-box.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    //AlertsDirective,
    HomeComponent,
    BlenderLogComponent,
    CallbackComponent,
    NewLogComponent,
    MenuHeader,
    MaterialComponent,
    BlenderGaugeComponent,
    BlenderMixComponent,
    BlenderToolComponent,
    CustBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCardModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080']
      }
    })
  ],
  entryComponents: [NewLogComponent],
  providers: [AuthService, ApiService, AlertsService, IsAuthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'fr' }    ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
