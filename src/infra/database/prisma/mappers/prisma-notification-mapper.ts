import { Notification } from '@application/entities/notification/notification';

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
}
