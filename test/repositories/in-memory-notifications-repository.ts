import { Notification } from '@application/entities/notification/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notificaton = this.notifications.find((item) => item.id === id);

    return notificaton ?? null;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0)
      this.notifications[notificationIndex] = notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
