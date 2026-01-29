import { PrismaClient } from "../src/generated/prisma/client";
import path from "path";

const databaseUrl = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
});

const recipes = [
  {
    title: "Pierogi ruskie",
    ingredients: JSON.stringify([
      "500g mąki pszennej",
      "1 jajko",
      "200ml ciepłej wody",
      "500g ziemniaków",
      "300g białego sera",
      "2 cebule",
      "Sól i pieprz do smaku",
      "Masło do smażenia",
    ]),
    instructions: `Przygotowanie ciasta:
Mąkę przesiej na stolnicę, zrób wgłębienie i wbij jajko. Dodaj szczyptę soli i stopniowo dolewaj ciepłą wodę, zagniatając ciasto. Wyrabiaj przez około 10 minut, aż będzie gładkie i elastyczne. Przykryj ściereczką i odstaw na 30 minut.

Przygotowanie farszu:
Ziemniaki obierz i ugotuj w osolonej wodzie do miękkości. Odcedź i rozgnieć na purée. Cebulę pokrój w kostkę i zeszklij na maśle. Ser zetrzyj na tarce. Wymieszaj ziemniaki z serem i połową cebuli. Dopraw solą i pieprzem.

Lepienie pierogów:
Ciasto rozwałkuj na cienki placek. Szklanką wycinaj kółka. Na każde kółko nakładaj łyżkę farszu, składaj na pół i zlepiaj brzegi. Gotuj w osolonej wodzie przez 3-4 minuty od wypłynięcia.

Podawaj z resztą smażonej cebuli i śmietaną.`,
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800",
    rating: 4.8,
    prepTime: 90,
  },
  {
    title: "Bigos staropolski",
    ingredients: JSON.stringify([
      "1kg kiszonej kapusty",
      "500g świeżej kapusty",
      "300g kiełbasy myśliwskiej",
      "200g boczku wędzonego",
      "200g schabu",
      "100g suszonych grzybów",
      "2 cebule",
      "3 suszone śliwki",
      "2 liście laurowe",
      "5 ziaren ziela angielskiego",
      "Sól, pieprz, cukier do smaku",
    ]),
    instructions: `Przygotowanie składników:
Suszone grzyby namocz w ciepłej wodzie na 2 godziny. Kiszoną kapustę przepłucz i pokrój. Świeżą kapustę poszatkuj. Mięso pokrój w kostkę.

Gotowanie:
W dużym garnku podsmaż boczek, dodaj pokrojoną cebulę i zeszklij. Dodaj resztę mięsa i zrumień ze wszystkich stron. Dodaj obie kapusty, namoczone grzyby wraz z wodą, śliwki, liście laurowe i ziele angielskie.

Duszenie:
Gotuj na małym ogniu przez minimum 2 godziny, mieszając od czasu do czasu. Im dłużej się gotuje, tym lepszy smak. Dopraw solą, pieprzem i szczyptą cukru.

Bigos najlepiej smakuje odgrzewany następnego dnia. Podawaj z chlebem.`,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    rating: 4.9,
    prepTime: 180,
  },
  {
    title: "Sernik nowojorski",
    ingredients: JSON.stringify([
      "1kg serka kremowego",
      "250g cukru",
      "200g śmietany 30%",
      "5 jajek",
      "2 łyżki mąki",
      "1 łyżeczka ekstraktu waniliowego",
      "Skórka otarta z 1 cytryny",
      "200g herbatników",
      "100g masła",
    ]),
    instructions: `Przygotowanie spodu:
Herbatniki zmiksuj na drobne okruszki. Masło rozpuść i wymieszaj z okruszkami. Wyłóż masą spód tortownicy (26 cm) wyłożonej papierem do pieczenia. Ubij i schłodź w lodówce przez 30 minut.

Przygotowanie masy serowej:
Serek kremowy utrzyj z cukrem na gładką masę. Dodawaj jajka po jednym, cały czas miksując. Dodaj śmietanę, mąkę, ekstrakt waniliowy i skórkę z cytryny. Wymieszaj do połączenia składników.

Pieczenie:
Masę wylej na schłodzony spód. Piecz w 160°C przez około 70 minut. Sernik jest gotowy, gdy brzegi są ścięte, a środek lekko drży. Wyłącz piekarnik i zostaw sernik w środku z uchylonymi drzwiczkami na 1 godzinę.

Schłodź w lodówce przez minimum 4 godziny przed podaniem.`,
    imageUrl: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800",
    rating: 4.7,
    prepTime: 120,
  },
];

async function main() {
  console.log("Rozpoczynam seedowanie bazy danych...");

  for (const recipe of recipes) {
    const created = await prisma.recipe.create({
      data: recipe,
    });
    console.log(`Utworzono przepis: ${created.title}`);
  }

  console.log("Seedowanie zakończone!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
