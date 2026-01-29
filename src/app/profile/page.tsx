import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserRecipes } from "@/lib/actions";
import { ProfileHeader } from "@/components/ProfileHeader";
import { RecipeCard } from "@/components/RecipeCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const recipes = await getUserRecipes(user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <ProfileHeader user={user} recipeCount={recipes.length} />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Moje przepisy</h2>
        <Link
          href="/recipes/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Dodaj przepis
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Nie masz jeszcze żadnych przepisów.
          </p>
          <Link
            href="/recipes/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Dodaj pierwszy przepis
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showActions />
          ))}
        </div>
      )}
    </div>
  );
}
