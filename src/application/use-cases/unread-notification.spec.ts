import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  test('it should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notificationToUnread = makeNotification({
      readAt: new Date(),
    });

    notificationsRepository.create(notificationToUnread);

    await unreadNotification.execute({
      notificationId: notificationToUnread.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  test('it should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'this id does not exist in db',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
