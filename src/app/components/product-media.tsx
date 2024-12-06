export default function ProductMedia({
  title,
  subtitle,
  media,
  style,
}: {
  title: string;
  subtitle: string;
  media: string;
  style: 'video' | 'image-only' | 'image-left' | 'image-right' | 'image-bottom';
}) {
  return (
    <div
      className={`grid md:gap-12 gap-5 text-center
        ${
          style === 'image-right'
            ? 'md:grid-cols-2 md:text-left'
            : style === 'image-left'
            ? 'md:grid-cols-2 md:text-right'
            : style === 'image-only'
            ? ''
            : '!gap-0'
        }`}
    >
      <div
        className={`max-w-[55ch] place-self-center space-y-1 md:space-y-4 ${
          style === 'image-left' ? 'md:order-2' : ''
        }`}
      >
        <h3 className="font-extrabold text-h3">{title}</h3>
        <p className="text-gray-1 text-h5">{subtitle}</p>
      </div>

      <div className="h-40 md:h-[25rem]">
        <img
          className="block w-full h-full object-center object-cover"
          src={media}
          alt=""
        />
      </div>
    </div>
  );
}
