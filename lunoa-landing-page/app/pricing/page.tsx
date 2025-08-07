import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Choose the perfect plan for your business needs. From growing MSMEs to large enterprises, we have a solution that scales with you.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <PricingSection />
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
