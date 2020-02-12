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
  @ViewChild('stickyNav', {static: true}) stickyNav: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    // scrollFunction();
    console.log('scrolling');
  }

  // function scrollFunction(): {
  //   if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
  //     stickyNav.style.top = "0";
  //   } else {
  //     stickyNav.style.top = "-45px";
  //   }
  // }

  /*
  $window.onscroll = function(){
    scrollFunction();
    console.log('asdas');
 }
 */
/*
 function scrollFunction(){
    var sn = document.getElementById("sticky_nav");
       if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
          sn.style.top = "0";
       }
       else{
          sn.style.top = "-45px";
       }
 }

 function openMenu(){
   document.getElementById("thisMenu").classList.toggle("show_menu");
   document.getElementById("btnMenu").getElementsByTagName("i")[0].classList.toggle("hidden");
   document.getElementById("btnMenu").getElementsByTagName("i")[1].classList.toggle("visible");
  }
  */

}
