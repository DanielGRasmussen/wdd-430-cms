import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
	selector: 'cms-documents-list',
	templateUrl: './documents-list.component.html',
	styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {
	@Output() selectedDocumentEvent = new EventEmitter<Document>();

	documents: Document[] = [
		new Document("1", "Document 1", "Description of document 1", "http://document1.com", null),
		new Document("2", "Document 2", "Description of document 2", "http://document2.com", null),
		new Document("3", "Document 3", "Description of document 3", "http://document3.com", null),
		new Document("4", "Document 4", "Description of document 4", "http://document4.com", null),
		new Document("5", "Document 5", "Description of document 5", "http://document5.com", null)
	];

	onSelectedDocument(document: Document) {
		this.selectedDocumentEvent.emit(document);
	}
}
