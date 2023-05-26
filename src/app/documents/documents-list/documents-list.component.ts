import { Component, OnInit } from "@angular/core";
import { Document } from '../document.model';
import { DocumentService } from "../document.service";

@Component({
	selector: 'cms-documents-list',
	templateUrl: './documents-list.component.html',
	styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
	documents: Document[] = [];

	constructor(private documentService: DocumentService) {
		this.documents = [];
		this.documentService.documentChangedEvent.subscribe((updatedDocuments: Document[]) => {
			this.documents = updatedDocuments;
		});
	}

	ngOnInit(): void {
		this.documents = this.documentService.getDocuments();
	}
}
