import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import type { Review } from "@shared/schema";
import menuData from "../menu.json";
import { Helmet } from "react-helmet";
import BowlCustomizer, { type CustomizedItem } from "@/components/BowlCustomizer";
import { useLocation } from "wouter";

const heroImages = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/gallery-5.png",
  "/images/seasoned-fries.jpg",
  "/images/sweet-potato-fries.jpg",
  "/images/plantains.jpg",
  "/images/lentil-soup.jpg",
  "/images/plantain-chips-guac.jpg",
  "/images/fruit-bowl.jpg",
  "/images/pineapple-ginger.jpg",
  "/images/hibiscus-ginger.jpg",
  "/images/og-lemonade.jpg",
  "/images/fountain-soda.jpg",
];

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const faqs = [
  {
    question: "Is your food halal?",
    answer: "Yes! We are halal-friendly and follow halal practices in our kitchen."
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Absolutely! We have several vegetarian options including our Veggie Bowl, plantains, and more. Check our menu for items tagged as 'vegetarian'."
  },
  {
    question: "What's included in a bowl?",
    answer: "Our bowls start with your choice of base (coconut rice, saffron rice, or black beans), then you choose your protein (or go veggie), and add unlimited toppings including vegetables, sauces, and seasonings."
  },
  {
    question: "Do you offer catering?",
    answer: "Yes! We cater events of all sizes. Visit our Catering page or call us at (612) 284-0880 for a custom quote."
  },
  {
    question: "Can I order for pickup?",
    answer: "Yes! You can order online directly from our website for pickup, or use Uber Eats or DoorDash for delivery."
  },
];

const uberEatsUrl = "https://www.ubereats.com/store/zawadi-restaurant-bloomington/bl9IxulbXL29K44sE6aR8Q?utm_source=website";
const doorDashUrl = "https://www.doordash.com/store/zawadi-restraint-bloomington-30199876?utm_source=website";
const phone = "(612) 284-0880";
const email = "info@zawadirestaurant.com";
const address = "1701 American Blvd E, Suite 15, Bloomington, MN 55425";

const hours = [
  { d: "Mon", h: "11:00 AM – 9:30 PM" },
  { d: "Tue", h: "11:00 AM – 9:30 PM" },
  { d: "Wed", h: "11:00 AM – 9:30 PM" },
  { d: "Thu", h: "11:00 AM – 9:30 PM" },
  { d: "Fri", h: "11:00 AM – 11:00 PM" },
  { d: "Sat", h: "11:00 AM – 11:00 PM" },
  { d: "Sun", h: "11:00 AM – 11:00 PM" },
];

function getTodaysHours() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short'
  });
  const weekday = formatter.format(now);
  const today = hours.find(h => h.d === weekday);
  return today ? today.h : "11:00 AM – 9:30 PM";
}

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
}

export default function Home() {
  const [todaysHours, setTodaysHours] = useState(getTodaysHours());
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysHours(getTodaysHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const bestSellers = menuData.categories.find(cat => cat.slug === "best-sellers")?.items || [];
  
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const handleItemClick = (item: MenuItem, categorySlug: string) => {
    // Open customizer for items that have allowedToppings (bowls, quesadillas, etc.)
    if (item.allowedToppings && item.allowedToppings.length > 0) {
      setSelectedItem(item);
      setIsCustomizerOpen(true);
    }
  };

  const handleCheckout = (customizedItem: CustomizedItem) => {
    setIsCustomizerOpen(false);
    setLocation('/order');
  };

  return (
    <>
      <Helmet>
        <title>Zawadi Restaurant - East-African Cuisine in Bloomington, MN</title>
        <meta name="description" content="Authentic East-African bowls, sambusa, and more. Order online for pickup or delivery. Halal-friendly. Located in Bloomington, MN." />
        
        <meta property="og:title" content="Zawadi Restaurant - East-African Cuisine" />
        <meta property="og:description" content="Authentic East-African bowls, sambusa, and more. Order online for pickup or delivery." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://zawadirestaurant.com" />
        <meta property="og:image" content="https://zawadirestaurant.com/images/hero.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Zawadi Restaurant",
            "image": "https://zawadirestaurant.com/images/hero.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1701 American Blvd E, Suite 15",
              "addressLocality": "Bloomington",
              "addressRegion": "MN",
              "postalCode": "55425",
              "addressCountry": "US"
            },
            "telephone": "+16122840880",
            "email": "info@zawadirestaurant.com",
            "servesCuisine": "East African",
            "priceRange": "$$",
            "openingHours": ["Mo-Th 11:00-21:30", "Fr-Su 11:00-23:00"]
          })}
        </script>
      </Helmet>
      
      <main className="min-h-screen bg-white text-slate-900">
      {/* Hero with Slideshow */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="h-full w-full"
          >
            <CarouselContent className="h-full">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <img 
                    src={image} 
                    alt={`Zawadi Restaurant - East African dishes including bowls, sambusa, plantains, and more (${index + 1})`}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-32 sm:py-40 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-medium text-white mb-3 tracking-tight">
            Zawadi Restaurant
          </h1>
          <p className="text-lg font-light text-white/90 mb-8">
            East African cuisine, made fresh
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a 
              href="/order" 
              className="rounded-full bg-red-500 px-8 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors" 
              aria-label="Order Online for Pickup"
              data-testid="button-order-online"
            >
              Order for Pickup
            </a>
            <a 
              href="#menu" 
              className="rounded-full bg-white/20 px-8 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors" 
              aria-label="View Menu"
              data-testid="button-view-menu"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="border-b border-gray-100 py-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-base text-gray-600">
            First online order? Get <span className="font-semibold text-red-500">10% off</span> with code <span className="font-mono font-medium">FIRST10</span>
          </p>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Popular dishes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <li key={item.name} className="group" data-testid={`card-bestseller-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="aspect-square w-full rounded-2xl bg-gray-50 overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-lg text-gray-900 mb-1" data-testid={`text-item-name-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <span className="text-sm font-medium text-gray-900" data-testid={`text-price-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-2">Menu</h2>
            <p className="text-base text-gray-500">
              {menuData.dietNotes}
            </p>
          </div>
          
          <div className="space-y-16">
            {menuData.categories.filter(cat => cat.slug !== "best-sellers").map((category) => {
              const categoryAccents: Record<string, string> = {
                'bowls': 'text-red-500',
                'quesadillas': 'text-red-500',
                'sambusa': 'text-red-500',
                'appetizers': 'text-green-600',
                'drinks': 'text-green-600'
              };
              const accentClass = categoryAccents[category.slug] || 'text-gray-900';
              
              return (
              <div key={category.slug} data-testid={`card-menu-${category.slug}`}>
                <h3 className={`text-2xl font-semibold mb-8 ${accentClass}`}>{category.name}</h3>
                <div className="bg-white">
                  <div className="grid grid-cols-1 gap-4">
                    {category.items.map((item) => (
                      <div 
                        key={item.name} 
                        className="group flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                        data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => handleItemClick(item, category.slug)}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-medium text-lg text-gray-900">{item.name}</h4>
                            <span className="text-base font-medium text-gray-900 flex-shrink-0">${item.price}</span>
                          </div>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-2 mb-2 flex-wrap">
                              {item.tags.map((tag, idx) => {
                                const isVegetarian = tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan');
                                return (
                                  <span 
                                    key={`${item.name}-${tag}-${idx}`} 
                                    className={`text-xs px-2 py-1 rounded ${isVegetarian ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                                  >
                                    {tag}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href={uberEatsUrl} 
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              data-testid="button-ubereats-menu"
            >
              Order on Uber Eats
            </a>
            <a 
              href={doorDashUrl} 
              className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              data-testid="button-doordash-menu"
            >
              Order on DoorDash
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">What customers say</h2>
              <p className="text-base text-gray-500">Real reviews from real people</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <div 
                  key={review.id} 
                  className="bg-gray-50 p-6 rounded-xl"
                  data-testid={`card-review-${review.id}`}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                  <p className="font-medium text-sm text-gray-900">{review.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Questions</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`} className="border-0">
                  <AccordionTrigger className="text-base font-medium text-gray-900 hover:text-gray-600 px-6 py-4">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 px-6 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Visit us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-base text-gray-700 mb-2" data-testid="text-address">{address}</p>
              <p className="text-base text-gray-700 mb-1">
                <a className="text-red-500 hover:text-red-600" href={`tel:${phone.replace(/[^\d]/g, "")}`} data-testid="link-phone">{phone}</a>
              </p>
              <p className="text-base text-gray-700 mb-8">
                <a className="text-red-500 hover:text-red-600" href={`mailto:${email}`} data-testid="link-email">{email}</a>
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200 mb-8">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps?q=1701+American+Blvd+E,+Suite+15,+Bloomington,+MN+55425&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Hours</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {hours.map((x) => (
                    <li key={x.d} className="flex justify-between" data-testid={`hours-${x.d.toLowerCase()}`}>
                      <span className="font-medium">{x.d}</span>
                      <span>{x.h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Catering</h3>
              <p className="text-sm text-gray-600 mb-6">
                Planning a large event? Get in touch for catering options.
              </p>
              <a 
                href="/catering"
                className="inline-block rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a 
              href="https://www.facebook.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-300 transition-colors"
              data-testid="link-facebook"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-300 transition-colors"
              data-testid="link-instagram"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-sm">
            <a href="/order" className="text-gray-400 hover:text-gray-300 transition-colors" data-testid="link-order-footer">Order</a>
            <a href="#menu" className="text-gray-400 hover:text-gray-300 transition-colors" data-testid="link-menu-footer">Menu</a>
            <a href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors" data-testid="link-contact-footer">Contact</a>
            <a href="/catering" className="text-gray-400 hover:text-gray-300 transition-colors" data-testid="link-catering-footer">Catering</a>
            <a href="/jobs" className="text-gray-400 hover:text-gray-300 transition-colors" data-testid="link-jobs-footer">Jobs</a>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Zawadi Restaurant</p>
        </div>
      </footer>

      <BowlCustomizer
        item={selectedItem}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onCheckout={handleCheckout}
      />
    </main>
    </>
  );
}
