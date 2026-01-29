import { Suspense } from "react";
import { getRecipes, searchRecipes } from "@/lib/actions";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { HeroSection } from "@/components/HeroSection";

interface HomeProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q || "";
  const categories = params.category?.split(",").filter(Boolean) || [];

  const recipes = query || categories.length > 0
    ? await searchRecipes(query, categories)
    : await getRecipes();

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Recipes Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground">Przepisy</h2>
            <span className="text-2xl">🍳</span>
          </div>
          <div className="w-80">
            <Suspense fallback={<div>Ładowanie...</div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        {(query || categories.length > 0) && (
          <p className="text-muted-foreground mb-4">
            {query && (
              <>
                Wyniki wyszukiwania dla: <span className="font-medium text-foreground">{query}</span>
              </>
            )}
            {query && categories.length > 0 && " | "}
            {categories.length > 0 && (
              <>
                Filtry: <span className="font-medium text-foreground">{categories.length}</span>
              </>
            )}
            {" "}({recipes.length} {recipes.length === 1 ? "wynik" : "wyników"})
          </p>
        )}

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Suspense fallback={<div>Ładowanie filtrów...</div>}>
              <FilterSidebar />
            </Suspense>
          </aside>

          {/* Recipe Grid */}
          <div className="flex-1">
            {recipes.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl">
                <p className="text-6xl mb-4">📚</p>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {query ? "Brak wyników" : "Brak przepisów"}
                </h2>
                <p className="text-muted-foreground">
                  {query
                    ? "Spróbuj innego wyszukiwania"
                    : "Dodaj swój pierwszy przepis!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
