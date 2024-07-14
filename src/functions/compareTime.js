// export function compareDates(isoDateStr, customDateStr) {
//     // Parse the ISO 8601 date string
//     const isoDate = new Date(isoDateStr);
  
//     // Parse the custom date string
//     const customDate = new Date(Date.parse(customDateStr));
  
//     // Extract year, month, and date components
//     const isoYear = isoDate.getUTCFullYear();
//     const isoMonth = isoDate.getUTCMonth(); // Note: getUTCMonth() returns month index starting from 0 (January is 0)
//     const isoDay = isoDate.getUTCDate();
  
//     const customYear = customDate.getUTCFullYear();
//     const customMonth = customDate.getUTCMonth();
//     const customDay = customDate.getUTCDate();
  
//     // Compare the components
//     console.log(isoYear === customYear && isoMonth === customMonth && isoDay === customDay)
//     return isoYear === customYear && isoMonth === customMonth && isoDay === customDay;
//   }

export const compareDates = (date1, date2) => {
  // Convert both dates to Date objects if they are not already
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Normalize the dates to remove the time part by setting the hours to zero
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  // Compare the year, month, and day
  return d1.getTime() === d2.getTime();
};