import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Target, Zap, TrendingUp, Users, CheckCircle } from 'lucide-react'

export default function SmartMatchingPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Algorithms",
      description: "Advanced machine learning analyzes your requirements and matches you with the most suitable partners.",
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Precision Matching",
      description: "Our system considers skills, experience, location, budget, and project requirements for perfect matches.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Performance-Based Ranking",
      description: "Partners are ranked based on their track record, client satisfaction, and successful project completion rates.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Compatibility Scoring",
      description: "Get compatibility scores that predict the likelihood of successful collaboration with each potential partner.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Real-time Recommendations",
      description: "Receive instant partner suggestions as soon as you post a project or update your requirements.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Verified Quality",
      description: "All recommended partners have passed our AI trust verification and background checks.",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Define Your Project",
      description: "Describe your project requirements, budget, timeline, and specific skills needed.",
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our AI analyzes your requirements and searches through thousands of verified partners.",
    },
    {
      step: "03",
      title: "Smart Recommendations",
      description: "Receive a curated list of partners ranked by compatibility and success probability.",
    },
    {
      step: "04",
      title: "Connect & Collaborate",
      description: "Connect with your top matches and start building successful business relationships.",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <main className="max-w-[1320px] mx-auto relative z-10 py-16 px-6 md:py-24">
        <AnimatedSection>
          <section className="text-center py-12 md:py-20">
            <h1 className="text-foreground text-4xl md:text-6xl font-semibold leading-tight mb-4">
              AI-Powered Smart Matching
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              Find your perfect business partners in minutes, not weeks. Our AI-powered matching system connects you with verified partners who are ideally suited for your specific project needs.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <section className="py-12 md:py-20">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold text-center mb-12">
              How Smart Matching Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-foreground text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-20 px-6 md:px-8 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Smart Matching Features
            </h2>
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

        <AnimatedSection delay={0.3}>
          <section className="py-12 md:py-20 px-6 md:px-8 text-center bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Why Our Smart Matching is Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">75% Faster</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Find qualified partners 75% faster than traditional methods, saving you valuable time and resources.
                </p>
              </div>
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">92% Success Rate</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Our AI-matched partnerships have a 92% success rate, significantly higher than random matching.
                </p>
              </div>
              <div>
                <h3 className="text-primary text-xl font-semibold mb-2">100% Verified</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Every recommended partner has passed our comprehensive AI trust verification process.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <section className="py-12 md:py-20 text-center">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-6">
              Ready to Find Your Perfect Partner?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Join thousands of businesses using Lunoa's Smart Matching to build successful partnerships.
            </p>
            <Link href="https://lunoa.io" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
                Start Matching Now
              </Button>
            </Link>
          </section>
        </AnimatedSection>
      </main>
      <FooterSection />
    </div>
  )
}
