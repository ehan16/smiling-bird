import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { Payment } from 'src/app/models/payment.model';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  allDentist = [];
  totalEarnings = 0;
  totalPatients = 0;
  totalDentist = 0;
  totalActiveApp = 0;
  dateRangeForm: FormGroup;
  endDate = new Date();
  startDate = new Date(this.endDate.getFullYear() + '01-01');

  constructor(private firestoreService: FirestoreService, private fb: FormBuilder) {}

  ngOnInit() {

    this.dateRangeForm = this.fb.group({
      start: this.startDate,
      end: this.endDate
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

      console.log('Pacientes', this.allPatients);
      console.log('Dentistas', this.allDentist);

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
      const allActiveApp = allAppointments.filter(appointment => appointment.completed === false);
      const allCompleteApp = allAppointments.filter(appointment => appointment.completed === true);

      console.log('activos', allActiveApp);
      console.log('completados', allCompleteApp);

      this.totalActiveApp = allActiveApp.length;

      this.renderChartStatus(allCompleteApp.length, this.totalActiveApp);
      this.renderChartAppointmentByDate();
      console.log('dentists', this.allDentist, 'appointments', allAppointments);
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
      console.log('pagos', allPayments);

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
    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    console.log(this.startDate, this.endDate);
    const start = this.startDate;
    const end = this.endDate;
    if ((start > end)) {
      window.alert('Fechas inválidas');
    } else {
      window.alert('Exitoso');
    }
  }

  renderChartAppointmentByDate() {

    this.canvas = document.getElementById('chartAppDate');
    this.ctx = this.canvas.getContext('2d');

    this.chartAppDate = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        ]
      },
      options: { legend: { display: false },
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
