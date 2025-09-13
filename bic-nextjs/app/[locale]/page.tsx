import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickActionsGrid } from "@/components/sections/QuickActions/QuickActionsGrid";
import { TrustSignals } from "@/components/sections/TrustSignals/TrustSignals";
import { NewsMediaSection } from "@/components/sections/NewsMediaSection";
import { UniversitySchema } from "@/components/seo/JsonLdSchema";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

export const metadata: Metadata = {
  title: "Tongmyong University - Leading Innovation in Higher Education",
  description:
    "Discover excellence in education at Tongmyong University, Busan's premier private university. Offering innovative programs, world-class research, and global opportunities for students from over 45 countries.",
  keywords:
    "Tongmyong University, Busan University, South Korea Education, Private University, International Programs, Higher Education, Research Excellence",
  openGraph: {
    title: "Tongmyong University - Leading Innovation in Higher Education",
    description:
      "Discover excellence in education at Tongmyong University, Busan's premier private university.",
    images: ["/images/og-home.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tongmyong University - Leading Innovation in Higher Education",
    description:
      "Discover excellence in education at Tongmyong University, Busan's premier private university.",
    images: ["/images/og-home.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ko: "/ko",
      zh: "/zh",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <UniversitySchema />
      <main className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Actions Grid */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={100}>
          <section
            id="quick-actions"
            className="bg-background anchor-target py-16"
          >
            <div className="container mx-auto px-4">
              <QuickActionsGrid />
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* Trust Signals */}
        <ScrollAnimationWrapper animation="fadeIn" delay={200}>
          <section id="about-stats" className="bg-muted/50 anchor-target py-16">
            <div className="container mx-auto px-4">
              <TrustSignals />
            </div>
          </section>
        </ScrollAnimationWrapper>

        {/* News & Media Section */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
          <section
            id="news-media"
            className="bg-background anchor-target py-16"
          >
            <div className="container mx-auto px-4">
              <NewsMediaSection />
            </div>
          </section>
        </ScrollAnimationWrapper>
      </main>
    </>
  );
}
