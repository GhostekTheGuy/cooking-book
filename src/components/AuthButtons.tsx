"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, register } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function AuthButtons() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            Zaloguj się
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Zaloguj się</DialogTitle>
            <DialogDescription>
              Wprowadź swoje dane, aby się zalogować
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={() => setIsLoginOpen(false)} />
          <div className="text-center text-sm text-muted-foreground">
            Nie masz konta?{" "}
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
              className="text-primary hover:underline"
            >
              Zarejestruj się
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Rejestracja</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Utwórz konto</DialogTitle>
            <DialogDescription>
              Wypełnij poniższy formularz, aby utworzyć konto
            </DialogDescription>
          </DialogHeader>
          <RegisterForm onSuccess={() => setIsRegisterOpen(false)} />
          <div className="text-center text-sm text-muted-foreground">
            Masz już konto?{" "}
            <button
              onClick={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }}
              className="text-primary hover:underline"
            >
              Zaloguj się
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    setIsPending(false);

    if (result.success) {
      onSuccess();
      router.refresh();
    } else {
      setError(result.error || "Wystąpił błąd");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder="jan@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Hasło</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await register(formData);

    setIsPending(false);

    if (result.success) {
      onSuccess();
      router.refresh();
    } else {
      setError(result.error || "Wystąpił błąd");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Imię</Label>
        <Input
          id="register-name"
          name="name"
          type="text"
          placeholder="Jan Kowalski"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          placeholder="jan@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Hasło</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          placeholder="••••••••"
          minLength={6}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Tworzenie konta..." : "Zarejestruj się"}
      </Button>
    </form>
  );
}
