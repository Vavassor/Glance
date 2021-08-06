interface TimeDivision {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const divisions: TimeDivision[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const getSecondsAgo = (startDate: Date, endDate: Date) => {
  return Math.floor((startDate.getTime() - endDate.getTime()) / 1000);
};

export const formatDate = (date: Date, locale: string) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    month: "long",
    second: "numeric",
    year: "numeric",
  });
  return dateTimeFormat.format(date);
};

export const formatTimeAgo = (
  startDate: Date,
  endDate: Date,
  format: Intl.RelativeTimeFormat
) => {
  let unitsAgo = getSecondsAgo(startDate, endDate);
  for (const division of divisions) {
    if (Math.abs(unitsAgo) < division.amount) {
      return format.format(Math.round(unitsAgo), division.unit);
    }
    unitsAgo /= division.amount;
  }
  const division = divisions[divisions.length - 1];
  return format.format(Math.round(unitsAgo), division.unit);
};

export const getDateInSeconds = (date: Date, seconds: number) => {
  return new Date(date.getTime() + 1000 * seconds);
};

export const getTime = (date: Date, locale: string) => {
  const relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    style: "long",
  });
  return formatTimeAgo(date, new Date(), relativeTimeFormat);
};

export const isAfterDate = (startDate?: Date | null, endDate?: Date | null) => {
  return !!startDate && !!endDate
    ? startDate.getTime() - endDate.getTime() > 0
    : false;
};
