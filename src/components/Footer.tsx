import Link from "next/link";
import { ChefHat } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Foodima</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Twoja ulubiona książka kucharska online. Odkrywaj nowe przepisy,
              dziel się swoimi kulinarnymi dziełami i inspiruj innych do gotowania.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Szybkie linki</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/recipes/new" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dodaj przepis
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mój profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kategorie</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?category=breakfast" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Śniadania
                </Link>
              </li>
              <li>
                <Link href="/?category=dinner" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Obiady
                </Link>
              </li>
              <li>
                <Link href="/?category=dessert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Desery
                </Link>
              </li>
              <li>
                <Link href="/?category=soup" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Zupy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Foodima. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Zrobione z</span>
            <span className="text-red-500">❤</span>
            <span>dla miłośników gotowania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
