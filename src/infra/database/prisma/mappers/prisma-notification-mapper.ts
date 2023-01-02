import { Notification } from '@application/entities/notification/notification';
import { NotificationContent } from '@application/entities/notification/notification-content';
import { Notification as RawNotification } from '@prisma/client';
export class PrismaNotificationMapper {
  static toPrisma({
    category,
    content,
    createdAt,
    id,
    readAt,
    recipientId,
  }: Notification) {
    return {
      id,
      category,
      content: content.value,
      recipientId,
      readAt,
      createdAt,
    };
  }

  static toDomain({
    category,
    content,
    createdAt,
    id,
    readAt,
    recipientId,
    canceledAt,
  }: RawNotification): Notification {
    return new Notification(
      {
        category,
        createdAt,
        content: new NotificationContent(content),
        recipientId,
        canceledAt,
        readAt,
      },
      id,
    );
  }
}
