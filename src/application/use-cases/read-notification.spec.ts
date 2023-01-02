import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  test('it should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(notificationsRepository);

    const notificationToRead = makeNotification();

    notificationsRepository.create(notificationToRead);

    await readNotification.execute({
      notificationId: notificationToRead.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'this id does not exist in db',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
