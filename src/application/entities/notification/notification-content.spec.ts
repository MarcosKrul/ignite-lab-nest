import { NotificationContent } from './notification-content';

describe('Notification content', () => {
  test('it should be able to create a notification content', () => {
    const notificationContent = new NotificationContent(
      'Você recebeu um novo pedido de amizade.',
    );

    expect(notificationContent).toBeTruthy();
  });

  test('it should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new NotificationContent('Voc')).toThrow();
  });

  test('it should not be able to create a notification content with more than 255 characters', () => {
    expect(() => new NotificationContent('V'.repeat(256))).toThrow();
  });
});
