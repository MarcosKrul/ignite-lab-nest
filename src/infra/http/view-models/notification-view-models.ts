import { Notification } from '@application/entities/notification/notification';

export class NotificationViewModel {
  static toHTTP({ id, content, category, recipientId }: Notification) {
    return {
      id,
      category,
      recipientId,
      content: content.value,
    };
  }
}
