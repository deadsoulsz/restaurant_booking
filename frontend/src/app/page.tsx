import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Найдите идеальный столик
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Бронируйте столики в лучших ресторанах вашего города за несколько
            кликов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/restaurants">
                <Search className="mr-2 h-5 w-5" />
                Найти ресторан
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/restaurants?near=me">
                <MapPin className="mr-2 h-5 w-5" />
                Рестораны рядом
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 justify-items-center">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как это работает
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Найдите ресторан</h3>
              <p className="text-muted-foreground">
                Используйте фильтры для поиска идеального места
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите время</h3>
              <p className="text-muted-foreground">
                Проверьте доступность и забронируйте столик
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Наслаждайтесь</h3>
              <p className="text-muted-foreground">
                Приходите в ресторан и наслаждайтесь отличным сервисом
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 justify-items-center">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы забронировать столик?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Создать аккаунт</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
