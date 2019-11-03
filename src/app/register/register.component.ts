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
  hide = true;

  constructor(private _registerService : RegisterService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registration);
    this._registerService.registerUser(this.registration).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('token', response.token)
        this._router.navigate(['/node']);
      },
      err => console.log(err)
    );
    this.registration = new RegisterUser();

  }

}
