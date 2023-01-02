import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from './prisma.service';
import { PrismaNotificationMapper } from './mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return PrismaNotificationMapper.toDomain(raw);
  }

  async save(notification: Notification): Promise<void> {
    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async countManyByRecipientId(id: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId: id },
    });

    return count;
  }

  async findManyByRecipientId(id: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId: id },
    });

    return notifications.map((item) => PrismaNotificationMapper.toDomain(item));
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }
}
