import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Please read these Terms of Service carefully before using the Lunoa platform.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20 text-left max-w-5xl mx-auto">
            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              By accessing or using the Lunoa platform, you agree to be bound by these Terms of Service and all terms incorporated by reference. If you do not agree to all of these terms, do not use our platform.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">2. Changes to Terms</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Lunoa reserves the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the updated Terms on our website. Your continued use of the platform after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              To access certain features of the platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">4. Prohibited Conduct</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              You agree not to engage in any of the following prohibited activities: (a) copying, distributing, or disclosing any part of the Service in any medium; (b) using any automated system, including without limitation "robots," "spiders," "offline readers," etc., to access the Service; (c) transmitting spam, chain letters, or other unsolicited email; (d) attempting to interfere with, compromise the system integrity or security or decipher any transmissions to or from the servers running the Service.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">5. Disclaimers</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              The Service is provided on an "as is" and "as available" basis. Use of the Service is at your own risk. To the maximum extent permitted by applicable law, the Service is provided without warranties of any kind, whether express or implied.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              To the maximum extent permitted by applicable law, in no event shall Lunoa, its affiliates, agents, directors, employees, suppliers or licensors be liable for any indirect, punitive, incidental, special, consequential or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data or other intangible losses, arising out of or relating to the use of, or inability to use, this service.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">7. Governing Law</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              These Terms shall be governed by the laws of the jurisdiction where Lunoa is incorporated, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              If you have any questions about these Terms, please contact us at support@lunoa.com.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Join Lunoa today and experience secure, trusted B2B commerce.
            </p>
            <Link href="https://lunoa.io" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
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
