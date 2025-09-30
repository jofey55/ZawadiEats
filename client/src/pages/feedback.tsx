import { Link } from "wouter";

export default function Feedback() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/">
          <a className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </a>
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mt-4">We Value Your Feedback</h1>
        
        <div className="mt-8 space-y-6">
          <p className="text-lg text-gray-700">
            Your feedback helps us improve. Let us know about your experience!
          </p>

          <form className="mt-8 space-y-4 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full rounded-xl border px-4 py-3"
                placeholder="Your name"
                data-testid="input-name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded-xl border px-4 py-3"
                placeholder="your@email.com"
                data-testid="input-email"
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-900">
                How was your experience?
              </label>
              <select
                id="rating"
                className="mt-1 w-full rounded-xl border px-4 py-3"
                data-testid="select-rating"
              >
                <option value="">Select a rating</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                Your Feedback
              </label>
              <textarea
                id="message"
                rows={6}
                className="mt-1 w-full rounded-xl border px-4 py-3"
                placeholder="Tell us about your experience..."
                data-testid="input-feedback"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              data-testid="button-submit-feedback"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
