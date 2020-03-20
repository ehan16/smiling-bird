import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  consultForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.consultForm = new FormGroup({
      date: new FormControl('', [Validators.required,this.invalidDate.bind(this)]),
      hour: new FormControl('', [Validators.required, Validators.min(8), Validators.max(16)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      treatments: new FormArray([])
    });

  }

  onEdit() {

  }

  onDelete(index) {

  }

  onAdd() {

  }

  onUpload(event: Event) {

  }

  invalidDate(control: FormControl): { [s: string]: boolean } {
    const date = control.value.year + '-' + control.value.month + '-' + control.value.day;
    const newDate = new Date(date);
    const day = newDate.getDay(); // Returns 6 if Sat and 0 if Sun
    if (day === 6 || day === 0) {
      return { invalidDate: true };
    } else {
      return null;
    }
  }

}
