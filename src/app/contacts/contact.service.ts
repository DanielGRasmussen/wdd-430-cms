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
		this.http.get<Contact[]>("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/contacts.json")
			.subscribe(contacts => {
				this.contacts = contacts;
				this.maxContactId = this.getMaxId();
				this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
				this.contactListChangedEvent.next(this.contacts.slice());
			}, (error: any) => {
				console.log(error);
			});
		return this.contacts.slice();
	}

	storeContacts() {
		const contacts = JSON.stringify(this.contacts);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		this.http.put("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/contacts.json", contacts, { headers: headers })
			.subscribe(() => {
				this.contactListChangedEvent.next(this.contacts.slice());
			});
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

		this.storeContacts();
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

		this.storeContacts();
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

		this.storeContacts();
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
