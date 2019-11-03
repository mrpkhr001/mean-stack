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
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { MatChipInput } from '@angular/material';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    EnrollmentService,
    PackService,
    CompanyEnrollmentService,
    NodePackService,
    RegisterService,
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
