import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentAccounts } from 'src/app/models/payment-accounts.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User;
  dentistExtra: PaymentAccounts;
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 100, this.todayDate.getMonth(), this.todayDate.getDate());
  start = 8;
  end = 16;
  paypal = true;
  zelle = true;

  constructor(
    private userService: UserService,
    private firestore: FirestoreService,
    private auth: AuthService,
    private formBuilder: FormBuilder
    ) {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);
    this.start = this.currentUser.shift[0];
    this.end = this.currentUser.shift[1];

    if (this.currentUser.type === 'dentist') {
      this.firestore.get(this.auth.id, 'dentist-extra').subscribe(
        (accounts) => {
          this.dentistExtra = {
            zelle: accounts.data().zelle,
            paypal: accounts.data().zelle,
            bankAccounts: accounts.data().bankAccounts
          };

          console.log(this.dentistExtra);
          this.paypal = this.dentistExtra.paypal;
          this.zelle = this.dentistExtra.zelle;

        }
      );
    }

    console.log('start ', this.start, 'end ', this.end);
  }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      name: [this.currentUser.name, Validators.required],
      identification: [this.currentUser.identification, Validators.required],
      birthDate: [this.currentUser.birth , Validators.required],
      gender: [this.currentUser.gender, Validators.required],
      start: [this.start, [Validators.required, this.invalidHour.bind(this)]],
      end: [this.end, [Validators.required, this.invalidHour.bind(this)]],
      bankAccounts: this.formBuilder.array([]),
      paypal: this.paypal,
      zelle: this.zelle,
    });

    // if (this.currentUser.type === 'dentist') {
    //   this.editForm.get('bankAccounts').patchValue(this.dentistExtra.bankAccounts);
    // }

    // this.editForm = new FormGroup({
    //   name: new FormControl(this.currentUser.name, Validators.required),
    //   identification: new FormControl(this.currentUser.identification, Validators.required),
    //   birthDate: new FormControl(this.currentUser.birth , Validators.required),
    //   gender: new FormControl(this.currentUser.gender, Validators.required),
    //   start: new FormControl(this.start, [Validators.required, this.invalidHour.bind(this), Validators.max(this.maxHour)]),
    //   end: new FormControl(this.end, [Validators.required, this.invalidHour.bind(this), Validators.min(this.minHour)]),
    // });

  }

  createBankAccount() {
    const bankAccount = (this.editForm.get('bankAccounts') as FormArray);
    bankAccount.push(this.formBuilder.group({
      bank: ['', Validators.required],
      account: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  deleteBankAccount(index) {
    (this.editForm.get('bankAccounts') as FormArray).removeAt(index);
  }

  get BankAccounts() {
    return this.editForm.get('bankAccounts') as FormArray;
  }

  onEdit() {

    if (this.editForm.value.end > this.editForm.value.start) {
      console.log(this.editForm);
      const yea = this.editForm.value.birthDate.year;
      const mont = this.editForm.value.birthDate.month;
      const da = this.editForm.value.birthDate.day;
      const user = {
        name: this.editForm.value.name,
        identification: this.editForm.value.identification,
        user: this.currentUser.user,
        gender: this.editForm.value.gender,
        type: this.currentUser.type,
        birth: {
          year: yea,
          month: mont,
          day: da
        },
        shift: [this.editForm.value.start, this.editForm.value.end],
        enable: this.currentUser.enable,
        debt: this.currentUser.debt,
        comission: this.currentUser.comission
      };
      this.firestore.setValue(this.auth.getCurrentUID(), user, 'users');
      this.editForm.reset();
    } else {
      window.alert('ACCIÓN INVÁLIDA: la hora de salida es mayor que la hora de entrada');
    }

  }

  invalidHour(control: FormControl): { [s: string]: boolean } {
    if (control.value < 8 || 16 < control.value) {
      return { invalidHour: true };
    } else {
      return null;
    }
  }

}
