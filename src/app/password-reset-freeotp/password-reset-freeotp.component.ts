import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable, forkJoin } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-freeotp',
  templateUrl: './password-reset-freeotp.component.html',
  styleUrls: ['./password-reset-freeotp.component.css']
})
export class PasswordResetFreeotpComponent implements OnInit {

  setupValidationRequired=true
  isLinear = true;
  userId = ""
  secret = ""
  errorMsg = ""
  token = ""
  image = "https://www.canuminfotech.com/img/logo.png"
  issuer = "www.canuminfotech.com"

  value = "otpauth://totp/[issuer]:[account]?secret=[secret]&algorithm=SHA1&digits=6&period=60&image=[image]"
  
  constructor(private _router: Router, private snackBar: MatSnackBar, private _registerService: RegisterService) {}

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

        if (response.isValid) {
          let config = new MatSnackBarConfig();
          config.duration = 3000
          config.panelClass = ['mat-toolbar', 'mat-primary']
          config.verticalPosition = 'top'
          config.horizontalPosition = 'center'
          this.snackBar.open("FreeOTP setup Successful", null, config)
          this._router.navigate(['/home']);

        } else {

          let config = new MatSnackBarConfig();
          config.duration = 3000
          config.panelClass = ['mat-toolbar', 'mat-warn']
          config.verticalPosition = 'top'
          config.horizontalPosition = 'center'
          this.snackBar.open("FreeOTP setup not Successful", null, config)

        }
      },
      err => {
        console.log(err)
      }
    );;
  }

}
