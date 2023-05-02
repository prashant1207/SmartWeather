import {cityRegex} from './utils';

describe('cityRegex', () => {
  it('should match valid city names', () => {
    expect(cityRegex.test('New York')).toBe(true);
    expect(cityRegex.test('Los Angeles')).toBe(true);
    expect(cityRegex.test('San Francisco')).toBe(true);
    expect(cityRegex.test('Rio de Janeiro')).toBe(true);
    expect(cityRegex.test('São Paulo')).toBe(true);
    expect(cityRegex.test('Paris')).toBe(true);
    expect(cityRegex.test('London')).toBe(true);
    expect(cityRegex.test('Sydney')).toBe(true);
    expect(cityRegex.test('Tokyo')).toBe(true);
    expect(cityRegex.test('Beijing')).toBe(true);
  });

  it('should not match invalid city names', () => {
    expect(cityRegex.test('123')).toBe(false);
    expect(cityRegex.test('New York!')).toBe(false);
    expect(cityRegex.test('@@   @@')).toBe(false);
    expect(cityRegex.test('    ')).toBe(false);
    expect(cityRegex.test('???')).toBe(false);
  });
});
