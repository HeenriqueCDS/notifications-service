import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

let notificationsRepository: InMemoryNotificationsRepository;

describe('Count notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should able to count recipients notifications', async () => {
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = 'example-recipient-id';

    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(
      makeNotification({ recipientId: 'another-recipient-id' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });
    count;

    expect(count).toEqual(2);
  });
});
