import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'opstinuum'
  errorMsg = ""
  isAdmin = false

  constructor(private _registerService: RegisterService) {}

  isUserLoggedIn() {
    return this._registerService.loggedInUser()
  }

  logoutUser() {
    this._registerService.logoutUser();
  }

  ngOnInit() {
    this.isUserAdmin()
  }

  isUserAdmin() {
    this._registerService.getUserRole().subscribe(data => {
      {
        if (data.role === "ADMIN" && this.isUserLoggedIn()) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
  },
    error => this.errorMsg = error
  );

  }

}