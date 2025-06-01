import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import '../../app/globals.css'

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "О нас", href: "/about" },
      { name: "Карьера", href: "/careers" },
      { name: "Пресса", href: "/press" },
      { name: "Блог", href: "/blog" },
    ],
    support: [
      { name: "Помощь", href: "/help" },
      { name: "Контакты", href: "/contacts" },
      { name: "FAQ", href: "/faq" },
      { name: "Условия использования", href: "/terms" },
    ],
    business: [
      { name: "Для ресторанов", href: "/for-restaurants" },
      { name: "Партнерство", href: "/partnership" },
      { name: "Реклама", href: "/advertising" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="text-2xl font-bold text-primary">TableBook</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Найдите и забронируйте столик в лучших ресторанах вашего города
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Бизнес</h3>
            <ul className="space-y-2">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TableBook. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
