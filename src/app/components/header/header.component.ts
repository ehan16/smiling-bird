import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "../../model/user.model";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import * as firebase from "firebase";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  notLogged = false;
  show = false;
  subscription: Subscription;

  toggleCollapse() {
    this.show = !this.show;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    protected auth: AuthService
  ) {
    this.subscription = this.userService.changedUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  goToHome() {
    if (this.auth.isAuthenticated) {
      if (this.currentUser.type === "patient") {
        this.router.navigate(["/patient", this.currentUser.identification]);
      } else if (this.currentUser.type === "dentist") {
        this.router.navigate(["/dentist", this.currentUser.identification]);
      } else if (this.currentUser.type === "admin") {
        this.router.navigate(["/admin"]);
      }
    } else {
      this.router.navigate(["/home"]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
