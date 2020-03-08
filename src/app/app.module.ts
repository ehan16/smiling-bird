import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbCarouselModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MedicalHistoryComponent } from './components/shared/medical-history/medical-history.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { ProfileEditComponent } from './components/shared/profile/profile-edit/profile-edit.component';
import { AppointmentsComponent } from './components/shared/appointments/appointments.component';
import { AppointmentEditComponent } from './components/shared/appointments/appointment-edit/appointment-edit.component';
import { AppointmentDetailComponent } from './components/shared/appointments/appointment-detail/appointment-detail.component';
import { UsersListComponent } from './components/shared/users-list/users-list.component';
import { UserEditComponent } from './components/shared/user-edit/user-edit.component';
import { ConsultEditComponent } from './components/shared/medical-history/consult-edit/consult-edit.component';
import { ConsultDetailComponent } from './components/shared/medical-history/consult-detail/consult-detail.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileDetailComponent } from './components/shared/profile/profile-detail/profile-detail.component';

import { UserService } from './services/user.service';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component';
import { AdminDashComponent } from './components/admin/admin-view/admin-dash/admin-dash.component';
import { DentistViewComponent } from './components/doctor/dentist-view/dentist-view.component';
import { DentistDashComponent } from './components/doctor/dentist-view/dentist-dash/dentist-dash.component';
import { PatientViewComponent } from './components/patient/patient-view/patient-view.component';
import { PaymentComponent } from './components/patient/patient-view/payment/payment.component';
import { MessageComponent } from './components/doctor/dentist-view/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MedicalHistoryComponent,
    ProfileComponent,
    ProfileEditComponent,
    AppointmentsComponent,
    AppointmentEditComponent,
    AppointmentDetailComponent,
    UsersListComponent,
    UserEditComponent,
    ConsultEditComponent,
    ConsultDetailComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileDetailComponent,
    AdminViewComponent,
    AdminDashComponent,
    DentistViewComponent,
    DentistDashComponent,
    PatientViewComponent,
    PaymentComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
