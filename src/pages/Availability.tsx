import { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AvailabilityStatus = "confirmed" | "declined" | "pending";

interface FixtureAvailability {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  status: AvailabilityStatus;
  declineReason?: string;
}

const upcomingFixtures: FixtureAvailability[] = [
  { id: "1", opponent: "Northern FC", date: "Dec 28", time: "3:00 PM", venue: "City Stadium", status: "confirmed" },
  { id: "2", opponent: "Western United", date: "Jan 4", time: "7:30 PM", venue: "United Arena", status: "pending" },
  { id: "3", opponent: "Coastal FC", date: "Jan 11", time: "3:00 PM", venue: "City Stadium", status: "pending" },
  { id: "4", opponent: "Mountain Rangers", date: "Jan 18", time: "5:00 PM", venue: "Rangers Ground", status: "pending" },
  { id: "5", opponent: "River Town", date: "Jan 25", time: "3:00 PM", venue: "City Stadium", status: "pending" },
];

const historyLog = [
  { date: "Dec 21", opponent: "Valley Town", status: "confirmed" as const },
  { date: "Dec 14", opponent: "Harbor City", status: "confirmed" as const },
  { date: "Dec 7", opponent: "Summit FC", status: "declined" as const, reason: "Injury" },
  { date: "Nov 30", opponent: "Eastern Rovers", status: "confirmed" as const },
];

const declineReasons = ["Injury", "Personal", "Work Commitment", "Travel", "Other"];

export default function Availability() {
  const [fixtures, setFixtures] = useState(upcomingFixtures);
  const [activeDeclineId, setActiveDeclineId] = useState<string | null>(null);

  const handleConfirm = (id: string) => {
    setFixtures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "confirmed" as const } : f))
    );
  };

  const handleDecline = (id: string, reason: string) => {
    setFixtures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "declined" as const, declineReason: reason } : f))
    );
    setActiveDeclineId(null);
  };

  const confirmedCount = fixtures.filter((f) => f.status === "confirmed").length;
  const pendingCount = fixtures.filter((f) => f.status === "pending").length;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Availability</h1>
            <p className="text-muted-foreground text-sm">Confirm your attendance for upcoming matches</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 mt-4">
          <div className="stat-card flex-1 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-xl font-bold text-foreground">{confirmedCount}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
          </div>
          <div className="stat-card flex-1 flex items-center gap-3">
            <Clock className="w-6 h-6 text-gold" />
            <div>
              <p className="text-xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Upcoming Fixtures
        </h2>
        <div className="space-y-3">
          {fixtures.map((fixture, i) => (
            <div
              key={fixture.id}
              className="card-elevated p-4 animate-scale-in"
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">vs {fixture.opponent}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{fixture.date}</span>
                    <span>•</span>
                    <span>{fixture.time}</span>
                    <span>•</span>
                    <span>{fixture.venue}</span>
                  </div>
                </div>

                {fixture.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(fixture.id)}
                      className="btn-royal flex-1 sm:flex-none"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Available
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setActiveDeclineId(activeDeclineId === fixture.id ? null : fixture.id)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Unavailable
                        <ChevronDown className={cn("w-4 h-4 transition-transform", activeDeclineId === fixture.id && "rotate-180")} />
                      </button>
                      {activeDeclineId === fixture.id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10 animate-scale-in overflow-hidden">
                          {declineReasons.map((reason) => (
                            <button
                              key={reason}
                              onClick={() => handleDecline(fixture.id, reason)}
                              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                            >
                              {reason}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg",
                      fixture.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {fixture.status === "confirmed" ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium text-sm">Confirmed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span className="font-medium text-sm">Unavailable</span>
                        {fixture.declineReason && (
                          <span className="text-xs opacity-70">({fixture.declineReason})</span>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History Log */}
      <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-muted-foreground" />
          History
        </h2>
        <div className="card-elevated divide-y divide-border">
          {historyLog.map((log, i) => (
            <div
              key={i}
              className="p-4 flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${(i + 7) * 50}ms` }}
            >
              <div>
                <p className="font-medium text-foreground">vs {log.opponent}</p>
                <p className="text-sm text-muted-foreground">{log.date}</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium",
                  log.status === "confirmed" ? "text-green-600" : "text-destructive"
                )}
              >
                {log.status === "confirmed" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Attended
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Missed ({log.reason})
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
