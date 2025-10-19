import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, X, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import menuData from "../menu.json";

interface BowlCustomization {
  base: string;
  mixBase?: string;
  protein: string;
  doubleProtein: boolean;
  hotToppings: string[];
  coldToppings: string[];
  sauces: string[];
}

interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  customization?: BowlCustomization;
}

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Phone number is required"),
  pickupTime: z.string().optional(),
  specialInstructions: z.string().optional(),
});

const BOWL_ITEMS = ["Veggie Bowl", "Chicken Bowl", "Steak Bowl"];

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [customizingBowl, setCustomizingBowl] = useState<any>(null);
  const [bowlCustomization, setBowlCustomization] = useState<BowlCustomization>({
    base: "saffron",
    protein: "chicken",
    doubleProtein: false,
    hotToppings: [],
    coldToppings: [],
    sauces: [],
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      pickupTime: "",
      specialInstructions: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: z.infer<typeof checkoutSchema>) => {
      const response = await apiRequest("POST", "/api/orders", {
        ...data,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: Math.round(item.price * 100),
        })),
      });
      return response.json();
    },
    onSuccess: (data: any) => {
      setOrderNumber(data.orderNumber);
      setOrderComplete(true);
      setCart([]);
      form.reset();
      toast({
        title: "Order placed!",
        description: `Your order #${data.orderNumber} has been received.`,
      });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToCart = (item: any) => {
    if (BOWL_ITEMS.includes(item.name)) {
      setCustomizingBowl(item);
      setBowlCustomization({
        base: "saffron",
        protein: item.name.includes("Chicken") ? "chicken" : item.name.includes("Steak") ? "steak" : "none",
        doubleProtein: false,
        hotToppings: [],
        coldToppings: [],
        sauces: [],
      });
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${item.name} added to your order`,
    });
  };

  const calculateBowlPrice = (basePrice: number, customization: BowlCustomization) => {
    let price = basePrice;
    
    if (customization.doubleProtein) {
      if (customization.protein === "chicken") price += 4.00;
      if (customization.protein === "steak") price += 5.50;
    }
    
    customization.coldToppings.forEach(topping => {
      if (topping === "guacamole") price += 1.75;
      if (topping === "harissa") price += 0.75;
      if (topping === "pineapple" || topping === "watermelon") price += 1.00;
    });
    
    return price;
  };

  const addCustomBowlToCart = () => {
    if (!customizingBowl) return;
    
    const finalPrice = calculateBowlPrice(customizingBowl.price, bowlCustomization);
    const customizationDetails = {
      base: bowlCustomization.base + (bowlCustomization.mixBase ? ` & ${bowlCustomization.mixBase}` : ''),
      protein: bowlCustomization.protein + (bowlCustomization.doubleProtein ? ' (Double)' : ''),
      hotToppings: bowlCustomization.hotToppings.join(', '),
      coldToppings: bowlCustomization.coldToppings.join(', '),
      sauces: bowlCustomization.sauces.join(', '),
    };
    
    setCart(prev => [...prev, {
      ...customizingBowl,
      price: finalPrice,
      quantity: 1,
      customization: bowlCustomization,
      description: `Base: ${customizationDetails.base} | Protein: ${customizationDetails.protein}${customizationDetails.hotToppings ? ' | Hot: ' + customizationDetails.hotToppings : ''}${customizationDetails.coldToppings ? ' | Cold: ' + customizationDetails.coldToppings : ''}${customizationDetails.sauces ? ' | Sauce: ' + customizationDetails.sauces : ''}`,
    }]);
    
    toast({
      title: "Bowl added to cart",
      description: `Custom ${customizingBowl.name} added`,
    });
    
    setCustomizingBowl(null);
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.name === name
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }
    createOrderMutation.mutate(data);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl" data-testid="text-order-success">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg">Order #{orderNumber}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-700">
              Thank you for your order! We'll start preparing it right away.
            </p>
            <p className="text-gray-700">
              You'll receive a confirmation email at the address you provided.
            </p>
            <div className="pt-6 space-y-3">
              <Button onClick={() => setOrderComplete(false)} className="w-full" data-testid="button-order-another">
                Place Another Order
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"} className="w-full" data-testid="button-back-home">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleTopping = (category: 'hotToppings' | 'coldToppings' | 'sauces', item: string) => {
    setBowlCustomization(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(t => t !== item)
        : [...prev[category], item]
    }));
  };

  const currentBowlPrice = customizingBowl ? calculateBowlPrice(customizingBowl.price, bowlCustomization) : 0;

  return (
    <div className="min-h-screen bg-white">
      <Dialog open={!!customizingBowl} onOpenChange={() => setCustomizingBowl(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Build Your Bowl</DialogTitle>
            <DialogDescription>Customize your {customizingBowl?.name}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Step 1: Base */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Step 1: Choose Your Base</h3>
              <RadioGroup value={bowlCustomization.base} onValueChange={(value) => setBowlCustomization(prev => ({ ...prev, base: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saffron" id="saffron" />
                  <Label htmlFor="saffron">Saffron Rice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coconut" id="coconut" />
                  <Label htmlFor="coconut">Coconut Rice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="black-beans" id="black-beans" />
                  <Label htmlFor="black-beans">Black Beans</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mix" id="mix" />
                  <Label htmlFor="mix">Mix Two Bases</Label>
                </div>
              </RadioGroup>
              {bowlCustomization.base === "mix" && (
                <div className="ml-6 space-y-2">
                  <Label>Second Base:</Label>
                  <RadioGroup value={bowlCustomization.mixBase || ""} onValueChange={(value) => setBowlCustomization(prev => ({ ...prev, mixBase: value }))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="saffron" id="mix-saffron" />
                      <Label htmlFor="mix-saffron">Saffron Rice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="coconut" id="mix-coconut" />
                      <Label htmlFor="mix-coconut">Coconut Rice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="black-beans" id="mix-beans" />
                      <Label htmlFor="mix-beans">Black Beans</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Step 2: Protein */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Step 2: Choose Your Protein</h3>
              <RadioGroup value={bowlCustomization.protein} onValueChange={(value) => setBowlCustomization(prev => ({ ...prev, protein: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chicken" id="chicken" />
                  <Label htmlFor="chicken">Grilled Chicken</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spicy-chicken" id="spicy-chicken" />
                  <Label htmlFor="spicy-chicken">Spicy Chicken</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="steak" id="steak" />
                  <Label htmlFor="steak">Steak</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="no-protein" />
                  <Label htmlFor="no-protein">No Protein (Veggie Bowl)</Label>
                </div>
              </RadioGroup>
              {bowlCustomization.protein !== "none" && (
                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox 
                    id="double-protein" 
                    checked={bowlCustomization.doubleProtein}
                    onCheckedChange={(checked) => setBowlCustomization(prev => ({ ...prev, doubleProtein: !!checked }))}
                  />
                  <Label htmlFor="double-protein">
                    Double Protein (+${bowlCustomization.protein === "steak" ? "5.50" : "4.00"})
                  </Label>
                </div>
              )}
            </div>

            {/* Step 3: Hot Toppings */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Step 3: Hot Toppings (Choose any)</h3>
              <div className="space-y-2">
                {["Black Beans", "Sweet Plantains", "Roasted Cauliflower"].map(topping => (
                  <div key={topping} className="flex items-center space-x-2">
                    <Checkbox 
                      id={topping}
                      checked={bowlCustomization.hotToppings.includes(topping)}
                      onCheckedChange={() => toggleTopping('hotToppings', topping)}
                    />
                    <Label htmlFor={topping}>{topping}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Cold Toppings */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Step 4: Fresh Toppings</h3>
              <p className="text-sm text-gray-600">Free toppings:</p>
              <div className="grid grid-cols-2 gap-2">
                {["Pickled Onions", "Pickled Cabbage", "Lettuce", "Pico de Gallo", "Roasted Corn", "Cucumber & Tomato", "Cilantro", "Quinoa"].map(topping => (
                  <div key={topping} className="flex items-center space-x-2">
                    <Checkbox 
                      id={topping}
                      checked={bowlCustomization.coldToppings.includes(topping)}
                      onCheckedChange={() => toggleTopping('coldToppings', topping)}
                    />
                    <Label htmlFor={topping} className="text-sm">{topping}</Label>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mt-4">Premium add-ons:</p>
              <div className="space-y-2">
                {[
                  { name: "Guacamole", price: 1.75 },
                  { name: "Harissa (Hot Red Sauce)", price: 0.75 },
                  { name: "Pineapple", price: 1.00 },
                  { name: "Watermelon", price: 1.00 }
                ].map(topping => (
                  <div key={topping.name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={topping.name}
                      checked={bowlCustomization.coldToppings.includes(topping.name.toLowerCase().split(' ')[0])}
                      onCheckedChange={() => toggleTopping('coldToppings', topping.name.toLowerCase().split(' ')[0])}
                    />
                    <Label htmlFor={topping.name} className="text-sm">
                      {topping.name} (+${topping.price.toFixed(2)})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 5: Sauces */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Step 5: Choose Your Sauces (up to 2)</h3>
              <div className="space-y-2">
                {["Jalapeño Salsa", "Chipotle Sauce", "Jalapeño Mayo", "Zawadi Signature Sauce", "Ranch"].map(sauce => (
                  <div key={sauce} className="flex items-center space-x-2">
                    <Checkbox 
                      id={sauce}
                      checked={bowlCustomization.sauces.includes(sauce)}
                      onCheckedChange={() => toggleTopping('sauces', sauce)}
                      disabled={bowlCustomization.sauces.length >= 2 && !bowlCustomization.sauces.includes(sauce)}
                    />
                    <Label htmlFor={sauce}>{sauce}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Price:</span>
                <span>${currentBowlPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={addCustomBowlToCart} className="w-full" size="lg">
              Add to Cart - ${currentBowlPrice.toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Order Online</h1>
          <p className="mt-2">Pick up your order at our Bloomington location</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold">Menu</h2>
            {menuData.categories.map(category => (
              <div key={category.slug} className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-600">{category.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map(item => (
                    <Card key={item.name} className="hover:shadow-lg transition-shadow" data-testid={`card-menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-amber-600">${item.price.toFixed(2)}</span>
                              <Button
                                size="sm"
                                onClick={() => addToCart(item)}
                                data-testid={`button-add-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8" data-testid="text-empty-cart">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.name} className="flex gap-3 p-3 bg-gray-50 rounded-lg" data-testid={`cart-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.name, -1)}
                                data-testid={`button-decrease-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium" data-testid={`text-quantity-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.name, 1)}
                                data-testid={`button-increase-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.name)}
                                className="ml-auto"
                                data-testid={`button-remove-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span data-testid="text-subtotal">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (8%)</span>
                        <span data-testid="text-tax">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total</span>
                        <span data-testid="text-total">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-customer-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-customer-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(612) 555-0123" {...field} data-testid="input-customer-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pickupTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Time (Optional)</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} data-testid="input-pickup-time" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialInstructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Instructions</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Any special requests..." {...field} data-testid="input-special-instructions" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={createOrderMutation.isPending}
                          data-testid="button-place-order"
                        >
                          {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
