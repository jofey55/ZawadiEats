import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ingredient {
  name: string;
  image: string;
  category: "Bases" | "Proteins" | "Cold Toppings" | "Sauces" | "Sides";
}

interface MenuItem {
  name: string;
  customToppings?: {
    hot?: Array<{ name: string; price: number; image?: string; role?: string }>;
    cold?: Array<{ name: string; price: number; image?: string }>;
    sauces?: Array<{ name: string; price: number; image?: string }>;
    meats?: Array<{ name: string; price: number; image?: string }>;
  };
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

interface Topping {
  name: string;
  price: number;
  image?: string;
  role?: string;
}

interface IngredientMenuProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  baseToppings?: Topping[];
  hotToppings?: Topping[];
  coldToppings?: Topping[];
  sauces?: Topping[];
  meats?: Topping[];
}

export default function IngredientMenu({ 
  isOpen, 
  onClose, 
  itemName,
  baseToppings = [],
  hotToppings = [],
  coldToppings = [],
  sauces = [],
  meats = []
}: IngredientMenuProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  // Filter ingredients based on actual available toppings
  const getAvailableIngredients = () => {
    const availableNames = new Set<string>();

    // Collect all available topping names from the passed arrays
    baseToppings.forEach(t => availableNames.add(t.name));
    hotToppings.forEach(t => availableNames.add(t.name));
    coldToppings.forEach(t => availableNames.add(t.name));
    sauces.forEach(t => availableNames.add(t.name));
    meats.forEach(t => availableNames.add(t.name));

    // Filter ingredients to only show what's available
    return ingredients.filter(ing => availableNames.has(ing.name));
  };

  const availableIngredients = getAvailableIngredients();
  const categories: Ingredient["category"][] = ["Bases", "Proteins", "Cold Toppings", "Sauces", "Sides"];

  return (
    <div className="fixed right-2 top-16 sm:right-4 sm:top-20 z-50 w-72 sm:w-80 max-h-[80vh] sm:max-h-none rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden">
      {/* Modern Geometric Pattern Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(135deg, #3d4f5c 0%, #2c3e50 50%, #34495e 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ mixBlendMode: 'normal' }}>
          <defs>
            {/* Stripe pattern for circles */}
            <pattern id="stripePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="4" fill="#ffffff"/>
              <rect y="4" width="8" height="4" fill="#3d4f5c"/>
            </pattern>
            
            {/* Dot grid pattern */}
            <pattern id="dotGrid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.5" fill="#00d4aa"/>
            </pattern>
            
            {/* Yellow dot grid */}
            <pattern id="yellowDotGrid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.5" fill="#ffc107"/>
            </pattern>
          </defs>
          
          {/* Large yellow/orange circles */}
          <circle cx="10%" cy="15%" r="45" fill="#ffc107" opacity="0.85"/>
          <circle cx="85%" cy="25%" r="60" fill="#ffc107" opacity="0.85"/>
          <circle cx="90%" cy="75%" r="50" fill="#ffc107" opacity="0.85"/>
          
          {/* Striped circles */}
          <circle cx="25%" cy="20%" r="35" fill="url(#stripePattern)" opacity="0.9"/>
          <circle cx="70%" cy="80%" r="40" fill="url(#stripePattern)" opacity="0.9"/>
          
          {/* Cyan/teal solid circles */}
          <circle cx="15%" cy="50%" r="30" fill="#00d4aa" opacity="0.85"/>
          <circle cx="80%" cy="45%" r="25" fill="#00d4aa" opacity="0.85"/>
          
          {/* Dot grid circles */}
          <circle cx="10%" cy="75%" r="40" fill="url(#dotGrid)" opacity="0.9"/>
          <circle cx="75%" cy="20%" r="35" fill="url(#dotGrid)" opacity="0.9"/>
          <circle cx="50%" cy="85%" r="30" fill="url(#yellowDotGrid)" opacity="0.9"/>
          
          {/* Small white circles */}
          <circle cx="30%" cy="12%" r="8" fill="#ffffff" opacity="0.7"/>
          <circle cx="60%" cy="30%" r="6" fill="#ffffff" opacity="0.7"/>
          <circle cx="85%" cy="55%" r="7" fill="#ffffff" opacity="0.7"/>
          <circle cx="20%" cy="85%" r="5" fill="#ffffff" opacity="0.7"/>
          <circle cx="55%" cy="60%" r="6" fill="#ffffff" opacity="0.7"/>
          
          {/* Outlined circles */}
          <circle cx="45%" cy="25%" r="18" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6"/>
          <circle cx="35%" cy="70%" r="15" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6"/>
          
          {/* Curved lines - solid */}
          <path d="M 0,40 Q 25,30 50,45 T 100,40" fill="none" stroke="#ffc107" strokeWidth="2" opacity="0.6"/>
          <path d="M 10,70 Q 35,60 60,75 T 110,70" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.4"/>
          
          {/* Dashed lines */}
          <line x1="5%" y1="25%" x2="40%" y2="25%" stroke="#ffc107" strokeWidth="2" strokeDasharray="8,4" opacity="0.6"/>
          <line x1="60%" y1="50%" x2="95%" y2="50%" stroke="#ffffff" strokeWidth="2" strokeDasharray="8,4" opacity="0.5"/>
          <line x1="15%" y1="80%" x2="15%" y2="95%" stroke="#ffc107" strokeWidth="2" strokeDasharray="8,4" opacity="0.6"/>
          
          {/* Small triangles */}
          <polygon points="22,45 27,55 17,55" fill="#00d4aa" opacity="0.7"/>
          <polygon points="65,15 70,25 60,25" fill="#ffffff" opacity="0.6"/>
          <polygon points="88,70 93,80 83,80" fill="#00d4aa" opacity="0.7"/>
          
          {/* Radial bursts */}
          <g opacity="0.5">
            <line x1="35%" y1="35%" x2="38%" y2="32%" stroke="#ffc107" strokeWidth="2"/>
            <line x1="35%" y1="35%" x2="38%" y2="38%" stroke="#ffc107" strokeWidth="2"/>
            <line x1="35%" y1="35%" x2="32%" y2="32%" stroke="#ffc107" strokeWidth="2"/>
            <line x1="35%" y1="35%" x2="32%" y2="38%" stroke="#ffc107" strokeWidth="2"/>
          </g>
          
          <g opacity="0.5">
            <line x1="75%" y1="65%" x2="77%" y2="63%" stroke="#ffffff" strokeWidth="1.5"/>
            <line x1="75%" y1="65%" x2="77%" y2="67%" stroke="#ffffff" strokeWidth="1.5"/>
            <line x1="75%" y1="65%" x2="73%" y2="63%" stroke="#ffffff" strokeWidth="1.5"/>
            <line x1="75%" y1="65%" x2="73%" y2="67%" stroke="#ffffff" strokeWidth="1.5"/>
          </g>
          
          {/* Concentric circles */}
          <g opacity="0.6">
            <circle cx="55%" cy="15%" r="15" fill="none" stroke="#ffc107" strokeWidth="2"/>
            <circle cx="55%" cy="15%" r="20" fill="none" stroke="#ffc107" strokeWidth="1.5"/>
          </g>
          
          {/* Small decorative dots scattered */}
          <circle cx="18%" cy="32%" r="2" fill="#ffffff" opacity="0.6"/>
          <circle cx="42%" cy="48%" r="2" fill="#00d4aa" opacity="0.6"/>
          <circle cx="68%" cy="38%" r="2" fill="#ffffff" opacity="0.6"/>
          <circle cx="52%" cy="72%" r="2" fill="#ffc107" opacity="0.6"/>
          <circle cx="28%" cy="62%" r="2" fill="#ffffff" opacity="0.6"/>
        </svg>
      </div>

      {/* Main Content Container with translucent glass effect */}
      <div className="relative bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6BBF59] to-green-600">
        <h3 className="font-bold text-white text-lg">
          {itemName ? `${itemName} Ingredients` : "Ingredient Guide"}
        </h3>
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
        <ScrollArea className="h-[400px] sm:h-[500px]">
          <div className="p-4 space-y-4">
            {categories.map(category => {
              const categoryIngredients = availableIngredients.filter(i => i.category === category);
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
    </div>
  );
}
