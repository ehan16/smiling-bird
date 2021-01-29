import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { Payment } from 'src/app/models/payment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})

export class AdminDashComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartStatus;
  public chartAppDate;
  public chartDentist;
  public chartEarnings;
  allPatients = [];
  appointments = [];
  allDentist = [];
  totalEarnings = 0;
  totalPatients = 0;
  totalDentist = 0;
  totalActiveApp = 0;
  dateRangeForm: FormGroup;
  endDate = new Date();
  startDate = new Date(this.endDate.getFullYear() + '-' + (this.endDate.getMonth()) + '-01');

  constructor(private firestoreService: FirestoreService, private fb: FormBuilder) {}

  ngOnInit() {

    this.dateRangeForm = this.fb.group({
      start: [ '', Validators.required],
      end: ['', Validators.required]
    });

    // Busca todos los pacientes y dentistas de la base de datos
    this.firestoreService.getAll('users').subscribe(data => {
      const userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });

      this.allPatients = userList.filter(user => user.type === 'patient');
      this.allDentist = userList.filter(user => user.type === 'dentist');
      this.totalDentist = this.allDentist.length;
      this.totalPatients = this.allPatients.length;

    });

    // Busca todas las citas de la base de datos
    this.firestoreService.getAll('appointments').subscribe(data => {
      const allAppointments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });
      this.appointments = allAppointments;
      const allActiveApp = allAppointments.filter(appointment => appointment.completed === false);
      const allCompleteApp = allAppointments.filter(appointment => appointment.completed === true);

      this.totalActiveApp = allActiveApp.length;

      this.renderChartStatus(allCompleteApp.length, this.totalActiveApp);
      this.renderChartAppointmentByDate(this.appointments, this.startDate, this.endDate);
      this.renderChartDentist(this.allDentist, allAppointments);

    });

    // Se buscan todos los pagos de la base de datos
    this.firestoreService.getAll('payments').subscribe(data => {
      const allPayments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Payment;
      });

      this.totalEarnings = this.yearEarnings(allPayments);
      this.renderChartEarnings(allPayments);

    });

  }

  appointmentsPerDentist(allDentist: User[], allAppointments: Appointment[]) {

    const names = [];
    const appointments = [];
    const colors = [];
    const border = [];

    for (let i = 0; i < allDentist.length; i ++) {

      const dentist = allDentist[i];
      const id = dentist.id;
      names[i] = dentist.name;
      colors.push('rgba(54, 162, 235, 0.8)');
      border.push('rgba(54, 162, 235, 1)');
      const dentistAppointments = allAppointments.filter(appoinment => appoinment.dentist === id);
      appointments[i] = dentistAppointments.length;

    }

    const data = { names, appointments, colors, border};
    return data;

  }

  renderChartDentist(allDentist, allAppointments) {

    this.canvas = document.getElementById('chartDentist');
    this.ctx = this.canvas.getContext('2d');
    this.chartDentist = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.appointmentsPerDentist(allDentist, allAppointments).names,
        datasets: [{
            data: this.appointmentsPerDentist(allDentist, allAppointments).appointments,
            backgroundColor: this.appointmentsPerDentist(allDentist, allAppointments).colors,
            borderColor: this.appointmentsPerDentist(allDentist, allAppointments).border,
            borderWidth: 1
        }]
      },
      options: {
        legend: { display: false },
        toolpit: { enabled: true}
      }
    });

  }

  earningsByMonth(allPayments): number[] {
    const today = new Date();
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    allPayments.forEach(payment => {
      if (payment.date.year === today.getFullYear()) {
        const paidMonth = payment.date.month;
        const amount = payment.amount;
        data[paidMonth - 1] = data[paidMonth - 1] + amount;
      }
    });
    return data;
  }

  renderChartEarnings(allPayments) {

    this.canvas = document.getElementById('chartEarnings');
    this.ctx = this.canvas.getContext('2d');
    this.chartEarnings = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          data: this.earningsByMonth(allPayments),
          label: 'Ganancias',
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {}
    });

  }

  selectDateRange() {
    console.log('HOLA');
    this.startDate = new Date(this.dateRangeForm.value.start);
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate = new Date(this.dateRangeForm.value.end);
    this.endDate.setDate(this.endDate.getDate() + 1);
    console.log(this.startDate, this.endDate);
    if ((this.startDate > this.endDate)) {
      window.alert('Fechas inválidas, intente de nuevo');
    } else {
      window.alert('Exitoso');
      this.renderChartAppointmentByDate(this.appointments, this.startDate, this.endDate);
    }
  }

  sortAppointmentsByDate(allAppointments: Appointment[], startDate, endDate) {
    const range = [];
    const appointmentsInRange: number[] = [];
    allAppointments = allAppointments.filter(appointment => appointment.accepted === true);
    allAppointments.forEach(appointment => {
      const date = appointment.date.year + '-' + appointment.date.month + '-' + appointment.date.day;
      const appDate = new Date(date);
      if ((appDate > startDate) && (appDate < endDate)) {
        if (!range.includes(date)) {
          range.push(date);
          appointmentsInRange.push(0);
        }
        const index = range.indexOf(date);
        appointmentsInRange[index] = appointmentsInRange[index] + 1;
      }
    });
    const data = { range, appointmentsInRange };
    return data;
  }

  renderChartAppointmentByDate(allAppointments, startDate, endDate) {

    this.canvas = document.getElementById('chartAppDate');
    this.ctx = this.canvas.getContext('2d');

    this.chartAppDate = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.sortAppointmentsByDate(allAppointments, startDate, endDate).range,
        datasets: [{
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          borderWidth: 3,
          data: this.sortAppointmentsByDate(allAppointments, startDate, endDate).appointmentsInRange
        },
        ]
      },
      options: {
        legend: { display: false },
        tooltips: { enabled: true },
      }
    });

  }

  renderChartStatus(totalComplete, totalActive) {

    this.canvas = document.getElementById('chartStatus');
    this.ctx = this.canvas.getContext('2d');
    this.chartStatus = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Finalizadas', 'Activas'],
        datasets: [{
          label: 'status',
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#ffc107',
            '#4acccd',
          ],
          borderWidth: 0,
          data: [totalComplete, totalActive]
        }]
      },
      options: {
        legend: { display: false },
        tooltips: { enabled: true },
      }
    });

  }

  yearEarnings(allPayments: Payment[]): number {
    let earning = 0;
    const today = new Date();
    allPayments.forEach(payment => {
      if (payment.date.year === today.getFullYear()){
        earning = earning + payment.amount;
      }
    });
    return earning;
  }

}
