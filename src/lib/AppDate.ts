import { DateTime, DurationLikeObject } from 'luxon';

export const AppDate = {
  getRelative: (date: string): string => {
    return DateTime.fromISO(date).toRelative() as string;
  },
  getAbsolute: (date: string): string => {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  },
  getFromNowDiffAs: (date: string, diffType: keyof DurationLikeObject): number => {
    const duration = DateTime.fromJSDate(new Date()).diff(DateTime.fromISO(date));
    const diff = duration.as(diffType);

    return diff;
  },
  getMedDate: (date: string) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED),
};
