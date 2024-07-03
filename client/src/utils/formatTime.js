import {
  formatDistanceToNow,
  parseISO,
  differenceInDays,
  format,
} from "date-fns";

export const formatTime = (dateString) => {
  const date = parseISO(dateString);
  const now = new Date();

  const daysDifference = differenceInDays(now, date);

  if (daysDifference > 3) {
    return format(date, "yyyy-MM-dd");
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
