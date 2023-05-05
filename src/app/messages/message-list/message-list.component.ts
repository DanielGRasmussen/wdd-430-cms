import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message("1", "Subject 1", "Message 1", "Sender 1"),
    new Message("2", "Subject 2", "Message 2", "Sender 2"),
    new Message("3", "Subject 3", "Message 3", "Sender 3")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
