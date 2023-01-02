import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const hasNotification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!hasNotification) throw new NotificationNotFound();

    hasNotification.unread();

    await this.notificationsRepository.save(hasNotification);
  }
}
