import { randomUUID } from 'node:crypto';
import { Notification } from '@application/entities/notification/notification';
import { NotificationContent } from '@application/entities/notification/notification-content';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  test('it should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    notificationsRepository.create(
      new Notification({
        recipientId,
        category: 'social',
        content: new NotificationContent('Novo pedido de amizade.'),
      }),
    );

    notificationsRepository.create(
      new Notification({
        recipientId,
        category: 'social',
        content: new NotificationContent('Novo pedido de amizade.'),
      }),
    );

    notificationsRepository.create(
      new Notification({
        recipientId: randomUUID(),
        category: 'social',
        content: new NotificationContent('Novo pedido de amizade.'),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(2);
    expect(notificationsRepository.notifications.length).toEqual(3);
  });
});
