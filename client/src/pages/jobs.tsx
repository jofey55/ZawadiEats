import { Link } from "wouter";

export default function Jobs() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/">
          <a className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Join Our Team</h1>
        
        <div className="mt-8 space-y-6">
          <p className="text-lg text-gray-700">
            We're always looking for passionate people to join the Zawadi Restaurant family!
          </p>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Current Openings</h2>
            <p className="mt-4 text-gray-700">
              Check back soon for available positions, or send us your resume to get on our list.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">How to Apply</h2>
            <p className="mt-4 text-gray-700">
              Email your resume and a brief introduction to:{" "}
              <a 
                href="mailto:jobs@zawadirestaurant.com" 
                className="text-gray-900 underline hover:text-gray-600"
                data-testid="link-jobs-email"
              >
                jobs@zawadirestaurant.com
              </a>
            </p>
            <p className="mt-4 text-gray-700">
              Or call us at:{" "}
              <a 
                href="tel:6122840880" 
                className="text-gray-900 underline hover:text-gray-600"
                data-testid="link-jobs-phone"
              >
                (612) 284-0880
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
