import { EventEmitter, Injectable } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class DocumentService {
	documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
	documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
	maxDocumentId: number;

	documents: Document[] = [];

	constructor() {
		this.documents = MOCKDOCUMENTS;
		this.maxDocumentId = this.getMaxId();
	}

	getDocuments() {
		return this.documents.slice();
	}

	getDocument(id: string) {
		return this.documents.find(document => document.id === id) || null;
	}

	addDocument(newDocument: Document) {
		if (!newDocument) {
			return;
		}

		this.maxDocumentId++;
		newDocument.id = this.maxDocumentId.toString();
		this.documents.push(newDocument);

		const documentsListClone = this.documents.slice();
		this.documentListChangedEvent.next(documentsListClone);
	}

	updateDocument(originalDocument: Document, newDocument: Document) {
		if (!originalDocument || !newDocument) {
			return;
		}

		const pos: number = this.documents.indexOf(originalDocument);
		if (pos < 0) {
			return;
		}

		newDocument.id = originalDocument.id;
		this.documents[pos] = newDocument;

		const documentsListClone = this.documents.slice();
		this.documentListChangedEvent.next(documentsListClone);
	}

	deleteDocument(document: Document): void {
		if (!document) {
			return;
		}
		const pos: number = this.documents.indexOf(document);
		if (pos < 0) {
			return;
		}
		this.documents.splice(pos, 1);

		const documentsListClone = this.documents.slice();
		this.documentListChangedEvent.next(documentsListClone);
	}

	getMaxId(): number {
		let maxId: number = 0;

		for (const document of this.documents) {
			const currentId: number = Number(document.id);
			if (currentId > maxId) {
				maxId = currentId;
			}
		}

		return maxId;
	}
}
