import { randomUUID } from 'node:crypto';
import { Notification } from './notification';
import { NotificationContent } from './notification-content';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      category: 'social',
      recipientId: randomUUID(),
      content: new NotificationContent('Nova solicitação'),
    });

    expect(notification).toBeTruthy();
  });
});
