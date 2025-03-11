import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/shadcn/sidebar';
import { FlaskConical, Home, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import ThemeLogo from '../theme/theme-logo';
import ThemeSwitch from '../theme/theme-switch';

// Menu items
const items = [
  {
    title: 'Sản phẩm',
    url: '/admin/products',
    icon: Home,
  },
  {
    title: 'Experimental',
    url: '/admin/experimental',
    icon: FlaskConical,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function SideNavbar() {
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:!p-[2px] flex items-center gap-4 p-4 overflow-hidden group-data-[collapsible=icon]:*:truncate transition-all">
          <ThemeLogo
            src={''}
            alt={''}
            width={28}
            height={28}
            className="shrink-0"
          />
          <span className="font-bold truncate">Levia Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  className="group-data-[collapsible=icon]:!p-2 gap-4 p-4"
                  size={'lg'}
                  tooltip={item.title}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <div className="group-data-[collapsible=icon]:!p-[2px] flex items-center gap-4 p-4 overflow-hidden group-data-[collapsible=icon]:*:truncate transition-all">
            <Avatar className="size-7">
              <AvatarImage src="https://picsum.photos/32" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="truncate">@Username</span>
            <ThemeSwitch className="ml-auto" />
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
