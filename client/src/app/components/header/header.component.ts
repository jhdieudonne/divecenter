import { Component, Inject, Input, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class AppHeader implements AfterViewInit {

  profile: any;
  @Input()
  sidenav;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngAfterViewInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if (!this.router.url.startsWith('/callback')) {
        this.auth.getProfile((err, profile) => {
          if (err)
            console.log('catched error fetching profile for callback');
          if (!err)
            this.profile = profile;
        });
      }
    }
  }

  logout() {
    this.auth.logout();
  }

}


@Component({
  selector: 'menu-header',
  template: `
    <button mat-button routerLink="{{link}}" *ngIf="router.url!==link"><mat-icon *ngIf='icon'>home</mat-icon><span *ngIf='!icon'>{{title}}</span></button>
    <button mat-raised-button disabled *ngIf="router.url===link"><mat-icon *ngIf='icon'>home</mat-icon><span *ngIf='!icon'>{{title}}</span></button>`,
  styles: ['.mat-raised-button[disabled] { color: white; } .mat-raised-button, .mat-button { margin-right: 10px; }']
})

export class MenuHeader {
    @Input()
    link: string;
    @Input()
    title: string;
    @Input()
    icon: string;

    constructor(public router: Router) {}
}
