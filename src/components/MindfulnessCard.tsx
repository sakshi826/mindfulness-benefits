import { Heart, Moon, Brain, Smile, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserId } from "../lib/auth";
import { saveMindfulnessSession } from "../lib/db";

const benefits = [
  {
    icon: Heart,
    title: "Reduced Stress",
    description: "Lower cortisol levels and feel more at ease",
    color: "text-coral",
    bg: "bg-coral-muted",
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Fall asleep faster and sleep more deeply",
    color: "text-lavender",
    bg: "bg-lavender-muted",
  },
  {
    icon: Brain,
    title: "Improved Focus",
    description: "Sharpen attention and reduce mental clutter",
    color: "text-teal",
    bg: "bg-teal-muted",
  },
  {
    icon: Smile,
    title: "Emotional Regulation",
    description: "Respond thoughtfully instead of reacting impulsively",
    color: "text-sunshine",
    bg: "bg-sunshine-muted",
  },
];

const MindfulnessCard = () => {
  const handleGotIt = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        await saveMindfulnessSession(userId, {
          logged_at: new Date().toISOString(),
          activity_type: 'meditation',
          duration_min: 5,
          guided: false,
          benefits_noted: benefits.map(b => b.title)
        });
      } catch (error) {
        console.error("Failed to save mindfulness session:", error);
      }
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Why Mindfulness?
          </h1>
          <p className="text-sm text-muted-foreground">
            Science-backed benefits of daily practice
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="space-y-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm animate-slide-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${benefit.bg}`}
                >
                  <Icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-card-foreground text-sm">
                    {benefit.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="ghost" className="rounded-full flex-1" size="lg">
            Skip
          </Button>
          <Button className="rounded-full flex-1 gap-2" size="lg" onClick={handleGotIt}>
            Got It <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessCard;
