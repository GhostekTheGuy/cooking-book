"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      if (query.trim()) {
        router.push(`/?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/");
      }
    });
  };

  const handleClear = () => {
    setQuery("");
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj przepisu..."
          className="pl-9 pr-20 h-10 bg-card border-border rounded-full"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="absolute right-1 h-8 rounded-full px-4"
        >
          {isPending ? "..." : "Szukaj"}
        </Button>
      </div>
    </form>
  );
}
