import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Document } from "../document.model";
import { DocumentService } from "../document.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
	selector: "app-documents-edit",
	templateUrl: "./documents-edit.component.html",
	styleUrls: ["./documents-edit.component.css"]
})
export class DocumentsEditComponent implements OnInit {
	originalDocument!: Document;
	document: Document = new Document("", "", "", "", null)
	editMode: boolean = false;

	constructor(
		private documentService: DocumentService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			const id = params["id"];
			if (!id) {
				this.editMode = false;
				return;
			}
			const original = this.documentService.getDocument(id);
			if (!original) return;

			this.originalDocument = original;
			this.editMode = true;
			this.document = JSON.parse(JSON.stringify(this.originalDocument));
		});
	}

	onSubmit(form: NgForm) {
		const values = form.value;
		const newDocument = new Document(
			this.document.id,
			values.name,
			values.description,
			values.url,
			null
		);

		if (this.editMode) {
			this.documentService.updateDocument(this.originalDocument, newDocument);
		} else {
			this.documentService.addDocument(newDocument);
		}

		this.router.navigate(["/documents"]);
	}

	onCancel() {
		this.router.navigate(["/documents"]);
	}
}
