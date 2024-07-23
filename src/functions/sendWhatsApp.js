export function openWhatsApp(lesson) {

    console.log(lesson)
    const  phoneNumber = '0522233573'
    // const formattedNumber = `972${phoneNumber.substring(1)}`;
    const formattedNumber = `972522233573`;
    const message = `
    http://localhost:3001/approveLink/${lesson._id}
    `
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }