import { MessageSquare, Sparkles, Award, TrendingUp, Target, Star, Zap, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  id: string;
  type: "praise" | "tip" | "quiz-result" | "milestone";
  title: string;
  message: string;
  time: string;
  icon: typeof Sparkles;
}

const feedbackItems: FeedbackItem[] = [
  {
    id: "1",
    type: "praise",
    title: "Great Positioning!",
    message: "Your off-the-ball movement in the last match was excellent. You created 3 clear goal-scoring opportunities by timing your runs behind the defensive line. Keep attacking that space!",
    time: "2 hours ago",
    icon: Star,
  },
  {
    id: "2",
    type: "quiz-result",
    title: "Movement Quiz Completed",
    message: "You scored 8/10 on the 'Creating Space in the Box' quiz. Great understanding of positioning concepts! Review question 5 about diagonal runs.",
    time: "Yesterday",
    icon: Award,
  },
  {
    id: "3",
    type: "tip",
    title: "Improvement Tip",
    message: "Based on your recent performance data, focus on your first touch when receiving passes with your back to goal. Try to take a controlling touch that opens up your body to see the play.",
    time: "2 days ago",
    icon: Target,
  },
  {
    id: "4",
    type: "milestone",
    title: "Speed Milestone Unlocked!",
    message: "You hit 34.2 km/h in your last match - a new personal best! This puts you in the top 15% of strikers in the league for sprint speed.",
    time: "3 days ago",
    icon: Zap,
  },
  {
    id: "5",
    type: "praise",
    title: "Work Rate Excellence",
    message: "Coach Williams highlighted your pressing intensity in the final third. You made 5 successful high recoveries which led to 2 team goals. Outstanding energy!",
    time: "4 days ago",
    icon: TrendingUp,
  },
  {
    id: "6",
    type: "tip",
    title: "Heading Technique",
    message: "Your heading accuracy is improving! To take it further, focus on directing headers downward when near the 6-yard box. Goalkeepers find these hardest to save.",
    time: "5 days ago",
    icon: Target,
  },
];

const badges = [
  { label: "Speed Demon", icon: Zap, unlocked: true },
  { label: "Top Scorer", icon: Trophy, unlocked: true },
  { label: "Playmaker", icon: Star, unlocked: true },
  { label: "Iron Man", icon: Award, unlocked: false },
  { label: "Leader", icon: TrendingUp, unlocked: false },
];

export default function Feedback() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Feedback</h1>
            <p className="text-muted-foreground text-sm">Personalized insights and progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse-gold" />
            <span className="text-sm font-medium text-gold">AI Powered</span>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          Badges Earned
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              className={cn(
                "flex-shrink-0 p-4 rounded-xl text-center transition-all animate-scale-in",
                badge.unlocked
                  ? "card-elevated"
                  : "bg-muted/50 opacity-50"
              )}
              style={{ animationDelay: `${(i + 2) * 100}ms`, minWidth: "100px" }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-2",
                  badge.unlocked ? "bg-gold" : "bg-muted"
                )}
              >
                <badge.icon
                  className={cn(
                    "w-6 h-6",
                    badge.unlocked ? "text-royal" : "text-muted-foreground"
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-xs font-medium",
                  badge.unlocked ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {badge.label}
              </p>
              {!badge.unlocked && (
                <p className="text-[10px] text-muted-foreground mt-1">Locked</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Feed */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Recent Insights
        </h2>

        {feedbackItems.map((item, i) => (
          <div
            key={item.id}
            className="flex gap-4 animate-fade-in"
            style={{ animationDelay: `${(i + 7) * 75}ms` }}
          >
            {/* AI Avatar */}
            <div className="flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  item.type === "praise" && "bg-gold",
                  item.type === "tip" && "bg-primary",
                  item.type === "quiz-result" && "bg-purple-500",
                  item.type === "milestone" && "bg-green-500"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    item.type === "praise" ? "text-royal" : "text-white"
                  )}
                />
              </div>
            </div>

            {/* Message Bubble */}
            <div className="flex-1">
              <div
                className={cn(
                  "p-4 rounded-2xl rounded-tl-sm",
                  item.type === "praise" && "bg-gold/10 border border-gold/30",
                  item.type === "tip" && "bg-primary/5 border border-primary/20",
                  item.type === "quiz-result" && "bg-purple-50 border border-purple-200",
                  item.type === "milestone" && "bg-green-50 border border-green-200"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={cn(
                      "font-semibold text-sm",
                      item.type === "praise" && "text-gold-dark",
                      item.type === "tip" && "text-primary",
                      item.type === "quiz-result" && "text-purple-700",
                      item.type === "milestone" && "text-green-700"
                    )}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase",
                      item.type === "praise" && "bg-gold/20 text-gold-dark",
                      item.type === "tip" && "bg-primary/10 text-primary",
                      item.type === "quiz-result" && "bg-purple-100 text-purple-700",
                      item.type === "milestone" && "bg-green-100 text-green-700"
                    )}
                  >
                    {item.type === "quiz-result" ? "Quiz" : item.type}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{item.message}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-2">{item.time}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
