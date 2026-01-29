"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteRecipe } from "@/lib/actions";

interface RecipeCardActionsProps {
  recipeId: string;
}

export function RecipeCardActions({ recipeId }: RecipeCardActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/recipes/${recipeId}/edit`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Czy na pewno chcesz usunąć ten przepis?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteRecipe(recipeId);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleEdit}
        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
      >
        <Pencil className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 bg-white/90 hover:bg-red-50 rounded-full shadow-sm transition-colors disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}
