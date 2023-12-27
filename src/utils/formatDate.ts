export const getCurrentDateFormatted = (currentDate: Date): string => {
  const date = new Date(currentDate);
  const year = date.getFullYear().toString().substring(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
};
