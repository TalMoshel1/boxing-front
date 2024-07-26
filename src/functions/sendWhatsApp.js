export function openWhatsApp(lesson, phone) {
    const trainersPhone = ['0544541145', '0502323574']
    let encodedMessage
    let message
    let formattedNumber = `972${phone.substring(1)}`;

    if (trainersPhone.includes(phone)) {
      message = `
      מתאמן: ${lesson.studentName}
      יום: ${new Date(lesson.day).getDate()}/${new Date(lesson.day).getMonth()}/${new Date(lesson.day).getFullYear()}
      בשעות:  ${lesson.startTime} - ${lesson.endTime}

      לאישור האימון לחץ:
      https://boxing-front.onrender.com/approveLink/${lesson._id}
      `
    } else {
      message = `
      היי ${lesson.studentName}
      האימון נקבע ליום: ${new Date(lesson.day).getDate()}/${new Date(lesson.day).getMonth()}/${new Date(lesson.day).getFullYear()}
      בשעות: ${lesson.startTime} - ${lesson.endTime}
      עם המאמן: ${lesson.trainer}
      `

    }

    encodedMessage = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }