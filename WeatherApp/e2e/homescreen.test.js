import {device, by, element} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('setting button should be visible', async () => {
    await expect(element(by.id('title-text'))).toBeVisible();
  });
});
