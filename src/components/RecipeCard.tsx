import Link from "next/link";
import { Recipe } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { RecipeCardActions } from "./RecipeCardActions";
import { CATEGORIES } from "@/lib/validations";

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean;
}

export function RecipeCard({ recipe, showActions = false }: RecipeCardProps) {
  const ingredients = JSON.parse(recipe.ingredients) as string[];
  const rating = recipe.rating || 0;
  const category = (recipe as { category?: string }).category;
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label;

  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <span className="text-6xl">🍽️</span>
            </div>
          )}
          {showActions && <RecipeCardActions recipeId={recipe.id} />}
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{ingredients.length} składników</span>
            {categoryLabel && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                {categoryLabel}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
