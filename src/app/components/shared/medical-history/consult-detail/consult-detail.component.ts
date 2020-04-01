import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-consult-detail',
  templateUrl: './consult-detail.component.html',
  styleUrls: ['./consult-detail.component.css']
})

export class ConsultDetailComponent implements OnInit {

  consultId: string;
  consult: Appointment;
  role;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private userService: UserService,
    private auth: AuthService
    ) {
      this.role = this.auth.userRole;
    }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.consultId = param['consultId'];
        this.firestoreService.getValue(this.consultId, 'appointments').subscribe((consult: Appointment) => {
          this.consult = consult;

          console.log('consulta es: ', this.consult);

        });
      }
    );
  }

  goBack() {
    this.router.navigate(['../../', 'medical-record'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  getUser(id): any {
    const user = this.userService.userList.find(user => user.id === id);
    return user;
  }

  getUserName(id): string {
    return this.getUser(id).name;
  }

}
