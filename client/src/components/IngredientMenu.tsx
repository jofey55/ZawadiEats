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

interface IngredientMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuItem | null;
}

export default function IngredientMenu({ isOpen, onClose, selectedItem }: IngredientMenuProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  // Filter ingredients based on selected item
  const getAvailableIngredients = () => {
    if (!selectedItem || !selectedItem.customToppings) {
      return ingredients;
    }

    const availableNames = new Set<string>();
    const { hot, cold, sauces, meats } = selectedItem.customToppings;

    // Collect all available topping names
    hot?.forEach(t => availableNames.add(t.name));
    cold?.forEach(t => availableNames.add(t.name));
    sauces?.forEach(t => availableNames.add(t.name));
    meats?.forEach(t => availableNames.add(t.name));

    // Filter ingredients to only show what's available
    return ingredients.filter(ing => availableNames.has(ing.name));
  };

  const availableIngredients = getAvailableIngredients();
  const categories: Ingredient["category"][] = ["Bases", "Proteins", "Cold Toppings", "Sauces", "Sides"];

  return (
    <div className="fixed right-2 top-16 sm:right-4 sm:top-20 z-50 w-72 sm:w-80 max-h-[80vh] sm:max-h-none rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden">
      {/* 3D Hexagonal Background Pattern - White with Red Glowing Edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 50%, #d8d8d8 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ mixBlendMode: 'normal' }}>
          <defs>
            {/* Strong glow filter for red edges */}
            <filter id="redGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Shadow filter for depth */}
            <filter id="hexShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Main hex pattern - recessed hexagons (darker) */}
            <pattern id="hexPattern3D" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <g>
                {/* Deep recessed hex (dark shadow) */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="#c8c8c8" 
                      stroke="#999" 
                      strokeWidth="0.5"
                      opacity="0.6"/>
                {/* Inner shadow gradient */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="url(#innerShadow)" 
                      opacity="0.4"/>
              </g>
            </pattern>

            {/* Raised hexagons with glowing red edges */}
            <pattern id="hexPatternRaised" x="30" y="26" width="60" height="52" patternUnits="userSpaceOnUse">
              <g filter="url(#hexShadow)">
                {/* Bright white raised hex */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="#ffffff" 
                      stroke="#f0f0f0" 
                      strokeWidth="0.5"
                      opacity="0.9"/>
                {/* Top highlight for 3D effect */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="url(#topLight)" 
                      opacity="0.6"/>
              </g>
            </pattern>

            {/* Glowing red edge hexagons (the "popping" effect) */}
            <pattern id="hexPatternGlow" x="15" y="13" width="60" height="52" patternUnits="userSpaceOnUse">
              <g>
                {/* White hex base */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="#fafafa" 
                      opacity="0.8"/>
                {/* Glowing red edges */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="none" 
                      stroke="#FF3008" 
                      strokeWidth="2"
                      opacity="0.9"
                      filter="url(#redGlow)"/>
                {/* Inner red glow */}
                <path d="M 30 2 L 56 17.3 L 56 34.7 L 30 50 L 4 34.7 L 4 17.3 Z" 
                      fill="none" 
                      stroke="#FF3008" 
                      strokeWidth="1.5"
                      opacity="0.6"
                      filter="url(#redGlow)"/>
              </g>
            </pattern>

            {/* Gradients for lighting effects */}
            <linearGradient id="innerShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.3 }}/>
              <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0 }}/>
            </linearGradient>
            
            <linearGradient id="topLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 0.8 }}/>
              <stop offset="50%" style={{ stopColor: '#fff', stopOpacity: 0.2 }}/>
              <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0 }}/>
            </linearGradient>
          </defs>
          
          {/* Layer 1: Recessed hexagons */}
          <rect width="100%" height="100%" fill="url(#hexPattern3D)" opacity="1"/>
          
          {/* Layer 2: Raised white hexagons */}
          <rect width="100%" height="100%" fill="url(#hexPatternRaised)" opacity="0.9"/>
          
          {/* Layer 3: Glowing red edge hexagons */}
          <rect width="100%" height="100%" fill="url(#hexPatternGlow)" opacity="0.85"/>
        </svg>
        
        {/* Additional 3D depth with layered shadows */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)',
          pointerEvents: 'none'
        }}></div>
      </div>

      {/* Main Content Container with white background */}
      <div className="relative bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6BBF59] to-green-600">
        <h3 className="font-bold text-white text-lg">
          {selectedItem ? `${selectedItem.name} Ingredients` : "Ingredient Guide"}
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
