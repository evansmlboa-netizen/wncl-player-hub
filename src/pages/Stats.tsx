import { BarChart3, TrendingUp, Zap, Target, Timer, Award, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const seasonStats = [
  { label: "Goals", value: 7, icon: Target, change: "+2 this month" },
  { label: "Assists", value: 4, icon: Zap, change: "+1 this month" },
  { label: "Minutes", value: 892, icon: Timer, change: "74 avg/match" },
  { label: "Rating", value: 7.4, icon: Award, change: "↑ from 7.1" },
];

const matchRatings = [
  { opponent: "Valley Town", rating: 8.2, goals: 1, assists: 1 },
  { opponent: "Harbor City", rating: 7.8, goals: 0, assists: 1 },
  { opponent: "Summit FC", rating: 6.9, goals: 0, assists: 0 },
  { opponent: "Eastern Rovers", rating: 8.5, goals: 2, assists: 0 },
  { opponent: "Central City", rating: 7.2, goals: 1, assists: 0 },
];

const personalBests = [
  { label: "Top Speed", value: "34.2 km/h", icon: Zap, date: "vs Eastern Rovers" },
  { label: "Highest Rating", value: "9.1", icon: Award, date: "vs United FC" },
  { label: "Most Goals", value: "2 in one match", icon: Target, date: "vs Eastern Rovers" },
];

const radarStats = [
  { stat: "Shooting", value: 78, avg: 65 },
  { stat: "Passing", value: 72, avg: 70 },
  { stat: "Dribbling", value: 85, avg: 68 },
  { stat: "Speed", value: 88, avg: 72 },
  { stat: "Positioning", value: 82, avg: 70 },
  { stat: "Heading", value: 75, avg: 62 },
];

export default function Stats() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Performance Stats</h1>
            <p className="text-muted-foreground text-sm">Season 2024/25 Analysis</p>
          </div>
          <div className="badge-royal">
            <BarChart3 className="w-4 h-4" />
            12 Matches
          </div>
        </div>
      </section>

      {/* Season Overview */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
        {seasonStats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card animate-scale-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-gold mt-1">{stat.change}</p>
          </div>
        ))}
      </section>

      {/* Personal Bests */}
      <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold" />
          Personal Bests
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {personalBests.map((best, i) => (
            <div
              key={best.label}
              className="card-elevated p-4 animate-scale-in"
              style={{ animationDelay: `${(i + 4) * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                  <best.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gradient-gold">{best.value}</p>
                  <p className="text-xs text-muted-foreground">{best.label}</p>
                  <p className="text-[10px] text-muted-foreground/70">{best.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Radar */}
      <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3">Skills Breakdown</h2>
        <div className="card-elevated p-4">
          <div className="space-y-4">
            {radarStats.map((skill, i) => (
              <div key={skill.stat} className="animate-fade-in" style={{ animationDelay: `${(i + 7) * 50}ms` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{skill.stat}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{skill.value}</span>
                    <span className="text-xs text-muted-foreground">(Team avg: {skill.avg})</span>
                  </div>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-full"
                    style={{ width: `${skill.avg}%` }}
                  />
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
                      skill.value > skill.avg
                        ? "bg-gradient-to-r from-primary to-gold"
                        : "bg-primary"
                    )}
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Match Ratings */}
      <section className="animate-slide-up" style={{ animationDelay: "400ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Recent Match Ratings
        </h2>
        <div className="space-y-2">
          {matchRatings.map((match, i) => (
            <div
              key={match.opponent}
              className="card-elevated p-4 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${(i + 10) * 50}ms` }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                  match.rating >= 8
                    ? "bg-gold text-royal"
                    : match.rating >= 7
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {match.rating}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">vs {match.opponent}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {match.goals > 0 && (
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-gold" />
                      {match.goals} Goal{match.goals > 1 ? "s" : ""}
                    </span>
                  )}
                  {match.assists > 0 && (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      {match.assists} Assist{match.assists > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
