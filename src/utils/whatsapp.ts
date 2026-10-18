/**
 * WhatsApp integration utility for Traver Pakistan
 */

// Default verified agency WhatsApp contact number (format: country code without + or spaces)
export const DEFAULT_WHATSAPP_NUMBER = '923008594210'; // Traver Pakistan Tour Desk

export function getAgencyWhatsAppNumber(): string {
  const custom = localStorage.getItem('traver_agency_whatsapp');
  if (custom && /^\d{10,15}$/.test(custom)) {
    return custom;
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function setAgencyWhatsAppNumber(phone: string): void {
  // Strip non-digits
  const clean = phone.replace(/\D/g, '');
  if (/^\d{10,15}$/.test(clean)) {
    localStorage.setItem('traver_agency_whatsapp', clean);
  }
}

export interface WhatsAppMessageParams {
  tourTitle: string;
  destination: string;
  departureDate?: string;
  travellerCount?: number;
  pricePerPerson?: number;
  totalPrice?: number;
  tourSlug?: string;
  enquiryId?: string;
  travellerName?: string;
}

export function formatWhatsAppMessage(params: WhatsAppMessageParams): string {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://traver.pk';
  const tourUrl = params.tourSlug ? `${currentOrigin}/#tour-${params.tourSlug}` : currentOrigin;

  let message = `Hello! I am interested in booking the following tour package.\n\n`;
  message += `Tour: ${params.tourTitle}\n`;
  message += `Destination: ${params.destination}\n`;
  
  if (params.departureDate) {
    message += `Departure Date: ${params.departureDate}\n`;
  }
  
  if (params.travellerCount) {
    message += `Number of Travellers: ${params.travellerCount} Person(s)\n`;
  }
  
  if (params.pricePerPerson) {
    message += `Price per Person: PKR ${params.pricePerPerson.toLocaleString()}\n`;
  }

  if (params.totalPrice) {
    message += `Estimated Total: PKR ${params.totalPrice.toLocaleString()}\n`;
  }

  if (params.enquiryId) {
    message += `Enquiry Reference: #${params.enquiryId.slice(0, 8).toUpperCase()}\n`;
  }

  if (params.travellerName) {
    message += `Traveller Name: ${params.travellerName}\n`;
  }

  message += `Tour Details: ${tourUrl}\n\n`;
  message += `Please share availability, the final total cost, and booking instructions.\n\n`;
  message += `Thank you!`;

  return message;
}

export function generateWhatsAppUrl(params: WhatsAppMessageParams, customNumber?: string): string {
  const phone = customNumber ? customNumber.replace(/\D/g, '') : getAgencyWhatsAppNumber();
  const message = formatWhatsAppMessage(params);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(params: WhatsAppMessageParams, customNumber?: string): void {
  const url = generateWhatsAppUrl(params, customNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openGeneralWhatsAppInquiry(topic: string = 'General Inquiry'): void {
  const phone = getAgencyWhatsAppNumber();
  const text = encodeURIComponent(
    `Hello Traver Pakistan! I have an inquiry regarding: ${topic}.\nCould you please connect me with a tour advisor?\n\nThank you!`
  );
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
}
