import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { PackComponent } from './pack/pack.component';
import { AddpackComponent } from './addpack/addpack.component';
import { EnrollmentService } from './enrollment.service';
import { PackService } from './pack.service';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { MaterialModule } from './material/material.module';
import { EnrollComponent } from './enroll/enroll.component';
import { CompanyEnrollmentService } from './company-enrollment.service';
import { NodePackService } from './node-pack.service';
import { EnrollDetailComponent } from './enroll-detail/enroll-detail.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register.service';
import { PackDataService } from './pack-data.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { PasswordResetSetupComponent } from './password-reset-setup/password-reset-setup.component';
import { PasswordResetService } from './password-reset.service';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    PackComponent,
    AddpackComponent,
    NodeDetailComponent,
    EnrollComponent,
    EnrollDetailComponent,
    RegisterComponent,
    LoginComponent,
    PasswordResetComponent,
    CompanyUpdateComponent,
    PasswordResetSetupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxQRCodeModule
  ],
  providers: [
    EnrollmentService,
    PackService,
    CompanyEnrollmentService,
    NodePackService,
    RegisterService,
    PackDataService,
    PasswordResetService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
