"use client";

import { useFieldArray, Control } from "react-hook-form";
import { RecipeFormData } from "@/lib/validations";

interface IngredientsListProps {
  control: Control<RecipeFormData>;
  errors?: { ingredients?: { message?: string; root?: { message?: string } } };
}

export function IngredientsList({ control, errors }: IngredientsListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients" as never,
  });

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Składniki
      </label>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...control.register(`ingredients.${index}` as const)}
              placeholder={`Składnik ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append("")}
        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
      >
        + Dodaj składnik
      </button>

      {errors?.ingredients?.message && (
        <p className="text-sm text-red-500">{errors.ingredients.message}</p>
      )}
      {errors?.ingredients?.root?.message && (
        <p className="text-sm text-red-500">{errors.ingredients.root.message}</p>
      )}
    </div>
  );
}
