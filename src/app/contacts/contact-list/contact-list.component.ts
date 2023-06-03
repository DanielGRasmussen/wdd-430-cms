import { Component, OnInit, OnDestroy } from "@angular/core";
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import { Subscription } from "rxjs";

@Component({
	selector: "cms-contact-list",
	templateUrl: "./contact-list.component.html",
	styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit, OnDestroy {
	contacts: Contact[];
	subscription!: Subscription;

	constructor(private contactService: ContactService) {
		this.contacts = [];
	}

	ngOnInit(): void {
		this.contacts = this.contactService.getContacts();
		this.subscription = this.contactService.contactListChangedEvent.subscribe((updatedContacts: Contact[]) => {
			this.contacts = updatedContacts;
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
