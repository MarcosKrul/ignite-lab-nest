import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(
    @Body() { category, content, recipientId }: CreateNotificationBody,
  ) {
    const response = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return response;
  }
}
