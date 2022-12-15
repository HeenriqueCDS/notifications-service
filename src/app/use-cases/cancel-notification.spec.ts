import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

let notificationsRepository: InMemoryNotificationsRepository;

describe('Cancel notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should be able to cancel a notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(async () => {
      const cancelNotification = new CancelNotification(
        notificationsRepository,
      );

      await cancelNotification.execute({ notificationId: 'non-existing-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
