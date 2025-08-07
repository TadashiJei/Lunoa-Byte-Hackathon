import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Lunoa API Reference
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Integrate Lunoa's powerful features directly into your applications. Access our API documentation for seamless connectivity.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20 text-left max-w-5xl mx-auto">
            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Our API allows you to programmatically interact with Lunoa's trust verification, partner matching, and secure communication features. To get started, you'll need an API key, which can be generated from your Lunoa dashboard.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">Authentication</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              All API requests must be authenticated using your API key in the `Authorization` header as a Bearer token.
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto mb-6">
              <code className="text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </pre>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">Endpoints</h2>
            <ul className="text-muted-foreground text-base leading-relaxed list-disc list-inside space-y-2 mb-6">
              <li>
                <strong>`/api/v1/partners`</strong>: Manage and retrieve verified partner profiles.
              </li>
              <li>
                <strong>`/api/v1/trust-scores`</strong>: Access trust verification data for businesses.
              </li>
              <li>
                <strong>`/api/v1/messages`</strong>: Send and receive secure messages.
              </li>
              <li>
                <strong>`/api/v1/projects`</strong>: Create and manage project listings for smart matching.
              </li>
            </ul>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">Rate Limits</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Our API has rate limits to ensure fair usage and system stability. Please refer to the full documentation for detailed rate limit information.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">SDKs and Libraries</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              We provide official SDKs for popular programming languages (Python, Node.js, Ruby) to simplify your integration process.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Need More Details?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Dive deeper into our comprehensive API documentation for detailed guides, examples, and schema definitions.
            </p>
            <Link href="/documentation" passHref>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base">
                View Full Documentation
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
