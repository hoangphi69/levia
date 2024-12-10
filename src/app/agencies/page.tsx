import GoogleMaps from '../lib/google-maps';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Banner from '../components/banner';
import prisma from '../lib/prisma';
import AgencyCard from '../components/card-agency';

export default async function Agencies() {
  const agencies = await prisma.agency.findMany();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator></BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Đại lý</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Banner
        title={'Hệ thống đại lý'}
        image={'https://picsum.photos/1280/350'}
      />

      <section>
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
    </>
  );
}
