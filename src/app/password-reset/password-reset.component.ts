import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  isLinear = true;
  userId = ""
  secret = ""
  errorMsg = ""
  token = ""
  image = ""

  value = "otpauth://totp/www.canuminfotech.com:userId?secret=secretkey&algorithm=SHA1&digits=6&period=60&image=https%3A%2F%2Fwww.canuminfotech.com%2Fimg%2Flogo.png"
  
  constructor(private _registerService: RegisterService) {}

  ngOnInit() {

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.value = this.value.replace("userId", responseList[0].userId.replace("@", "%40"));
      this.value = this.value.replace("secretkey", responseList[1].secret);
    });    
  }
  
  public requestDataFromMultipleSources(): Observable<any[]> {

    let response1 = this.getUserId();
    let response2 = this.getSecret();

    return forkJoin([response1, response2]);
  }

  public getUserId() {
    return this._registerService.getUserId();
  }

  public getSecret() {
    return this._registerService.getSecret();
  }

  public validateToken() {
    return this._registerService.validateToken(this.token).subscribe(
      response => {
        console.log("Response : " + response)
      },
      err => {
        console.log("Error : " + err)
      }
    );;
  }


}
