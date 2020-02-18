import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../model/user.model';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User = new User('Test', 'test', 'Robert');
  logged = true;

  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  constructor() { }

  ngOnInit() {
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event){
  //   console.log('Holis');
  // }

}
