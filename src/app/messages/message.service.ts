import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
	messageChangeEvent = new EventEmitter<Message[]>();
	messages: Message[] =[];
	constructor() {
		this.messages = MOCKMESSAGES;
	}

	getMessages() {
		return this.messages.slice();
	}

	getMessage(id: string) {
		return this.messages.find(message => message.id === id) || null;
	}

	addMessage(message: Message) {
		this.messages.push(message);
		this.messageChangeEvent.emit(this.messages.slice());
	}
}
