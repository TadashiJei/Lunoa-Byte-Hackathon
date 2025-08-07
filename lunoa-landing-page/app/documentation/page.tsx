import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Code, LifeBuoy, Users } from 'lucide-react'

export default function DocumentationPage() {
  const docSections = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Getting Started",
      description: "Learn how to set up your Lunoa account, verify your business, and begin your journey.",
      link: "#",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Partner Management",
      description: "Guides on finding, vetting, and collaborating with trusted business partners.",
      link: "#",
    },
    {
      icon: <LifeBuoy className="w-8 h-8 text-primary" />,
      title: "Security & Compliance",
      description: "Understand Lunoa's cybersecurity features and how we ensure data privacy and compliance.",
      link: "#",
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "API & Integrations",
      description: "Detailed documentation for developers to integrate Lunoa with existing systems.",
      link: "/api-reference",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Lunoa Documentation
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Find comprehensive guides, tutorials, and API references to help you make the most of Lunoa's platform.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {docSections.map((section, index) => (
                <Link href={section.link} key={index} className="block">
                  <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow h-full flex flex-col items-start text-left">
                    <div className="mb-4">{section.icon}</div>
                    <h3 className="text-foreground text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed flex-grow">{section.description}</p>
                    <Button variant="link" className="px-0 mt-4 text-primary hover:text-primary/80">
                      Learn More &rarr;
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Our support team is ready to assist you with any questions or issues.
            </p>
            <Link href="/support">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base">
                Contact Support
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
