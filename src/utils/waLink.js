import { HIS_WHATSAPP } from './relationship';

export function buildWaLink({ text }) {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${HIS_WHATSAPP}?text=${encoded}`;
}

export function sendToWhatsApp({ text }) {
  const url = buildWaLink({ text });
  window.open(url, '_blank', 'noopener,noreferrer');
}
