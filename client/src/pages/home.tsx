import { useState, useEffect } from "react";
import menuData from "../menu.json";

const uberEatsUrl = "https://ubereats.com/store/zawadi-restaurant-bloomington?utm_source=site";
const doorDashUrl = "https://www.doordash.com/store/zawadi-restaurant-bloomington?utm_source=site";
const phone = "(612) 284-0880";
const email = "info@zawadirestaurant.com";
const address = "1701 American Blvd E, Suite 15, Bloomington, MN 55425";

const hours = [
  { d: "Mon", h: "11:00 AM – 9:00 PM" },
  { d: "Tue", h: "11:00 AM – 9:00 PM" },
  { d: "Wed", h: "11:00 AM – 9:00 PM" },
  { d: "Thu", h: "11:00 AM – 9:00 PM" },
  { d: "Fri", h: "11:00 AM – 9:00 PM" },
  { d: "Sat", h: "11:00 AM – 9:00 PM" },
  { d: "Sun", h: "12:00 PM – 7:00 PM" },
];

function getTodaysHours() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short'
  });
  const weekday = formatter.format(now);
  const today = hours.find(h => h.d === weekday);
  return today ? today.h : "11:00 AM – 9:00 PM";
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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/images/hero.png" 
            alt="Zawadi bowls and sambusa" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-24 sm:py-32">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            East-African flavors, fast & fresh.
          </h1>
          <p className="mt-4 max-w-xl text-white/90">
            Bowls, sambusa, plantains & house drinks. Halal-friendly. Made to order in Bloomington.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
      <section id="menu" className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-bold">Menu</h2>
          <p className="mt-2 text-sm text-gray-600">{menuData.dietNotes} Prices may vary on delivery apps.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {menuData.categories.filter(cat => cat.slug !== "best-sellers").map((category) => (
              <div key={category.slug} className="rounded-2xl border bg-white p-4" data-testid={`card-menu-${category.slug}`}>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {category.items.map((item) => (
                    <li key={item.name} data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.name} — {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a 
              href={uberEatsUrl} 
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
              data-testid="button-ubereats-menu"
            >
              Order on Uber Eats
            </a>
            <a 
              href={doorDashUrl} 
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900"
              data-testid="button-doordash-menu"
            >
              Order on DoorDash
            </a>
          </div>
        </div>
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
          <div className="flex flex-wrap items-center justify-center gap-4">
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
  );
}
