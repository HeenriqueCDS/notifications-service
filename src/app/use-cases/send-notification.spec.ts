import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

let notificationsRepository: InMemoryNotificationsRepository;

describe('Send notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'default',
      content: 'Hello World',
      recipientId: 'example-recipent-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
