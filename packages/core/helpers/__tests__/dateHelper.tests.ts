import { dateHelper } from '../dateHelper';

describe('test dateHelper', () => {
  it('test getDateName', () => {
    const date = new Date(2022, 11, 1);
    const formattedDate = dateHelper.getDateName(date);
    expect(formattedDate).toBe('2022-12-01');
  });
});
