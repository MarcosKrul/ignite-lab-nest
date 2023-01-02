import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification/notification';
import { NotificationContent } from '../entities/notification/notification-content';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    category,
    content,
    recipientId,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      category,
      recipientId,
      content: new NotificationContent(content),
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
