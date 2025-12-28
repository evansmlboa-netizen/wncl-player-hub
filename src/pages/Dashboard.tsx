import { Trophy, Target, Flame, Clock, MapPin, TrendingUp, Star, Zap, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const formStats = [
  { icon: Target, label: "Goals", value: 7, color: "gold" },
  { icon: Zap, label: "Assists", value: 4, color: "gold" },
  { icon: Star, label: "MOTM", value: 2, color: "gold" },
];

const quickStats = [
  { label: "Availability", value: "Confirmed", icon: CheckCircle, status: "success" },
  { label: "Training", value: "85%", icon: TrendingUp, status: "progress" },
  { label: "Match Rating", value: "7.8", icon: Star, status: "rating" },
  { label: "Goal Target", value: "12/20", icon: Target, status: "progress" },
];

const highlights = [
  { type: "praise", text: "Great header from the corner! Keep attacking those crosses.", author: "Coach Williams", time: "2h ago" },
  { type: "achievement", text: "You've completed 5 training sessions this month!", time: "1d ago" },
  { type: "praise", text: "Excellent work rate in the final third. Team player!", author: "Coach Williams", time: "3d ago" },
];

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Hero Welcome Section */}
      <section className="animate-fade-in">
        <div className="card-elevated p-6 bg-gradient-to-br from-card via-card to-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Marcus Johnson</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge-royal">Striker</span>
                <span className="badge-gold">
                  <Flame className="w-3 h-3" />
                  5 Match Streak
                </span>
              </div>
            </div>
            
            {/* Form Stats */}
            <div className="flex items-center gap-4">
              {formStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="badge-gold mb-1">
                    <stat.icon className="w-4 h-4" />
                    <span className="font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Match Card */}
      <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Next Match
        </h2>
        <div className="card-elevated overflow-hidden">
          <div className="bg-primary p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <p className="text-primary-foreground/80 text-sm">vs</p>
                  <h3 className="text-xl font-bold">Northern FC</h3>
                  <p className="text-primary-foreground/80 text-sm">League Match • Matchday 12</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold">2d 14h</p>
                <p className="text-primary-foreground/80 text-sm">Countdown</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Sat, Dec 28 • 3:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>City Stadium (Home)</span>
            </div>
            <div className="ml-auto">
              <span className="badge-gold">
                <Star className="w-3 h-3" />
                Starting ST
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3">Quick Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickStats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card animate-scale-in"
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon
                  className={cn(
                    "w-5 h-5",
                    stat.status === "success" && "text-green-500",
                    stat.status === "progress" && "text-gold",
                    stat.status === "rating" && "text-primary"
                  )}
                />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p
                className={cn(
                  "text-xl font-bold",
                  stat.status === "success" && "text-green-600",
                  stat.status === "progress" && "text-gradient-gold",
                  stat.status === "rating" && "text-foreground"
                )}
              >
                {stat.value}
              </p>
              {stat.status === "progress" && (
                <div className="progress-gold mt-2">
                  <div
                    className="progress-gold-bar"
                    style={{ width: stat.label === "Training" ? "85%" : "60%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Motivational Feed */}
      <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-gold" />
          Recent Highlights
        </h2>
        <div className="space-y-3">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="card-elevated p-4 animate-fade-in"
              style={{ animationDelay: `${(i + 5) * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    item.type === "praise" ? "bg-primary" : "bg-gold"
                  )}
                >
                  {item.type === "praise" ? (
                    <Star className="w-5 h-5 text-gold" />
                  ) : (
                    <Trophy className="w-5 h-5 text-royal" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.author && (
                      <span className="text-xs font-medium text-primary">{item.author}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
