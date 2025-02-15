import { Separator } from '@/components/ui/separator';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import { Navigation } from '@/app/components/breadcrumb';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Breadcrumb({ list }: { list: Navigation[] }) {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <ShadcnBreadcrumb>
        <BreadcrumbList>
          {list.slice(0, -1).map(({ display, href }, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href as string}>{display}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{list.at(-1)?.display}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </div>
  );
}
