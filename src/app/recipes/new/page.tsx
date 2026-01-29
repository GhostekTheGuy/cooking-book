import Link from "next/link";
import { RecipeForm } from "@/components/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Powrót
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dodaj nowy przepis
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <RecipeForm />
      </div>
    </div>
  );
}
