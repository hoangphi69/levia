import GoogleMaps from '../../../lib/google-maps';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';
import Banner from '../_components/layout/banner';
import prisma from '../../../lib/prisma';
import AgencyCard from './agency-card';

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
          <h1 className="font-bold text-gradient text-2xl lg:text-4xl md:text-left text-center">
            {banner.title}
          </h1>
          <p className="md:max-w-[25ch] text-muted-foreground text-base lg:text-lg md:text-left text-center tracking-wide">
            {banner.subtitle}
          </p>
        </header>
      </Banner>

      <section className="p-6 md:px-16 md:py-12">
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
