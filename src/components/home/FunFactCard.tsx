import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getFunFactFromGemini } from "@/services/geminiService";

const fallbackFacts = [
  "The Indian Constitution is the longest written constitution in the world.",
  "Dr. B.R. Ambedkar chaired the Drafting Committee.",
  "The Constitution was handwritten in Hindi and English.",
  "It took 2 years, 11 months and 18 days to complete.",
  "Article 21 guarantees Right to Life and Personal Liberty.",
];

export function FunFactCard() {
  const [currentFact, setCurrentFact] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  // Fetch from Gemini
  const fetchFact = async () => {
    setLoading(true);
    try {
      const fact = await getFunFactFromGemini();

      // Basic validation (important)
      if (!fact || fact.length < 10) {
        throw new Error("Invalid fact");
      }

      setCurrentFact(fact);
    } catch (error) {
      console.error("Using fallback fact:", error);

      // fallback if Gemini fails
      const randomFallback =
        fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];

      setCurrentFact(randomFallback);
    } finally {
      setLoading(false);
    }
  };

  // Load once on mount
  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-gold/10 via-card to-saffron/10 border-gold/20 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-serif">
          <Lightbulb className="w-5 h-5 text-gold" />
          Fun Fact of the Day
        </CardTitle>

        <Button
          variant="ghost"
          size="icon"
          onClick={fetchFact}
          disabled={loading}
          className="hover:bg-gold/10"
        >
          <RefreshCw
            className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
          />
        </Button>
      </CardHeader>

      <CardContent>
        <p className="text-lg leading-relaxed text-foreground">
          {loading ? "Generating a fact..." : currentFact}
        </p>
      </CardContent>
    </Card>
  );
}