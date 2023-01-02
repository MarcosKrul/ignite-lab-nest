import { randomUUID } from 'node:crypto';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification/notification';
import { NotificationContent } from '@application/entities/notification/notification-content';

export function makeNotification(override: Partial<NotificationProps> = {}) {
  return new Notification({
    recipientId: randomUUID(),
    category: 'social',
    content: new NotificationContent('Novo pedido de amizade.'),
    ...override,
  });
}
