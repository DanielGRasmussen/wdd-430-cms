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
		this.http.get<Document[]>("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/documents.json")
			.subscribe(documents => {
				this.documents = documents;
				this.maxDocumentId = this.getMaxId();
				this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
				this.documentListChangedEvent.next(this.documents.slice());
			}, (error: any) => {
				console.log(error);
			});
		return this.documents.slice();
	}

	storeDocuments() {
		const documents = JSON.stringify(this.documents);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		this.http.put("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/documents.json", documents, { headers: headers })
			.subscribe(() => {
				this.documentListChangedEvent.next(this.documents.slice());
			});
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

		this.storeDocuments();
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

		this.storeDocuments();
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

		this.storeDocuments();
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
