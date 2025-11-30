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
import { Briefcase } from "lucide-react";

const jobSchema = z.object({
  position: z.string().min(2, "Position is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  availability: z.string().optional(),
  experience: z.string().optional(),
});

const positions = [
  "Server",
  "Line Cook",
  "Prep Cook",
  "Cashier",
  "Kitchen Manager",
  "Other",
];

export default function Jobs() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      position: "",
      name: "",
      email: "",
      phone: "",
      availability: "",
      experience: "",
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data: z.infer<typeof jobSchema>) => {
      const response = await apiRequest("POST", "/api/jobs", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: "Thank you for applying. We'll be in touch soon!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof jobSchema>) => {
    createApplicationMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Join Our Team</h1>
          <p className="mt-3 text-lg">Be part of the Zawadi Restaurant family</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-amber-600" />
                <div>
                  <CardTitle>Why Work at Zawadi?</CardTitle>
                  <CardDescription>A great place to grow your career</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Competitive wages</li>
                <li>• Flexible scheduling</li>
                <li>• Team meal benefits</li>
                <li>• Positive work environment</li>
                <li>• Growth opportunities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {positions.slice(0, -1).map((position) => (
                  <div key={position} className="p-3 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold">{position}</h3>
                    <p className="text-sm text-gray-600">Part-time & Full-time available</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apply Now</CardTitle>
            <CardDescription>Fill out the form below to join our team</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="w-full rounded-md border px-3 py-2"
                          data-testid="select-position"
                        >
                          <option value="">Select a position</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Weekdays, Weekends" {...field} data-testid="input-availability" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your relevant experience..."
                          rows={5}
                          {...field}
                          data-testid="input-experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createApplicationMutation.isPending}
                  data-testid="button-submit"
                >
                  {createApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
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
