import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  logged = true;
  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
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

}
