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

	onSelectedDocument(document: Document) {
		this.documentService.documentSelectedEvent.emit(document);
	}

	constructor(private documentService: DocumentService) {
		this.documents = [];
	}

	ngOnInit(): void {
		this.documents = this.documentService.getDocuments();
	}
}
