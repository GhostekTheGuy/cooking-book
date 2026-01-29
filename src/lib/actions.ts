"use server";

import { prisma } from "./prisma";
import { recipeSchema, RecipeFormData } from "./validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";
import { cookies } from "next/headers";

export async function getRecipes() {
  return prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getRecipe(id: string) {
  return prisma.recipe.findUnique({
    where: { id },
  });
}

export async function createRecipe(data: RecipeFormData) {
  const validated = recipeSchema.parse(data);
  const user = await getCurrentUser();

  const recipe = await prisma.recipe.create({
    data: {
      title: validated.title,
      ingredients: JSON.stringify(validated.ingredients),
      instructions: validated.instructions,
      imageUrl: validated.imageUrl || null,
      category: validated.category || null,
      userId: user?.id || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/profile");
  redirect(`/recipes/${recipe.id}`);
}

export async function updateRecipe(id: string, data: RecipeFormData) {
  const validated = recipeSchema.parse(data);
  const user = await getCurrentUser();

  // Check ownership
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe || !user || recipe.userId !== user.id) {
    throw new Error("Brak uprawnień do edycji tego przepisu");
  }

  await prisma.recipe.update({
    where: { id },
    data: {
      title: validated.title,
      ingredients: JSON.stringify(validated.ingredients),
      instructions: validated.instructions,
      imageUrl: validated.imageUrl || null,
      category: validated.category || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath(`/recipes/${id}`);
  redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string) {
  const user = await getCurrentUser();

  // Check ownership
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe || !user || recipe.userId !== user.id) {
    throw new Error("Brak uprawnień do usunięcia tego przepisu");
  }

  await prisma.recipe.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/profile");
  redirect("/");
}

export async function searchRecipes(query: string, categories?: string[]) {
  const conditions: Parameters<typeof prisma.recipe.findMany>[0]["where"][] = [];

  if (query.trim()) {
    conditions.push({
      OR: [
        { title: { contains: query } },
        { ingredients: { contains: query } },
      ],
    });
  }

  if (categories && categories.length > 0) {
    conditions.push({
      category: { in: categories },
    });
  }

  if (conditions.length === 0) {
    return getRecipes();
  }

  return prisma.recipe.findMany({
    where: conditions.length === 1 ? conditions[0] : { AND: conditions },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserRecipes(userId: string) {
  return prisma.recipe.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function rateRecipe(recipeId: string, value: number) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { success: false, error: "Musisz być zalogowany, aby ocenić przepis" };
  }

  if (value < 1 || value > 5) {
    return { success: false, error: "Ocena musi być między 1 a 5" };
  }

  // Upsert the rating
  await prisma.rating.upsert({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
    update: { value },
    create: {
      userId,
      recipeId,
      value,
    },
  });

  // Calculate new average rating
  const aggregation = await prisma.rating.aggregate({
    where: { recipeId },
    _avg: { value: true },
    _count: { value: true },
  });

  const newRating = aggregation._avg.value || 0;
  const ratingCount = aggregation._count.value || 0;

  // Update recipe with new average
  await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      rating: newRating,
      ratingCount: ratingCount,
    },
  });

  revalidatePath(`/recipes/${recipeId}`);
  revalidatePath("/");

  return { success: true, rating: newRating, ratingCount };
}

export async function getUserRating(recipeId: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const rating = await prisma.rating.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
  });

  return rating?.value || null;
}
