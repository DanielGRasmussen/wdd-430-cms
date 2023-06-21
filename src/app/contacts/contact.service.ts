import { Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
	contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
	maxContactId: number;

	contacts: Contact[] =[];
	constructor(private http: HttpClient) {
		this.contacts = this.fetchContacts();
		this.maxContactId = this.getMaxId();
	}

	fetchContacts() {
		this.http.get<{ contacts: Contact[] }>("http://localhost:3000/contacts")
			.subscribe(contacts => {
				this.contacts = contacts.contacts;
				this.maxContactId = this.getMaxId();
				this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
				this.contactListChangedEvent.next(this.contacts.slice());
			}, (error: any) => {
				console.log(error);
			});
		return this.contacts.slice();
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

		const headers = new HttpHeaders({"Content-Type": "application/json"});

		// add to database
		this.http.post<{ contact: Contact }>("http://localhost:3000/contacts",
			newContact, { headers: headers })
			.subscribe(
				(responseData) => {
					// add new contact to contacts
					this.contacts.push(responseData.contact);
					this.contactListChangedEvent.next(this.contacts.slice());
				}
			);
	}

	updateContact(originalContact: Contact, newContact: Contact) {
		if (!originalContact || !newContact) {
			return;
		}

		const pos: number = this.contacts.indexOf(originalContact);
		if (pos < 0) {
			return;
		}

		// set the id of the new Contact to the id of the old Contact
		newContact.id = originalContact.id;

		const headers = new HttpHeaders({"Content-Type": "application/json"});

		// update database
		this.http.put("http://localhost:3000/contacts/" + originalContact.id,
			newContact, { headers: headers })
			.subscribe(
				() => {
					this.contacts[pos] = newContact;
					this.contactListChangedEvent.next(this.contacts.slice());
				}
			);
	}

	deleteContact(contact: Contact): void {
		if (!contact) {
			return;
		}
		const pos: number = this.contacts.indexOf(contact);
		if (pos < 0) {
			return;
		}

		// delete from database
		this.http.delete("http://localhost:3000/contacts/" + contact.id)
			.subscribe(
				() => {
					this.contacts.splice(pos, 1);
					this.contactListChangedEvent.next(this.contacts.slice());
				}
			);
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
