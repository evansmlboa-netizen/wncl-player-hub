import { Newspaper, Megaphone, Image, MapPin, Clock, ThumbsUp, Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  type: "announcement" | "reminder" | "media";
  title: string;
  content: string;
  author?: string;
  time: string;
  likes?: number;
  images?: string[];
  important?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    type: "reminder",
    title: "Match Day Kit",
    content: "Home kit for Saturday's match vs Northern FC. Navy shorts, white socks. Arrive by 1:30 PM for warm-up.",
    author: "Coach Williams",
    time: "2 hours ago",
    important: true,
  },
  {
    id: "2",
    type: "announcement",
    title: "Training Schedule Update",
    content: "Due to pitch maintenance, Tuesday's session is moved to the indoor facility. Same time (6 PM). Bring indoor shoes.",
    author: "Team Manager",
    time: "Yesterday",
  },
  {
    id: "3",
    type: "media",
    title: "Match Highlights vs Valley Town",
    content: "Great team performance! Check out the highlights from our 3-1 victory. Special mention to Marcus for the opening goal.",
    time: "2 days ago",
    likes: 24,
  },
  {
    id: "4",
    type: "announcement",
    title: "End of Year Team Dinner",
    content: "Annual team dinner on December 30th at The Grand Hotel. Partners welcome. RSVP to the team WhatsApp group.",
    author: "Club Secretary",
    time: "3 days ago",
  },
  {
    id: "5",
    type: "reminder",
    title: "Transport for Away Game",
    content: "Coach departs at 3 PM sharp from the main car park for the Western United game (Jan 4). Don't be late!",
    author: "Team Manager",
    time: "4 days ago",
    important: true,
  },
  {
    id: "6",
    type: "media",
    title: "Training Session Photos",
    content: "Some great shots from yesterday's tactical session. Looking sharp ahead of the big game!",
    time: "5 days ago",
    likes: 18,
  },
];

export default function News() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team News</h1>
            <p className="text-muted-foreground text-sm">Announcements and updates</p>
          </div>
          <div className="badge-royal">
            <Newspaper className="w-4 h-4" />
            6 New
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="space-y-4">
        {newsItems.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "card-elevated overflow-hidden animate-slide-up",
              item.important && "ring-2 ring-gold/50"
            )}
            style={{ animationDelay: `${i * 75}ms` }}
          >
            {item.important && (
              <div className="bg-gold/10 px-4 py-2 flex items-center gap-2 border-b border-gold/20">
                <AlertCircle className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold text-gold-dark">Important</span>
              </div>
            )}

            <div className="p-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    item.type === "announcement" && "bg-primary",
                    item.type === "reminder" && "bg-gold",
                    item.type === "media" && "bg-purple-500"
                  )}
                >
                  {item.type === "announcement" && (
                    <Megaphone className="w-5 h-5 text-primary-foreground" />
                  )}
                  {item.type === "reminder" && (
                    <Clock className="w-5 h-5 text-royal" />
                  )}
                  {item.type === "media" && (
                    <Image className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase",
                        item.type === "announcement" && "bg-primary/10 text-primary",
                        item.type === "reminder" && "bg-gold/20 text-gold-dark",
                        item.type === "media" && "bg-purple-100 text-purple-700"
                      )}
                    >
                      {item.type}
                    </span>
                  </div>
                  {item.author && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Posted by {item.author}
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {item.content}
              </p>

              {/* Media placeholder */}
              {item.type === "media" && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{item.time}</span>

                {item.type === "media" && (
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </button>
                )}

                {item.type === "reminder" && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>City Stadium</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Load More */}
      <div className="text-center">
        <button className="text-sm font-medium text-primary hover:underline">
          Load more news
        </button>
      </div>
    </div>
  );
}
