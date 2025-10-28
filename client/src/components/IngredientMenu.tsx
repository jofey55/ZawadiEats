import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ingredient {
  name: string;
  image: string;
  category: "Bases" | "Proteins" | "Cold Toppings" | "Sauces" | "Sides";
}

const ingredients: Ingredient[] = [
  // Bases
  { name: "Coconut Rice", image: "/images/ingredient-coconut-rice-full.jpg", category: "Bases" },
  { name: "Saffron Rice", image: "/images/ingredient-white-rice-full.jpg", category: "Bases" },
  { name: "Black Beans", image: "/images/ingredient-beans-full.jpg", category: "Bases" },
  { name: "Quinoa", image: "/images/ingredient-quinoa-full.jpg", category: "Bases" },
  { name: "Cauliflower", image: "/images/ingredient-cauliflower-full.jpg", category: "Bases" },

  // Proteins
  { name: "Grilled Chicken", image: "/images/ingredient-chicken-full.jpg", category: "Proteins" },
  { name: "Skirt Steak", image: "/images/ingredient-steak-full.jpg", category: "Proteins" },

  // Cold Toppings
  { name: "Pickled Cabbage", image: "/images/ingredient-cabbage-full.jpg", category: "Cold Toppings" },
  { name: "Pickled Onions", image: "/images/ingredient-onions-full.jpg", category: "Cold Toppings" },
  { name: "Pico de Gallo", image: "/images/ingredient-pico-full.jpg", category: "Cold Toppings" },
  { name: "Spicy Pico", image: "/images/ingredient-spicy-pico.jpg", category: "Cold Toppings" },
  { name: "Guacamole", image: "/images/ingredient-guac-full.jpg", category: "Cold Toppings" },
  { name: "Pineapple", image: "/images/ingredient-pineapple-full.jpg", category: "Cold Toppings" },
  { name: "Beetroot", image: "/images/ingredient-beetroot.jpg", category: "Cold Toppings" },

  // Sauces
  { name: "Ranch", image: "/images/ingredient-ranch-full.jpg", category: "Sauces" },
  { name: "Zawadi Sauce", image: "/images/ingredient-zawadi-full.jpg", category: "Sauces" },
  { name: "Spicy Sauce", image: "/images/ingredient-spicy-sauce.jpg", category: "Sauces" },

  // Sides
  { name: "Plantains", image: "/images/ingredient-plantain.jpg", category: "Sides" },
  { name: "Chips", image: "/images/ingredient-chips.jpg", category: "Sides" },
];

const categoryColors: Record<Ingredient["category"], string> = {
  "Bases": "#FFF4E0",
  "Proteins": "#FFE8F0",
  "Cold Toppings": "#E0F4FF",
  "Sauces": "#FFF4E0",
  "Sides": "#E0F4FF",
};

interface IngredientMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IngredientMenu({ isOpen, onClose }: IngredientMenuProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  const categories: Ingredient["category"][] = ["Bases", "Proteins", "Cold Toppings", "Sauces", "Sides"];

  return (
    <div className="fixed right-4 top-20 z-50 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6BBF59] to-green-600">
        <h3 className="font-bold text-white text-lg">Ingredient Guide</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            data-testid="button-minimize-ingredient-menu"
          >
            {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            data-testid="button-close-ingredient-menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-4">
            {categories.map(category => {
              const categoryIngredients = ingredients.filter(i => i.category === category);
              if (categoryIngredients.length === 0) return null;

              return (
                <div key={category} className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryIngredients.map(ingredient => (
                      <div
                        key={ingredient.name}
                        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: categoryColors[category] }}
                        data-testid={`ingredient-card-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-xs font-medium text-gray-800 dark:text-gray-900 line-clamp-2">
                            {ingredient.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
          Click ↓ to view ingredients
        </div>
      )}
    </div>
  );
}
