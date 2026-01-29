import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { NavbarSearch } from "./NavbarSearch";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="relative z-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">Foodima</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground font-medium border-b-2 border-primary pb-1"
            >
              Przepisy
            </Link>
          </div>

          {/* Right side - Auth & Icons */}
          <div className="flex items-center gap-4">
            <NavbarSearch />
            {user ? <UserMenu user={user} /> : <AuthButtons />}
          </div>
        </nav>
      </div>
    </header>
  );
}
