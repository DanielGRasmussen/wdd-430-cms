import { EventEmitter, Injectable } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";

@Injectable({
	providedIn: "root"
})
export class DocumentService {
	documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
	documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();

	documents: Document[] = [];

	constructor() {
		this.documents = MOCKDOCUMENTS;
	}

	getDocuments() {
		return this.documents.slice();
	}

	getDocument(id: string) {
		return this.documents.find(document => document.id === id) || null;
	}

	deleteDocument(document: Document): void {
		if (!document) {
			return;
		}
		const pos = this.documents.indexOf(document);
		if (pos < 0) {
			return;
		}
		this.documents.splice(pos, 1);
		this.documentChangedEvent.emit(this.documents.slice());
	}
}
