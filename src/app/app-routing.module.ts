import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/shared/login/login.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { UsersListComponent } from './components/shared/users-list/users-list.component';
import { MedicalHistoryComponent } from './components/shared/medical-history/medical-history.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { ProfileDetailComponent } from './components/shared/profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/shared/profile/profile-edit/profile-edit.component';
import { PatientViewComponent } from './components/patient/patient-view/patient-view.component';
import { PaymentComponent } from './components/patient/patient-view/payment/payment.component';
import { DentistViewComponent } from './components/doctor/dentist-view/dentist-view.component';
import { DentistDashComponent } from './components/doctor/dentist-view/dentist-dash/dentist-dash.component';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component';
import { AdminDashComponent } from './components/admin/admin-view/admin-dash/admin-dash.component';
import { UserEditComponent } from './components/shared/user-edit/user-edit.component';
import { MessageComponent } from './components/doctor/dentist-view/message/message.component';
import { ConsultDetailComponent } from './components/shared/medical-history/consult-detail/consult-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'patient/:id', component: PatientViewComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'dentist-list', component: UsersListComponent},
    {path: 'medical-record', component: MedicalHistoryComponent},
    {path: 'payment', component: PaymentComponent},
  ]},
  {path: 'dentist/:id', component: DentistViewComponent, children: [
    {path: '', component: DentistDashComponent},
    {path: 'patient-list', component: UsersListComponent},
    {path: 'patient/:id/medical-record', component: MedicalHistoryComponent},
    {path: 'patient/:id/consult/:number', component: ConsultDetailComponent},
    {path: 'patient/:id/message', component: MessageComponent}
  ]},
  {path: 'admin/:id', component: AdminViewComponent, children: [
    {path: '', component: AdminDashComponent},
    {path: 'user-list', component: UsersListComponent},
    {path: 'user-edit/:id', component: UserEditComponent}
  ]},
  {path: ':userType/:id/profile', component: ProfileComponent, children: [
    {path: '', component: ProfileDetailComponent},
    {path: 'edit', component: ProfileEditComponent}
  ]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
