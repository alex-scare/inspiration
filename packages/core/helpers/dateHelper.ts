import { format } from 'date-fns';

export const dateHelper = {
  dateFormat: 'yyyy-MM-dd',

  getDateName(date: Date) {
    return format(date, this.dateFormat);
  },
};
