export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-section mb-4">Terms of Service</h1>
      <p className="text-elegant max-w-2xl mb-8">
        By using Kadian, you agree to our terms and conditions. Please read these terms carefully before using our website or services.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Use of our site and services is subject to compliance with all applicable laws.</li>
        <li>All content, products, and services are provided &quot;as is&quot; without warranties.</li>
        <li>We reserve the right to update or modify these terms at any time.</li>
        <li>For questions, please contact us via our <a href="/contact" className="text-accent underline">Contact page</a>.</li>
      </ul>
    </div>
  );
}
