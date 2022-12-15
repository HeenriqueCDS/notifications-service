import { Content } from './content';

describe('Notification content', () => {
  it('should able to create a notifcation content', async () => {
    const content = new Content('Hello World');

    expect(content.value).toBeTruthy();
  });

  it('should not be able to create a notifcation content with less than 5 characters', async () => {
    expect(() => new Content('Nope')).toThrow();
  });

  it('should not be able to create a notifcation content with more than 240 characters', async () => {
    expect(() => new Content('Nope'.repeat(61))).toThrow();
  });
});
