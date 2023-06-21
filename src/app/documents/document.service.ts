import { EventEmitter, Injectable } from "@angular/core";
import { Document } from "./document.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class DocumentService {
	documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
	documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
	maxDocumentId: number;

	documents: Document[] = [];

	constructor(private http: HttpClient) {
		this.fetchDocuments();
		this.maxDocumentId = this.getMaxId();
	}

	fetchDocuments() {
		this.http.get<{ documents: Document[] }>("http://localhost:3000/documents")
			.subscribe(documents => {
				this.documents = documents.documents;
				this.maxDocumentId = this.getMaxId();
				this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
				this.documentListChangedEvent.next(this.documents.slice());
			}, (error: any) => {
				console.log(error);
			});
		return this.documents.slice();
	}

	getDocuments() {
		return this.documents.slice();
	}

	getDocument(id: string) {
		return this.documents.find(document => document.id === id) || null;
	}

	addDocument(document: Document) {
		if (!document) {
			return;
		}

		const headers = new HttpHeaders({"Content-Type": "application/json"});

		// add to database
		this.http.post<{ document: Document }>("http://localhost:3000/documents",
			document, { headers: headers })
			.subscribe(
				(responseData) => {
					// add new document to documents
					this.documents.push(responseData.document);
					this.documentListChangedEvent.next(this.documents.slice());
				}
			);
	}

	updateDocument(originalDocument: Document, newDocument: Document) {
		if (!originalDocument || !newDocument) {
			return;
		}

		const pos = this.documents.findIndex(d => d.id === originalDocument.id);
		if (pos < 0) {
			return;
		}

		// set the id of the new Document to the id of the old Document
		newDocument.id = originalDocument.id;

		const headers = new HttpHeaders({"Content-Type": "application/json"});

		// update database
		this.http.put("http://localhost:3000/documents/" + originalDocument.id,
			newDocument, { headers: headers })
			.subscribe(
				() => {
					this.documents[pos] = newDocument;
					this.documentListChangedEvent.next(this.documents.slice());
				}
			);
	}


	deleteDocument(document: Document) {
		if (!document) {
			return;
		}

		const pos = this.documents.findIndex(d => d.id === document.id);
		if (pos < 0) {
			return;
		}

		// delete from database
		this.http.delete("http://localhost:3000/documents/" + document.id)
			.subscribe(
				() => {
					this.documents.splice(pos, 1);
					this.documentListChangedEvent.next(this.documents.slice());
				}
			);
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
