import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "Java Jay Bartolome",
      title: "Founder & Chief Technology Officer (CTO)",
      description: "Visionary leader with a passion for building groundbreaking technology. Java Jay founded Tomeku with the mission to transform complex challenges into powerful solutions through innovative engineering.",
      image: "https://cdn.tomeku.com/headshots/javajay.jpg",
    },
    {
      name: "Marvin James Erosa",
      title: "Principal Software Engineer & Chief Information Security Officer (CISO)",
      description: "Expert in software architecture and cybersecurity, Marvin is committed to building impenetrable digital fortresses while maintaining system performance and scalability.",
      image: "https://cdn.tomeku.com/headshots/marvin.jpg",
    },
    {
      name: "Gladwin Del Rosario",
      title: "Lead Software Engineer & Head of Infrastructure",
      description: "Specialist in scalable systems and cloud architecture, Gladwin builds the backbone of modern applications that can handle massive scale and complexity.",
      image: "https://cdn.tomeku.com/headshots/gladwin.jpg",
    },
    {
      name: "Honeylet Igot",
      title: "Chief Marketing Officer (CMO)",
      description: "Expert at bridging the gap between complex technology and market needs, Honeylet drives growth and brand strategy while ensuring our innovations reach the right audience.",
      image: "https://cdn.tomeku.com/headshots/honey.jpg",
    },
  ]

  const culturePoints = [
    {
      title: "Global Impact",
      description: "We believe technology should transcend borders and create positive change worldwide.",
    },
    {
      title: "Collaborative Excellence",
      description: "Our remote-first culture fosters innovation through diverse perspectives and seamless collaboration.",
    },
    {
      title: "Relentless Innovation",
      description: "We don't just solve problems—we anticipate them and create solutions that define the future.",
    },
    {
      title: "Mentorship & Growth",
      description: "We're committed to nurturing talent and creating an environment where everyone can reach their full potential.",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              Architects of the Future
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-12">
              Born from a collective passion for hacking the future, Tomeku was established with roots in Quezon City and a vision for global impact from day one.
            </p>

            <div className="grid md:grid-cols-2 gap-12 text-left max-w-5xl mx-auto mt-16">
              <div>
                <h2 className="text-primary text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-foreground text-lg leading-relaxed">
                  To transform complex technological challenges into powerful, innovative solutions that drive global progress. We leverage cutting-edge technologies across Web3, IoT, Cloud, and Security to create systems that not only solve today's problems but anticipate tomorrow's opportunities.
                </p>
              </div>
              <div>
                <h2 className="text-primary text-2xl md:text-3xl font-semibold mb-4">Our Vision</h2>
                <p className="text-foreground text-lg leading-relaxed">
                  To be the world's leading technology innovation partner, recognized for our ability to turn visionary ideas into reality. We envision a future where our solutions power the next generation of digital transformation across industries and continents.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight mb-12">
              Meet Our Core Team
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-16">
              Our leadership team combines decades of experience in cutting-edge technology with a shared passion for innovation and excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full mb-4 object-cover w-32 h-32 border-2 border-primary"
                  />
                  <h3 className="text-foreground text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight mb-12">
              Our Culture
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-16">
              At Tomeku, we've built a remote-first, innovative, and collaborative environment dedicated to mentorship and excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              {culturePoints.map((point, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border border-border">
                  <h3 className="text-foreground text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Join Our Journey
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-8">
              Ready to be part of a team that's shaping the future of technology? We're always looking for exceptional talent to join our global family.
            </p>
            <Link href="#" passHref>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
                View Open Positions
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
