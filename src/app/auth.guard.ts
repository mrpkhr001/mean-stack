import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _registerSrevice: RegisterService, private _router: Router) {}

  canActivate() : boolean {

    if (this._registerSrevice.loggedInUser) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
