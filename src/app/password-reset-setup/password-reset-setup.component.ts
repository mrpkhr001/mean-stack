import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../password-reset.service';
import { IOrganizationServiceConfig } from 'src/model/organization-service-config';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset-setup',
  templateUrl: './password-reset-setup.component.html',
  styleUrls: ['./password-reset-setup.component.css']
})
export class PasswordResetSetupComponent implements OnInit {

  showClassGrp: FormGroup;

  openFTPAppAuthentication = false
  googleAppAuthentication = false
  smsAuthentication = false
  whatsAppAuthentication = false

  passwordResetAuth = new IOrganizationServiceConfig()
  errorMsg = ""

  id: string = ""
  serviceType:string = "Password-Reset-Authentication"

  constructor(private _router: Router, private route:ActivatedRoute, private passwordResetService: PasswordResetService) { }

  ngOnInit() {

    this.id = this.route.parent.snapshot.params['id']
    this.passwordResetService.getPasswordResetSetupConfig(this.id, this.serviceType)
    .subscribe(data => {

      this.passwordResetAuth = data
      this.openFTPAppAuthentication = this.passwordResetAuth.data.indexOf("openFTPAppAuthentication") >= 0
      this.googleAppAuthentication = this.passwordResetAuth.data.indexOf("googleAppAuthentication") >= 0
      this.smsAuthentication = this.passwordResetAuth.data.indexOf("smsAuthentication") >= 0
      this.whatsAppAuthentication = this.passwordResetAuth.data.indexOf("whatsAppAuthentication") >= 0

      this.showClassGrp = new FormGroup({

        'openFTPAppAuthentication': new FormControl(this.openFTPAppAuthentication),
        'googleAppAuthentication': new FormControl(this.googleAppAuthentication),
        'smsAuthentication': new FormControl(this.smsAuthentication),
        'whatsAppAuthentication': new FormControl(this.whatsAppAuthentication),
  
      });

    },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            this._router.navigate(['/login'])
          }
        }
        this.errorMsg = error
      });

  }

  updatePasswordResetService() {

    let passwordResetConfig = new IOrganizationServiceConfig()
    passwordResetConfig._id = this.id
    passwordResetConfig.serviceType = this.serviceType
    let data: string[] = []

    if (this.showClassGrp.value.openFTPAppAuthentication) {
      data.push("openFTPAppAuthentication")
    }

    if (this.showClassGrp.value.googleAppAuthentication) {
      data.push("googleAppAuthentication")
    }

    if (this.showClassGrp.value.smsAuthentication) {
      data.push("smsAuthentication")
    }

    if (this.showClassGrp.value.whatsAppAuthentication) {
      data.push("whatsAppAuthentication")
    }

    passwordResetConfig.data = data

    this.passwordResetService.updatePasswordResetSetup(passwordResetConfig).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
