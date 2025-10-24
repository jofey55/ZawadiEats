import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  image: string;
}

interface BowlCustomizerProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (customizedItem: CustomizedItem) => void;
}

export interface CustomizedItem {
  baseItem: MenuItem;
  base: string;
  protein: string;
  toppings: string[];
  sauce: string;
  totalPrice: number;
}

const bases = [
  { name: "Coconut Rice", price: 0 },
  { name: "Saffron Rice", price: 0 },
  { name: "Black Beans", price: 0 },
  { name: "Mixed Greens", price: 1.5 },
];

const proteins = [
  { name: "Grilled Chicken", price: 0 },
  { name: "Spiced Beef", price: 2 },
  { name: "Falafel (Veggie)", price: 0 },
  { name: "Extra Protein", price: 4 },
  { name: "No Protein", price: -2 },
];

const toppings = [
  "Tomatoes",
  "Cucumbers",
  "Red Onions",
  "Pickled Vegetables",
  "Avocado (+$2)",
  "Jalapeños",
  "Corn",
  "Black Olives",
  "Feta Cheese (+$1.5)",
  "Fresh Cilantro",
];

const sauces = [
  "Spicy Peri-Peri",
  "Mild Garlic",
  "Creamy Tahini",
  "Lemon Herb",
  "Mango Chutney",
  "No Sauce",
];

export default function BowlCustomizer({ item, isOpen, onClose, onCheckout }: BowlCustomizerProps) {
  const [selectedBase, setSelectedBase] = useState(bases[0].name);
  const [selectedProtein, setSelectedProtein] = useState(proteins[0].name);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = useState(sauces[0]);

  // Reset selections when item changes or modal opens
  useEffect(() => {
    if (item && isOpen) {
      setSelectedBase(bases[0].name);
      setSelectedProtein(proteins[0].name);
      setSelectedToppings([]);
      setSelectedSauce(sauces[0]);
    }
  }, [item, isOpen]);

  if (!item) return null;

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    
    const basePrice = bases.find(b => b.name === selectedBase)?.price || 0;
    const proteinPrice = proteins.find(p => p.name === selectedProtein)?.price || 0;
    
    total += basePrice + proteinPrice;
    
    selectedToppings.forEach(topping => {
      if (topping.includes("Avocado")) total += 2;
      if (topping.includes("Feta")) total += 1.5;
    });
    
    return total;
  };

  const handleCheckout = () => {
    const customizedItem: CustomizedItem = {
      baseItem: item,
      base: selectedBase,
      protein: selectedProtein,
      toppings: selectedToppings,
      sauce: selectedSauce,
      totalPrice: calculateTotalPrice(),
    };
    onCheckout(customizedItem);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full">
              {/* Left Side - Customization Options */}
              <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-slate-900">Build Your Bowl</h2>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    data-testid="button-close-customizer"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                {/* Base Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Base</h3>
                  <div className="space-y-2">
                    {bases.map((base) => (
                      <button
                        key={base.name}
                        onClick={() => setSelectedBase(base.name)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          selectedBase === base.name
                            ? "border-red-500 bg-red-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        data-testid={`button-base-${base.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{base.name}</span>
                          {base.price > 0 && (
                            <span className="text-sm text-orange-600">+${base.price.toFixed(2)}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Protein Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Protein</h3>
                  <div className="space-y-2">
                    {proteins.map((protein) => (
                      <button
                        key={protein.name}
                        onClick={() => setSelectedProtein(protein.name)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          selectedProtein === protein.name
                            ? "border-red-500 bg-red-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        data-testid={`button-protein-${protein.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{protein.name}</span>
                          {protein.price !== 0 && (
                            <span className={`text-sm ${protein.price > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                              {protein.price > 0 ? '+' : ''}${protein.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toppings Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Add Toppings <span className="text-sm font-normal text-slate-500">(Select multiple)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {toppings.map((topping) => (
                      <button
                        key={topping}
                        onClick={() => toggleTopping(topping)}
                        className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                          selectedToppings.includes(topping)
                            ? "border-red-500 bg-red-50 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        data-testid={`button-topping-${topping.toLowerCase().replace(/\s+/g, '-').replace(/[()$+]/g, '')}`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedToppings.includes(topping) ? (
                            <Minus className="w-4 h-4 text-red-500" />
                          ) : (
                            <Plus className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="text-sm font-medium text-slate-900">{topping}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sauce Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Sauce</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sauces.map((sauce) => (
                      <button
                        key={sauce}
                        onClick={() => setSelectedSauce(sauce)}
                        className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                          selectedSauce === sauce
                            ? "border-red-500 bg-red-50 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        data-testid={`button-sauce-${sauce.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="text-sm font-medium text-slate-900">{sauce}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Item Preview */}
              <div className="w-1/2 p-8 flex flex-col">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.7, delay: 0.2 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                      />
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                        <div className="text-center">
                          <div className="text-xs font-bold">Total</div>
                          <div className="text-xl font-black">${calculateTotalPrice().toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mt-6 text-center">{item.name}</h3>
                    <p className="text-slate-600 text-center mt-2">{item.description}</p>

                    {/* Order Summary */}
                    <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">Your Bowl</h4>
                      <div className="space-y-1 text-sm text-slate-700">
                        <div className="flex justify-between">
                          <span>Base:</span>
                          <span className="font-semibold">{selectedBase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-semibold">{selectedProtein}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sauce:</span>
                          <span className="font-semibold">{selectedSauce}</span>
                        </div>
                        {selectedToppings.length > 0 && (
                          <div className="pt-2 border-t border-slate-300">
                            <span className="font-semibold">Toppings:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedToppings.map((topping) => (
                                <span
                                  key={topping}
                                  className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300"
                                >
                                  {topping}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    data-testid="button-checkout"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart & Checkout - ${calculateTotalPrice().toFixed(2)}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-6 rounded-xl border-2 border-slate-200 transition-all"
                    data-testid="button-continue-shopping"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
