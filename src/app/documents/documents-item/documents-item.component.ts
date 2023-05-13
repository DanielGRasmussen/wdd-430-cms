import { Component, Input } from "@angular/core";
import { Document } from "../document.model";

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent {
	@Input() document!: Document;
}
