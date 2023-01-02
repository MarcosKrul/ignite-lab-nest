import { randomUUID } from 'node:crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  test('it should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    notificationsRepository.create(makeNotification({ recipientId }));
    notificationsRepository.create(makeNotification({ recipientId }));
    notificationsRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(2);
    expect(notificationsRepository.notifications.length).toEqual(3);
  });
});
