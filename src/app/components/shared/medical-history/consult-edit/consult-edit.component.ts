import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  consultForm: FormGroup;
  treatments: FormArray;

  constructor(private formBuilder: FormBuilder, private appService: AppointmentService) { }

  ngOnInit() {

    // this.consultForm = new FormGroup({
    //   date: new FormControl('', [Validators.required,this.invalidDate.bind(this)]),
    //   hour: new FormControl('', [Validators.required, Validators.min(8), Validators.max(16)]),
    //   price: new FormControl('', [Validators.required, Validators.min(1)]),
    //   description: new FormControl('', Validators.required),
    //   treatments: new FormArray([])
    // });
    this.consultForm = this.formBuilder.group({
      date: ['', [Validators.required, this.invalidDate.bind(this)]],
      hour: ['', [Validators.required, Validators.min(1)]],
      treatments: this.formBuilder.array([this.createTreatment()])
    });

  }

  onEdit() {
    console.log(this.consultForm);
  }

  onDelete(index) {
    (this.consultForm.get('ingredients') as FormArray).removeAt(index);
  }

  createTreatment(): FormGroup {
    return this.formBuilder.group({
      description: '',
      price: ''
    });
  }

   onAdd() {
     console.log('Ya');
     (this.consultForm.get('treatments') as FormArray).push(
       new FormGroup({
         description: new FormControl('', Validators.required),
         price: new FormControl(0, [Validators.required, Validators.min(1)]),
     })
    );
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
