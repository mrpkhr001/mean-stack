import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RegisterUser } from 'src/model/register';
import { RegisterService } from '../register.service';
import { MatSnackBar } from '@angular/material';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registration = new RegisterUser();
  hide = false;
  color = 'primary';

  constructor(private snackBar: MatSnackBar, private _registerService : RegisterService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._registerService.registerUser(this.registration).subscribe(
      response => {
        console.log(JSON.stringify(response))
        this.snackBar.open("User Successfully Registered")
        this._router.navigate(['/login']);
      },
      err => {
        this.snackBar.open("Unable to Register User", 'Dismiss', {duration: 3000})
        console.log("Error : " + err)
      }
    );

  }

}
