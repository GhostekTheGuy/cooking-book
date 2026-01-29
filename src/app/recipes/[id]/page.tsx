import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipe, getUserRating } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import { DeleteButton } from "@/components/DeleteButton";
import { StarRating } from "@/components/StarRating";
import { CATEGORIES } from "@/lib/validations";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const [recipe, user, userRating] = await Promise.all([
    getRecipe(id),
    getCurrentUser(),
    getUserRating(id),
  ]);

  if (!recipe) {
    notFound();
  }

  const ingredients = JSON.parse(recipe.ingredients) as string[];
  const ratingCount = (recipe as { ratingCount?: number }).ratingCount || 0;
  const category = (recipe as { category?: string }).category;
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label;
  const isOwner = user && recipe.userId === user.id;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {recipe.imageUrl ? (
        <div className="aspect-video rounded-xl overflow-hidden mb-8">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-8">
          <span className="text-8xl">🍳</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h1>
          <div className="mb-3">
            <StarRating
              recipeId={recipe.id}
              averageRating={recipe.rating}
              ratingCount={ratingCount}
              userRating={userRating}
              isLoggedIn={!!user}
            />
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span>Dodano: {new Date(recipe.createdAt).toLocaleDateString("pl-PL")}</span>
            {categoryLabel && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                {categoryLabel}
              </span>
            )}
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/recipes/${recipe.id}/edit`}
              className="px-4 py-2 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors"
            >
              Edytuj
            </Link>
            <DeleteButton recipeId={recipe.id} />
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Składniki
          </h2>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Instrukcje
          </h2>
          <div className="prose prose-gray max-w-none">
            {recipe.instructions.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <Link
          href="/"
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Powrót do listy przepisów
        </Link>
      </div>
    </div>
  );
}
