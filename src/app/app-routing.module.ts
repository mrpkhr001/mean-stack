import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NodeComponent } from './node/node.component';
import { PackComponent } from './pack/pack.component';
import { AddpackComponent } from './addpack/addpack.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { EnrollComponent } from './enroll/enroll.component';
import { EnrollDetailComponent } from './enroll-detail/enroll-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { PasswordResetSetupComponent } from './password-reset-setup/password-reset-setup.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetFreeotpComponent } from './password-reset-freeotp/password-reset-freeotp.component';
import { PasswordResetGoogleComponent } from './password-reset-google/password-reset-google.component';
import { PasswordResetPhonesmsComponent } from './password-reset-phonesms/password-reset-phonesms.component';
import { PasswordResetWhatsappComponent } from './password-reset-whatsapp/password-reset-whatsapp.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'nodes', component: NodeComponent},
  {path: 'packs', component: PackComponent},
  {path: 'addpack', component: AddpackComponent},
  {path: "node/:id", component: NodeDetailComponent},
  {path: "freeOtpAppAuthentication", component: PasswordResetFreeotpComponent},
  {path: "googleAppAuthentication", component: PasswordResetGoogleComponent},
  {path: "smsAuthentication", component: PasswordResetPhonesmsComponent},
  {path: "whatsAppAuthentication", component: PasswordResetWhatsappComponent},
  {
    path: "enroll-company/:id", 
    component: EnrollDetailComponent,
    children: [
      {path:'', redirectTo: '/home', pathMatch: 'full'},
      {path: "details", component: CompanyUpdateComponent},
      {path: "contacts", component: CompanyUpdateComponent},
      {path: "password-reset-setup", component: PasswordResetSetupComponent},
      {path: "single-sign-on", component: CompanyUpdateComponent},
      {path: "fleet-monitoring", component: CompanyUpdateComponent}
    ]
  },
  {path: "enroll", component: EnrollComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "password-reset", component: PasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }