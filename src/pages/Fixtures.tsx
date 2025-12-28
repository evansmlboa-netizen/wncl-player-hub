import { useState } from "react";
import { Calendar, MapPin, Clock, ChevronRight, CheckCircle, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type MatchStatus = "upcoming" | "confirmed" | "past";

interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
  status: MatchStatus;
  result?: string;
  position?: string;
}

const matches: Match[] = [
  { id: "1", opponent: "Northern FC", date: "Dec 28", time: "3:00 PM", venue: "City Stadium", isHome: true, status: "confirmed", position: "Starting ST" },
  { id: "2", opponent: "Western United", date: "Jan 4", time: "7:30 PM", venue: "United Arena", isHome: false, status: "upcoming" },
  { id: "3", opponent: "Coastal FC", date: "Jan 11", time: "3:00 PM", venue: "City Stadium", isHome: true, status: "upcoming" },
  { id: "4", opponent: "Mountain Rangers", date: "Jan 18", time: "5:00 PM", venue: "Rangers Ground", isHome: false, status: "upcoming" },
  { id: "5", opponent: "Valley Town", date: "Dec 21", time: "3:00 PM", venue: "City Stadium", isHome: true, status: "past", result: "3-1 W", position: "Started" },
  { id: "6", opponent: "Harbor City", date: "Dec 14", time: "7:30 PM", venue: "Harbor Park", isHome: false, status: "past", result: "2-2 D", position: "Started" },
];

const filters = ["All", "Upcoming", "Past"] as const;

export default function Fixtures() {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>("All");

  const filteredMatches = matches.filter((match) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") return match.status !== "past";
    return match.status === "past";
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Fixtures</h1>
            <p className="text-muted-foreground text-sm">Season 2024/25 • 18 matches remaining</p>
          </div>
          <div className="badge-gold">
            <Calendar className="w-4 h-4" />
            <span>12 Played</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Matches List */}
      <section className="space-y-3">
        {filteredMatches.map((match, i) => (
          <div
            key={match.id}
            className={cn(
              "card-elevated p-4 animate-slide-up cursor-pointer",
              match.status === "past" && "opacity-80"
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              {/* Team Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                  match.status === "past" ? "bg-muted" : "bg-primary"
                )}
              >
                <Users
                  className={cn(
                    "w-7 h-7",
                    match.status === "past" ? "text-muted-foreground" : "text-primary-foreground"
                  )}
                />
              </div>

              {/* Match Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{match.opponent}</h3>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      match.isHome
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    )}
                  >
                    {match.isHome ? "H" : "A"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {match.date} • {match.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {match.venue}
                  </span>
                </div>
              </div>

              {/* Status/Result */}
              <div className="text-right flex-shrink-0">
                {match.status === "past" ? (
                  <>
                    <p
                      className={cn(
                        "font-bold text-lg",
                        match.result?.includes("W") && "text-green-600",
                        match.result?.includes("D") && "text-muted-foreground",
                        match.result?.includes("L") && "text-destructive"
                      )}
                    >
                      {match.result}
                    </p>
                    <p className="text-xs text-muted-foreground">{match.position}</p>
                  </>
                ) : match.status === "confirmed" ? (
                  <div className="flex flex-col items-end gap-1">
                    <span className="badge-gold text-xs">
                      <Trophy className="w-3 h-3" />
                      {match.position}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Confirmed
                    </span>
                  </div>
                ) : (
                  <button className="btn-royal text-sm py-2 px-4">
                    Confirm
                  </button>
                )}
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
