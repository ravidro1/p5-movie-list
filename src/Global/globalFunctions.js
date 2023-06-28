export const formatTime = (date) => {
  return Intl.DateTimeFormat("he-IL").format(new Date(date));
};
