import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from "../message.model";
import { MessageService } from "../message.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild("subject") subjectRef!: ElementRef;
  @ViewChild("message") msgTextRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Daniel Rasmussen";

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    console.log(subjectValue, msgTextValue);
    const newMessage = new Message(
      "1",
      subjectValue,
      msgTextValue,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
