"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NavSection } from "./dashboard-shell"
import { Target, Flame, TrendingUp, CheckCircle2, AlertCircle, ArrowRight, Trophy, Award } from "lucide-react"

interface DashboardHomeProps {
  onNavigate: (section: NavSection) => void
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Добро пожаловать!</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
                <Target className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Задач решено</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                <Flame className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Дней подряд</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <TrendingUp className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">73%</p>
                <p className="text-sm text-muted-foreground">Успешность</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                <CheckCircle2 className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">82</p>
                <p className="text-sm text-muted-foreground">Прогноз балла</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Соревнования и достижения</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card
            className="p-5 cursor-pointer transition-colors hover:bg-accent"
            onClick={() => onNavigate("leaderboard")}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Таблица лидеров</h4>
                <p className="text-sm text-muted-foreground mb-3">Ваше место: #4 за неделю</p>
                <div className="flex items-center text-sm text-chart-3 font-medium">
                  Подняться выше <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-5 cursor-pointer transition-colors hover:bg-accent"
            onClick={() => onNavigate("achievements")}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Достижения</h4>
                <p className="text-sm text-muted-foreground mb-3">Получено 6 из 9 достижений</p>
                <div className="flex items-center text-sm text-chart-3 font-medium">
                  Посмотреть все <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Рекомендации на сегодня</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Срочно повторить</h4>
                <p className="text-sm text-muted-foreground mb-3">Динамическое программирование</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-destructive font-medium">Успешность: 45%</span>
                  <Button size="sm" variant="outline" onClick={() => onNavigate("generator")}>
                    Тренировать
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Укрепить знания</h4>
                <p className="text-sm text-muted-foreground mb-3">Рекурсивные алгоритмы</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-chart-3 font-medium">Успешность: 65%</span>
                  <Button size="sm" variant="outline" onClick={() => onNavigate("practice")}>
                    Практика
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                <CheckCircle2 className="h-5 w-5 text-chart-2" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Хорошо освоено</h4>
                <p className="text-sm text-muted-foreground mb-3">Системы счисления</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-chart-2 font-medium">Успешность: 92%</span>
                  <Button size="sm" variant="outline" onClick={() => onNavigate("analytics")}>
                    Статистика
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-primary text-primary-foreground">
            <h4 className="font-semibold mb-2">Индивидуальный план</h4>
            <p className="text-sm mb-4 opacity-90">
              Сгенерируем подборку задач специально для вас на основе анализа ваших результатов
            </p>
            <Button variant="secondary" className="w-full" onClick={() => onNavigate("generator")}>
              Создать план <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Быстрый старт</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="p-5 cursor-pointer transition-colors hover:bg-accent"
            onClick={() => onNavigate("generator")}
          >
            <div className="text-4xl mb-3">🎲</div>
            <h4 className="font-semibold mb-1">Случайная задача</h4>
            <p className="text-sm text-muted-foreground">Получите задачу по случайной теме</p>
          </Card>

          <Card className="p-5 cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate("practice")}>
            <div className="text-4xl mb-3">⏱️</div>
            <h4 className="font-semibold mb-1">Пробный экзамен</h4>
            <p className="text-sm text-muted-foreground">Решите тест в условиях реального ЕГЭ</p>
          </Card>

          <Card className="p-5 cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate("editor")}>
            <div className="text-4xl mb-3">💻</div>
            <h4 className="font-semibold mb-1">Программирование</h4>
            <p className="text-sm text-muted-foreground">Практика решения задач 24-27</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
