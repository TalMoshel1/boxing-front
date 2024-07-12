export function repeatEndDate(startDate, monthsToAdd) {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + monthsToAdd);

  console.log('date: ', date)
  return date.toString();
}
