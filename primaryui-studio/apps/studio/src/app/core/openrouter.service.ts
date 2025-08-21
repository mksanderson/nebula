import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage { role: 'system' | 'user' | 'assistant'; content: string; }

@Injectable({ providedIn: 'root' })
export class OpenRouterService {
  constructor(private http: HttpClient) {}

  chat(model: string, messages: ChatMessage[], jsonSchema?: any): Observable<any> {
    return this.http.post('/ai/chat', { model, messages, jsonSchema });
  }
}
