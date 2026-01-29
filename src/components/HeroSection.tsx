import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#fce8e4] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Konkurs
                <br />
                Kulinarny
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                Odkryj nasze najlepsze przepisy i podejmij wyzwanie.
                Weź udział w naszym cotygodniowym przyjęciu i udowodnij, że jesteś ekspertem.
              </p>
              <Link href="/recipes/new">
                <Button size="lg" className="rounded-full px-8">
                  Dodaj przepis
                </Button>
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="flex-1 relative h-64 md:h-80 flex items-center justify-center">
              {/* Chef Illustration - using emoji as placeholder */}
              <div className="relative">
                {/* Chef character */}
                <div className="text-center">
                  <div className="text-8xl md:text-9xl">👨‍🍳</div>
                </div>

                {/* Floating food items */}
                <div className="absolute -top-8 -left-12 text-4xl animate-bounce">
                  🥕
                </div>
                <div className="absolute -top-4 right-0 text-3xl animate-bounce delay-100">
                  🍅
                </div>
                <div className="absolute top-12 -right-8 text-4xl animate-bounce delay-200">
                  🍳
                </div>
                <div className="absolute -bottom-4 -left-8 text-3xl animate-bounce delay-300">
                  🥬
                </div>
                <div className="absolute bottom-0 right-4 text-2xl animate-bounce delay-400">
                  🫐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
