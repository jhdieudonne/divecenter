import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class AppHeader implements AfterViewInit {

  profile: any;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngAfterViewInit() {
    console.log('NOW');
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if (!this.router.url.startsWith('/callback')) {
        this.auth.getProfile((err, profile) => {
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
