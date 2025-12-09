import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getConstitutionFunFact } from "@/services/geminiService";

export function FunFactCard() {
  const [currentFact, setCurrentFact] = useState("Click the refresh button to discover amazing facts about the Indian Constitution!");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewFact = async () => {
    setIsLoading(true);
    try {
      const fact = await getConstitutionFunFact();
      setCurrentFact(fact);
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      // This shouldn't happen now since getConstitutionFunFact has fallback
      setCurrentFact("The Constitution took 2 years, 11 months and 18 days to write - almost 3 years of non-stop drafting!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewFact();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-gold/10 via-card to-saffron/10 border-gold/20 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-2xl font-serif">
          <Lightbulb className="w-6 h-6 text-gold" />
          Fun Fact of the Day
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchNewFact} 
          disabled={isLoading}
          className="hover:bg-gold/10"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-foreground">{currentFact}</p>
      </CardContent>
    </Card>
  );
}
