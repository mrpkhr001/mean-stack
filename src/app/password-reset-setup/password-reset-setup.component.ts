import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-password-reset-setup',
  templateUrl: './password-reset-setup.component.html',
  styleUrls: ['./password-reset-setup.component.css']
})
export class PasswordResetSetupComponent implements OnInit {

  passwordResetAuthentication: string = "openFTPAppAuthentication"

  constructor() { }

  ngOnInit() {
  }

  updatePasswordResetService() {
    console.log(this.passwordResetAuthentication)
  }

  onChange(mrChange: MatRadioChange) {
    this.passwordResetAuthentication = mrChange.value
 } 

}
