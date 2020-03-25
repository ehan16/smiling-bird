import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { User } from 'src/app/models/user.model';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  allowedExtensions = ['png', 'jpg', 'jpeg'];
  consultForm: FormGroup;
  treatments = new FormArray([]);
  oldPrice: number;
  consult: Appointment;
  patient: User;
  recipeExist = false;


  filePath = [];
  fileUrl = [];
  ref = [];
  percentage = [];
  finished = [];
  uploadProgress = [];
  files = [];
  task = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private fireStorageService: FirebaseStorageService) { }

  ngOnInit() {

    this.consultForm = this.formBuilder.group({
      treatments: this.treatments
    });

    this.route.params.subscribe(
      (param: Params) => {
        let appointmentId = param['consultId'];
        this.firestoreService.getValue(appointmentId, 'appointments').subscribe((appointment: Appointment) => {
          this.consult = appointment;
          console.log('La consulta es ', this.consult);
        });

        let patientId = param['patientId'];
        this.firestoreService.getValue(patientId, 'users').subscribe((patient: User) => {
          this.patient = patient;
          console.log('El paciente es ', this.patient);
        });
      }
    );

  }

  onEdit() {
    console.log(this.consultForm);
  }

  onDelete(index) {
    (this.consultForm.get('treatments') as FormArray).removeAt(index);
  }

  createTreatment() {
    const treatments = this.consultForm.get('treatments') as FormArray;

    treatments.push(
      this.formBuilder.group({
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        image: [null, []]
      })
    );

  }

  get Treatments() {
    return this.consultForm.get('treatments') as FormArray;
  }

  onFileChange(event, i: number) {
    console.log(event);
    this.files[i] = event.target.files[0];
    this.filePath[i] = this.files[i].name;
    this.ref[i] = this.fireStorageService.referenceCloudStorage(this.filePath[i]);
    this.task[i] = this.ref[i].put(this.files[i]);
    this.uploadProgress[i] = this.task[i].percentageChanges();
    this.fileUrl[i] = this.task[i].downloadURL();
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

  addRecipe() {
    this.consultForm.addControl('recipe', new FormControl(''));
    this.recipeExist = true;
  }

  onDeleteRecipe() {
    this.consultForm.removeControl('recipe');
    this.recipeExist = false;
  }

}
