import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import type { Review } from "@shared/schema";
import menuData from "../menu.json";
import { Helmet } from "react-helmet";
import heroImage from "@assets/ZawadiRestaurant_Hero_1761097027092.jpg";

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

export default function Home() {
  const [todaysHours, setTodaysHours] = useState(getTodaysHours());

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
      
      <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src={heroImage} 
            alt="Zawadi Restaurant food spread with plantains, lentil soup, sweet potato fries, fruit bowl, and house-made drinks" 
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-24 sm:py-32 text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-3 tracking-tight" style={{ fontWeight: 900 }}>
            ZAWADI RESTAURANT
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-white mb-6">
            East African Flavors FAST and FRESH
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/90">
            Bowls, sambusa, plantains & house drinks. Halal-friendly. Made to order in Bloomington.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a 
              href="/order" 
              className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all" 
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
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl font-bold" data-testid="text-special-offer">
            🎉 First Online Order? Get 10% Off with code: FIRST10
          </h2>
          <p className="mt-2 text-lg">Valid for pickup orders only</p>
          <a 
            href="/order" 
            className="mt-4 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-green-600 hover:bg-gray-100 transition-colors"
            data-testid="button-order-now-banner"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold">Best sellers</h2>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <li key={item.name} className="rounded-2xl border p-4" data-testid={`card-bestseller-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="h-40 w-full rounded-xl bg-gray-100 mb-3 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold" data-testid={`text-item-name-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</h3>
                <span className="text-sm text-gray-600" data-testid={`text-price-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>${item.price}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          <a 
            href={uberEatsUrl} 
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            data-testid="button-ubereats-bestsellers"
          >
            Order on Uber Eats
          </a>
          <a 
            href={doorDashUrl} 
            className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            data-testid="button-doordash-bestsellers"
          >
            Order on DoorDash
          </a>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Our Menu</h2>
            <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">
              {menuData.dietNotes} Prices may vary on delivery apps.
            </p>
          </div>
          
          <div className="space-y-12">
            {menuData.categories.filter(cat => cat.slug !== "best-sellers").map((category) => (
              <div key={category.slug} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" data-testid={`card-menu-${category.slug}`}>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item) => (
                      <div 
                        key={item.name} 
                        className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all duration-300 bg-white"
                        data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
                            <span className="text-lg font-bold text-amber-600 flex-shrink-0">${item.price}</span>
                          </div>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1 mb-2 flex-wrap">
                              {item.tags.map((tag, idx) => (
                                <span key={`${item.name}-${tag}-${idx}`} className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={uberEatsUrl} 
              className="rounded-xl bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors w-full sm:w-auto text-center"
              data-testid="button-ubereats-menu"
            >
              Order on Uber Eats
            </a>
            <a 
              href={doorDashUrl} 
              className="rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-amber-600 transition-colors w-full sm:w-auto text-center"
              data-testid="button-doordash-menu"
            >
              Order on DoorDash
            </a>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="bg-amber-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
            <p className="text-center text-gray-600 mb-8">Real reviews from real customers</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white p-6 rounded-2xl shadow-sm"
                  data-testid={`card-review-${review.id}`}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <p className="font-semibold text-gray-900">{review.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Location & Contact */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Visit us</h2>
            <p className="mt-2 text-sm text-gray-700" data-testid="text-address">{address}</p>
            <p className="mt-1 text-sm text-gray-700">
              Call: <a className="underline" href={`tel:${phone.replace(/[^\d]/g, "")}`} data-testid="link-phone">{phone}</a>
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Email: <a className="underline" href={`mailto:${email}`} data-testid="link-email">{email}</a>
            </p>
            <div className="mt-4 rounded-2xl overflow-hidden border">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=1701+American+Blvd+E,+Suite+15,+Bloomington,+MN+55425&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
            <div className="mt-6">
              <h3 className="font-semibold">Hours</h3>
              <ul className="mt-2 grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                {hours.map((x) => (
                  <li key={x.d} className="flex justify-between pr-4" data-testid={`hours-${x.d.toLowerCase()}`}>
                    <span>{x.d}</span>
                    <span>{x.h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Catering & Events</h2>
            <p className="mt-2 text-sm text-gray-700">
              Planning a large group? Ask about trays and our event space.
            </p>
            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                className="w-full rounded-xl border px-4 py-3" 
                placeholder="Name"
                data-testid="input-name"
              />
              <input 
                className="w-full rounded-xl border px-4 py-3" 
                placeholder="Email"
                type="email"
                data-testid="input-email"
              />
              <input 
                className="w-full rounded-xl border px-4 py-3" 
                placeholder="Phone"
                type="tel"
                data-testid="input-phone"
              />
              <textarea 
                className="w-full rounded-xl border px-4 py-3" 
                placeholder="Tell us about your event…" 
                rows={4}
                data-testid="input-message"
              />
              <button 
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
                data-testid="button-submit-catering"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-600">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a 
              href="https://www.facebook.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="link-facebook"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/zawadirestaurant" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-pink-600 transition-colors"
              data-testid="link-instagram"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/order" className="underline" data-testid="link-order-footer">Order Online</a>
            <a href={uberEatsUrl} className="underline" data-testid="link-ubereats-footer">Order on Uber Eats</a>
            <a href={doorDashUrl} className="underline" data-testid="link-doordash-footer">Order on DoorDash</a>
            <a href="#menu" className="underline" data-testid="link-menu-footer">Menu</a>
            <a href="/contact" className="underline" data-testid="link-contact-footer">Contact</a>
            <a href="/jobs" className="underline" data-testid="link-jobs-footer">Jobs</a>
            <a href="/feedback" className="underline" data-testid="link-feedback-footer">Feedback</a>
            <a href="/catering" className="underline" data-testid="link-catering-footer">Catering</a>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} Zawadi Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
