import { Home, User, Menu, LogOut, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const navItems = [
    { href: "/", label: "Browse", icon: Home },
    { href: "/resources", label: "Resources", icon: BookOpen },
  ];

  const initials = user
    ? `${(user.firstName || "")[0] || ""}${(user.lastName || "")[0] || ""}`.toUpperCase() || "U"
    : "";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 -ml-3 cursor-pointer" data-testid="link-home">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl hidden sm:inline">HomeBase</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="gap-2"
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isLoading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-9 px-2" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium max-w-[120px] truncate" data-testid="text-username">
                      {user.firstName || user.email || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    {user.firstName || user.email || "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { window.location.href = "/api/logout"; }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => { window.location.href = "/api/login"; }}
                data-testid="button-signin"
              >
                <User className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      onClick={() => setMobileMenuOpen(false)}
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              {isAuthenticated && (
                <>
                  <Link href="/profile">
                    <Button
                      onClick={() => setMobileMenuOpen(false)}
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={() => { window.location.href = "/api/logout"; }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
