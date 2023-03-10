import { Notification } from '../entities/notification/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(id: string): Promise<number>;
  abstract findManyByRecipientId(id: string): Promise<Notification[]>;
}
