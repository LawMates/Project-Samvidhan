import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FunFactCard } from "@/components/home/FunFactCard";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Project Samvidhaan</title>
        <meta 
          name="description" 
          content="Discover the Indian Constitution through interactive games, engaging stories, and AI-powered learning. Make civic education fun and memorable!" 
        />
      </Helmet>
      <PageLayout>
        <main className="bg-gradient-tricolor min-h-screen">
          <HeroSection />
          <FeatureCards />
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <FunFactCard />
              </div>
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
};

export default Index;
