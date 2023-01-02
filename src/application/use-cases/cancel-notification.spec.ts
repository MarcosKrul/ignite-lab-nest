import { Notification } from '@application/entities/notification/notification';
import { NotificationContent } from '@application/entities/notification/notification-content';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'node:crypto';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  test('it should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepository);

    const notificationToCancel = new Notification({
      category: 'social',
      recipientId: randomUUID(),
      content: new NotificationContent('Novo pedido de amizade.'),
    });

    notificationsRepository.create(notificationToCancel);

    await cancelNotification.execute({
      notificationId: notificationToCancel.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'this id does not exist in db',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
