import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  setupValidationRequired=true
  isLinear = true;
  userId = ""
  secret = ""
  errorMsg = ""
  token = ""
  image = "https://www.canuminfotech.com/img/logo.png"
  issuer = "www.canuminfotech.com"

  value = "otpauth://totp/[issuer]:[account]?secret=[secret]&algorithm=SHA1&digits=6&period=60&image=[image]"
  
  constructor(private _registerService: RegisterService) {}

  ngOnInit() {

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.value = this.value.replace("[account]", encodeURIComponent(responseList[0].userId));
      this.value = this.value.replace("[secret]", responseList[1].secret);
      this.value = this.value.replace("[issuer]", encodeURIComponent(this.issuer));
      this.value = this.value.replace("[image]", encodeURIComponent(this.image));
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
        if (response.isValid === true) {
          
        }
      },
      err => {
        console.log("Error : " + err)
      }
    );;
  }


}
