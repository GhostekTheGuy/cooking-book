import { z } from "zod";

export const CATEGORIES = [
  { value: "breakfast", label: "Śniadanie" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Obiad" },
  { value: "dessert", label: "Deser" },
  { value: "appetizer", label: "Przystawka" },
  { value: "soup", label: "Zupa" },
  { value: "salad", label: "Sałatka" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const recipeSchema = z.object({
  title: z
    .string()
    .min(1, "Tytuł jest wymagany")
    .max(100, "Tytuł może mieć maksymalnie 100 znaków"),
  ingredients: z
    .array(z.string().min(1, "Składnik nie może być pusty"))
    .min(1, "Dodaj przynajmniej jeden składnik"),
  instructions: z
    .string()
    .min(10, "Instrukcje muszą mieć przynajmniej 10 znaków"),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
