import {device, by, element, waitFor} from 'detox';

describe('Home Screen Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('location list should be visible', async () => {
    await expect(element(by.id('location-list'))).toBeVisible();
  });

  it('adds a city to the list', async () => {
    const cityName = 'London';
    const addCityButton = await element(by.id('add-city-button'));
    await expect(addCityButton).toBeVisible();
    await addCityButton.tap();
    await element(by.type('_UIAlertControllerTextField')).typeText(cityName);
    await element(by.text('OK')).tap();
    await expect(element(by.text(cityName))).toBeVisible();
  });

  it('fails to add invalid city', async () => {
    const cityName = '@@@QQWEQWE@@   @@@!#!@#QD';
    const addCityButton = await element(by.id('add-city-button'));
    await expect(addCityButton).toBeVisible();
    await addCityButton.tap();
    await element(by.type('_UIAlertControllerTextField')).typeText(cityName);
    await element(by.text('OK')).tap();
    await expect(element(by.text('Error'))).toBeVisible();
    await element(by.text('OK')).tap();
    await expect(element(by.text(cityName))).not.toBeVisible();
  });

  it('changes the unit', async () => {
    const unitButton = await element(by.id('unit-switch'));
    await unitButton.tap();
    waitFor(element(by.text('°F')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
