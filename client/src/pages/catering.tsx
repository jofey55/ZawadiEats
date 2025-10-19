import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Utensils, Calendar, Check } from "lucide-react";

const cateringSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  eventDate: z.string().optional(),
  guestCount: z.number().optional(),
  message: z.string().min(10, "Please provide more details"),
});

export default function Catering() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof cateringSchema>>({
    resolver: zodResolver(cateringSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: undefined,
      message: "",
    },
  });

  const createCateringMutation = useMutation({
    mutationFn: async (data: z.infer<typeof cateringSchema>) => {
      const response = await apiRequest("POST", "/api/catering", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request submitted!",
        description: "We'll get back to you within 24 hours with a quote.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof cateringSchema>) => {
    createCateringMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Catering & Events</h1>
          <p className="mt-3 text-lg">Make your event memorable with authentic East-African cuisine</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <img 
              src="/images/gallery-4.png" 
              alt="Catering setup" 
              className="w-full h-80 object-cover rounded-2xl"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                  <h3 className="font-semibold">Any Size</h3>
                  <p className="text-sm text-gray-600">10-200+ guests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Utensils className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                  <h3 className="font-semibold">Custom Menu</h3>
                  <p className="text-sm text-gray-600">Tailored to you</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                  <h3 className="font-semibold">Flexible</h3>
                  <p className="text-sm text-gray-600">Book ahead</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3">
              {[
                "Customizable menu options",
                "Halal-friendly dishes",
                "Party trays for groups of all sizes",
                "Event space available",
                "Professional setup and service",
                "Dietary accommodations (vegetarian, gluten-free)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
            <CardDescription>
              Tell us about your event and we'll create a custom catering package for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(612) 555-0123" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="50" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            data-testid="input-guests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your event, menu preferences, dietary restrictions, etc..."
                          rows={5}
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createCateringMutation.isPending}
                  data-testid="button-submit"
                >
                  {createCateringMutation.isPending ? "Submitting..." : "Request Quote"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <a href="/" className="text-amber-600 hover:underline" data-testid="link-back-home">
              ← Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
