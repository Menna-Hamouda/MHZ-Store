import { Component,inject,effect } from '@angular/core';
import { NotificationService } from '../../../core/services/notification-service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private notificationService = inject(NotificationService);

  message = this.notificationService.getMessage();

  constructor() {

    effect((onCleanup) => {

      const currentMessage = this.message();

      if (!currentMessage) {
        return;
      }

      const timer = setTimeout(() => {
        this.notificationService.clear();
      }, 3000);

      onCleanup(() => {
        clearTimeout(timer);
      });

    });

  }
  close(): void {
  this.notificationService.clear();
}

}
