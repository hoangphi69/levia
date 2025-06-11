function formattedPrice(price: number | null | undefined) {
  if (!price) return 'N/A';

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  });
}

function formattedRelativeTime(date: Date): string {
  // This function is modified based on a StackOverflow answer
  // For more information please refer to: https://stackoverflow.com/a/53800501/28699807

  const units: { [key: string]: number } = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });

  const elapsed = date.getTime() - Date.now();

  for (const unit in units) {
    if (
      Object.prototype.hasOwnProperty.call(units, unit) &&
      (Math.abs(elapsed) > units[unit] || unit === 'second')
    ) {
      return rtf.format(
        Math.round(elapsed / units[unit]),
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return ''; // Fallback if no match (this is unlikely to occur).
}

function formattedDate(
  date: Date | undefined,
  separator: string = '.'
): string {
  if (!date) return 'N/A';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}

export { formattedPrice, formattedRelativeTime, formattedDate };
