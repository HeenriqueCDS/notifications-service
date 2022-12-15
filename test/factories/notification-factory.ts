import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

const makeNotification = (override: Override = {}) => {
  return new Notification({
    recipientId: 'example-recipient-id',
    content: new Content('Good bye world! (that sounds a bit dark)'),
    category: 'default',
    ...override,
  });
};

export { makeNotification };
