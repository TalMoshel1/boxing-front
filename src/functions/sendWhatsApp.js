export function openWhatsApp(lesson, phone) {
  console.log('Lesson:', lesson);
  console.log('Phone:', phone);
  const trainersPhone = ['0544541145', '0502323574'];
  let encodedMessage;
  let message;
  let formattedNumber = `972${phone.substring(1)}`;

  if (trainersPhone.includes(phone)) {
    message = `
    מתאמן: ${lesson.studentName}
    יום: ${new Date(lesson.day).getDate()}/${new Date(lesson.day).getMonth()+1}/${new Date(lesson.day).getFullYear()}
    בשעות: ${lesson.endTime} - ${lesson.startTime}

    לאישור האימון לחץ:
    https://boxing-front.onrender.com/approveLink/${lesson._id}
    `;
  } else {
    message = `
    היי ${lesson.studentName}
    האימון נקבע ליום: ${new Date(lesson.day).getDate()}/${new Date(lesson.day).getMonth()+1}/${new Date(lesson.day).getFullYear()}
    בשעות: ${lesson.startTime} - ${lesson.endTime}
    עם המאמן: ${lesson.trainer}
    `;
  }

  console.log('Message before encoding:', message);
  encodedMessage = encodeURIComponent(message);
  console.log('Encoded Message:', encodedMessage);

  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  console.log('WhatsApp URL:', whatsappUrl);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
      window.open(whatsappUrl, '_blank');
  } else {
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;
      window.open(whatsappWebUrl, '_blank');
  }
}
