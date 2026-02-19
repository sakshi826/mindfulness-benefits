import { Heart, Moon, Brain, Smile, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserId } from "../lib/auth";
import { saveMindfulnessSession } from "../lib/db";
import { useState } from "react";

const benefits = [
  {
    title: "Reduced Stress",
    description: "Lower cortisol levels and feel more at ease in your daily life.",
    icon: Heart,
    color: "text-coral",
    bg: "bg-coral-muted",
    shadow: "hover:shadow-coral/20",
  },
  {
    title: "Better Sleep",
    description: "Unwind your mind for deeper, more restorative rest every night.",
    icon: Moon,
    color: "text-lavender",
    bg: "bg-lavender-muted",
    shadow: "hover:shadow-lavender/20",
  },
  {
    title: "Improved Focus",
    description: "Sharpen your attention and reduce mental clutter effortlessly.",
    icon: Brain,
    color: "text-teal",
    bg: "bg-teal-muted",
    shadow: "hover:shadow-teal/20",
  },
  {
    title: "Increased Happiness",
    description: "Boost your mood through consistent, daily mindful habits.",
    icon: Smile,
    color: "text-sunshine",
    bg: "bg-sunshine-muted",
    shadow: "hover:shadow-sunshine/20",
  },
];

const MindfulnessCard = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleGotIt = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        await saveMindfulnessSession(userId, {
          logged_at: new Date().toISOString(),
        });
        setIsLogged(true);
      } catch (error) {
        console.error("Failed to save session:", error);
        setIsLogged(true);
      }
    } else {
      setIsLogged(true);
    }
  };

  if (isLogged) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500 min-h-[400px]">
        <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center text-success relative">
          <Check className="w-12 h-12 stroke-[3]"/>
          <div className="absolute inset-0 rounded-full border-4 border-success/30 animate-ping opacity-20"/>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Mindfulness Logged</h2>
          <p className="text-muted-foreground text-lg">Your mind will thank you for this moment.</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsLogged(false)}
          className="rounded-full px-10 border-2 hover:bg-muted transition-all"
        >
          Back to list
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          Why Mindfulness Matters
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto font-medium leading-relaxed">
          Discover how a few minutes of presence can transform your mental landscape.
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`group relative flex items-center gap-6 rounded-[2rem] border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-card/80 hover:shadow-2xl ${benefit.shadow} animate-in fade-in slide-in-from-bottom-8`}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
          >
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${benefit.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base font-medium opacity-90">
                {benefit.description}
              </p>
            </div>
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`w-2 h-2 rounded-full ${benefit.bg.replace('bg-', 'bg-').split('-')[0]}-${benefit.color.split('-')[1]}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 flex justify-center">
        <Button
          onClick={handleGotIt}
          className="rounded-full w-full sm:w-auto h-16 px-12 text-xl font-bold shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90 text-white"
        >
          Got It
        </Button>
      </div>
    </div>
  );
};

export default MindfulnessCard;
