import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/patient/payment/payment.component';
import { UsersListComponent } from './components/shared/users-list/users-list.component';
import { MedicalHistoryComponent } from './components/shared/medical-history/medical-history.component';
import { ProfileComponent } from './components/shared/profile/profile.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'patient/:id', component: PatientComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'dentist-list', component: UsersListComponent},
    {path: 'medical-record', component: MedicalHistoryComponent},
    {path: 'payment', component: PaymentComponent},
  ]},
  {path: ':userType/:id/profile', component: ProfileComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
