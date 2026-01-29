import { User } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  recipeCount: number;
}

export function ProfileHeader({ user, recipeCount }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6 mb-8 p-6 bg-card rounded-xl shadow-sm">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {recipeCount} {recipeCount === 1 ? "przepis" : recipeCount < 5 ? "przepisy" : "przepisów"}
        </p>
      </div>
    </div>
  );
}
