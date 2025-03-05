export default function CircularTextButton({
  text,
  children,
  size,
  fontSize = 16,
  offset = 3.5,
  className,
}: {
  text: string;
  children: React.ReactNode;
  size: number;
  fontSize?: number;
  offset?: number;
  className?: string | undefined;
}) {
  return (
    <div
      style={{ width: `${size}px` }}
      className="relative content-center aspect-square"
    >
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: '10s' }}
      >
        {text.split('').map((char, index, text) => (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: '50%',
              rotate: `${(index * 360) / text.length}deg`,
              transformOrigin: `0 ${size / 2}px`,
              fontSize: `${fontSize}px`,
            }}
            className="left-1/2 absolute opacity-80 group-hover:opacity-100 font-mono uppercase transition-opacity"
          >
            {char}
          </span>
        ))}
      </div>

      <div
        style={{
          width: `calc(100% - ${offset}rem)`,
          height: `calc(100% - ${offset}rem)`,
          margin: 'auto',
        }}
        className={`rounded-full grid place-content-center ${
          className ? className : 'bg-foreground'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
