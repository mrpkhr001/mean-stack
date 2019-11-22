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

const routes: Routes = [
  {path:'', redirectTo: '/nodes', pathMatch: 'full'},
  {path: 'nodes', component: NodeComponent},
  {path: 'packs', component: PackComponent},
  {path: 'addpack', component: AddpackComponent},
  {path: "node/:id", component: NodeDetailComponent},
  {path: "enroll-company/:id", component: EnrollDetailComponent},
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
