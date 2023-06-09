import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './documents/documents-item/documents-item.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { DocumentsEditComponent } from './documents/documents-edit/documents-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { FormsModule } from "@angular/forms";
import { DndModule } from "ng2-dnd";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    DocumentsDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentsEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
	imports: [
		BrowserModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		AppRoutingModule,
		FormsModule,
		DndModule.forRoot(),
		HttpClientModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
