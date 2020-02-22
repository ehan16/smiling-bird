import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DentistComponent } from './components/dentist/dentist.component';
import { PatientComponent } from './components/patient/patient.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/patient/payment/payment.component';
import { MedicalHistoryComponent } from './components/shared/medical-history/medical-history.component';
import { MessageComponent } from './components/dentist/message/message.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { ProfileEditComponent } from './components/shared/profile/profile-edit/profile-edit.component';
import { AppointmentsComponent } from './components/shared/appointments/appointments.component';
import { AppointmentListComponent } from './components/shared/appointments/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './components/shared/appointments/appointment-edit/appointment-edit.component';
import { AppointmentDetailComponent } from './components/shared/appointments/appointment-detail/appointment-detail.component';
import { AppointmentItemComponent } from './components/shared/appointments/appointment-list/appointment-item/appointment-item.component';
import { UsersListComponent } from './components/shared/users-list/users-list.component';
import { UserItemComponent } from './components/shared/users-list/user-item/user-item.component';
import { UserEditComponent } from './components/shared/users-list/user-edit/user-edit.component';
import { ConsultListComponent } from './components/shared/medical-history/consult-list/consult-list.component';
import { ConsultItemComponent } from './components/shared/medical-history/consult-list/consult-item/consult-item.component';
import { ConsultEditComponent } from './components/shared/medical-history/consult-edit/consult-edit.component';
import { ConsultDetailComponent } from './components/shared/medical-history/consult-detail/consult-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DentistComponent,
    PatientComponent,
    FooterComponent,
    PaymentComponent,
    MedicalHistoryComponent,
    MessageComponent,
    ProfileComponent,
    ProfileEditComponent,
    AppointmentsComponent,
    AppointmentListComponent,
    AppointmentEditComponent,
    AppointmentDetailComponent,
    AppointmentItemComponent,
    UsersListComponent,
    UserItemComponent,
    UserEditComponent,
    ConsultListComponent,
    ConsultItemComponent,
    ConsultEditComponent,
    ConsultDetailComponent,
    AdminComponent,
    LoginComponent,
    SignInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
