"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData, CATEGORIES } from "@/lib/validations";
import { createRecipe, updateRecipe } from "@/lib/actions";
import { IngredientsList } from "./IngredientsList";
import { useState } from "react";

interface RecipeFormProps {
  initialData?: RecipeFormData & { id?: string };
}

export function RecipeForm({ initialData }: RecipeFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const isEditing = !!initialData?.id;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: initialData || {
      title: "",
      ingredients: [""],
      instructions: "",
      imageUrl: "",
      category: "",
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: RecipeFormData) => {
    if (isEditing && initialData?.id) {
      await updateRecipe(initialData.id, data);
    } else {
      await createRecipe(data);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setValue("imageUrl", url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tytuł przepisu
        </label>
        <input
          id="title"
          {...register("title")}
          placeholder="np. Spaghetti Carbonara"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Kategoria
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
        >
          <option value="">Wybierz kategorię</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zdjęcie
        </label>
        <div className="space-y-2">
          {imageUrl && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt="Podgląd"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setValue("imageUrl", "")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
          />
          {isUploading && (
            <p className="text-sm text-gray-500">Przesyłanie...</p>
          )}
        </div>
      </div>

      <IngredientsList control={control} errors={errors} />

      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Instrukcje
        </label>
        <textarea
          id="instructions"
          {...register("instructions")}
          rows={6}
          placeholder="Opisz krok po kroku jak przygotować danie..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
        {errors.instructions && (
          <p className="mt-1 text-sm text-red-500">
            {errors.instructions.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Zapisywanie..."
            : isEditing
            ? "Zapisz zmiany"
            : "Dodaj przepis"}
        </button>
      </div>
    </form>
  );
}
