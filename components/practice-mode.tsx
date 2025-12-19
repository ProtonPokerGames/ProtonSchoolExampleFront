"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Target, BookOpen, Calculator, Binary } from "lucide-react"
import { NumeralSystemVisualizer } from "./visualizers/numeral-system-visualizer"
import { LogicVisualizer } from "./visualizers/logic-visualizer"
import { AlgorithmVisualizer } from "./visualizers/algorithm-visualizer"

const practiceModules = [
  {
    id: "exam-simulation",
    title: "Пробный экзамен",
    description: "Полная симуляция ЕГЭ с таймером и условиями реального экзамена",
    duration: "235 мин",
    tasks: 27,
    icon: Target,
    color: "chart-1",
  },
  {
    id: "topic-practice",
    title: "Практика по темам",
    description: "Целенаправленная тренировка конкретных разделов",
    duration: "Гибко",
    tasks: "1-50",
    icon: BookOpen,
    color: "chart-2",
  },
  {
    id: "visualizers",
    title: "Визуализаторы",
    description: "Интерактивные инструменты для понимания алгоритмов",
    duration: "Гибко",
    tasks: "∞",
    icon: Binary,
    color: "chart-3",
  },
]

export function PracticeMode() {
  const [activeMode, setActiveMode] = useState<string | null>(null)

  if (activeMode === "visualizers") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Визуализаторы</h2>
            <p className="text-muted-foreground">Интерактивные инструменты для изучения алгоритмов</p>
          </div>
          <Button variant="outline" onClick={() => setActiveMode(null)}>
            Назад
          </Button>
        </div>

        <Tabs defaultValue="numeral">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="numeral">Системы счисления</TabsTrigger>
            <TabsTrigger value="logic">Логика</TabsTrigger>
            <TabsTrigger value="algorithm">Алгоритмы</TabsTrigger>
          </TabsList>

          <TabsContent value="numeral" className="mt-6">
            <NumeralSystemVisualizer />
          </TabsContent>

          <TabsContent value="logic" className="mt-6">
            <LogicVisualizer />
          </TabsContent>

          <TabsContent value="algorithm" className="mt-6">
            <AlgorithmVisualizer />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (activeMode === "exam-simulation") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Пробный экзамен ЕГЭ</h2>
            <p className="text-muted-foreground">Симуляция реального экзамена с полным набором заданий</p>
          </div>
          <Button variant="outline" onClick={() => setActiveMode(null)}>
            Назад
          </Button>
        </div>

        <Card className="p-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-chart-1/10 flex items-center justify-center">
                <Target className="h-10 w-10 text-chart-1" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Готовы начать?</h3>
              <p className="text-muted-foreground">
                Экзамен состоит из 27 заданий и длится 3 часа 55 минут. После начала таймер будет идти без остановки.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold mb-1">27</p>
                <p className="text-sm text-muted-foreground">Заданий</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold mb-1">235</p>
                <p className="text-sm text-muted-foreground">Минут</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold mb-1">100</p>
                <p className="text-sm text-muted-foreground">Баллов</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full">
                <Play className="mr-2 h-5 w-5" />
                Начать пробный экзамен
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Настроить параметры
              </Button>
            </div>

            <div className="pt-4 text-sm text-muted-foreground">
              <p>
                Рекомендуем пройти в условиях, максимально приближенных к реальным: в тихом месте, без отвлечений, с
                перерывами как на настоящем экзамене.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (activeMode === "topic-practice") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Практика по темам</h2>
            <p className="text-muted-foreground">Выберите тему для целенаправленной тренировки</p>
          </div>
          <Button variant="outline" onClick={() => setActiveMode(null)}>
            Назад
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Системы счисления", tasks: 45, mastery: 92, color: "chart-2" },
            { title: "Логические выражения", tasks: 38, mastery: 78, color: "chart-3" },
            { title: "Программирование", tasks: 52, mastery: 65, color: "chart-1" },
            { title: "Базы данных", tasks: 40, mastery: 85, color: "chart-2" },
            { title: "Рекурсия", tasks: 30, mastery: 58, color: "chart-4" },
            { title: "Файловые системы", tasks: 28, mastery: 70, color: "chart-3" },
          ].map((topic) => (
            <Card key={topic.title} className="p-5 cursor-pointer transition-all hover:shadow-md">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.tasks} доступных задач</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Освоение</span>
                    <Badge
                      variant="outline"
                      className={
                        topic.mastery >= 80
                          ? "border-chart-2 text-chart-2"
                          : topic.mastery >= 60
                            ? "border-chart-3 text-chart-3"
                            : "border-chart-1 text-chart-1"
                      }
                    >
                      {topic.mastery}%
                    </Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full bg-${topic.color}`} style={{ width: `${topic.mastery}%` }} />
                  </div>
                </div>

                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Начать практику
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Режим практики</h2>
        <p className="text-muted-foreground">Выберите формат тренировки для эффективной подготовки</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {practiceModules.map((module) => {
          const Icon = module.icon
          return (
            <Card
              key={module.id}
              className="p-6 cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setActiveMode(module.id)}
            >
              <div className="space-y-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-${module.color}/10`}>
                  <Icon className={`h-7 w-7 text-${module.color}`} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>{module.tasks} задач</span>
                  </div>
                </div>

                <Button className="w-full">Выбрать</Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
            <Calculator className="h-6 w-6 text-chart-3" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Встроенные инструменты</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Во время практики доступны калькулятор систем счисления, таблицы ASCII, справочник формул и другие
              полезные инструменты
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Калькулятор СС</Badge>
              <Badge variant="secondary">Таблица ASCII</Badge>
              <Badge variant="secondary">Формулы логики</Badge>
              <Badge variant="secondary">Шпаргалка по SQL</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
