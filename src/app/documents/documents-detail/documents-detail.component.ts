import { Component, Input } from "@angular/core";
import { Document } from "../document.model";

@Component({
  selector: 'cms-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.css']
})
export class DocumentsDetailComponent {
	@Input() document!: Document;
}
