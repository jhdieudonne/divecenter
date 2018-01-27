import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

    constructor(private auth: AuthService) {
    }

    canActivate() {
      if (!this.auth.isAuthenticated()) {
        this.auth.login();
        return false;
      }
      return true;
    }
    
  }