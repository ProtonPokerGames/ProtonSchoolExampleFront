"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown, TrendingUp, Users, Calendar } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  solved: number
  streak: number
  level: number
  isCurrentUser?: boolean
}

const weeklyLeaders: LeaderboardEntry[] = [
  { rank: 1, name: "Александр М.", score: 2847, solved: 156, streak: 21, level: 15 },
  { rank: 2, name: "Мария К.", score: 2756, solved: 148, streak: 18, level: 14 },
  { rank: 3, name: "Дмитрий С.", score: 2698, solved: 142, streak: 15, level: 14 },
  { rank: 4, name: "Вы", score: 2543, solved: 127, streak: 12, level: 13, isCurrentUser: true },
  { rank: 5, name: "Анна П.", score: 2487, solved: 134, streak: 19, level: 13 },
  { rank: 6, name: "Иван Р.", score: 2401, solved: 125, streak: 10, level: 12 },
  { rank: 7, name: "Елена Т.", score: 2356, solved: 119, streak: 14, level: 12 },
  { rank: 8, name: "Максим В.", score: 2289, solved: 115, streak: 8, level: 11 },
  { rank: 9, name: "София Л.", score: 2234, solved: 112, streak: 16, level: 11 },
  { rank: 10, name: "Артём Н.", score: 2198, solved: 108, streak: 9, level: 11 },
]

const monthlyLeaders: LeaderboardEntry[] = [
  { rank: 1, name: "Мария К.", score: 8934, solved: 487, streak: 28, level: 14 },
  { rank: 2, name: "Александр М.", score: 8756, solved: 456, streak: 21, level: 15 },
  { rank: 3, name: "Дмитрий С.", score: 8512, solved: 441, streak: 25, level: 14 },
  { rank: 4, name: "Анна П.", score: 8234, solved: 423, streak: 30, level: 13 },
  { rank: 5, name: "Вы", score: 7898, solved: 398, streak: 12, level: 13, isCurrentUser: true },
  { rank: 6, name: "Иван Р.", score: 7654, solved: 389, streak: 18, level: 12 },
  { rank: 7, name: "София Л.", score: 7543, solved: 378, streak: 22, level: 11 },
  { rank: 8, name: "Максим В.", score: 7421, solved: 365, streak: 15, level: 11 },
  { rank: 9, name: "Елена Т.", score: 7289, solved: 356, streak: 20, level: 12 },
  { rank: 10, name: "Артём Н.", score: 7156, solved: 345, streak: 14, level: 11 },
]

const allTimeLeaders: LeaderboardEntry[] = [
  { rank: 1, name: "Мария К.", score: 45678, solved: 2134, streak: 145, level: 14 },
  { rank: 2, name: "Александр М.", score: 43521, solved: 2087, streak: 132, level: 15 },
  { rank: 3, name: "Дмитрий С.", score: 41234, solved: 1989, streak: 128, level: 14 },
  { rank: 4, name: "Анна П.", score: 39876, solved: 1867, streak: 156, level: 13 },
  { rank: 5, name: "Иван Р.", score: 38543, solved: 1834, streak: 98, level: 12 },
  { rank: 6, name: "София Л.", score: 37821, solved: 1798, streak: 134, level: 11 },
  { rank: 7, name: "Максим В.", score: 36754, solved: 1756, streak: 87, level: 11 },
  { rank: 8, name: "Вы", score: 35987, solved: 1689, streak: 92, level: 13, isCurrentUser: true },
  { rank: 9, name: "Елена Т.", score: 35234, solved: 1654, streak: 112, level: 12 },
  { rank: 10, name: "Артём Н.", score: 34876, solved: 1623, streak: 89, level: 11 },
]

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
  return null
}

function getRankColor(rank: number) {
  if (rank === 1) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
  if (rank === 2) return "bg-gray-500/10 text-gray-600 dark:text-gray-400"
  if (rank === 3) return "bg-amber-500/10 text-amber-600 dark:text-amber-500"
  return "bg-muted text-muted-foreground"
}

function LeaderboardTable({ leaders }: { leaders: LeaderboardEntry[] }) {
  return (
    <div className="space-y-2">
      {leaders.map((entry) => (
        <Card key={entry.rank} className={entry.isCurrentUser ? "border-primary bg-primary/5" : ""}>
          <div className="flex items-center gap-4 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${getRankColor(entry.rank)}`}
            >
              {getRankIcon(entry.rank) || `#${entry.rank}`}
            </div>

            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-2 text-white">
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{entry.name}</p>
                {entry.isCurrentUser && (
                  <Badge variant="secondary" className="text-xs">
                    Вы
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Уровень {entry.level}</span>
                <span>•</span>
                <span>{entry.solved} задач</span>
                {entry.streak > 7 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-chart-2">🔥 {entry.streak} дней</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-chart-3">{entry.score.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">баллов</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Таблица лидеров</h2>
        <p className="text-muted-foreground">Соревнуйтесь с другими учениками и отслеживайте свой прогресс</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
              <Trophy className="h-6 w-6 text-chart-1" />
            </div>
            <div>
              <p className="text-2xl font-bold">#4</p>
              <p className="text-sm text-muted-foreground">Место за неделю</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
              <TrendingUp className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold">+3</p>
              <p className="text-sm text-muted-foreground">Рост за месяц</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
              <Users className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-muted-foreground">Всего участников</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="week" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week" className="gap-2">
            <Calendar className="h-4 w-4" />
            Неделя
          </TabsTrigger>
          <TabsTrigger value="month" className="gap-2">
            <Calendar className="h-4 w-4" />
            Месяц
          </TabsTrigger>
          <TabsTrigger value="alltime" className="gap-2">
            <Trophy className="h-4 w-4" />
            Всё время
          </TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4">
          <LeaderboardTable leaders={weeklyLeaders} />
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <LeaderboardTable leaders={monthlyLeaders} />
        </TabsContent>

        <TabsContent value="alltime" className="space-y-4">
          <LeaderboardTable leaders={allTimeLeaders} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
