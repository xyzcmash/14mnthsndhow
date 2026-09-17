export const START_DATE = new Date('2025-07-18T00:00:00');
export const HER_NAME = 'Ashu';
export const HIS_WHATSAPP = '918977039397';

export function getElapsed() {
  const now = new Date();
  const diffMs = now - START_DATE;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let months = (now.getFullYear() - START_DATE.getFullYear()) * 12 + (now.getMonth() - START_DATE.getMonth());
  if (now.getDate() < START_DATE.getDate()) months -= 1;

  return { months, days, hours, minutes, seconds };
}
