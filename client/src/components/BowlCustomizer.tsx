import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "../menu.json";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  image: string;
  type?: string;
  allowedToppings?: string[];
  baseProtein?: string | null;
  defaultProtein?: string;
  customToppings?: {
    hot?: Topping[];
    cold?: Topping[];
    sauces?: Topping[];
    meats?: Topping[];
    fountainDrinks?: Topping[];
  };
}

interface BowlCustomizerProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (customizedItem: CustomizedItem) => void;
}

export interface CustomizedItem {
  baseItem: MenuItem;
  hotToppings: string[];
  coldToppings: string[];
  sauces: string[];
  meat?: string;
  addFries: boolean;
  addDrink?: string;
  iceOption?: string;
  totalPrice: number;
}

interface Topping {
  name: string;
  price: number;
  image?: string;
}

export default function BowlCustomizer({ item, isOpen, onClose, onCheckout }: BowlCustomizerProps) {
  const [selectedHotToppings, setSelectedHotToppings] = useState<string[]>([]);
  const [selectedColdToppings, setSelectedColdToppings] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedMeat, setSelectedMeat] = useState<string>("");
  const [addFries, setAddFries] = useState(false);
  const [addDrink, setAddDrink] = useState<string>("");
  const [iceOption, setIceOption] = useState<string>("With Ice");
  const [selectedFountainDrink, setSelectedFountainDrink] = useState<string>("");

  // Reset selections when item changes or modal opens
  useEffect(() => {
    if (item && isOpen) {
      setSelectedHotToppings([]);
      setSelectedColdToppings([]);
      setSelectedSauces([]);
      setSelectedMeat("");
      setAddFries(false);
      setAddDrink("");
      setIceOption("With Ice");
      setSelectedFountainDrink("");

      // Quesadilla special logic: auto-select double meat (locked)
      if (item.type === "quesadilla" && item.baseProtein) {
        const proteinTopping = menuData.toppings.hot.find(t => 
          t.name.toLowerCase().includes(item.baseProtein!.toLowerCase())
        );
        if (proteinTopping) {
          setSelectedHotToppings([proteinTopping.name, proteinTopping.name]); // double meat
        }
      }
      
      // Bowl with default protein: auto-select it
      if (item.type?.includes("bowl") && item.defaultProtein) {
        const proteinTopping = menuData.toppings.hot.find(t => 
          t.name === item.defaultProtein
        );
        if (proteinTopping) {
          setSelectedHotToppings([proteinTopping.name]);
        }
      }

      // Quesadilla: auto-add guacamole on cold side
      if (item.type === "quesadilla") {
        setSelectedColdToppings(["Guacamole"]);
      }
    }
  }, [item, isOpen]);

  if (!item) return null;

  const isDrink = item.type === "drink";
  const isFountainDrink = item.type === "fountain-drink";
  const isLoadedFries = item.type === "loaded-fries";
  const isQuesadilla = item.type === "quesadilla";
  const isSimpleItem = item.type === "sambusa" || item.type === "simple-item";
  const allowedToppings = item.allowedToppings || [];
  
  // Use item-specific custom toppings if available, otherwise fall back to global toppings
  const hotToppings: Topping[] = allowedToppings.includes("hot") 
    ? (item.customToppings?.hot || menuData.toppings.hot) 
    : [];
  const coldToppings: Topping[] = allowedToppings.includes("cold") 
    ? (item.customToppings?.cold || menuData.toppings.cold) 
    : [];
  const sauces: Topping[] = allowedToppings.includes("sauces") 
    ? (item.customToppings?.sauces || menuData.toppings.sauces) 
    : [];
  const meats: Topping[] = allowedToppings.includes("meats") 
    ? (item.customToppings?.meats || menuData.toppings.meats) 
    : [];
  const drinks: Topping[] = allowedToppings.includes("drink") ? menuData.toppings.drinks : [];
  const fountainDrinks: Topping[] = allowedToppings.includes("fountainDrinks") 
    ? (item.customToppings?.fountainDrinks || menuData.toppings.fountainDrinks) 
    : [];
  const canAddFries = allowedToppings.includes("fries");
  const canAddIce = allowedToppings.includes("ice");

  const toggleHotTopping = (topping: string) => {
    setSelectedHotToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const toggleColdTopping = (topping: string) => {
    setSelectedColdToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const toggleSauce = (sauce: string) => {
    setSelectedSauces(prev =>
      prev.includes(sauce)
        ? prev.filter(s => s !== sauce)
        : [...prev, sauce]
    );
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    
    // Add hot topping prices
    selectedHotToppings.forEach(toppingName => {
      const topping = hotToppings.find(t => t.name === toppingName);
      if (topping) total += topping.price;
    });
    
    // Add cold topping prices
    selectedColdToppings.forEach(toppingName => {
      const topping = coldToppings.find(t => t.name === toppingName);
      if (topping) total += topping.price;
    });

    // Add meat price for loaded fries
    if (selectedMeat) {
      const meat = meats.find(m => m.name === selectedMeat);
      if (meat) total += meat.price;
    }
    
    // Add fries ($6)
    if (addFries) total += 6;

    // Add drink
    if (addDrink) {
      const drink = drinks.find(d => d.name === addDrink);
      if (drink) total += drink.price;
    }
    
    return total;
  };

  const handleCheckout = () => {
    const customizedItem: CustomizedItem = {
      baseItem: item,
      hotToppings: selectedHotToppings,
      coldToppings: selectedColdToppings,
      sauces: selectedSauces,
      meat: selectedMeat || undefined,
      addFries,
      addDrink: addDrink || undefined,
      iceOption: isDrink ? iceOption : undefined,
      totalPrice: calculateTotalPrice(),
    };
    onCheckout(customizedItem);
  };


  const getItemTypeLabel = () => {
    if (isDrink) return "Drink";
    if (isLoadedFries) return "Loaded Fries";
    if (isQuesadilla) return "Quesadilla";
    if (item.type?.includes("bowl")) return "Bowl";
    return "Item";
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
            className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-1 min-h-0">
              {/* Left Side - Customization Options */}
              <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-200 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Customize Your {getItemTypeLabel()}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    data-testid="button-close-customizer"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                {/* Fountain Drink Flavor Selection */}
                {isFountainDrink && fountainDrinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Flavor</h3>
                    <div className="space-y-2">
                      {fountainDrinks.map((drink) => (
                        <button
                          key={drink.name}
                          onClick={() => setSelectedFountainDrink(drink.name)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                            selectedFountainDrink === drink.name
                              ? "border-red-500 bg-red-50 shadow-md"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                          data-testid={`button-fountain-${drink.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="font-semibold text-slate-900">{drink.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drink Ice Option */}
                {canAddIce && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Ice Preference</h3>
                    <div className="space-y-2">
                      {["With Ice", "No Ice"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setIceOption(option)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                            iceOption === option
                              ? "border-red-500 bg-red-50 shadow-md"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                          data-testid={`button-ice-${option.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="font-semibold text-slate-900">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meat Selection for Loaded Fries */}
                {meats.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Meat</h3>
                    <div className="space-y-2">
                      {meats.map((meat) => (
                        <button
                          key={meat.name}
                          onClick={() => setSelectedMeat(meat.name)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                            selectedMeat === meat.name
                              ? "border-red-500 bg-red-50 shadow-md"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                          data-testid={`button-meat-${meat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="flex items-center gap-3">
                            {meat.image && (
                              <img 
                                src={meat.image} 
                                alt={meat.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 flex items-center justify-between">
                              <span className="font-semibold text-slate-900">{meat.name}</span>
                              {meat.price > 0 && (
                                <span className="text-sm text-orange-600">+${meat.price.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hot Toppings Section */}
                {hotToppings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {isQuesadilla ? "Inside the Quesadilla (Hot)" : "Hot Toppings"}
                      {isQuesadilla && item.baseProtein && (
                        <span className="text-sm font-normal text-slate-500 ml-2">(Double meat included)</span>
                      )}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {hotToppings.map((topping) => {
                        const isSelected = selectedHotToppings.includes(topping.name);
                        const count = selectedHotToppings.filter(t => t === topping.name).length;
                        
                        return (
                          <button
                            key={topping.name}
                            onClick={() => toggleHotTopping(topping.name)}
                            className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-red-500 bg-red-50 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            data-testid={`button-hot-${topping.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex items-center gap-2">
                              {topping.image && (
                                <img 
                                  src={topping.image} 
                                  alt={topping.name}
                                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                />
                              )}
                              {isSelected ? (
                                <Minus className="w-4 h-4 text-red-500 flex-shrink-0" />
                              ) : (
                                <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-slate-900 block truncate">
                                  {topping.name}
                                  {count > 1 && ` (×${count})`}
                                </span>
                                {topping.price > 0 && (
                                  <span className="text-xs text-orange-600">+${topping.price}</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cold Toppings Section */}
                {coldToppings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {isQuesadilla ? "On the Side (Cold)" : "Cold Toppings"}
                      {isQuesadilla && (
                        <span className="text-sm font-normal text-slate-500 ml-2">(Guacamole included)</span>
                      )}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {coldToppings.map((topping) => {
                        const isSelected = selectedColdToppings.includes(topping.name);
                        
                        return (
                          <button
                            key={topping.name}
                            onClick={() => toggleColdTopping(topping.name)}
                            className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-red-500 bg-red-50 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            data-testid={`button-cold-${topping.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex items-center gap-2">
                              {topping.image && (
                                <img 
                                  src={topping.image} 
                                  alt={topping.name}
                                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                />
                              )}
                              {isSelected ? (
                                <Minus className="w-4 h-4 text-red-500 flex-shrink-0" />
                              ) : (
                                <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-slate-900 block truncate">
                                  {topping.name}
                                </span>
                                {topping.price > 0 && (
                                  <span className="text-xs text-orange-600">+${topping.price}</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sauces Section */}
                {sauces.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      Sauces & Dips <span className="text-sm font-normal text-slate-500">(Select multiple)</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sauces.map((sauce) => {
                        const isSelected = selectedSauces.includes(sauce.name);
                        
                        return (
                          <button
                            key={sauce.name}
                            onClick={() => toggleSauce(sauce.name)}
                            className={`text-left px-3 py-2 rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-red-500 bg-red-50 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            data-testid={`button-sauce-${sauce.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex items-center gap-2">
                              {sauce.image && (
                                <img 
                                  src={sauce.image} 
                                  alt={sauce.name}
                                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                />
                              )}
                              {isSelected ? (
                                <Minus className="w-4 h-4 text-red-500 flex-shrink-0" />
                              ) : (
                                <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              )}
                              <span className="text-sm font-medium text-slate-900 flex-1">{sauce.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Fries Option */}
                {canAddFries && (
                  <div className="mb-6">
                    <button
                      onClick={() => setAddFries(!addFries)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        addFries
                          ? "border-red-500 bg-red-50 shadow-md"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                      data-testid="button-add-fries"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {addFries ? (
                            <Minus className="w-5 h-5 text-red-500" />
                          ) : (
                            <Plus className="w-5 h-5 text-slate-400" />
                          )}
                          <span className="font-semibold text-slate-900">Add Fries</span>
                        </div>
                        <span className="text-sm text-orange-600">+$6.00</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Add Drink Option */}
                {drinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Add a Drink (Optional)</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setAddDrink("")}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          !addDrink
                            ? "border-red-500 bg-red-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                        data-testid="button-drink-none"
                      >
                        <span className="font-semibold text-slate-900">No Drink</span>
                      </button>
                      {drinks.map((drink) => (
                        <button
                          key={drink.name}
                          onClick={() => setAddDrink(drink.name)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                            addDrink === drink.name
                              ? "border-red-500 bg-red-50 shadow-md"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                          data-testid={`button-drink-${drink.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900">{drink.name}</span>
                            <span className="text-sm text-orange-600">+${drink.price.toFixed(2)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                      <h4 className="font-bold text-slate-900 mb-2">Your Order</h4>
                      <div className="space-y-1 text-sm text-slate-700">
                        {isDrink && (
                          <div className="flex justify-between">
                            <span>Ice:</span>
                            <span className="font-semibold">{iceOption}</span>
                          </div>
                        )}
                        {selectedMeat && (
                          <div className="flex justify-between">
                            <span>Meat:</span>
                            <span className="font-semibold">{selectedMeat}</span>
                          </div>
                        )}
                        {selectedHotToppings.length > 0 && (
                          <div className="pb-2">
                            <span className="font-semibold">
                              {isQuesadilla ? "Inside:" : "Hot:"}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {Array.from(new Set(selectedHotToppings)).map((topping) => {
                                const count = selectedHotToppings.filter(t => t === topping).length;
                                return (
                                  <span
                                    key={topping}
                                    className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300"
                                  >
                                    {topping}{count > 1 ? ` (×${count})` : ''}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {selectedColdToppings.length > 0 && (
                          <div className="pb-2">
                            <span className="font-semibold">
                              {isQuesadilla ? "On the Side:" : "Cold:"}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedColdToppings.map((topping) => (
                                <span
                                  key={topping}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-300"
                                >
                                  {topping}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedSauces.length > 0 && (
                          <div className="pb-2">
                            <span className="font-semibold">Sauces:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedSauces.map((sauce) => (
                                <span
                                  key={sauce}
                                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-300"
                                >
                                  {sauce}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {addFries && (
                          <div className="pt-2 border-t border-slate-300">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Add Fries</span>
                              <span className="text-orange-600">+$6.00</span>
                            </div>
                          </div>
                        )}
                        {addDrink && (
                          <div className="pt-2 border-t border-slate-300">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Add {addDrink}</span>
                              <span className="text-orange-600">
                                +${drinks.find(d => d.name === addDrink)?.price.toFixed(2)}
                              </span>
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
