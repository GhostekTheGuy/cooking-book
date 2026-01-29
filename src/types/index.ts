import { Recipe } from "@/generated/prisma/client";

export type { Recipe };

export interface RecipeWithParsedIngredients extends Omit<Recipe, "ingredients"> {
  ingredients: string[];
}

export function parseRecipeIngredients(recipe: Recipe): RecipeWithParsedIngredients {
  return {
    ...recipe,
    ingredients: JSON.parse(recipe.ingredients) as string[],
  };
}
