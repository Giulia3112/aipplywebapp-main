import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Rocket, User, LogOut, Menu, X, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileDialog from '@/components/ProfileDialog';
import Logo from '@/components/Logo';

const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="truncate">{children}</span>
  </NavLink>
);

const Sidebar = ({ onLogout, onOpenProfile, isAdmin }) => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b">
      <Logo />
    </div>
    <nav className="flex-grow p-4 space-y-2">
      <NavItem to="/" icon={LayoutDashboard}>
        Applications
      </NavItem>
      <NavItem to="/opportunities" icon={Rocket}>
        Browse Opportunities
      </NavItem>
       <NavItem to="/my-opportunities" icon={Star}>
        My Opportunities
      </NavItem>
      {isAdmin && (
        <NavItem to="/users" icon={Users}>
          Control Center
        </NavItem>
      )}
    </nav>
    <div className="p-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-5 h-5 mr-3" />
            <span className="truncate">My Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

const DashboardLayout = ({ children, userProfile, onProfileUpdate, onLogout }) => {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-background">
        <Sidebar onLogout={onLogout} onOpenProfile={() => setIsProfileDialogOpen(true)} isAdmin={userProfile?.isAdmin} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-background z-50"
            >
              <Sidebar onLogout={onLogout} onOpenProfile={() => setIsProfileDialogOpen(true)} isAdmin={userProfile?.isAdmin} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
           <Logo />
          <div/>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <ProfileDialog
        isOpen={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        userProfile={userProfile}
        onProfileUpdate={onProfileUpdate}
      />
    </div>
  );
};

export default DashboardLayout;