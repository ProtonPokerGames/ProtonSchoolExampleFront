"use client"

import type { NavSection } from "./dashboard-shell"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Sparkles, Code, Play, BarChart3, GraduationCap, Trophy, Award, BookOpen, Library } from "lucide-react"

interface DashboardNavProps {
  activeSection: NavSection
  onSectionChange: (section: NavSection) => void
}

export function DashboardNav({ activeSection, onSectionChange }: DashboardNavProps) {
  const navItems = [
    { id: "home" as const, label: "Главная", icon: Home },
    { id: "generator" as const, label: "Генератор", icon: Sparkles },
    { id: "variants" as const, label: "Варианты", icon: BookOpen },
    { id: "catalog" as const, label: "Каталог", icon: Library },
    { id: "practice" as const, label: "Практика", icon: Play },
    { id: "editor" as const, label: "Редактор", icon: Code },
    { id: "analytics" as const, label: "Прогресс", icon: BarChart3 },
    { id: "leaderboard" as const, label: "Лидеры", icon: Trophy },
    { id: "achievements" as const, label: "Достижения", icon: Award },
  ]

  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">InfoEGE</h2>
            <p className="text-xs text-muted-foreground">ЕГЭ/ОГЭ 2025</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-secondary font-medium")}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Совет дня</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Решай задачи регулярно по 30 минут в день для лучшего результата
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
