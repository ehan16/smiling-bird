import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  editMode = false;
  currentUser: User;
  // subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    // this.subscription = this.userService.startedEditing.subscribe(
    //   (id: number) => {
    //     this.editMode = true;
    //     console.log(id);
    //   }
    // );
    this.currentUser = this.userService.currentUser;
  }

  onEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.router.navigate([this.currentUser.type, this.currentUser.user, 'profile', 'edit']);
    } else {
      this.router.navigate([this.currentUser.type, this.currentUser.user, 'profile']);
      // this.router.navigate(['..'], {relativeTo: this.route});
    }

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
