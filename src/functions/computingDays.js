
// export const startOfWeek = (date) => {
//     const day = date.getDay();
//     const diff = date.getDate() - day;
//     return new Date(date.setDate(diff));
//   };

//   export const addDays = (date, days) => {
//     console.log(new Date(date.getTime() + days * 86400000))
//     return new Date(date.getTime() + days * 86400000);
//   };

//   export const formatDate = (date) => {
//     return {displayedDate: date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     }),
//     date: date
//   };
//   };

// export const renderDays = () => {
//     let days = [];
//     let startDate;
//     if (view === 'week') {
//       startDate = startOfWeek(currentDate);
//       for (let i = 0; i < 7; i++) {
//         days.push(formatDate(addDays(startDate, i)));
//       }
//     } else if (view === 'day') {
//       days.push(formatDate(currentDate));
//     }
//     return days;
//   };