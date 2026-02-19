import { Heart, Moon, Brain, Smile, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserId } from "../lib/auth";
import { saveMindfulnessSession } from "../lib/db";
import { useState } from "react";

const benefits = [
  {
    title: "Reduced Stress",
    description: "Lower cortisol levels and feel more at ease",
    icon: Heart,
    color: "text-coral",
    bg: "bg-coral-muted",
  },
  {
    title: "Better Sleep",
    description: "Unwind your mind for deeper, restorative rest",
    icon: Moon,
    color: "text-indigo",
    bg: "bg-indigo-muted",
  },
  {
    title: "Improved Focus",
    description: "Sharpen attention and reduce mental clutter",
    icon: Brain,
    color: "text-teal",
    bg: "bg-teal-muted",
  },
  {
    title: "Increased Happiness",
    description: "Boost your mood through daily mindful habits",
    icon: Smile,
    color: "text-amber",
    bg: "bg-amber-muted",
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
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <h2 className="text-2xl font-bold">Mindfulness Logged!</h2>
        <p className="text-muted-foreground">Every small step leads to a healthier mind.</p>
        <Button variant="link" onClick={() => setIsLogged(false)}>Back to list</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Why Mindfulness Matters
        </h2>
        <p className="text-muted-foreground mx-auto max-w-sm">
          A few minutes a day can transform your life in deep and lasting ways.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {benefits?.map((benefit, index) => (
          <div
            key={benefit.title}
            className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:bg-muted/50 hover:shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${benefit.bg}`}>
              <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-card-foreground">{benefit.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={handleGotIt}
          className="rounded-full w-full sm:w-auto h-14 px-10 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
        >
          Got It
        </Button>
      </div>
    </div>
  );
};

export default MindfulnessCard;
