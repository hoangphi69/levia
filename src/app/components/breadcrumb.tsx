import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { Fragment } from 'react';

export type Navigation = {
  display: string | undefined;
  href?: string | undefined;
};

export default function CustomBreadcrumb({ list }: { list: Navigation[] }) {
  const CustomBreadcrumbSeparator = () => (
    <BreadcrumbSeparator className="font-black text-accent-gold">
      —
    </BreadcrumbSeparator>
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list.slice(0, -1).map(({ display, href }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={href}>{display}</BreadcrumbLink>
            </BreadcrumbItem>
            <CustomBreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{list.at(-1)?.display}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
