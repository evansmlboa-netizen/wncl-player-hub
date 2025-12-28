import { useState } from "react";
import { GraduationCap, Play, CheckCircle, Clock, BookOpen, Video, Award, ChevronRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type LessonStatus = "completed" | "in-progress" | "locked";

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: "video" | "quiz" | "drill";
  duration: string;
  status: LessonStatus;
  progress?: number;
  dueDate?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

const modules: Module[] = [
  {
    id: "1",
    title: "Attacking Movement",
    progress: 75,
    lessons: [
      { id: "1a", title: "Creating Space in the Box", description: "Learn positioning techniques for strikers", type: "video", duration: "12 min", status: "completed" },
      { id: "1b", title: "Movement Quiz", description: "Test your understanding", type: "quiz", duration: "5 min", status: "completed" },
      { id: "1c", title: "Overlapping Runs", description: "Timing your runs with wingers", type: "video", duration: "8 min", status: "in-progress", progress: 60 },
      { id: "1d", title: "Practice Drill", description: "Movement patterns to practice", type: "drill", duration: "15 min", status: "locked", dueDate: "Dec 30" },
    ],
  },
  {
    id: "2",
    title: "Finishing Techniques",
    progress: 33,
    lessons: [
      { id: "2a", title: "One-on-One Situations", description: "Composure in front of goal", type: "video", duration: "10 min", status: "completed" },
      { id: "2b", title: "Header Accuracy", description: "Directing headers on target", type: "video", duration: "8 min", status: "in-progress", progress: 30 },
      { id: "2c", title: "Finishing Quiz", description: "Test your technique knowledge", type: "quiz", duration: "5 min", status: "locked" },
    ],
  },
  {
    id: "3",
    title: "Team Tactics",
    progress: 0,
    lessons: [
      { id: "3a", title: "Pressing Triggers", description: "When to press as a unit", type: "video", duration: "15 min", status: "locked" },
      { id: "3b", title: "Set Piece Roles", description: "Your responsibilities", type: "drill", duration: "10 min", status: "locked" },
    ],
  },
];

export default function Training() {
  const [activeModule, setActiveModule] = useState<string | null>("1");

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.status === "completed").length,
    0
  );

  const getTypeIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return Video;
      case "quiz":
        return BookOpen;
      case "drill":
        return Target;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Training & Lessons</h1>
            <p className="text-muted-foreground text-sm">Coach-assigned learning content</p>
          </div>
          <div className="badge-gold">
            <Award className="w-4 h-4" />
            {completedLessons}/{totalLessons} Done
          </div>
        </div>

        {/* Overall Progress */}
        <div className="card-elevated p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-gold">
              {Math.round((completedLessons / totalLessons) * 100)}%
            </span>
          </div>
          <div className="progress-gold">
            <div
              className="progress-gold-bar"
              style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
        {modules.map((module, i) => (
          <div
            key={module.id}
            className="card-elevated overflow-hidden animate-scale-in"
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
            {/* Module Header */}
            <button
              onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{module.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 max-w-[120px]">
                    <div className="progress-gold h-1.5">
                      <div
                        className="progress-gold-bar"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{module.progress}%</span>
                </div>
              </div>
              <ChevronRight
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform",
                  activeModule === module.id && "rotate-90"
                )}
              />
            </button>

            {/* Lessons */}
            {activeModule === module.id && (
              <div className="border-t border-border divide-y divide-border">
                {module.lessons.map((lesson, j) => {
                  const TypeIcon = getTypeIcon(lesson.type);
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "p-4 flex items-center gap-4 animate-fade-in",
                        lesson.status === "locked" && "opacity-60"
                      )}
                      style={{ animationDelay: `${j * 50}ms` }}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          lesson.status === "completed"
                            ? "bg-green-100"
                            : lesson.status === "in-progress"
                            ? "bg-gold/20"
                            : "bg-muted"
                        )}
                      >
                        {lesson.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <TypeIcon
                            className={cn(
                              "w-5 h-5",
                              lesson.status === "in-progress"
                                ? "text-gold"
                                : "text-muted-foreground"
                            )}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground truncate">{lesson.title}</h4>
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold",
                              lesson.type === "video" && "bg-blue-100 text-blue-700",
                              lesson.type === "quiz" && "bg-purple-100 text-purple-700",
                              lesson.type === "drill" && "bg-orange-100 text-orange-700"
                            )}
                          >
                            {lesson.type}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{lesson.description}</p>
                        {lesson.status === "in-progress" && lesson.progress && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="progress-gold flex-1 max-w-[100px]">
                              <div
                                className="progress-gold-bar"
                                style={{ width: `${lesson.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gold">{lesson.progress}%</span>
                          </div>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </div>
                        {lesson.dueDate && (
                          <p className="text-[10px] text-gold mt-1">Due: {lesson.dueDate}</p>
                        )}
                      </div>

                      {lesson.status !== "locked" && (
                        <button
                          className={cn(
                            "p-2 rounded-lg transition-colors flex-shrink-0",
                            lesson.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-primary text-primary-foreground hover:opacity-90"
                          )}
                        >
                          {lesson.status === "completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
