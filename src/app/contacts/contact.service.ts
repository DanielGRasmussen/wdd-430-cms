import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactService {
	contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
	maxContactId: number;

	contacts: Contact[] =[];
	constructor() {
		this.contacts = MOCKCONTACTS;
		this.maxContactId = this.getMaxId();
	}

	getContacts() {
		return this.contacts.slice();
	}

	getContact(id: string) {
		return this.contacts.find(contact => contact.id === id) || null;
	}

	addContact(newContact: Contact) {
		if (!newContact) {
			return;
		}

		this.maxContactId++;
		newContact.id = this.maxContactId.toString();
		this.contacts.push(newContact);

		const contactsListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactsListClone);
	}

	updateContact(originalContact: Contact, newContact: Contact) {
		if (!originalContact || !newContact) {
			return;
		}

		const pos: number = this.contacts.indexOf(originalContact);
		if (pos < 0) {
			return;
		}

		newContact.id = originalContact.id;
		this.contacts[pos] = newContact;

		const contactsListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactsListClone);
	}

	deleteContact(contact: Contact): void {
		if (!contact) {
			return;
		}
		const pos: number = this.contacts.indexOf(contact);
		if (pos < 0) {
			return;
		}
		this.contacts.splice(pos, 1);

		const contactsListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactsListClone);
	}

	getMaxId(): number {
		let maxId: number = 0;

		for (const contact of this.contacts) {
			const currentId: number = Number(contact.id);
			if (currentId > maxId) {
				maxId = currentId;
			}
		}

		return maxId;
	}
}
