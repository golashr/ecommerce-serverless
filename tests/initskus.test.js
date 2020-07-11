import * as handler from '../src/handlers/initSKUs';
import * as handler from '../mocks/initskus-event.json';
import { calculateCost } from '../libs/billing-lib';

test('initSKUs', async () => {
  const event = 'event';
  const context = 'context';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
  };

  await handler.main(event, context, callback);
});
