import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(
    @Body() { category, content, recipientId }: CreateNotificationBody,
  ) {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        category,
        recipientId,
        content,
      },
    });
  }
}
