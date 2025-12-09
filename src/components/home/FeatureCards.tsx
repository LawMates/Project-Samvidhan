import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Gamepad2, 
  BookOpen, 
  Video, 
  MessageCircle, 
  BookHeart,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const features = [
  {
    title: "Interactive Games",
    description: "15+ levels of puzzles, quizzes, and word games to learn constitutional concepts.",
    icon: Gamepad2,
    path: "/games",
    color: "bg-saffron/10 text-saffron",
    borderColor: "hover:border-saffron/50",
  },
  {
    title: "Must know ",
    description: "Easy-to-understand summaries of the Preamble, Rights, Duties & more.",
    icon: BookOpen,
    path: "/learning",
    color: "bg-green-india/10 text-green-india",
    borderColor: "hover:border-green-india/50",
  },
  {
    title: "Classes",
    description: "Easy-to-understand summaries of the Preamble, Rights, Duties & more.",
    icon: BookOpen,
    path: "/learning",
    color: "bg-green-india/10 text-green-india",
    borderColor: "hover:border-green-india/50",
  },
  {
    title: "Video Lessons",
    description: "Watch engaging videos about constitutional rights and case studies.",
    icon: Video,
    path: "/videos",
    color: "bg-accent/10 text-accent",
    borderColor: "hover:border-accent/50",
  },
  {
    title: "Real-Life Stories",
    description: "Learn from real cases about women's safety, rights & legal remedies.",
    icon: BookHeart,
    path: "/stories",
    color: "bg-destructive/10 text-destructive",
    borderColor: "hover:border-destructive/50",
  },

];

export function FeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // Get all cards including one before and one after visible set
  const getDisplayCards = () => {
    const allCards = [];
    for (let i = -1; i <= cardsPerView; i++) {
      const index = (currentIndex + i + features.length) % features.length;
      allCards.push({
        ...features[index],
        position: i,
        uniqueKey: `${index}-${currentIndex}`
      });
    }
    return allCards;
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Explore & Learn
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multiple ways to understand and engage with the Indian Constitution
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-16">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground w-14 h-14"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground w-14 h-14"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                gap: '32px',
                transform: 'translateX(calc(-33.333% - 10.67px))'
              }}
            >
              {getDisplayCards().map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.uniqueKey}
                    className="flex-shrink-0"
                    style={{ width: 'calc(33.333% - 21.33px)' }}
                  >
                    <Link to={feature.path}>
                      <Card 
                        className={`h-full hover-lift card-shine border-2 border-transparent transition-all cursor-pointer ${feature.borderColor} min-h-[380px]`}
                      >
                        <CardHeader className="pb-6">
                          <div className={`w-20 h-20 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                            <Icon className="w-10 h-10" />
                          </div>
                          <CardTitle className="flex items-center justify-between text-2xl mb-2">
                            {feature.title}
                            <ArrowRight className="w-6 h-6 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-lg leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
