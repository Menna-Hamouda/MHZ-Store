import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
    private message = signal<string>('');

  getMessage() {
    return this.message.asReadonly();
  }

  showSuccess(message: string): void {
    this.message.set(message);
  }

  clear(): void {
    this.message.set('');
  }
  
}
