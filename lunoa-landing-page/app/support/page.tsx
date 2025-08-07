import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Lunoa Support
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              We're here to help! Find answers to your questions or get in touch with our support team.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20 text-center max-w-6xl mx-auto">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-12">How Can We Help You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Get detailed assistance for complex issues. We aim to respond within 24 hours.
                </p>
                <Link href="mailto:support@lunoa.com">
                  <Button variant="outline" className="bg-background text-primary border-primary hover:bg-primary/10">
                    Email Us
                  </Button>
                </Link>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  For urgent matters, call our support line during business hours.
                </p>
                <Link href="tel:+1234567890">
                  <Button variant="outline" className="bg-background text-primary border-primary hover:bg-primary/10">
                    Call Us
                  </Button>
                </Link>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Chat with a support agent in real-time for quick questions.
                </p>
                <Button variant="outline" className="bg-background text-primary border-primary hover:bg-primary/10">
                  Start Chat
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Submit a Support Ticket
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-12">
              For non-urgent inquiries or detailed issues, please fill out the form below.
            </p>
            <div className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
              <form className="space-y-6 text-left">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" className="mt-1 bg-background text-foreground border-border" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="your@example.com" className="mt-1 bg-background text-foreground border-border" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input id="subject" type="text" placeholder="Issue or Question" className="mt-1 bg-background text-foreground border-border" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} className="mt-1 bg-background text-foreground border-border" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Ticket
                </Button>
              </form>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
