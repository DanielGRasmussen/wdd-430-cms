import { Component, OnInit } from "@angular/core";
import { Contact } from '../contact.model';
import { ContactService } from "../contact.service";

@Component({
	selector: 'cms-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	contacts: Contact[];

	constructor(private contactService: ContactService) {
		this.contacts = [];
		this.contactService.contactChangedEvent.subscribe((updatedContacts: Contact[]) => {
			this.contacts = updatedContacts;
		});
	}

	ngOnInit(): void {
		this.contacts = this.contactService.getContacts();
	}
}
