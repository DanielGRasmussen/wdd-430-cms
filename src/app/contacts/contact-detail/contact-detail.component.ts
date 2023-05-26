import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";

@Component({
	selector: "cms-contact-detail",
	templateUrl: "./contact-detail.component.html",
	styleUrls: ["./contact-detail.component.css"]
})
export class ContactDetailComponent implements OnInit {
	contact: Contact;

	constructor(
		private contactService: ContactService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.contact = new Contact("", "", "", "", "", null);
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const id = params["id"];
			const contact = this.contactService.getContact(id);
			if (contact) { this.contact = contact }
		});
	}

	onDelete(): void {
		this.contactService.deleteContact(this.contact);
		this.router.navigate(["/contacts"]);
	}
}
