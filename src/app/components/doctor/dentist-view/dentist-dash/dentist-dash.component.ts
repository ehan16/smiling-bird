import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dentist-dash',
  templateUrl: './dentist-dash.component.html',
  styleUrls: ['./dentist-dash.component.css']
})
export class DentistDashComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
