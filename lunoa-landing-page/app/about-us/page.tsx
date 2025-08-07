import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              About Lunoa: Building the Future of B2B Trust
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Lunoa is revolutionizing B2B interactions by building the most trusted and secure marketplace for MSMEs and service providers. We empower businesses to connect, collaborate, and grow with confidence, backed by AI-powered trust verification and integrated cybersecurity.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20 text-center max-w-5xl mx-auto">
            <h2 className="text-primary text-3xl md:text-4xl font-semibold mb-6">Our Mission</h2>
            <p className="text-foreground text-lg md:text-xl leading-relaxed">
              Our mission is to transform the landscape of B2B commerce by providing a secure, transparent, and efficient platform where businesses can forge reliable partnerships. We aim to eliminate the risks associated with traditional B2B interactions through cutting-edge AI and cybersecurity, fostering an ecosystem of trust and growth.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center max-w-5xl mx-auto">
            <h2 className="text-primary text-3xl md:text-4xl font-semibold mb-6">Our Vision</h2>
            <p className="text-foreground text-lg md:text-xl leading-relaxed">
              We envision a global B2B marketplace where every transaction is secure, every partnership is verified, and every business, regardless of size, has equal access to trusted opportunities. Lunoa strives to be the indispensable platform that powers the next generation of secure and intelligent business collaborations worldwide.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <section className="py-12 md:py-20 text-center max-w-6xl mx-auto">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <h3 className="text-primary text-xl font-semibold mb-2">Trust & Transparency</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  We are committed to building a platform founded on unwavering trust, ensuring every interaction is transparent and every partner is thoroughly vetted.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <h3 className="text-primary text-xl font-semibold mb-2">Innovation & Security</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  We relentlessly innovate with AI and advanced cybersecurity to provide the most secure and intelligent solutions for our users.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <h3 className="text-primary text-xl font-semibold mb-2">Empowerment & Growth</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  We empower MSMEs and service providers to achieve their full potential by connecting them with reliable opportunities and fostering sustainable growth.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <section className="py-12 md:py-20 text-center max-w-5xl mx-auto">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">Why Lunoa?</h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
              In an increasingly digital world, trust is paramount. Lunoa addresses the critical need for secure and reliable B2B interactions. Our platform goes beyond simple listings, offering:
            </p>
            <ul className="text-foreground text-lg md:text-xl leading-relaxed list-disc list-inside space-y-2 text-left max-w-2xl mx-auto">
              <li><strong>AI-Powered Trust Verification:</strong> Automated vetting of identities, credentials, and performance.</li>
              <li><strong>Integrated Cybersecurity:</strong> Real-time threat detection and end-to-end encrypted communication.</li>
              <li><strong>Smart Matching:</strong> Intelligent recommendations for ideal business partners.</li>
              <li><strong>Secure Contract & Escrow:</strong> Streamlined, protected transactions with milestone-based releases.</li>
            </ul>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mt-8">
              Join Lunoa today and experience a new era of secure, efficient, and trustworthy B2B commerce.
            </p>
            <Link href="https://lunoa.io" target="_blank" rel="noopener noreferrer" className="mt-12 inline-block">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
                Join Lunoa for Free
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
