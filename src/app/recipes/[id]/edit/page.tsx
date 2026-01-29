import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getRecipe } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import { RecipeForm } from "@/components/RecipeForm";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;
  const [recipe, user] = await Promise.all([
    getRecipe(id),
    getCurrentUser(),
  ]);

  if (!recipe) {
    notFound();
  }

  // Only owner can edit
  if (!user || recipe.userId !== user.id) {
    redirect(`/recipes/${id}`);
  }

  const ingredients = JSON.parse(recipe.ingredients) as string[];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-8">
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Powrót do przepisu
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edytuj przepis</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <RecipeForm
          initialData={{
            id: recipe.id,
            title: recipe.title,
            ingredients,
            instructions: recipe.instructions,
            imageUrl: recipe.imageUrl || "",
            category: (recipe as { category?: string }).category || "",
          }}
        />
      </div>
    </div>
  );
}
