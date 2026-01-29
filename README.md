# Foodima - Książka Kucharska Online

Aplikacja webowa do zarządzania przepisami kulinarnymi. Pozwala użytkownikom tworzyć, przeglądać, oceniać i organizować przepisy w jednym miejscu.

## Założenia projektu

Foodima to nowoczesna aplikacja typu "książka kucharska" stworzona z myślą o:

- **Prostocie użytkowania** - intuicyjny interfejs dla każdego użytkownika
- **Personalizacji** - każdy użytkownik ma własny profil z przepisami
- **Społeczności** - system ocen pozwala wyróżniać najlepsze przepisy
- **Organizacji** - kategorie i wyszukiwarka ułatwiają znajdowanie przepisów

## Technologie

- **Framework**: Next.js 15 (App Router)
- **Język**: TypeScript
- **Baza danych**: SQLite + Prisma ORM
- **Stylowanie**: Tailwind CSS
- **Komponenty UI**: shadcn/ui
- **Walidacja**: Zod + React Hook Form
- **Autentykacja**: Własna implementacja (cookies + bcrypt)

## Funkcje

### Dla wszystkich użytkowników
- Przeglądanie przepisów na stronie głównej
- Wyszukiwanie przepisów po nazwie i składnikach
- Filtrowanie przepisów według kategorii
- Podgląd szczegółów przepisu (składniki, instrukcje, ocena)

### Dla zalogowanych użytkowników
- Rejestracja i logowanie
- Dodawanie nowych przepisów z:
  - Tytułem
  - Kategorią (Śniadanie, Lunch, Obiad, Deser, Przystawka, Zupa, Sałatka)
  - Zdjęciem (upload)
  - Listą składników
  - Instrukcjami przygotowania
- Edycja i usuwanie własnych przepisów
- Profil użytkownika z listą swoich przepisów
- Ocenianie przepisów (system 5 gwiazdek)

### Kategorie przepisów
- Śniadanie
- Lunch
- Obiad
- Deser
- Przystawka
- Zupa
- Sałatka

## Instalacja

### Wymagania
- Node.js 18+
- npm lub yarn

### Kroki instalacji

1. **Sklonuj repozytorium**
   ```bash
   git clone <url-repozytorium>
   cd cooking-book
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe**

   Utwórz plik `.env` w głównym katalogu:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

4. **Zainicjalizuj bazę danych**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Uruchom serwer deweloperski**
   ```bash
   npm run dev
   ```

6. **Otwórz aplikację**

   Przejdź do [http://localhost:3000](http://localhost:3000)

## Struktura projektu

```
cooking-book/
├── prisma/
│   ├── schema.prisma      # Schemat bazy danych
│   └── dev.db             # Baza danych SQLite
├── public/
│   └── uploads/           # Przesłane zdjęcia
├── src/
│   ├── app/               # Strony (App Router)
│   │   ├── page.tsx       # Strona główna
│   │   ├── profile/       # Profil użytkownika
│   │   ├── login/         # Logowanie
│   │   ├── register/      # Rejestracja
│   │   ├── recipes/
│   │   │   ├── new/       # Nowy przepis
│   │   │   └── [id]/      # Szczegóły / edycja przepisu
│   │   └── api/           # API routes
│   ├── components/        # Komponenty React
│   ├── lib/               # Funkcje pomocnicze
│   │   ├── actions.ts     # Server Actions
│   │   ├── auth.ts        # Autentykacja
│   │   ├── prisma.ts      # Klient Prisma
│   │   └── validations.ts # Schematy walidacji
│   └── generated/         # Wygenerowany klient Prisma
└── package.json
```

## Skrypty

| Komenda | Opis |
|---------|------|
| `npm run dev` | Uruchom serwer deweloperski |
| `npm run build` | Zbuduj aplikację produkcyjną |
| `npm run start` | Uruchom aplikację produkcyjną |
| `npm run lint` | Sprawdź kod linterem |
| `npx prisma studio` | Otwórz panel administracyjny bazy danych |
| `npx prisma db push` | Zsynchronizuj schemat z bazą danych |
| `npx prisma generate` | Wygeneruj klienta Prisma |

## Model danych

### User (Użytkownik)
- `id` - unikalny identyfikator
- `email` - adres email (unikalny)
- `password` - hasło (zahashowane bcrypt)
- `name` - imię użytkownika
- `avatarUrl` - URL do zdjęcia profilowego

### Recipe (Przepis)
- `id` - unikalny identyfikator
- `title` - tytuł przepisu
- `ingredients` - lista składników (JSON)
- `instructions` - instrukcje przygotowania
- `imageUrl` - URL do zdjęcia
- `category` - kategoria przepisu
- `rating` - średnia ocena
- `ratingCount` - liczba ocen
- `userId` - właściciel przepisu

### Rating (Ocena)
- `id` - unikalny identyfikator
- `value` - wartość oceny (1-5)
- `userId` - użytkownik oceniający
- `recipeId` - oceniany przepis

## Licencja

MIT
