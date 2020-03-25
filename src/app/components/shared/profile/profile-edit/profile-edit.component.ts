import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
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
  maxDate: NgbDate = new NgbDate(
    this.todayDate.getFullYear(),
    this.todayDate.getMonth() + 1,
    this.todayDate.getDate()
  );
  minDate: NgbDate = new NgbDate(
    this.todayDate.getFullYear() - 100,
    this.todayDate.getMonth(),
    this.todayDate.getDate()
  );
  start = 8;
  end = 16;
  paypal = new FormControl(true);
  zelle = new FormControl(true);
  banksArray = new FormArray([]);

  constructor(
    private userService: UserService,
    private firestore: FirestoreService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);

    if (this.currentUser.type === 'dentist') {

      this.start = this.currentUser.shift[0];
      this.end = this.currentUser.shift[1];

      this.firestore.get(this.auth.id, 'dentist-extra').subscribe(accounts => {
        this.dentistExtra = {
          zelle: accounts.data().zelle,
          paypal: accounts.data().paypal,
          bankAccounts: accounts.data().bankAccounts
        };

        console.log(this.dentistExtra);
        this.paypal.setValue(this.dentistExtra.paypal);
        this.zelle.setValue(this.dentistExtra.zelle);

        const bankAccounts = this.dentistExtra.bankAccounts;
        if (bankAccounts) {
          for (let bankAccount of bankAccounts) {
            this.banksArray.push(
              new FormGroup({
                bank: new FormControl(bankAccount.bank, Validators.required),
                account: new FormControl(
                  bankAccount.account,
                  Validators.required
                )
              })
            );
          }
        }
      });
    }

    console.log('start ', this.start, 'end ', this.end);
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [this.currentUser.name, Validators.required],
      identification: [this.currentUser.identification, Validators.required],
      birthDate: [this.currentUser.birth, Validators.required],
      gender: [this.currentUser.gender, Validators.required],
      start: [this.start, [Validators.required, this.invalidHour.bind(this)]],
      end: [this.end, [Validators.required, this.invalidHour.bind(this)]],
      bankAccounts: this.banksArray,
      paypal: this.paypal,
      zelle: this.zelle
    });

  }

  createBankAccount() {
    const bankAccount = this.editForm.get('bankAccounts') as FormArray;
    bankAccount.push(
      this.formBuilder.group({
        bank: ['', Validators.required],
        account: ['', [Validators.required, Validators.min(0)]]
      })
    );
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
      const user = {
        name: this.editForm.value.name,
        identification: this.editForm.value.identification,
        user: this.currentUser.user,
        gender: this.editForm.value.gender,
        type: this.currentUser.type,
        birth: {
          year: this.editForm.value.birthDate.year,
          month: this.editForm.value.birthDate.month,
          day: this.editForm.value.birthDate.day
        },
        shift: [this.editForm.value.start, this.editForm.value.end],
        enable: this.currentUser.enable,
        debt: this.currentUser.debt,
        comission: this.currentUser.comission
      };
      this.firestore.setValue(this.auth.id, user, 'users');

      if (this.currentUser.type === 'dentist') {
        const dentistExtra = {
          paypal: this.editForm.value.paypal,
          zelle: this.editForm.value.zelle,
          bankAccounts: this.editForm.value.bankAccounts
        };
        this.firestore.setValue(this.auth.id, dentistExtra, 'dentist-extra');
      }

    } else {
      window.alert(
        'ACCIÓN INVÁLIDA: la hora de entrada es mayor o igual que la hora de salida'
      );
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
