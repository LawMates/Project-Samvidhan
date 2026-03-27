import { PageLayout } from "@/components/layout/PageLayout";
import { detailedTopics } from "@/data/classesData";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const classes = () => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTopic = detailedTopics[activeTopicIndex];

  const speakText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speaking === id) {
        setSpeaking(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setSpeaking(null);
      utterance.onerror = () => setSpeaking(null);
      window.speechSynthesis.speak(utterance);
      setSpeaking(id);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  const getFullText = () => {
    return activeTopic.sections.map(s =>
      `${s.heading}. ${s.content}. ${s.keyPoints?.join('. ') || ''}`
    ).join('. ');
  };

  const navigateTopic = (direction: 'prev' | 'next') => {
    window.speechSynthesis.cancel();
    setSpeaking(null);
    if (direction === 'prev' && activeTopicIndex > 0) {
      setActiveTopicIndex(activeTopicIndex - 1);
    } else if (direction === 'next' && activeTopicIndex < detailedTopics.length - 1) {
      setActiveTopicIndex(activeTopicIndex + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTopic = (index: number) => {
    window.speechSynthesis.cancel();
    setSpeaking(null);
    setActiveTopicIndex(index);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const difficultyColor = (d: string) => {
    if (d === "Basic") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (d === "Intermediate") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <PageLayout>
      <div className="flex relative min-h-[calc(100vh-4rem)]">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-3 z-50 bg-primary text-primary-foreground p-2 rounded-full shadow-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-card border-r border-border transition-transform duration-300",
            "lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="font-serif font-bold text-lg mb-1">📚 Topics</h2>
              <p className="text-xs text-muted-foreground mb-4">{detailedTopics.length} chapters • Basic to Advanced</p>
              <nav className="space-y-3">
                {/* BASIC */}
                <div>
                    <h3 className="text-base font-bold px-3 py-2 mb-2 rounded-lg border border-green-300 bg-green-200 text-green-900 shadow-sm">
                     📘 Basic
                    </h3>
                    {detailedTopics
                    .map((topic, index) => ({ topic, index }))
                    .filter(t => t.topic.difficulty === "Basic")
                    .map(({ topic, index }) => (
                        <button
                        key={topic.id}
                        onClick={() => selectTopic(index)}
                        className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2",
                            activeTopicIndex === index
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        )}
                        >
                        <span className="text-lg">{topic.icon}</span>
                        <span className="truncate">{topic.title}</span>
                        </button>
                    ))}
                </div>
                <div className="border-t border-border my-3" />

                {/* INTERMEDIATE */}
                <div>
                    <h3 className="text-base font-bold px-3 py-2 mt-4 mb-2 rounded-lg border border-yellow-300 bg-yellow-200 text-yellow-900 shadow-sm">
                     ⚙️ Intermediate
                    </h3>
                    {detailedTopics
                    .map((topic, index) => ({ topic, index }))
                    .filter(t => t.topic.difficulty === "Intermediate")
                    .map(({ topic, index }) => (
                        <button
                        key={topic.id}
                        onClick={() => selectTopic(index)}
                        className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2",
                            activeTopicIndex === index
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        )}
                        >
                        <span className="text-lg">{topic.icon}</span>
                        <span className="truncate">{topic.title}</span>
                        </button>
                    ))}
                </div>
                <div className="border-t border-border my-3" />

                {/* ADVANCED */}
                <div>
                    <h3 className="text-base font-bold px-3 py-2 mt-4 mb-2 rounded-lg border border-red-300 bg-red-200 text-red-900 shadow-sm">
                     🚀 Advanced
                    </h3>
                    {detailedTopics
                    .map((topic, index) => ({ topic, index }))
                    .filter(t => t.topic.difficulty === "Advanced")
                    .map(({ topic, index }) => (
                        <button
                        key={topic.id}
                        onClick={() => selectTopic(index)}
                        className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2",
                            activeTopicIndex === index
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        )}
                        >
                        <span className="text-lg">{topic.icon}</span>
                        <span className="truncate">{topic.title}</span>
                        </button>
                    ))}
                </div>

                </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Topic Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeTopic.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={difficultyColor(activeTopic.difficulty)}>
                        {activeTopic.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Chapter {activeTopicIndex + 1} of {detailedTopics.length}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold">{activeTopic.title}</h1>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speakText(getFullText(), activeTopic.id)}
                  className="shrink-0"
                >
                  {speaking === activeTopic.id ? (
                    <><VolumeX className="w-4 h-4 mr-1" /> Stop</>
                  ) : (
                    <><Volume2 className="w-4 h-4 mr-1" /> Listen</>
                  )}
                </Button>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${((activeTopicIndex + 1) / detailedTopics.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {activeTopic.sections.map((section, idx) => (
                <section key={idx} className="bg-card rounded-xl border border-border p-5 sm:p-6 shadow-sm">
                  <h2 className="text-xl font-serif font-semibold mb-3 text-primary">
                    {section.heading}
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Key Points
                      </h3>
                      <ul className="space-y-1.5">
                        {section.keyPoints.map((point, pi) => (
                          <li key={pi} className="flex gap-2 text-sm text-foreground/80">
                            <span className="text-primary shrink-0 mt-1">▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {section.example && (
                    <div className="mt-4 bg-accent/30 border border-accent rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-accent-foreground mb-1">💡 Example</h3>
                      <p className="text-sm text-accent-foreground/80">{section.example}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => navigateTopic('prev')}
                disabled={activeTopicIndex === 0}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {activeTopicIndex > 0 ? detailedTopics[activeTopicIndex - 1].title : 'Previous'}
                </span>
                <span className="sm:hidden">Back</span>
              </Button>
              <span className="text-sm text-muted-foreground">
                {activeTopicIndex + 1} / {detailedTopics.length}
              </span>
              <Button
                onClick={() => navigateTopic('next')}
                disabled={activeTopicIndex === detailedTopics.length - 1}
                className="gap-1"
              >
                <span className="hidden sm:inline">
                  {activeTopicIndex < detailedTopics.length - 1 ? detailedTopics[activeTopicIndex + 1].title : 'Next'}
                </span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default classes;
