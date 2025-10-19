import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please provide more details"),
});

const phone = "(612) 284-0880";
const email = "info@zawadirestaurant.com";
const address = "1701 American Blvd E, Suite 15, Bloomington, MN 55425";

const hours = [
  { d: "Monday", h: "11:00 AM – 9:30 PM" },
  { d: "Tuesday", h: "11:00 AM – 9:30 PM" },
  { d: "Wednesday", h: "11:00 AM – 9:30 PM" },
  { d: "Thursday", h: "11:00 AM – 9:30 PM" },
  { d: "Friday", h: "11:00 AM – 11:00 PM" },
  { d: "Saturday", h: "11:00 AM – 11:00 PM" },
  { d: "Sunday", h: "11:00 AM – 11:00 PM" },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactSchema>) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Sending failed",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    createContactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 text-lg">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" data-testid="text-address">{address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`tel:${phone.replace(/[^\d]/g, "")}`} 
                  className="text-amber-600 hover:underline"
                  data-testid="link-phone"
                >
                  {phone}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`mailto:${email}`} 
                  className="text-amber-600 hover:underline"
                  data-testid="link-email"
                >
                  {email}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.d} className="flex justify-between text-sm">
                      <span className="font-medium">{h.d}</span>
                      <span className="text-gray-600">{h.h}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="rounded-2xl overflow-hidden border">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=1701+American+Blvd+E,+Suite+15,+Bloomington,+MN+55425&output=embed"
                className="w-full h-80"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(612) 555-0123" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" {...field} data-testid="input-subject" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
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
                      disabled={createContactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {createContactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

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
