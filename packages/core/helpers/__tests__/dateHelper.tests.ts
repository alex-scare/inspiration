import { dateHelper } from '../dateHelper';

describe('test dateHelper', () => {
  const date = new Date(2022, 11, 1);

  it('test getDateName', () => {
    const formattedDate = dateHelper.getDateName(date);
    expect(formattedDate).toBe('2022-12-01');
  });

  it('test getNextDateName', () => {
    let testDayName = dateHelper.getNextDateName('2022-11-01');
    expect(testDayName).toBe('2022-11-02');

    testDayName = dateHelper.getNextDateName('2022-11-30');
    expect(testDayName).toBe('2022-12-01');

    testDayName = dateHelper.getNextDateName('2022-12-31');
    expect(testDayName).toBe('2023-01-01');
  });

  it('test getPrevDateName', () => {
    let testDayName = dateHelper.getPrevDateName('2022-11-01');
    expect(testDayName).toBe('2022-10-31');

    testDayName = dateHelper.getPrevDateName('2022-11-30');
    expect(testDayName).toBe('2022-11-29');

    testDayName = dateHelper.getPrevDateName('2023-01-01');
    expect(testDayName).toBe('2022-12-31');
  });
});
