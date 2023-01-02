import { randomUUID } from 'node:crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  test('it should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    notificationsRepository.create(makeNotification({ recipientId }));
    notificationsRepository.create(makeNotification({ recipientId }));
    notificationsRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notificationsRepository.notifications.length).toEqual(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
