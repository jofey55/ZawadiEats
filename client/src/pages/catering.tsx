import { Link } from "wouter";

export default function Catering() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/">
          <a className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Catering & Events</h1>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl overflow-hidden">
            <img 
              src="/images/gallery-5.jpg" 
              alt="Catering buffet setup" 
              className="w-full h-96 object-cover"
            />
          </div>

          <p className="text-lg text-gray-700">
            Planning a large group event? We've got you covered with our delicious East-African cuisine and event space.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900">What We Offer</h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Customizable menu options</li>
              <li>• Halal-friendly dishes</li>
              <li>• Party trays for groups of all sizes</li>
              <li>• Event space available</li>
              <li>• Professional service staff</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Get a Quote</h2>
            <form className="mt-4 space-y-4 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Name"
                  data-testid="input-name"
                />
              </div>
              <div>
                <input
                  type="email"
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Email"
                  data-testid="input-email"
                />
              </div>
              <div>
                <input
                  type="tel"
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Phone"
                  data-testid="input-phone"
                />
              </div>
              <div>
                <input
                  type="date"
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Event Date"
                  data-testid="input-date"
                />
              </div>
              <div>
                <input
                  type="number"
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Number of Guests"
                  data-testid="input-guests"
                />
              </div>
              <div>
                <textarea
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Tell us about your event..."
                  rows={4}
                  data-testid="input-message"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                data-testid="button-submit-catering"
              >
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
