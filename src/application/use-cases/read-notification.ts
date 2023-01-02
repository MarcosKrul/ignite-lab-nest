import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const hasNotification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!hasNotification) throw new NotificationNotFound();

    hasNotification.read();

    await this.notificationsRepository.save(hasNotification);
  }
}
