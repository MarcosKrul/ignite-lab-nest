import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const hasNotification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!hasNotification) throw new NotificationNotFound();

    hasNotification.cancel();

    await this.notificationsRepository.save(hasNotification);
  }
}
