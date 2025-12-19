"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Target, Award, Shield, Flame, Rocket, Brain, Crown, Lock } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

const achievements: Achievement[] = [
  {
    id: "first_steps",
    title: "Первые шаги",
    description: "Решите первые 10 задач",
    icon: <Star className="h-6 w-6" />,
    unlocked: true,
    rarity: "common",
  },
  {
    id: "week_streak",
    title: "Неделя подряд",
    description: "Решайте задачи 7 дней подряд",
    icon: <Flame className="h-6 w-6" />,
    unlocked: true,
    rarity: "common",
  },
  {
    id: "speed_demon",
    title: "Скоростник",
    description: "Решите задачу за 2 минуты",
    icon: <Zap className="h-6 w-6" />,
    unlocked: true,
    rarity: "rare",
  },
  {
    id: "perfectionist",
    title: "Перфекционист",
    description: "Решите 20 задач подряд без ошибок",
    icon: <Target className="h-6 w-6" />,
    unlocked: true,
    rarity: "epic",
  },
  {
    id: "month_streak",
    title: "Месяц подряд",
    description: "Решайте задачи 30 дней подряд",
    icon: <Shield className="h-6 w-6" />,
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    rarity: "rare",
  },
  {
    id: "century",
    title: "Сотня",
    description: "Решите 100 задач",
    icon: <Trophy className="h-6 w-6" />,
    unlocked: true,
    rarity: "rare",
  },
  {
    id: "algorithm_master",
    title: "Мастер алгоритмов",
    description: "Освойте все темы по алгоритмам",
    icon: <Brain className="h-6 w-6" />,
    unlocked: false,
    progress: 7,
    maxProgress: 12,
    rarity: "epic",
  },
  {
    id: "exam_ready",
    title: "Готов к экзамену",
    description: "Наберите 90+ баллов на пробном экзамене",
    icon: <Award className="h-6 w-6" />,
    unlocked: false,
    progress: 82,
    maxProgress: 90,
    rarity: "epic",
  },
  {
    id: "legend",
    title: "Легенда InfoEGE",
    description: "Достигните 15 уровня",
    icon: <Crown className="h-6 w-6" />,
    unlocked: false,
    progress: 13,
    maxProgress: 15,
    rarity: "legendary",
  },
]

function getRarityColor(rarity: Achievement["rarity"]) {
  switch (rarity) {
    case "common":
      return "border-gray-400 bg-gray-400/10"
    case "rare":
      return "border-blue-500 bg-blue-500/10"
    case "epic":
      return "border-purple-500 bg-purple-500/10"
    case "legendary":
      return "border-yellow-500 bg-yellow-500/10"
  }
}

function getRarityLabel(rarity: Achievement["rarity"]) {
  switch (rarity) {
    case "common":
      return "Обычное"
    case "rare":
      return "Редкое"
    case "epic":
      return "Эпическое"
    case "legendary":
      return "Легендарное"
  }
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const isLocked = !achievement.unlocked

  return (
    <Card className={`p-4 ${getRarityColor(achievement.rarity)} ${isLocked ? "opacity-60" : ""}`}>
      <div className="flex gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${
            isLocked ? "bg-muted" : "bg-background"
          }`}
        >
          {isLocked ? <Lock className="h-8 w-8 text-muted-foreground" /> : achievement.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold">{achievement.title}</h4>
            <Badge variant="outline" className="text-xs">
              {getRarityLabel(achievement.rarity)}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

          {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
            <div className="space-y-1">
              <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {achievement.progress} / {achievement.maxProgress}
              </p>
            </div>
          )}

          {achievement.unlocked && (
            <Badge variant="secondary" className="gap-1">
              <Trophy className="h-3 w-3" />
              Получено
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export function Gamification() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const currentLevel = 13
  const currentXP = 2543
  const nextLevelXP = 3000
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Достижения и награды</h2>
        <p className="text-muted-foreground">Выполняйте задачи и получайте достижения за свои успехи</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Текущий уровень</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">{currentLevel}</p>
                <Badge variant="secondary" className="gap-1">
                  <Rocket className="h-3 w-3" />
                  Опытный
                </Badge>
              </div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-chart-1 to-chart-2 text-2xl font-bold text-white">
              {currentLevel}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Прогресс до уровня {currentLevel + 1}</span>
              <span className="font-medium">
                {currentXP} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-3" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Достижения</p>
              <p className="text-4xl font-bold">
                {unlockedCount} / {achievements.length}
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-1/10">
              <Trophy className="h-8 w-8 text-chart-1" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              Прогресс: {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все ({achievements.length})</TabsTrigger>
          <TabsTrigger value="unlocked">Получены ({unlockedCount})</TabsTrigger>
          <TabsTrigger value="locked">Заблокированы ({achievements.length - unlockedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </TabsContent>

        <TabsContent value="unlocked" className="space-y-3">
          {achievements
            .filter((a) => a.unlocked)
            .map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
        </TabsContent>

        <TabsContent value="locked" className="space-y-3">
          {achievements
            .filter((a) => !a.unlocked)
            .map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
