import React from 'react';

interface TwoLineTitleProps {
  text: string; // The input string that may contain '\n'
  line1ClassName?: string; // Optional Tailwind classes for the first line
  line2ClassName?: string; // Optional Tailwind classes for the second line
  defaultClassName?: string; // Optional default Tailwind classes for both lines
  inline?: boolean;
}

const SplitedTitle: React.FC<TwoLineTitleProps> = ({
  text,
  line1ClassName,
  line2ClassName,
  defaultClassName,
  inline = true,
}) => {
  // Split the text on the first '\n' occurrence or treat it as a single-line title
  const [first, second] = text.split('\n');

  return (
    <>
      <span className={`${defaultClassName ?? ''} ${line1ClassName ?? ''}`}>
        {first}
      </span>
      {inline ? ' ' : <br />}
      {second && (
        <span className={`${defaultClassName ?? ''} ${line2ClassName ?? ''}`}>
          {second}
        </span>
      )}
    </>
  );
};

function formattedPrice(price: number | null | undefined) {
  if (!price) return 'N/A';

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  });
}

// This function is modified based on a StackOverflow answer
// For more information please refer to: https://stackoverflow.com/a/53800501/28699807
function formattedRelativeTime(date: Date): string {
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

function formattedDate(date: Date | undefined): string {
  if (!date) return 'N/A';

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export { SplitedTitle, formattedPrice, formattedRelativeTime, formattedDate };
