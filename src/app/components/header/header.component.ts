import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    if (this.currentUser.type === 'patient'){
      this.router.navigate(['/patient', this.currentUser.user]);
    } else if (this.currentUser.type === 'dentist') {
      this.router.navigate(['/dentist', this.currentUser.user]);
    } else if (this.currentUser.type === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event){
  //   console.log('Holis');
  // }

}
