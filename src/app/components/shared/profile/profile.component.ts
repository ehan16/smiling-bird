import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode = false;
  currentUser: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  onEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.router.navigate(['edit'], {relativeTo: this.route});
    } else {
      // this.router.navigate(['../'], {relativeTo: this.route});
      this.router.navigate([this.currentUser.type, this.currentUser.user, 'profile']);
    }

  }

  logOut() {
  this.auth.signOut();
  this.userService.currentUser = null;
  }

}
