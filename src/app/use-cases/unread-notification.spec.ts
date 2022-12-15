import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

let notificationsRepository: InMemoryNotificationsRepository;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should be able to unread a notification', async () => {
    const unUnreadUnreadNotification = new UnreadNotification(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unUnreadUnreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', async () => {
    expect(async () => {
      const unUnreadUnreadNotification = new UnreadNotification(
        notificationsRepository,
      );

      await unUnreadUnreadNotification.execute({
        notificationId: 'non-existing-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
