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

export { SplitedTitle };
