import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  consultForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onEdit() {

  }

}
