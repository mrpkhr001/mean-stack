import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../password-reset.service';
import { IOrganizationServiceConfig } from 'src/model/organization-service-config';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyEnrollmentService } from '../company-enrollment.service';
import { ICompanyEnrollment } from 'src/model/company-enrollment';

@Component({
  selector: 'app-password-reset-setup',
  templateUrl: './password-reset-setup.component.html',
  styleUrls: ['./password-reset-setup.component.css']
})
export class PasswordResetSetupComponent implements OnInit {

  showClassGrp: FormGroup;

  freeOtpAppAuthentication = false
  googleAppAuthentication = false
  smsAuthentication = false
  whatsAppAuthentication = false
  companyEnrollment:ICompanyEnrollment = new ICompanyEnrollment()

  passwordResetAuth = new IOrganizationServiceConfig()
  errorMsg = ""

  id: string = ""
  serviceType:string = "Password-Reset-Authentication"

  constructor(private _companyEnrollmentService: CompanyEnrollmentService, private _router: Router, private route:ActivatedRoute, private passwordResetService: PasswordResetService) { }

  async ngOnInit() {

    this.showClassGrp = new FormGroup({

      'freeOtpAppAuthentication': new FormControl(this.freeOtpAppAuthentication),
      'googleAppAuthentication': new FormControl(this.googleAppAuthentication),
      'smsAuthentication': new FormControl(this.smsAuthentication),
      'whatsAppAuthentication': new FormControl(this.whatsAppAuthentication),
    })

    this.id = this.route.parent.snapshot.params['id']
    const organization = await this._companyEnrollmentService.getEnrolledCompany(this.id).toPromise()
    this.companyEnrollment = organization

    const data = await this.passwordResetService.getPasswordResetSetupConfig(this.companyEnrollment.enrollmentSecret, this.serviceType).toPromise()
    
    this.passwordResetAuth = data
    this.freeOtpAppAuthentication = this.passwordResetAuth.data.indexOf("freeOtpAppAuthentication") >= 0
    this.googleAppAuthentication = this.passwordResetAuth.data.indexOf("googleAppAuthentication") >= 0
    this.smsAuthentication = this.passwordResetAuth.data.indexOf("smsAuthentication") >= 0
    this.whatsAppAuthentication = this.passwordResetAuth.data.indexOf("whatsAppAuthentication") >= 0

    this.showClassGrp = new FormGroup({

      'freeOtpAppAuthentication': new FormControl(this.freeOtpAppAuthentication),
      'googleAppAuthentication': new FormControl(this.googleAppAuthentication),
      'smsAuthentication': new FormControl(this.smsAuthentication),
      'whatsAppAuthentication': new FormControl(this.whatsAppAuthentication),
    })

  }

  updatePasswordResetService() {

    let passwordResetConfig = new IOrganizationServiceConfig()
    passwordResetConfig._id = this.companyEnrollment.enrollmentSecret
    passwordResetConfig.serviceType = this.serviceType
    let data: string[] = []

    if (this.showClassGrp.value.freeOtpAppAuthentication) {
      data.push("freeOtpAppAuthentication")
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
