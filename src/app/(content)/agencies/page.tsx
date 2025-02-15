import GoogleMaps from '../../lib/google-maps';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Banner from '../../components/banner';
import prisma from '../../lib/prisma';
import AgencyCard from '../../components/card-agency';

export default async function Agencies() {
  const agencies = await prisma.agency.findMany();

  const banner = {
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/',
      },
      {
        display: 'Đại lý',
      },
    ],
    image: '../images/products-banner.png',
    title: 'Hệ thống đại lý',
    subtitle: 'Khám phá hệ thống đại lý trải rộng khắp vùng miền',
  };

  return (
    <main>
      <Banner image={banner.image} breadcrumb={banner.breadcrumb}>
        <header className="flex-1 content-center md:content-end space-y-2">
          <h1 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-4xl">
            {banner.title}
          </h1>
          <p className="md:max-w-[25ch] text-base text-center text-muted-foreground md:text-left lg:text-lg tracking-wide">
            {banner.subtitle}
          </p>
        </header>
      </Banner>

      <section className="md:px-16 md:py-12 p-6">
        <ul>
          {agencies.map(({ id, title, image, location, phone, email }) => (
            <AgencyCard
              key={id}
              title={title}
              location={location}
              phone={phone}
              email={email}
              image={image}
            ></AgencyCard>
          ))}
        </ul>
      </section>
    </main>
  );
}
