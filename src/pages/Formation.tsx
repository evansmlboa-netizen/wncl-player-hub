import { useState } from "react";
import { Users, ChevronLeft, ChevronRight, Info, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  isYou?: boolean;
}

interface FormationData {
  name: string;
  formation: string;
  players: { x: number; y: number; player: Player }[];
}

const formations: FormationData[] = [
  {
    name: "Primary",
    formation: "4-3-3",
    players: [
      { x: 50, y: 90, player: { id: "gk", name: "T. Wilson", position: "GK", number: 1 } },
      { x: 15, y: 70, player: { id: "lb", name: "D. Santos", position: "LB", number: 3 } },
      { x: 35, y: 75, player: { id: "cb1", name: "J. Miller", position: "CB", number: 4 } },
      { x: 65, y: 75, player: { id: "cb2", name: "R. Brown", position: "CB", number: 5 } },
      { x: 85, y: 70, player: { id: "rb", name: "A. Garcia", position: "RB", number: 2 } },
      { x: 25, y: 50, player: { id: "cm1", name: "L. Anderson", position: "CM", number: 8 } },
      { x: 50, y: 55, player: { id: "cdm", name: "K. Thompson", position: "CDM", number: 6 } },
      { x: 75, y: 50, player: { id: "cm2", name: "P. White", position: "CM", number: 7 } },
      { x: 15, y: 25, player: { id: "lw", name: "S. Martinez", position: "LW", number: 11 } },
      { x: 50, y: 20, player: { id: "st", name: "M. Johnson", position: "ST", number: 9, isYou: true } },
      { x: 85, y: 25, player: { id: "rw", name: "C. Davis", position: "RW", number: 10 } },
    ],
  },
  {
    name: "Alternate",
    formation: "4-4-2",
    players: [
      { x: 50, y: 90, player: { id: "gk", name: "T. Wilson", position: "GK", number: 1 } },
      { x: 15, y: 70, player: { id: "lb", name: "D. Santos", position: "LB", number: 3 } },
      { x: 35, y: 75, player: { id: "cb1", name: "J. Miller", position: "CB", number: 4 } },
      { x: 65, y: 75, player: { id: "cb2", name: "R. Brown", position: "CB", number: 5 } },
      { x: 85, y: 70, player: { id: "rb", name: "A. Garcia", position: "RB", number: 2 } },
      { x: 15, y: 45, player: { id: "lm", name: "S. Martinez", position: "LM", number: 11 } },
      { x: 38, y: 50, player: { id: "cm1", name: "L. Anderson", position: "CM", number: 8 } },
      { x: 62, y: 50, player: { id: "cm2", name: "K. Thompson", position: "CM", number: 6 } },
      { x: 85, y: 45, player: { id: "rm", name: "C. Davis", position: "RM", number: 10 } },
      { x: 35, y: 22, player: { id: "st1", name: "M. Johnson", position: "ST", number: 9, isYou: true } },
      { x: 65, y: 22, player: { id: "st2", name: "P. White", position: "ST", number: 7 } },
    ],
  },
];

export default function Formation() {
  const [activeFormation, setActiveFormation] = useState(0);
  const currentFormation = formations[activeFormation];

  const yourPosition = currentFormation.players.find((p) => p.player.isYou);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Position</h1>
            <p className="text-muted-foreground text-sm">Formation view for next match</p>
          </div>
          <div className="badge-gold">
            <Star className="w-4 h-4" />
            Starting XI
          </div>
        </div>
      </section>

      {/* Position Card */}
      <section className="animate-slide-up">
        <div className="card-elevated p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gold flex items-center justify-center">
            <span className="text-2xl font-bold text-royal">#9</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Striker (ST)</h2>
            <p className="text-muted-foreground text-sm">Central attacking position</p>
          </div>
          <div className="badge-royal">
            <Info className="w-3 h-3" />
            Starting
          </div>
        </div>
      </section>

      {/* Formation Switcher */}
      <section className="flex items-center justify-between animate-slide-up" style={{ animationDelay: "100ms" }}>
        <button
          onClick={() => setActiveFormation(Math.max(0, activeFormation - 1))}
          disabled={activeFormation === 0}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-50 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{currentFormation.name} Formation</p>
          <p className="text-2xl font-bold text-foreground">{currentFormation.formation}</p>
        </div>
        <button
          onClick={() => setActiveFormation(Math.min(formations.length - 1, activeFormation + 1))}
          disabled={activeFormation === formations.length - 1}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-50 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </section>

      {/* Pitch View */}
      <section
        className="card-elevated overflow-hidden animate-scale-in"
        style={{ animationDelay: "200ms" }}
      >
        <div
          className="relative w-full bg-gradient-to-b from-green-600 via-green-500 to-green-600 rounded-xl"
          style={{ aspectRatio: "3/4" }}
        >
          {/* Pitch Markings */}
          <div className="absolute inset-0 p-4">
            {/* Center Circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/40 rounded-full" />
            {/* Center Line */}
            <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-white/40" />
            {/* Penalty Areas */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-40 h-20 border-2 border-white/40" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-40 h-20 border-2 border-white/40" />
            {/* Goal Areas */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-20 h-8 border-2 border-white/40" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-20 h-8 border-2 border-white/40" />
          </div>

          {/* Player Markers */}
          {currentFormation.players.map((pos, i) => (
            <div
              key={pos.player.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div
                className={cn(
                  "pitch-marker animate-scale-in",
                  pos.player.isYou ? "active animate-pulse-gold" : "inactive"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {pos.player.number}
              </div>
              <p
                className={cn(
                  "text-[10px] text-center mt-1 font-medium whitespace-nowrap",
                  pos.player.isYou ? "text-gold" : "text-white/80"
                )}
              >
                {pos.player.isYou ? "YOU" : pos.player.name.split(" ")[1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Legend */}
      <section className="flex items-center justify-center gap-6 text-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gold" />
          <span className="text-muted-foreground">Your Position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-muted" />
          <span className="text-muted-foreground">Teammates</span>
        </div>
      </section>
    </div>
  );
}
