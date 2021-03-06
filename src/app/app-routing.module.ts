import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/visitor/visitor-view/login/login.component';
import { SignUpComponent } from './components/visitor/visitor-view/sign-up/sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';
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
import { UserEditComponent } from './components/admin/admin-view/user-edit/user-edit.component';
import { MessageComponent } from './components/doctor/dentist-view/message/message.component';
import { ConsultDetailComponent } from './components/shared/medical-history/consult-detail/consult-detail.component';
import { VisitorViewComponent } from './components/visitor/visitor-view/visitor-view.component';
import { ForgotPasswordComponent } from './components/visitor/visitor-view/login/forgot-password/forgot-password.component';
import { NewUserComponent } from './components/shared/users-list/new-user/new-user.component';
import { ConsultEditComponent } from './components/doctor/dentist-view/consult-edit/consult-edit.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { DentistAuthGuard } from './guard/dentist-auth.guard';
import { ReportesComponent } from './components/doctor/dentist-view/reportes/reportes.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/visitor'},

  {path: 'visitor', component: VisitorViewComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent}
  ]},

  {path: 'patient/:patientId', component: PatientViewComponent, canActivate: [AuthGuard], children: [
    {path: '', component: HomeComponent},
    {path: 'dentist-list', component: UsersListComponent},
    {path: 'medical-record', component: MedicalHistoryComponent},
    {path: 'consult/:consultId', component: ConsultDetailComponent},
    {path: 'payment', component: PaymentComponent}
  ]},

  {path: 'dentist/:id', component: DentistViewComponent, canActivate: [DentistAuthGuard], children: [
    {path: '', component: DentistDashComponent},
    {path: 'report', component: ReportesComponent},
    {path: 'patient-list', component: UsersListComponent},
    {path: 'patient-list/new-patient', component: NewUserComponent},
    {path: 'patient-list/:patientId/medical-record', component: MedicalHistoryComponent},
    {path: 'patient-list/:patientId/consult/:consultId', component: ConsultDetailComponent},
    {path: 'patient-list/:patientId/consult/:consultId/edit', component: ConsultEditComponent},
    {path: 'patient-list/:patientId/message', component: MessageComponent},
  ]},

  {path: 'admin/:id', component: AdminViewComponent, canActivate: [AdminAuthGuard], children: [
    {path: '', component: AdminDashComponent},
    {path: 'user-list', component: UsersListComponent},
    {path: 'user-edit/:editedId', component: UserEditComponent},
    {path: 'user-list/new-user', component: NewUserComponent}
  ]},

  {path: ':userType/:id/profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
    {path: '', component: ProfileDetailComponent},
    {path: 'edit', component: ProfileEditComponent}
  ]},

  {path: 'not-found', component: NotFoundComponent},

  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
