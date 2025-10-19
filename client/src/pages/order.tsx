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
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, X, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import menuData from "../menu.json";

interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Phone number is required"),
  pickupTime: z.string().optional(),
  specialInstructions: z.string().optional(),
});

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
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

  return (
    <div className="min-h-screen bg-white">
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
