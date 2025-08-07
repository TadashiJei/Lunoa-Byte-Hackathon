import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, Users, Megaphone, Lightbulb } from 'lucide-react'

export default function CommunityPage() {
  const communityLinks = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Community Forum",
      description: "Join discussions, ask questions, and share your insights with other Lunoa users.",
      link: "#",
      buttonText: "Visit Forum",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Discord Channel",
      description: "Connect with the Lunoa team and community members in real-time.",
      link: "#",
      buttonText: "Join Discord",
    },
    {
      icon: <Megaphone className="w-8 h-8 text-primary" />,
      title: "Announcements",
      description: "Stay up-to-date with the latest Lunoa news, features, and updates.",
      link: "#",
      buttonText: "Read Announcements",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Feature Requests",
      description: "Submit your ideas and vote on features you'd like to see in Lunoa.",
      link: "#",
      buttonText: "Suggest a Feature",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Join the Lunoa Community
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Connect with other businesses, share best practices, and get support from the Lunoa team.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {communityLinks.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border border-border h-full flex flex-col items-start text-left">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-foreground text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed flex-grow mb-4">{item.description}</p>
                  <Link href={item.link} passHref>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium text-base">
                      {item.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Stay Connected
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Follow us on social media for the latest updates and insights.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.532A8.318 8.318 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.107 4.107 0 001.27 5.477A4.072 4.072 0 012 10.77a4.096 4.096 0 003.29 4.027 4.115 4.115 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.75A1.75 1.75 0 118.25 5 1.75 1.75 0 016.5 6.75zM19 19h-3v-5.625c0-1.002-.017-2.29-.934-2.29-1.002 0-1.156.78-1.156 2.21V19h-3V8h2.891v1.297h.04c.398-.758 1.37-1.555 2.85-1.555 3.05 0 3.629 2.002 3.629 4.604V19z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
