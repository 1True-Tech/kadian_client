export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-4">Privacy Policy</h1>
      <p className="text-elegant max-w-2xl mb-8">
        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information at Kadian.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>We collect information you provide to us for order processing and support.</li>
        <li>Your data is protected and never sold to third parties.</li>
        <li>We use cookies to improve your experience and analyze site usage.</li>
        <li>For privacy concerns, please contact us via our <a href="/contact" className="text-accent underline">Contact page</a>.</li>
      </ul>
    </div>
  );
}
