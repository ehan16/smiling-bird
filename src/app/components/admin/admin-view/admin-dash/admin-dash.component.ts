import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { Payment } from 'src/app/models/payment.model';

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
  allPayments = [];
  allAppointments = [];
  allActiveApp = [];
  allCompleteApp = [];
  allPatients = [];
  allDentist = [];
  totalEarnings = 0;
  totalPatients = 0;
  totalDentist = 0;
  totalActiveApp = 5;
  totalCompleteApp = 10;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {

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
      this.allAppointments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });
      this.allActiveApp = this.allAppointments.filter(appointment => appointment.completed === false);
      this.allCompleteApp = this.allAppointments.filter(appointment => appointment.completed === true);

      console.log('activos', this.allActiveApp);
      console.log('completados', this.allCompleteApp);

      this.totalActiveApp = this.allActiveApp.length;
      this.totalCompleteApp = this.allCompleteApp.length;

      this.renderChartStatus();
      this.renderChartAppointmentByDate();

    });

    // Se buscan todos los pagos de la base de datos
    this.firestoreService.getAll('payments').subscribe(data => {
      this.allPayments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Payment;
      });
      console.log('pagos', this.allPayments);

      this.allPayments.forEach(payment => {
        this.totalEarnings = this.totalEarnings + payment.amount;
      });

    });

    this.canvas = document.getElementById('chartDentist');
    this.ctx = this.canvas.getContext('2d');
    this.chartDentist = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        legend: { display: false },
      }
    });



    this.renderChartEarnings();

  }



  renderChartEarnings() {

    this.canvas = document.getElementById('chartEarnings');
    this.ctx = this.canvas.getContext('2d');
    this.chartEarnings = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133, 221, 73, 78, 312, 0],
          label: 'Ganancias',
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {}
    });

  }


  selectDateRange() {

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
      tooltips: { enabled: false },
      }
    });

  }

  renderChartStatus() {

    this.canvas = document.getElementById('chartStatus');
    this.ctx = this.canvas.getContext('2d');
    this.chartStatus = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2],
        datasets: [{
          label: 'status',
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#ffc107',
            '#4acccd',
          ],
          borderWidth: 0,
          data: [this.totalCompleteApp, this.totalActiveApp]
        }]
      },
      options: {
        legend: {
          display: false
        },
        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: 'transparent',
              color: 'rgba(255,255,255,0.05)'
            }
          }],
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: 'transparent'
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

  }

}


