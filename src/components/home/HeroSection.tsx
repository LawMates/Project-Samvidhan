import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, BookOpen, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-saffron/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-india/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Project</span>
            <br />
            <span className="text-gradient-tricolor">SAMVIDHAN</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover the Indian Constitution through interactive games, engaging stories, 
            and AI-powered learning. Make civic education fun and memorable!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/games">
              <Button size="lg" className="gap-2 shadow-soft hover-lift w-full sm:w-auto">
                <Gamepad2 className="w-5 h-5" />
                Start Playing
              </Button>
            </Link>
            <Link to="/learning">
              <Button size="lg" variant="outline" className="gap-2 hover-lift w-full sm:w-auto">
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Game Levels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Learning Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-bold text-accent">AI</div>
              <div className="text-sm text-muted-foreground">Powered Chat</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
