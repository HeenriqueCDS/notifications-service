import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { GetRecipientNotifications } from './get-recipient-notifications';

let notificationsRepository: InMemoryNotificationsRepository;

describe('Get recipient notifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
  });

  it('should able to get recipients notifications', async () => {
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = 'example-recipient-id';

    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(
      makeNotification({ recipientId: 'another-recipient-id' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
