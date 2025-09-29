import { db } from "./db";
import { menuItems } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing menu items
  await db.delete(menuItems);

  // Build-A-Bowl items
  await db.insert(menuItems).values([
    {
      name: "Veggie Bowl",
      description: "Choose your base, protein (Moroccan Cauliflower), and unlimited toppings",
      category: "build-a-bowl",
      basePrice: "12.00",
      imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      available: 1,
    },
    {
      name: "Chicken Bowl",
      description: "Choose your base, protein (Grilled or Somac Chicken), and unlimited toppings",
      category: "build-a-bowl",
      basePrice: "13.00",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      available: 1,
    },
    {
      name: "Steak Bowl",
      description: "Choose your base, protein (Sirloin Steak), and unlimited toppings",
      category: "build-a-bowl",
      basePrice: "15.75",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
      available: 1,
    },
    // Favorites
    {
      name: "Plantain Chips + Guac",
      description: "Crispy plantain chips served with fresh, creamy guacamole as a light snack",
      category: "favorites",
      basePrice: "4.95",
      imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32",
      available: 1,
    },
    {
      name: "Classic Sambusa (Beef)",
      description: "Our Sambusas are filled with a simple mix and cooked to a crisp, golden finish",
      category: "favorites",
      basePrice: "2.55",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      available: 1,
    },
    {
      name: "Grilled Quesadilla - Cheese",
      description: "Our 3 cheese Grilled Quesadillas combine fresh fillings with fresh vegetables",
      category: "favorites",
      basePrice: "11.00",
      imageUrl: "https://cdn.pixabay.com/photo/2020/05/11/15/06/quesadilla-5158087_1280.jpg",
      available: 1,
    },
    {
      name: "Grilled Quesadilla - Chicken",
      description: "Our 3 cheese Grilled Quesadillas combine fresh fillings with fresh vegetables and chicken",
      category: "favorites",
      basePrice: "12.25",
      imageUrl: "https://cdn.pixabay.com/photo/2020/05/11/15/06/quesadilla-5158087_1280.jpg",
      available: 1,
    },
    {
      name: "Grilled Quesadilla - Steak",
      description: "Our 3 cheese Grilled Quesadillas combine fresh fillings with fresh vegetables and steak",
      category: "favorites",
      basePrice: "15.00",
      imageUrl: "https://cdn.pixabay.com/photo/2020/05/11/15/06/quesadilla-5158087_1280.jpg",
      available: 1,
    },
    // Sides
    {
      name: "Seasoned Fries",
      description: "Crispy golden fries with a salty crunch",
      category: "sides",
      basePrice: "6.00",
      imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
      available: 1,
    },
    {
      name: "Sweet Potato Fries",
      description: "Crispy sweet fries with a caramelized touch",
      category: "sides",
      basePrice: "6.00",
      imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512d",
      available: 1,
    },
    {
      name: "Plantains",
      description: "Tender fried plantains with a sweet finish",
      category: "sides",
      basePrice: "6.25",
      imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32",
      available: 1,
    },
    {
      name: "Buffalo Cauliflower",
      description: "Spicy buffalo cauliflower with a tangy kick",
      category: "sides",
      basePrice: "7.25",
      imageUrl: "https://images.unsplash.com/photo-1568158879083-c42860933ed7",
      available: 1,
    },
    {
      name: "Lentil Soup",
      description: "Hearty lentil soup with warm, spiced comfort",
      category: "sides",
      basePrice: "8.00",
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
      available: 1,
    },
    // Beverages
    {
      name: "House-made Drinks",
      description: "Fresh, artisanal beverages",
      category: "beverages",
      basePrice: "3.95",
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      available: 1,
    },
    {
      name: "Fountain Drinks",
      description: "Classic soft drinks",
      category: "beverages",
      basePrice: "1.75",
      imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8",
      available: 1,
    },
    // Desserts
    {
      name: "Small Donuts (5-piece)",
      description: "Freshly fried Somali donuts served with vanilla ice cream dip on a bed of berries",
      category: "desserts",
      basePrice: "7.25",
      imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      available: 1,
    },
    {
      name: "Fruit Bowl - Solo",
      description: "Chilled fruit bowl with cucumbers, pineapple, and watermelon for a refreshing bite",
      category: "desserts",
      basePrice: "6.95",
      imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      available: 1,
    },
    {
      name: "Fruit Bowl - Twin",
      description: "Large chilled fruit bowl with cucumbers, pineapple, and watermelon for a refreshing bite",
      category: "desserts",
      basePrice: "6.95",
      imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      available: 1,
    },
    {
      name: "Monster Cookies - One",
      description: "Monster cookie loaded with oats, chocolate chips, and colorful candy for a bold, sweet treat",
      category: "desserts",
      basePrice: "3.15",
      imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      available: 1,
    },
    {
      name: "Monster Cookies - Three",
      description: "Three Monster cookies loaded with oats, chocolate chips, and colorful candy for a bold, sweet treat",
      category: "desserts",
      basePrice: "7.50",
      imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      available: 1,
    },
  ]);

  console.log("Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
