import Breadcrumb, { Navigation } from './breadcrumb';

export default function Banner({
  image,
  breadcrumb,
  children,
}: {
  image: string;
  breadcrumb?: Navigation[];
  children?: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="relative flex flex-col justify-between space-y-4 md:px-16 md:py-12 p-6 md:h-[300px] min-h-[250px]"
    >
      <Breadcrumb list={breadcrumb || []} />

      {children}
    </section>
  );
}
