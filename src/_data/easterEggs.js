const madridDateParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  month: '2-digit',
  day: '2-digit'
}).formatToParts(new Date());

const month = Number(madridDateParts.find(part => part.type === 'month')?.value);
const day = Number(madridDateParts.find(part => part.type === 'day')?.value);

export const nakedCssDay = month === 4 && day === 9;
export const nakedJsDay = month === 4 && day === 24;
