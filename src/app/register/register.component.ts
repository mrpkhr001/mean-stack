import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RegisterUser } from 'src/model/register';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registration = new RegisterUser();
  hide = false;
  color = 'primary';

  constructor(private _registerService : RegisterService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._registerService.registerUser(this.registration).subscribe(
      response => {
        console.log("Response : " + response)
        this.registration = new RegisterUser();
        this._router.navigate(['/login']);
      },
      err => {
        console.log("Error : " + err)
      }
    );

  }

}
