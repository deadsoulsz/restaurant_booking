"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";
import { MobileMenu } from "./mobile-menu";
import { useAuth } from "@/lib/hooks/use-auth";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const navigation = [
    { name: "Рестораны", href: "/restaurants" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">TableBook</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Location */}
            <Button variant="ghost" size="sm" className="hidden lg:flex">
              <MapPin className="mr-2 h-4 w-4" />
              Москва
            </Button>

            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Войти</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Регистрация</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
