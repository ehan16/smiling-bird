import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  newMessageForm: FormGroup;
  patientId;
  patient: User;
  savedMessages = [];
  selectedMessage = 'Bienvenida';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.patientId = param['patientId'];
      this.firestoreService
        .getValue(this.patientId, 'users')
        .subscribe((user: User) => {
          this.patient = user;
        });
    });

    this.firestoreService.getAll('messages').subscribe( data => {
      this.savedMessages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    });

    this.messageForm = new FormGroup({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      pre: new FormControl('')
    });

    this.newMessageForm = new FormGroup({
      newTitle: new FormControl('', [Validators.required, this.titleExist.bind(this)]),
      newMessage: new FormControl('', [Validators.required, this.messageExist.bind(this)])
    });

  }

  onSubmit() {
    let data = {
      title: this.messageForm.value.title,
      message: this.messageForm.value.message,
      email: this.patient.user
    };

    this.firestoreService.create(data, 'alreadymadeemail');

  }

  createMessage() {
    const newMessage = {
      title: this.newMessageForm.value.newTitle,
      message: this.newMessageForm.value.newMessage
    };
    this.firestoreService.create(newMessage, 'messages');
  }

  changedMessage(event: any) {
    this.selectedMessage = event.target.value;
  }

  selectMessage() {
    console.log(this.messageForm.value.pre);
    const selectedMessage = this.savedMessages.filter(message => message.title === this.selectedMessage);
    console.log(selectedMessage);
    this.messageForm.get('title').patchValue(selectedMessage[0].title);
    this.messageForm.get('message').patchValue(selectedMessage[0].message);
  }

  titleExist(control: FormControl): { [s: string]: boolean } {
    const exist = this.savedMessages.filter(message => message.title === control.value);
    if (exist.length >= 1) {
      return { titleExist: true };
    } else {
      return null;
    }
  }

  messageExist(control: FormControl): { [s: string]: boolean } {
    const exist = this.savedMessages.filter(message => message.message === control.value);
    if (exist.length >= 1) {
      return { messageExist: true };
    } else {
      return null;
    }
  }

}
