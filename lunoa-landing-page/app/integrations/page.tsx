import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Slack",
      description: "Get notifications and updates directly in your Slack workspace.",
      logo: "/images/mcp-integrations/react.svg",
      category: "Communication",
    },
    {
      name: "Microsoft Teams",
      description: "Seamlessly integrate with your existing Teams workflow.",
      logo: "/images/mcp-integrations/nextjs.svg",
      category: "Communication",
    },
    {
      name: "QuickBooks",
      description: "Sync financial data and automate invoice processing.",
      logo: "/images/mcp-integrations/figma.svg",
      category: "Accounting",
    },
    {
      name: "Salesforce",
      description: "Connect your CRM data with Lunoa's partner management.",
      logo: "/images/mcp-integrations/tailwind-css.svg",
      category: "CRM",
    },
    {
      name: "Trello",
      description: "Manage projects and collaborate with verified partners.",
      logo: "/images/mcp-integrations/shadcn.svg",
      category: "Project Management",
    },
    {
      name: "Zoom",
      description: "Schedule secure video meetings with potential partners.",
      logo: "/images/mcp-integrations/resend.svg",
      category: "Communication",
    },
  ]

  const categories = ["All", "Communication", "Accounting", "CRM", "Project Management"]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Seamless Business Integrations
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Connect Lunoa with your favorite business tools and streamline your workflow. Our integrations make it easy to manage partnerships without switching between platforms.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="bg-card text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <Image
                      src={integration.logo || "/placeholder.svg"}
                      alt={integration.name}
                      width={40}
                      height={40}
                      className="mr-4 opacity-70 grayscale"
                    />
                    <div>
                      <h3 className="text-foreground text-lg font-semibold">{integration.name}</h3>
                      <span className="text-primary text-sm font-medium">{integration.category}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">{integration.description}</p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Don't See Your Tool?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              We're constantly adding new integrations. Let us know what tools you'd like to see connected to Lunoa.
            </p>
            <Link href="/contact">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base">
                Request Integration
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
