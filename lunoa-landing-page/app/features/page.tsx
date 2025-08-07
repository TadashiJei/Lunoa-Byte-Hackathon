import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { BentoSection } from "@/components/bento-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Users, Zap, Lock, Brain, CheckCircle } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "AI-Powered Trust Verification",
      description: "Advanced algorithms verify identities, credentials, and performance history to ensure you partner with credible businesses.",
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Integrated Cybersecurity Shield",
      description: "Real-time phishing, malware, and network threat detection protects every interaction on our platform.",
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Smart Partner Matching",
      description: "AI-driven recommendations connect you with the most suitable partners based on your specific project needs.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Secure Communication Hub",
      description: "End-to-end encrypted messaging and video conferencing for confidential business discussions.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Smart Contract & Escrow",
      description: "Automated, secure transactions with milestone-based releases ensure payment protection for all parties.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Performance Analytics",
      description: "Comprehensive dashboards provide insights into partnership performance and project success rates.",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Powerful Features for Secure B2B Commerce
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Discover how Lunoa's comprehensive suite of features transforms B2B interactions through AI-powered trust, integrated security, and intelligent matching.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border border-border">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-foreground text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <BentoSection />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Ready to Experience Secure B2B Commerce?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Join thousands of businesses already using Lunoa to build trusted partnerships and grow securely.
            </p>
            <Link href="https://lunoa.io" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
                Start Free Trial
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
