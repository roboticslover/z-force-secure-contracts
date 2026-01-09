import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Shield,
  LayoutDashboard,
  Building2,
  MapPin,
  FileText,
  Users,
  ClipboardList,
  FileCheck,
  CreditCard,
  Settings,
  LogOut,
  ShieldCheck,
  FolderKanban,
  UserCheck,
} from 'lucide-react';

const DashboardSidebar = () => {
  const { role, profile, signOut } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  // Menu items based on role
  const getMenuItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    ];

    if (role === 'client') {
      return [
        ...baseItems,
        { title: 'Organization', url: '/dashboard/organization', icon: Building2 },
        { title: 'Locations', url: '/dashboard/locations', icon: MapPin },
        { title: 'Requirements', url: '/dashboard/requirements', icon: FileText },
        { title: 'Proposals', url: '/dashboard/proposals', icon: ClipboardList },
        { title: 'Contracts', url: '/dashboard/contracts', icon: FileCheck },
        { title: 'Payments', url: '/dashboard/payments', icon: CreditCard },
      ];
    }

    if (role === 'agency') {
      return [
        ...baseItems,
        { title: 'Agency Profile', url: '/dashboard/organization', icon: Building2 },
        { title: 'Browse Jobs', url: '/dashboard/jobs', icon: FolderKanban },
        { title: 'My Proposals', url: '/dashboard/proposals', icon: ClipboardList },
        { title: 'Contracts', url: '/dashboard/contracts', icon: FileCheck },
        { title: 'Payments', url: '/dashboard/payments', icon: CreditCard },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseItems,
        { title: 'Agencies', url: '/dashboard/agencies', icon: ShieldCheck },
        { title: 'Clients', url: '/dashboard/clients', icon: Building2 },
        { title: 'Users', url: '/dashboard/users', icon: Users },
        { title: 'Requirements', url: '/dashboard/requirements', icon: FileText },
        { title: 'Contracts', url: '/dashboard/contracts', icon: FileCheck },
        { title: 'Categories', url: '/dashboard/categories', icon: FolderKanban },
        { title: 'Verifications', url: '/dashboard/verifications', icon: UserCheck },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-sidebar-primary" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-foreground">Z-Force</span>
              <span className="text-xs text-sidebar-foreground/70 -mt-0.5">Security Platform</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">
            {role === 'admin' ? 'Admin Panel' : role === 'agency' ? 'Agency Portal' : 'Client Portal'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {profile?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {profile?.full_name || 'User'}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate capitalize">
                {role || 'User'}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
