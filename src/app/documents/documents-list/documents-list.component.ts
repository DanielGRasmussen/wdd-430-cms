import { Component, OnInit, OnDestroy } from "@angular/core";
import { Document } from '../document.model';
import { DocumentService } from "../document.service";
import { Subscription } from "rxjs";

@Component({
	selector: 'cms-documents-list',
	templateUrl: './documents-list.component.html',
	styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit, OnDestroy {
	documents: Document[] = [];
	subscription!: Subscription;

	constructor(private documentService: DocumentService) {
		this.documents = [];
	}

	ngOnInit(): void {
		this.documents = this.documentService.getDocuments();
		this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
			this.documents = documentsList;
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
