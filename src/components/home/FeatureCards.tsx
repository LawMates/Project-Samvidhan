import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Gamepad2, 
  BookOpen, 
  Video, 
  MessageCircle, 
  BookHeart,
  Lightbulb,
  ArrowRight
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
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Explore & Learn
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multiple ways to understand and engage with the Indian Constitution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.path + index} to={feature.path}>
                <Card 
                  className={`h-full hover-lift card-shine border-2 border-transparent transition-all cursor-pointer ${feature.borderColor}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {feature.title}
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
