import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
	contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
	contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
	
	contacts: Contact[] =[];
	constructor() {
		this.contacts = MOCKCONTACTS;
	}

	getContacts() {
		return this.contacts.slice();
	}

	getContact(id: string) {
		return this.contacts.find(contact => contact.id === id) || null;
	}

	deleteContact(contact: Contact): void {
		if (!contact) {
			return;
		}
		const pos = this.contacts.indexOf(contact);
		if (pos < 0) {
			return;
		}
		this.contacts.splice(pos, 1);
		this.contactChangedEvent.emit(this.contacts.slice());
	}
}
