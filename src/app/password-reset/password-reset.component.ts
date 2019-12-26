import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { PasswordResetService } from '../password-reset.service';
import { IOrganizationId } from 'src/model/organization';
import { IOrganizationServiceConfig } from 'src/model/organization-service-config';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatStepper } from '@angular/material';
import { ValidationMethod } from 'src/model/validation-method';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  setupValidationRequired=true
  serviceType:string = "Password-Reset-Authentication"
  orgnizationData: IOrganizationId = new IOrganizationId()
  passwordResetAuth = new IOrganizationServiceConfig()

  freeOtpAppAuthentication = false
  googleAppAuthentication = false
  smsAuthentication = false
  whatsAppAuthentication = false
  authenticationMethod: string
  validationMethod: ValidationMethod
  isLinear = true;


  constructor(private snackBar: MatSnackBar, private _router: Router, private _resgisterService: RegisterService, private _passwordResetService: PasswordResetService) {}

  async ngOnInit() {

    const validationMethodData = await this._passwordResetService.getValidationMethod().toPromise()
    this.validationMethod = validationMethodData

    if (typeof this.validationMethod == 'undefined' || !this.validationMethod.serviceType) {
      this.setupValidationRequired=true
    } else {
      this.setupValidationRequired=false
    }

    console.log(this.setupValidationRequired)

    const orgData = await this._resgisterService.getOrganizationId().toPromise()
    this.orgnizationData = orgData

    const serviceData = await this._passwordResetService.getPasswordResetSetupConfig(this.orgnizationData.orgnizationId, this.serviceType).toPromise()

    this.passwordResetAuth = serviceData
    this.freeOtpAppAuthentication = this.passwordResetAuth.data.indexOf("freeOtpAppAuthentication") >= 0
    this.googleAppAuthentication = this.passwordResetAuth.data.indexOf("googleAppAuthentication") >= 0
    this.smsAuthentication = this.passwordResetAuth.data.indexOf("smsAuthentication") >= 0
    this.whatsAppAuthentication = this.passwordResetAuth.data.indexOf("whatsAppAuthentication") >= 0

  }

  preferredAuthenticationMethod() {
    console.log(this.authenticationMethod)

    if (this.authenticationMethod === "freeOtpAppAuthentication") {
      this._router.navigate(["freeOtpAppAuthentication"])
    } else if (this.authenticationMethod === "googleAppAuthentication") {
      this._router.navigate(["googleAppAuthentication"])
    } else if (this.authenticationMethod === "smsAuthentication") {
      this._router.navigate(["smsAuthentication"])
    } else if (this.authenticationMethod === "whatsAppAuthentication") {
      this._router.navigate(["whatsAppAuthentication"])
    } else {
      let config = new MatSnackBarConfig();
      config.duration = 3000
      config.panelClass = ['mat-toolbar', 'mat-warn']
      config.verticalPosition = 'top'
      config.horizontalPosition = 'center'
      this.snackBar.open("Select one of the Authentication method to proceed", null, config)
    }

  }

  updatePassword() {
    
  }

  goForward(stepper: MatStepper) {
    stepper.next()
  }
  

}
