import { randomUUID } from 'node:crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should able to create a notifcation content', async () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('Hello World'),
      category: 'default',
    });

    expect(notification).toBeTruthy();
  });
});
