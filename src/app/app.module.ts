import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

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
import { AppointmentEditComponent } from './components/shared/appointments/appointment-edit/appointment-edit.component';
import { AppointmentDetailComponent } from './components/shared/appointments/appointment-detail/appointment-detail.component';
import { UsersListComponent } from './components/shared/users-list/users-list.component';
import { UserEditComponent } from './components/shared/users-list/user-edit/user-edit.component';
import { ConsultEditComponent } from './components/shared/medical-history/consult-edit/consult-edit.component';
import { ConsultDetailComponent } from './components/shared/medical-history/consult-detail/consult-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileDetailComponent } from './components/shared/profile/profile-detail/profile-detail.component';

import { UserService } from './services/user.service';

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
    AppointmentEditComponent,
    AppointmentDetailComponent,
    UsersListComponent,
    UserEditComponent,
    ConsultEditComponent,
    ConsultDetailComponent,
    AdminComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
