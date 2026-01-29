"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { rateRecipe } from "@/lib/actions";

interface StarRatingProps {
  recipeId: string;
  averageRating: number;
  ratingCount: number;
  userRating: number | null;
  isLoggedIn: boolean;
}

export function StarRating({
  recipeId,
  averageRating,
  ratingCount,
  userRating,
  isLoggedIn,
}: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [currentUserRating, setCurrentUserRating] = useState(userRating);
  const [isPending, startTransition] = useTransition();

  const displayRating = hoveredStar ?? currentUserRating ?? 0;

  const handleRate = (value: number) => {
    if (!isLoggedIn) return;

    setCurrentUserRating(value);
    startTransition(async () => {
      await rateRecipe(recipeId, value);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-0.5"
          onMouseLeave={() => setHoveredStar(null)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={!isLoggedIn || isPending}
              onClick={() => handleRate(star)}
              onMouseEnter={() => isLoggedIn && setHoveredStar(star)}
              className={`p-0.5 transition-transform ${
                isLoggedIn
                  ? "hover:scale-110 cursor-pointer"
                  : "cursor-default"
              } ${isPending ? "opacity-50" : ""}`}
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= displayRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-lg font-medium text-foreground">
          {averageRating.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          ({ratingCount} {ratingCount === 1 ? "ocena" : ratingCount < 5 ? "oceny" : "ocen"})
        </span>
      </div>

      {!isLoggedIn && (
        <p className="text-sm text-muted-foreground">
          Zaloguj się, aby ocenić przepis
        </p>
      )}

      {isLoggedIn && currentUserRating && (
        <p className="text-sm text-muted-foreground">
          Twoja ocena: {currentUserRating} {currentUserRating === 1 ? "gwiazdka" : currentUserRating < 5 ? "gwiazdki" : "gwiazdek"}
        </p>
      )}
    </div>
  );
}
