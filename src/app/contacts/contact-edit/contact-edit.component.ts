import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact.model";
import { NgForm } from "@angular/forms";
import { ContactService } from "../contact.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
	selector: "cms-contact-edit",
	templateUrl: "./contact-edit.component.html",
	styleUrls: ["./contact-edit.component.css"]
})
export class ContactEditComponent implements OnInit {
	originalContact!: Contact;
	contact: Contact = new Contact("", "", "", "", "", null);
	groupContacts: Contact[] = [];
	editMode: boolean = false;
	errorMessage: string = "";
	id!: string;

	constructor(
		private contactService: ContactService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = params["id"];
			if (!this.id) {
				this.editMode = false;
				return;
			}

			const original = this.contactService.getContact(this.id);
			if (!original) {
				return;
			}
			this.originalContact = original;

			this.editMode = true;
			this.contact = JSON.parse(JSON.stringify(this.originalContact));

			if (this.contact.group) {
				this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
			}
		});
	}

	onSubmit(form: NgForm) {
		const values = form.value;
		const newContact = new Contact("", values.name, values.email, values.phone, values.imageUrl, this.groupContacts);
		if (this.editMode) {
			this.contactService.updateContact(this.originalContact, newContact);
		} else {
			this.contactService.addContact(newContact);
		}
		this.router.navigate(["/contacts"]);
	}

	onCancel() {
		this.router.navigate(["/contacts"]);
	}

	isInvalidContact(newContact: Contact) {
		if (!newContact) {// newContact has no value
			return true;
		}
		if (this.contact && newContact.id === this.contact.id) {
			return true;
		}
		for (let i = 0; i < this.groupContacts.length; i++){
			if (newContact.id === this.groupContacts[i].id) {
				return true;
			}
		}
		return false;
	}

	addToGroup($event: any) {
		const selectedContact: Contact = $event.dragData;
		const invalidGroupContact = this.isInvalidContact(selectedContact);

		this.errorMessage = "";
		if (invalidGroupContact) {
			this.errorMessage = "Contact can not be added to the group. It is already in the group or is the current contact";
			return;
		}
		this.groupContacts.push(selectedContact);
	}

	onRemoveItem(index: number) {
		if (index < 0 || index >= this.groupContacts.length) {
			return;
		}
		this.groupContacts.splice(index, 1);
	}
}
