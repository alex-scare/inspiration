import { ScheduleStore } from '@app/core';

jest.mock('../createStore', () => ({
  createStore: jest.fn().mockReturnValue({ useStore: undefined, Provider: undefined }),
}));

describe('test schedule store', () => {
  const emptyDay = { countForSuccess: 3, goals: {} };
  const emptyDayName = '2022-02-02';

  const scheduleStore = new ScheduleStore({ [emptyDayName]: { ...emptyDay } });

  it('getDay should return existing day', () => {
    const day = scheduleStore.getDay(emptyDayName);
    expect(day.countForSuccess).toBe(emptyDay.countForSuccess);
    expect(Object.keys(day.goals).length).toBe(Object.keys(emptyDay.goals).length);
  });

  it('getDay should return created day', () => {
    const dayName = '2022-02-03';
    expect(dayName in scheduleStore.schedule).toBeFalsy();

    const day = scheduleStore.getDay('2022-02-03');

    expect(day).toBeTruthy();
    expect(dayName in scheduleStore.schedule).toBeTruthy();

    expect(Object.keys(scheduleStore.schedule).length).toBe(2);
  });
});
