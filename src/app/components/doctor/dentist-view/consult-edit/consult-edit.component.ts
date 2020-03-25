import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { User } from 'src/app/models/user.model';
import { finalize } from 'rxjs/operators';
import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  consultForm: FormGroup;
  treatments = new FormArray([]);
  oldPrice: number = 0;
  consult: Appointment;
  consultId: string;
  patient: User;
  patientId: string;
  recipeExist = false;

  filePath = [];
  ref = [];
  task = [];
  uploadProgress = [];
  fileUrl: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private fireStorageService: FirebaseStorageService) { }

  ngOnInit() {

    this.consultForm = this.formBuilder.group({
      treatments: this.treatments
    });

    this.route.params.subscribe(
      (param: Params) => {

        this.consultId = param['consultId'];
        this.firestoreService.getValue(this.consultId, 'appointments').subscribe((appointment: Appointment) => {
          this.consult = appointment;
          console.log('La consulta es ', this.consult);

          const actualTreatments = this.consult.treatments;
          if (actualTreatments) {
            actualTreatments.forEach(treatment => {
              this.oldPrice = this.oldPrice + treatment.price;
              this.treatments.push(
                new FormGroup({
                  description: new FormControl(treatment.description, Validators.required),
                  price: new FormControl(treatment.price, [Validators.required, Validators.min(0)]),
                  file: new FormControl(null),
                  fileName: new FormControl(treatment.fileName),
                  image: new FormControl(treatment.image)
                })
              );
            });
          }

        });

        this.patientId = param['patientId'];
        this.firestoreService.getValue(this.patientId, 'users').subscribe((patient: User) => {
          this.patient = patient;
          console.log('El paciente es ', this.patient);
        });
      }
    );

  }

  onEdit() {

    let newRecipe = '';
    if (this.recipeExist) {
      newRecipe = this.consultForm.value.recipe;
    }

    let newTreatments: Treatment[] = [];
    if (this.Treatments) {
      newTreatments = this.consultForm.value.treatments;
      this.calculateTotal(newTreatments);
    }

    const consult = {
      date: this.consult.date,
      hour: this.consult.hour,
      patient: this.consult.patient,
      dentist: this.consult.dentist,
      completed: this.consult.completed,
      accepted: this.consult.accepted,
      recipe: newRecipe,
      treatments: newTreatments
    };

    this.firestoreService.setValue(this.consultId, consult, 'appointments');

  }

  onDelete(index) {
    (this.consultForm.get('treatments') as FormArray).removeAt(index);
    this.filePath.splice(index, 1);
    this.ref.splice(index, 1);
    this.task.splice(index, 1);
    this.fileUrl.splice(index, 1);
    this.uploadProgress.splice(index, 1);
  }

  createTreatment() {

    this.Treatments.push(
      this.formBuilder.group({
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        file: null,
        fileName: '',
        image: ''
      })
    );

  }

  get Treatments() {
    return this.consultForm.get('treatments') as FormArray;
  }

  onFileChange(event, i: number) {

    let treatmentsControl = this.Treatments.at(i);

    this.filePath[i] = event.target.files[0].name;

    treatmentsControl.get('fileName').patchValue(event.target.files[0].name);

    this.ref[i] = this.fireStorageService.referenceCloudStorage(this.filePath[i]);
    this.task[i] = this.fireStorageService.uploadCloudStorage(this.filePath[i], event.target.files[0]);
    this.uploadProgress[i] = this.task[i].percentageChanges();

    this.task[i].snapshotChanges().pipe(
      finalize( () => this.fileUrl[i] = this.ref[i].getDownloadURL() )).subscribe( data => {
        console.log(data);
        this.ref[i].getDownloadURL().subscribe( url => {
          this.fileUrl[i] = url;
          treatmentsControl.get('image').patchValue(url);
        });
      });

  }

  addRecipe() {
    this.consultForm.addControl('recipe', new FormControl(''));
    this.recipeExist = true;
  }

  onDeleteRecipe() {
    this.consultForm.removeControl('recipe');
    this.recipeExist = false;
  }

  calculateTotal(treatments: Treatment[]) {
    let total = this.patient.debt;
    treatments.forEach(treatment => {
      total = total + treatment.price;
    });
    total = total - this.oldPrice;
    this.firestoreService.update(this.patientId, {debt: total} , 'users');
  }

}
