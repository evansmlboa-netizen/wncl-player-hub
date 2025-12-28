import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  GraduationCap,
  MessageSquare,
  Newspaper,
  Bell,
  ChevronLeft,
  Menu,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Fixtures", path: "/fixtures" },
  { icon: Users, label: "Formation", path: "/formation" },
  { icon: BarChart3, label: "Stats", path: "/stats" },
  { icon: CheckCircle, label: "Availability", path: "/availability" },
  { icon: GraduationCap, label: "Training", path: "/training" },
  { icon: MessageSquare, label: "AI Feedback", path: "/feedback" },
  { icon: Newspaper, label: "Team News", path: "/news" },
];

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-royal" />
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg text-sidebar-foreground">WNCL</h1>
              <p className="text-xs text-sidebar-foreground/70">Player Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    isActive ? "text-gold" : "text-sidebar-foreground/70"
                  )}
                />
                {!sidebarCollapsed && (
                  <span
                    className={cn(
                      "font-medium text-sm",
                      isActive ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 border-t border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent/50 transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 text-sidebar-foreground/70 transition-transform duration-300",
              sidebarCollapsed && "rotate-180"
            )}
          />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Logo for Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <span className="font-bold text-foreground">WNCL</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Season Dropdown */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
              <span className="text-muted-foreground">Season:</span>
              <span className="font-semibold text-foreground">2024/25</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[10px] font-bold text-royal">
                3
              </span>
            </button>

            {/* Player Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">MJ</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">Marcus Johnson</p>
                <p className="text-xs text-muted-foreground">Striker • #9</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all",
                  isActive ? "bg-sidebar-accent" : ""
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-gold" : "text-sidebar-foreground/70"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive ? "text-sidebar-foreground" : "text-sidebar-foreground/60"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          {/* More Menu */}
          <button className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg">
            <Menu className="w-5 h-5 text-sidebar-foreground/70" />
            <span className="text-[10px] font-medium text-sidebar-foreground/60">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
