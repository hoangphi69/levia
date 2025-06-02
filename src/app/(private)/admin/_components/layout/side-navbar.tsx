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
import {
  FlaskConical,
  LetterText,
  Search,
  Settings,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import ThemeLogo from '../theme/theme-logo';
import ThemeSwitch from '../theme/theme-switch';
import User from './user';

// Menu items
const items = [
  {
    title: 'Sản phẩm',
    url: '/admin/products',
    icon: ShoppingCart,
  },
  {
    title: 'Bài viết',
    url: '/admin/articles',
    icon: LetterText,
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
        <div className="flex items-center gap-4 p-4 group-data-[collapsible=icon]:!p-[2px] overflow-hidden group-data-[collapsible=icon]:*:truncate transition-all">
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
                  className="gap-4 p-4 group-data-[collapsible=icon]:!p-2"
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
          <div className="flex items-center gap-4 p-4 group-data-[collapsible=icon]:!p-[2px] overflow-hidden group-data-[collapsible=icon]:*:truncate transition-all">
            {/* 
            TODO: Dropdown menu on clicking user avatar
              + Name and email
              + Theme switch
              + Sidebar bahavior
              + Logout
            */}
            <User />
            <ThemeSwitch className="ml-auto" />
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
