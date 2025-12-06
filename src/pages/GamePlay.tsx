import { PageLayout } from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { gameLevels } from "@/data/gameData";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, Lightbulb, RotateCcw, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { WordSearchGame } from "@/components/games/WordSearchGame";

const GamePlay = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const level = gameLevels.find((l) => l.id === parseInt(levelId || "1"));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(level?.timeLimit || 120);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryCards, setMemoryCards] = useState<Array<{id: number; content: string; pair: string; flipped: boolean; matched: boolean}>>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [canFlip, setCanFlip] = useState(true);
  const [startTime] = useState(Date.now());

  // Initialize memory game cards
  useEffect(() => {
    if (level?.type === "memory") {
            const allCards: typeof memoryCards = [];
      level.questions.forEach((q, index) => {
        allCards.push({
          id: index * 2,
          content: q.question,
          pair: q.answer,
          flipped: false,
          matched: false
        });
        allCards.push({
          id: index * 2 + 1,
          content: q.answer,
          pair: q.question,
          flipped: false,
          matched: false
        });
      });
      // Shuffle
      for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
      }
      setMemoryCards(allCards);
      setMoves(0);
      setMatches(0);
      setFlippedCards([]);
      setCanFlip(true);
    }
  }, [level]);

  // Timer
  useEffect(() => {
    if (gameComplete || !level) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameComplete, level]);

  const finishGame = useCallback(async () => {
    setGameComplete(true);
    
    if (!user || !level) return;

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      // Save game session
      await supabase.from("game_sessions").insert({
        user_id: user.id,
        level_id: level.id,
        game_type: level.type,
        score: score,
        time_taken: timeTaken,
        completed: score > 0
      });

      // Update user progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("completed_levels, total_score")
        .eq("user_id", user.id)
        .single();

      if (progressData) {
        const completedLevels = progressData.completed_levels || [];
        let newTotalScore = progressData.total_score || 0;

        // Only add to completed levels if not already there and score > 0
        if (!completedLevels.includes(level.id) && score > 0) {
          completedLevels.push(level.id);
          newTotalScore += score;

          await supabase
            .from("user_progress")
            .update({
              completed_levels: completedLevels,
              total_score: newTotalScore
            })
            .eq("user_id", user.id);
        }
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [user, level, score, startTime]);

  const checkAnswer = () => {
    if (!level) return;
    
    const question = level.questions[currentQuestion];
    const correct = answer.toUpperCase().trim() === question.answer.toUpperCase().trim();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore((prev) => prev + level.pointsPerQuestion);
      toast.success("Correct! 🎉");
    } else {
      toast.error(`Wrong! The answer was: ${question.answer}`);
    }

    setTimeout(() => {
      setShowResult(false);
      setAnswer("");
      setShowHint(false);
      
      if (currentQuestion < level.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        finishGame();
      }
    }, 2000);
  };

  const handleQuizAnswer = (selectedAnswer: string) => {
    if (!level) return;
    
    const question = level.questions[currentQuestion];
    const correct = selectedAnswer === question.answer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore((prev) => prev + level.pointsPerQuestion);
      toast.success("Correct! 🎉");
    } else {
      toast.error(`Wrong! The answer was: ${question.answer}`);
    }

    setTimeout(() => {
      setShowResult(false);
      
      if (currentQuestion < level.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        finishGame();
      }
    }, 1500);
  };

  const handleMemoryCardClick = (index: number) => {
    if (!level || !canFlip) return;
    
    const card = memoryCards[index];
    if (card.flipped || card.matched) return;
    if (flippedCards.length >= 2) return;

    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setCanFlip(false);

      const [first, second] = newFlipped;
      const firstCard = memoryCards[first];
      const secondCard = newCards[second];

      if (firstCard.content === secondCard.pair || firstCard.pair === secondCard.content) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setMemoryCards(matchedCards);
          setScore(prev => prev + level.pointsPerQuestion);
          toast.success("Match found! 🎉");
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === level.questions.length) {
              setTimeout(finishGame, 500);
            }
            return newMatches;
          });
          setFlippedCards([]);
          setCanFlip(true);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMemoryCards(resetCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  if (authLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Sign In Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Please sign in to play games and track your progress
              </p>
              <Button onClick={() => navigate("/auth")} className="gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  if (!level) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-serif">Level not found</h1>
          <Button onClick={() => navigate("/games")} className="mt-4">
            Back to Games
          </Button>
        </div>
      </PageLayout>
    );
  }

  const question = level.questions[currentQuestion];
  const maxLevelScore = level.questions.length * level.pointsPerQuestion;

  if (gameComplete) {
    const percentage = (score / maxLevelScore) * 100;
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                {percentage >= 70 ? "🎉 Great Job!" : percentage >= 40 ? "👍 Good Effort!" : "📚 Keep Learning!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score} / {maxLevelScore}
              </div>
              <Progress value={percentage} className="h-4" />
              <p className="text-muted-foreground">
                {percentage >= 70 
                  ? "You've mastered this level!" 
                  : "Try again to improve your score!"}
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/games")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
                <Button onClick={() => window.location.reload()}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/games")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Star className="w-3 h-3" />
              {score} pts
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {level.id}: {level.title}</span>
            <span>{currentQuestion + 1} / {level.questions.length}</span>
          </div>
          <Progress value={((currentQuestion + 1) / level.questions.length) * 100} />
        </div>

        {/* Game Area */}
        <Card className={`mx-auto ${level.type === "wordsearch" ? "max-w-4xl" : "max-w-2xl"}`}>
          <CardContent className="pt-6">
            {level.type === "scramble" && (
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">Unscramble this word:</p>
                <div className="text-3xl md:text-4xl font-mono font-bold tracking-widest text-primary">
                  {question.question}
                </div>
                {showHint && question.hint && (
                  <p className="text-sm text-muted-foreground italic">
                    Hint: {question.hint}
                  </p>
                )}
                <div className="flex gap-2 justify-center">
                  <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="max-w-xs text-center text-lg"
                    onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                    disabled={showResult}
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  {!showHint && question.hint && (
                    <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
                      <Lightbulb className="w-4 h-4 mr-1" />
                      Hint
                    </Button>
                  )}
                  <Button onClick={checkAnswer} disabled={!answer.trim() || showResult}>
                    Submit Answer
                  </Button>
                </div>
                {showResult && (
                  <div className={`flex items-center justify-center gap-2 ${isCorrect ? "text-secondary" : "text-destructive"}`}>
                    {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <span className="font-medium">{isCorrect ? "Correct!" : `Answer: ${question.answer}`}</span>
                  </div>
                )}
              </div>
            )}

            {level.type === "quiz" && (
              <div className="space-y-6">
                <p className="text-xl font-medium text-center">{question.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options?.map((option) => (
                    <Button
                      key={option}
                      variant={showResult && option === question.answer ? "default" : "outline"}
                      className={`h-auto py-4 px-6 text-left justify-start ${
                        showResult && option === question.answer 
                          ? "bg-secondary text-secondary-foreground" 
                          : showResult && option !== question.answer && !isCorrect
                            ? "opacity-50"
                            : ""
                      }`}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showResult && question.explanation && (
                  <p className="text-sm text-muted-foreground text-center bg-muted p-4 rounded-lg">
                    💡 {question.explanation}
                  </p>
                )}
              </div>
            )}

            {level.type === "memory" && (
                            <div className="space-y-6">
                {/* Progress Header */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Matches: {matches}/{level.questions.length}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Moves: {moves}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium text-sm">Target: &lt;20 moves</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(matches / level.questions.length) * 100}%` }}
                  />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {memoryCards.map((card, index) => (
                    <Card
                      key={card.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        card.matched ? 'opacity-50 scale-95' : 'hover:scale-105'
                      }`}
                      onClick={() => handleMemoryCardClick(index)}
                    >
                      <CardContent className="p-4 h-24 flex items-center justify-center">
                        {card.flipped || card.matched ? (
                          <div className={`text-xs text-center font-medium ${
                            card.matched ? 'text-green-600' : 'text-foreground'
                          }`}>
                            {card.content}
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <div className="text-4xl">?</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Click cards to match articles with their descriptions
                </div>
              </div>
            )}

            {level.type === "puzzle" && (
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">What does this refer to?</p>
                <div className="text-2xl font-semibold text-primary">
                  {question.question}
                </div>
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="max-w-md mx-auto text-center"
                  onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                  disabled={showResult}
                />
                <Button onClick={checkAnswer} disabled={!answer.trim() || showResult}>
                  Submit
                </Button>
                {showResult && (
                  <div className={`flex items-center justify-center gap-2 ${isCorrect ? "text-secondary" : "text-destructive"}`}>
                    {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <span className="font-medium">{isCorrect ? "Correct!" : `Answer: ${question.answer}`}</span>
                  </div>
                )}
              </div>
            )}

            {level.type === "truthlie" && (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge variant="outline" className="mb-4 text-lg px-4 py-2">🤥 2 Truths, 1 Lie</Badge>
                  <p className="text-xl font-medium">Guess the LIE!</p>
                  <p className="text-sm text-muted-foreground mt-2">One of these statements is false. Can you spot it?</p>
                </div>
                <div className="grid gap-3">
                  {question.options?.map((option, index) => (
                    <Button
                      key={option}
                      variant={showResult && option === question.answer ? "destructive" : "outline"}
                      className={`h-auto py-4 px-6 text-left justify-start whitespace-normal ${
                        showResult && option === question.answer 
                          ? "bg-destructive text-destructive-foreground" 
                          : showResult && option !== question.answer
                            ? "bg-secondary/20 border-secondary"
                            : ""
                      }`}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={showResult}
                    >
                      <span className="mr-3 font-bold text-lg">{index + 1}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
                {showResult && (
                  <div className="space-y-3">
                    <div className={`flex items-center justify-center gap-2 ${isCorrect ? "text-secondary" : "text-destructive"}`}>
                      {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      <span className="font-medium">{isCorrect ? "You found the lie! 🎉" : "Wrong! That was actually true."}</span>
                    </div>
                    {question.explanation && (
                      <p className="text-sm text-muted-foreground text-center bg-muted p-4 rounded-lg">
                        💡 {question.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {level.type === "wordsearch" && (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground text-lg">Can you find all the hidden words in the grid?</p>
                <WordSearchGame
                  words={level.questions.map(q => q.answer)}
                  onWordFound={(word) => {
                    setScore(prev => prev + level.pointsPerQuestion);
                  }}
                  onAllWordsFound={finishGame}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default GamePlay;
