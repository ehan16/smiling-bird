import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { DentistComponent } from './dentist/dentist.component';
import { PatientComponent } from './patient/patient.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './patient/payment/payment.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { MessageComponent } from './dentist/message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigurationComponent } from './profile/configuration/configuration.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointments/appointment-edit/appointment-edit.component';
import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail.component';
import { AppointmentItemComponent } from './appointments/appointment-list/appointment-item/appointment-item.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserItemComponent } from './users-list/user-item/user-item.component';
import { UserEditComponent } from './users-list/user-edit/user-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsultListComponent } from './medical-history/consult-list/consult-list.component';
import { ConsultItemComponent } from './medical-history/consult-list/consult-item/consult-item.component';
import { ConsultEditComponent } from './medical-history/consult-edit/consult-edit.component';
import { ConsultDetailComponent } from './medical-history/consult-detail/consult-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    DentistComponent,
    PatientComponent,
    FooterComponent,
    PaymentComponent,
    MedicalHistoryComponent,
    MessageComponent,
    ProfileComponent,
    ConfigurationComponent,
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
    ConsultDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
