import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Lock, Video, FileText, Users, Zap } from 'lucide-react'

export default function SecureMessagingPage() {
  const features = [
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "End-to-End Encryption",
      description: "All messages are encrypted with military-grade security, ensuring your conversations remain private.",
    },
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Secure Video Conferencing",
      description: "Host encrypted video calls with potential partners without compromising sensitive information.",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Secure File Sharing",
      description: "Share documents, contracts, and files with automatic malware scanning and encryption.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Group Conversations",
      description: "Create secure group chats for multi-party negotiations and project discussions.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Identity Verification",
      description: "Verified badges ensure you're communicating with legitimate, vetted business partners.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Real-time Notifications",
      description: "Stay updated with instant notifications while maintaining security and privacy.",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Secure Communication Hub
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Communicate with confidence using Lunoa's end-to-end encrypted messaging platform. Share sensitive business information, negotiate deals, and collaborate securely with verified partners.
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
          <section className="py-12 md:py-20 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Why Choose Lunoa's Secure Messaging?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Our messaging platform uses the same encryption standards trusted by Fortune 500 companies, ensuring your business communications are always protected.
                </p>
              </div>
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">Verified Partners Only</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Communicate only with AI-verified business partners, reducing the risk of fraud and ensuring authentic business relationships.
                </p>
              </div>
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">Seamless Integration</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Our messaging system integrates directly with project management, contracts, and escrow services for a complete business solution.
                </p>
              </div>
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">Compliance Ready</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Built with GDPR, CCPA, and other privacy regulations in mind, ensuring your communications meet global compliance standards.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Start Secure Conversations Today
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Join Lunoa and experience the peace of mind that comes with truly secure business communications.
            </p>
            <Link href="https://lunoa.io" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
                Get Started Free
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
