import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'opstinuum';

  constructor(private _registerSerice: RegisterService) {}

  isUserLoggedIn() {
    return this._registerSerice.loggedInUser()
  }

  logoutUser() {
    this._registerSerice.logoutUser();
  }

}
