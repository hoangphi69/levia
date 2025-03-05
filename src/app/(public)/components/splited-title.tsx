export default function SplitedTitle({
  text,
  line1ClassName,
  line2ClassName,
  defaultClassName,
  inline = true,
}: {
  text: string;
  line1ClassName?: string;
  line2ClassName?: string;
  defaultClassName?: string;
  inline?: boolean;
}) {
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
}
