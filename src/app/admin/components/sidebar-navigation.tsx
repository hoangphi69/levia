import {
  Calendar,
  ChevronRight,
  FlaskConical,
  Home,
  HomeIcon,
  Inbox,
  Moon,
  Search,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from './logo';
import Image from 'next/image';
import SmoothImage from '@/app/components/smooth-image';
import Avatar from './avatar';
import ThemeSwitch from './theme-switch';
import Link from 'next/link';

// Menu items
const items = [
  {
    title: 'Sản phẩm',
    url: '/admin/products',
    icon: Home,
  },
  {
    title: 'Drag n drop',
    url: '/admin/dragndrop',
    icon: FlaskConical,
  },
  {
    title: 'Upload',
    url: '/admin/uploadtest',
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

export function SidebarNavigation() {
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:!p-[2px] flex items-center gap-4 p-4 overflow-hidden group-data-[collapsible=icon]:*:truncate transition-all">
          <Logo src={''} alt={''} width={28} height={28} className="shrink-0" />
          <span className="font-bold truncate">Levia Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
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
            <Avatar src={'https://picsum.photos/32'} />
            <span className="truncate">@Username</span>
            <ThemeSwitch className="ml-auto" />
          </div>
          {/* <SidebarMenuButton
            className="group-data-[collapsible=icon]:!p-[2px]"
            size={'lg'}
            >
          </SidebarMenuButton> */}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
