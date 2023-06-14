import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
	messageChangeEvent = new EventEmitter<Message[]>();
	messages: Message[] =[];
	maxMessageId: number;

	constructor(private http: HttpClient) {
		this.fetchMessages();
		this.maxMessageId = this.getMaxId();
	}

	fetchMessages() {
		this.http.get<Message[]>("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/messages.json")
			.subscribe(messages => {
				this.messages = messages;
				this.maxMessageId = this.getMaxId();
				this.messages.sort((a, b) => a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0);
				this.messageChangeEvent.next(this.messages.slice());
			}, (error: any) => {
				console.log(error);
			});
		return this.messages.slice();
	}

	storeMessages() {
		const messages = JSON.stringify(this.messages);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		this.http.put("https://cms-wdd430-7af89-default-rtdb.firebaseio.com/messages.json", messages, { headers: headers })
			.subscribe(() => {
				this.messageChangeEvent.next(this.messages.slice());
			});
	}

	getMessages() {
		return this.messages.slice();
	}

	getMessage(id: string) {
		return this.messages.find(message => message.id === id) || null;
	}

	addMessage(message: Message) {
		this.messages.push(message);

		this.storeMessages();
	}

	getMaxId(): number {
		let maxId: number = 0;

		for (const message of this.messages) {
			const currentId: number = Number(message.id);
			if (currentId > maxId) {
				maxId = currentId;
			}
		}

		return maxId;
	}
}
