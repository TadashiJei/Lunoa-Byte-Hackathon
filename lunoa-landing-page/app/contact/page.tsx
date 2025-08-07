import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-12">
              Have questions or need support? Reach out to us, and we'll be happy to assist you.
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
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} className="mt-1 bg-background text-foreground border-border" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message
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
