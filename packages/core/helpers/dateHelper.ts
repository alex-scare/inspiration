import { format, addDays, isToday, isTomorrow, isYesterday } from 'date-fns';

export const dateHelper = {
  dateFormat: 'yyyy-MM-dd',

  getDateName(date: Date) {
    return format(date, this.dateFormat);
  },

  addDaysToDateName(dateName: string, count: number) {
    const date = new Date(dateName);
    return this.getDateName(addDays(date, count));
  },

  getNextDateName(dateName: string) {
    return this.addDaysToDateName(dateName, 1);
  },

  getPrevDateName(dateName: string) {
    return this.addDaysToDateName(dateName, -1);
  },

  getDateNameLabel(dateName: string) {
    const date = new Date(dateName);
    if (isToday(date)) return 'today';
    if (isYesterday(date)) return 'yesterday';
    if (isTomorrow(date)) return 'tomorrow';
    return dateName;
  },
};
