export default function SectionTitle({
  title1,
  title2,
  subtitle,
}: {
  title1: string | '';
  title2: string | '';
  subtitle: string;
}) {
  return (
    <div className="flex justify-between">
      <h2 className="font-script text-6xl leading-3">
        {title1}
        <br />
        <span className="font-bold font-modern text-3xl lowercase">
          {title2}
        </span>
      </h2>
      <p className="text-right max-w-96">{subtitle}</p>
    </div>
  );
}
