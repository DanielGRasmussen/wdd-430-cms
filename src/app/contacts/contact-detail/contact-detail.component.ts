import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  @Input() contact!: Contact;

  constructor() {
    this.contact = new Contact(
      "",//"1",
      "",//"R. Kent Jackson",
      "",//"jacksonk@byui.edu",
      "",//"208-496-3771",
      "",//"../../assets/images/jacksonk.jpg",
      null
    );
  }
}
