import {device, by, element} from 'detox';

const cityName = 'Oslo';

describe('Detail Screen Test', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('it adds oslo on the location list', async () => {
    const addCityButton = await element(by.id('add-city-button'));
    await expect(addCityButton).toBeVisible();
    await addCityButton.tap();
    await element(by.type('_UIAlertControllerTextField')).typeText(cityName);
    await element(by.text('OK')).tap();
  });

  it('goes to detail page', async () => {
    await expect(element(by.text(cityName))).toBeVisible();
    await element(by.text(cityName)).tap();
  });
});
