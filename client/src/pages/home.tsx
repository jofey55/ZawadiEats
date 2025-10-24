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
      
      <main className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-stone-50 text-slate-900">
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
        <div className="mx-auto max-w-5xl px-4 py-24 sm:py-32 text-center relative z-10">
          <h1 className="text-8xl sm:text-9xl md:text-9xl font-black text-white mb-2 tracking-tighter leading-none" style={{ fontWeight: 950, textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
            ZAWADI RESTAURANT
          </h1>
          <h2 className="text-base sm:text-lg font-normal text-white/95 mb-6">
            East African Flavors FAST and FRESH
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/90">
            Bowls, sambusa, plantains & house drinks. Halal-friendly. Made to order in Bloomington.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a 
              href="/order" 
              className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all" 
              aria-label="Order Online for Pickup"
              data-testid="button-order-online"
            >
              🛒 Order Online • Pickup
            </a>
            <a 
              href={uberEatsUrl} 
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow hover:opacity-90" 
              aria-label="Order on Uber Eats"
              data-testid="button-ubereats-hero"
            >
              Order on Uber Eats
            </a>
            <a 
              href={doorDashUrl} 
              className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-90" 
              aria-label="Order on DoorDash"
              data-testid="button-doordash-hero"
            >
              Order on DoorDash
            </a>
            <a 
              href="#menu" 
              className="rounded-2xl border border-white/70 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" 
              aria-label="View Menu"
              data-testid="button-view-menu"
            >
              View Menu
            </a>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
            <span className="text-xs">Today's hours:</span>
            <strong className="text-sm" data-testid="text-todays-hours">{todaysHours}</strong>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl font-bold" data-testid="text-special-offer">
            🎉 First Online Order? Get 10% Off with code: FIRST10
          </h2>
          <p className="mt-2 text-lg">Valid for pickup orders only</p>
          <a 
            href="/order" 
            className="mt-4 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-red-600 hover:bg-gray-100 transition-colors"
            data-testid="button-order-now-banner"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Best sellers */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/images/zawadi-restaurant-header.jpg" 
            alt="Zawadi Restaurant" 
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
        </div>
        <div className="mx-auto max-w-5xl px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900">Best sellers</h2>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <li key={item.name} className="rounded-2xl border border-slate-200 p-4 bg-white hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl" data-testid={`card-bestseller-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="h-40 w-full rounded-xl bg-slate-100 mb-3 overflow-hidden ring-2 ring-slate-200">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-xl text-slate-900" data-testid={`text-item-name-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</h3>
                <span className="text-lg text-red-600 font-bold" data-testid={`text-price-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>${item.price}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          <a 
            href={uberEatsUrl} 
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            data-testid="button-ubereats-bestsellers"
          >
            Order on Uber Eats
          </a>
          <a 
            href={doorDashUrl} 
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
            data-testid="button-doordash-bestsellers"
          >
            Order on DoorDash
          </a>
        </div>
      </div>
      </section>

      {/* Menu */}
      <section id="menu" className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/40">
        {/* Enhanced Storefront Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-100/20 via-[#faf8f5]/90 to-[#faf8f5]"></div>
          <img 
            src="/images/storefront.png" 
            alt="Zawadi Restaurant Storefront" 
            className="w-full h-full object-cover opacity-[0.08] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>
        </div>
        {/* Decorative Accent Blurs */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 to-red-400 blur-3xl" />
          <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-3xl" />
          <div className="absolute bottom-32 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-red-400 to-pink-400 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-16 relative z-10">
          <div className="text-center mb-12 bg-white rounded-2xl py-10 px-6 shadow-2xl border-2 border-slate-100">
            <h2 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4" style={{ letterSpacing: '-0.02em' }}>Our Menu</h2>
            <p className="mt-4 text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {menuData.dietNotes} Prices may vary on delivery apps.
            </p>
          </div>
          
          <div className="space-y-8 relative z-10">
            {menuData.categories.filter(cat => cat.slug !== "best-sellers").map((category) => {
              const categoryColors: Record<string, string> = {
                'appetizers': 'from-amber-400 via-orange-500 to-amber-500',
                'bowls': 'from-red-500 via-orange-500 to-red-600',
                'quesadillas': 'from-orange-500 via-amber-500 to-orange-600',
                'sambusa': 'from-pink-400 via-rose-500 to-pink-500',
                'drinks': 'from-blue-400 via-indigo-500 to-blue-500'
              };
              const colorClass = categoryColors[category.slug] || 'from-red-500 via-orange-500 to-red-600';
              
              return (
              <div key={category.slug} className="bg-white rounded-2xl shadow-2xl border-2 border-white overflow-hidden ring-4 ring-slate-200/50" data-testid={`card-menu-${category.slug}`} style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)' }}>
                <div className={`bg-gradient-to-r ${colorClass} px-6 py-5`}>
                  <h3 className="text-3xl font-bold text-white tracking-tight">{category.name}</h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 gap-6">
                    {category.items.map((item) => (
                      <div 
                        key={item.name} 
                        className="group flex gap-6 p-6 rounded-2xl border border-slate-200/50 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-orange-400/60 transition-all duration-300 cursor-pointer"
                        data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => handleItemClick(item, category.slug)}
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
                      >
                        <div className="flex-shrink-0 relative">
                          <div className="w-44 h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 shadow-md">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-extrabold text-xl">
                            ${item.price}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="mb-2">
                            <h4 className="font-extrabold text-slate-900 text-3xl leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h4>
                          </div>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-2 mb-3 flex-wrap">
                              {item.tags.map((tag, idx) => (
                                <span key={`${item.name}-${tag}-${idx}`} className="inline-flex items-center text-xs text-orange-800 font-bold px-3 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-full shadow-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-lg text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={uberEatsUrl} 
              className="rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all w-full sm:w-auto text-center"
              data-testid="button-ubereats-menu"
            >
              Order on Uber Eats
            </a>
            <a 
              href={doorDashUrl} 
              className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-xl hover:from-red-600 hover:to-orange-600 hover:shadow-2xl transition-all w-full sm:w-auto text-center"
              data-testid="button-doordash-menu"
            >
              Order on DoorDash
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">What Our Customers Say</h2>
              <p className="text-xl text-slate-700">Real reviews from real customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-white hover:shadow-3xl hover:scale-105 transition-all duration-300"
                  data-testid={`card-review-${review.id}`}
                  style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < review.rating ? "fill-orange-500 text-orange-500" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 mb-4 leading-relaxed">{review.comment}</p>
                  <p className="font-bold text-xl text-slate-900">{review.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-12 bg-white rounded-3xl py-10 px-6 shadow-2xl border-2 border-slate-100">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Everything you need to know</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-100 p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`} className="border-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 hover:text-red-600 py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-lg text-slate-700 leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-slate-100">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Visit Us</h2>
              <p className="text-lg text-slate-700 mb-3" data-testid="text-address">{address}</p>
              <p className="text-lg text-slate-700 mb-2">
                Call: <a className="font-bold text-red-600 hover:text-red-700 underline" href={`tel:${phone.replace(/[^\d]/g, "")}`} data-testid="link-phone">{phone}</a>
              </p>
              <p className="text-lg text-slate-700 mb-6">
                Email: <a className="font-bold text-red-600 hover:text-red-700 underline" href={`mailto:${email}`} data-testid="link-email">{email}</a>
              </p>
              <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps?q=1701+American+Blvd+E,+Suite+15,+Bloomington,+MN+55425&output=embed"
                  className="h-72 w-full"
                  loading="lazy"
                />
              </div>
              <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Hours</h3>
                <ul className="grid grid-cols-2 gap-y-3 text-base text-slate-700">
                  {hours.map((x) => (
                    <li key={x.d} className="flex justify-between pr-6 font-medium" data-testid={`hours-${x.d.toLowerCase()}`}>
                      <span className="font-bold">{x.d}</span>
                      <span>{x.h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-slate-100">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Catering & Events</h2>
              <p className="text-lg text-slate-700 mb-6">
                Planning a large group? Ask about trays and our event space.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 px-5 py-4 text-lg placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all" 
                  placeholder="Name"
                  data-testid="input-name"
                />
                <input 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 px-5 py-4 text-lg placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all" 
                  placeholder="Email"
                  type="email"
                  data-testid="input-email"
                />
                <input 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 px-5 py-4 text-lg placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all" 
                  placeholder="Phone"
                  type="tel"
                  data-testid="input-phone"
                />
                <textarea 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white text-slate-900 px-5 py-4 text-lg placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all" 
                  placeholder="Tell us about your event…" 
                  rows={5}
                  data-testid="input-message"
                />
                <button 
                  className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4 text-lg font-bold text-white shadow-xl hover:from-red-600 hover:to-orange-600 hover:shadow-2xl transition-all"
                  data-testid="button-submit-catering"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 py-12 text-center text-white border-t-4 border-red-500">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-8 mb-8">
            <a 
              href="https://www.facebook.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-4 rounded-full hover:bg-white/20 hover:scale-110 transition-all"
              data-testid="link-facebook"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook className="w-8 h-8 text-white" />
            </a>
            <a 
              href="https://www.instagram.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-4 rounded-full hover:bg-white/20 hover:scale-110 transition-all"
              data-testid="link-instagram"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="w-8 h-8 text-white" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a href="/order" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-order-footer">Order Online</a>
            <a href={uberEatsUrl} className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-ubereats-footer">Order on Uber Eats</a>
            <a href={doorDashUrl} className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-doordash-footer">Order on DoorDash</a>
            <a href="#menu" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-menu-footer">Menu</a>
            <a href="/contact" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-contact-footer">Contact</a>
            <a href="/jobs" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-jobs-footer">Jobs</a>
            <a href="/feedback" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-feedback-footer">Feedback</a>
            <a href="/catering" className="text-lg font-semibold hover:text-orange-400 transition-colors" data-testid="link-catering-footer">Catering</a>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-lg text-white/80">© {new Date().getFullYear()} Zawadi Restaurant. All rights reserved.</p>
          </div>
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
