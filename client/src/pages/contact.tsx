import { Link } from "wouter";

export default function Contact() {
  const phone = "(612) 284-0880";
  const email = "info@zawadirestaurant.com";
  const address = "1701 American Blvd E, Suite 15, Bloomington, MN 55425";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/">
          <a className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Contact Us</h1>
        
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Address</h2>
            <p className="mt-2 text-gray-700" data-testid="text-address">{address}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
            <p className="mt-2">
              <a 
                href={`tel:${phone.replace(/[^\d]/g, "")}`} 
                className="text-gray-700 hover:text-gray-900 underline"
                data-testid="link-phone"
              >
                {phone}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            <p className="mt-2">
              <a 
                href={`mailto:${email}`} 
                className="text-gray-700 hover:text-gray-900 underline"
                data-testid="link-email"
              >
                {email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Hours</h2>
            <div className="mt-2 space-y-1 text-gray-700">
              <p>Monday - Saturday: 11:00 AM – 9:00 PM</p>
              <p>Sunday: 12:00 PM – 7:00 PM</p>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=1701+American+Blvd+E,+Suite+15,+Bloomington,+MN+55425&output=embed"
              className="w-full h-96 rounded-2xl border"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
