import dayjs from 'dayjs';
import locale_de from 'dayjs/locale/de.js';
import locale_es from 'dayjs/locale/es.js';

/** Converts the given date string to ISO8610 format. */
export const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => dayjs(date).format(format);
export const formatDateDE = (date, format) => dayjs(date).locale(locale_de).format(format);
export const formatDateES = (date, format) => dayjs(date).locale(locale_es).format(format);
