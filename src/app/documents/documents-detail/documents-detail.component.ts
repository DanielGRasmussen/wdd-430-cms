import { Component, OnInit } from "@angular/core";
import { Document } from "../document.model";
import { DocumentService } from "../document.service";
import { ActivatedRoute, Router } from "@angular/router";
import { WindRefService } from "../../wind-ref.service";

@Component({
	selector: "cms-documents-detail",
	templateUrl: "./documents-detail.component.html",
	styleUrls: ["./documents-detail.component.css"]
})
export class DocumentsDetailComponent implements OnInit {
	document!: Document;
	nativeWindow: any; // Define the nativeWindow property

	constructor(
		private documentService: DocumentService,
		private route: ActivatedRoute,
		private router: Router,
		private windRefService: WindRefService
	) {
		this.nativeWindow = this.windRefService.getNativeWindow();
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const id = params["id"];
			const document = this.documentService.getDocument(id);
			if (document) {
				this.document = document;
			}
		});
	}

	onView(): void {
		this.nativeWindow.open(this.document.url);
	}

	onDelete(): void {
		this.documentService.deleteDocument(this.document);
		this.router.navigate(["/documents"]);
	}
}
