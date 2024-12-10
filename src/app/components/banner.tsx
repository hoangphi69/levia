export default function Banner({
  title,
  image,
}: {
  title: string | JSX.Element;
  image: string;
}) {
  return (
    <section className="relative h-[40dvh]">
      <div className="block relative after:z-10 after:absolute after:inset-0 after:bg-gradient-to-r after:from-dark-2/100 after:to-dark-2/20 ml-auto w-full md:w-2/3 h-full isolate">
        <img
          className="w-full h-full object-center object-cover"
          src={image}
          alt=""
        />
      </div>

      {title && (
        <div className="absolute inset-0 space-y-4 m-auto md:ml-16 w-max h-max text-center md:text-left">
          <h1 className="font-extrabold text-gradient text-h1">{title}</h1>
        </div>
      )}
    </section>
  );
}
