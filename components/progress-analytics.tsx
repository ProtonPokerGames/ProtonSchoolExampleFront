"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Calendar, Award, Zap, Brain, Clock } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const performanceData = [
  { date: "Пн", solved: 12, accuracy: 75 },
  { date: "Вт", solved: 15, accuracy: 80 },
  { date: "Ср", solved: 8, accuracy: 70 },
  { date: "Чт", solved: 18, accuracy: 85 },
  { date: "Пт", solved: 14, accuracy: 78 },
  { date: "Сб", solved: 20, accuracy: 88 },
  { date: "Вс", solved: 16, accuracy: 82 },
]

const topicMastery = [
  { topic: "Системы счисления", mastery: 92, solved: 45, total: 50 },
  { topic: "Логика", mastery: 78, solved: 32, total: 40 },
  { topic: "Программирование", mastery: 65, solved: 28, total: 45 },
  { topic: "Базы данных", mastery: 85, solved: 38, total: 45 },
  { topic: "Файловые системы", mastery: 70, solved: 25, total: 35 },
  { topic: "Рекурсия", mastery: 58, solved: 18, total: 30 },
]

const difficultyDistribution = [
  { name: "Легкие", value: 45, color: "hsl(var(--chart-2))" },
  { name: "Средние", value: 52, color: "hsl(var(--chart-3))" },
  { name: "Сложные", value: 25, color: "hsl(var(--chart-1))" },
  { name: "Эксперт", value: 5, color: "hsl(var(--chart-4))" },
]

const weeklyProgress = [
  { week: "Нед 1", tasks: 45, time: 180 },
  { week: "Нед 2", tasks: 62, time: 220 },
  { week: "Нед 3", tasks: 58, time: 195 },
  { week: "Нед 4", tasks: 73, time: 240 },
]

const scoreData = [{ name: "Текущий", value: 73, fill: "hsl(var(--chart-1))" }]

export function ProgressAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Прогноз балла</p>
              <p className="text-3xl font-bold mt-1">82</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
              <Target className="h-6 w-6 text-chart-1" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <TrendingUp className="h-3 w-3 text-chart-2 mr-1" />
            <span className="text-chart-2 font-medium">+8</span>
            <span className="text-muted-foreground ml-1">за месяц</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Решено задач</p>
              <p className="text-3xl font-bold mt-1">127</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
              <Zap className="h-6 w-6 text-chart-2" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-muted-foreground">Цель: 200 задач</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Средняя точность</p>
              <p className="text-3xl font-bold mt-1">73%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
              <Award className="h-6 w-6 text-chart-3" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <TrendingUp className="h-3 w-3 text-chart-2 mr-1" />
            <span className="text-chart-2 font-medium">+5%</span>
            <span className="text-muted-foreground ml-1">за неделю</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Время занятий</p>
              <p className="text-3xl font-bold mt-1">42ч</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
              <Clock className="h-6 w-6 text-chart-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-muted-foreground">В этом месяце</span>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="topics">По темам</TabsTrigger>
          <TabsTrigger value="dynamics">Динамика</TabsTrigger>
          <TabsTrigger value="predictions">Прогнозы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Активность за неделю
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="solved"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorSolved)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Распределение по сложности</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {difficultyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Еженедельная статистика</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="tasks" fill="hsl(var(--chart-1))" name="Задачи" radius={[8, 8, 0, 0]} />
                <Bar dataKey="time" fill="hsl(var(--chart-2))" name="Время (мин)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Освоение тем
            </h3>
            <div className="space-y-6">
              {topicMastery.map((item) => (
                <div key={item.topic}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.solved}/{item.total}
                        </span>
                      </div>
                      <Progress value={item.mastery} className="h-2" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`ml-4 ${
                        item.mastery >= 80
                          ? "border-chart-2 text-chart-2"
                          : item.mastery >= 60
                            ? "border-chart-3 text-chart-3"
                            : "border-chart-1 text-chart-1"
                      }`}
                    >
                      {item.mastery}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-3 text-chart-2">Сильные стороны</h4>
              <div className="space-y-2">
                {topicMastery
                  .filter((t) => t.mastery >= 80)
                  .map((topic) => (
                    <div key={topic.topic} className="flex items-center justify-between text-sm">
                      <span>{topic.topic}</span>
                      <Badge variant="outline" className="border-chart-2 text-chart-2">
                        {topic.mastery}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-5">
              <h4 className="font-semibold mb-3 text-destructive">Требует внимания</h4>
              <div className="space-y-2">
                {topicMastery
                  .filter((t) => t.mastery < 70)
                  .map((topic) => (
                    <div key={topic.topic} className="flex items-center justify-between text-sm">
                      <span>{topic.topic}</span>
                      <Badge variant="outline" className="border-destructive text-destructive">
                        {topic.mastery}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dynamics" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Динамика успеваемости</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Точность (%)"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="solved"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  name="Решено задач"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Средний прирост</p>
                  <p className="text-xl font-bold">+12%</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                  <Calendar className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Дней подряд</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <Zap className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Лучшая серия</p>
                  <p className="text-xl font-bold">18</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-semibold mb-6">Прогноз балла ЕГЭ</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    data={scoreData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      minAngle={15}
                      background={{ fill: "hsl(var(--muted))" }}
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground">
                      <tspan x="50%" dy="-0.5em" className="text-4xl font-bold">
                        82
                      </tspan>
                      <tspan x="50%" dy="1.5em" className="text-sm fill-muted-foreground">
                        из 100 баллов
                      </tspan>
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  На основе текущих результатов ваш прогноз вырос на <span className="font-semibold">8 баллов</span> за
                  последний месяц
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Рекомендации для улучшения</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <Target className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Критично</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Улучшите навыки в рекурсии и динамическом программировании
                      </p>
                      <p className="text-xs text-destructive font-medium">Потенциал: +12 баллов</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-chart-3/20 bg-chart-3/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                      <TrendingUp className="h-4 w-4 text-chart-3" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Важно</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Увеличьте скорость решения задач на файловые системы
                      </p>
                      <p className="text-xs text-chart-3 font-medium">Потенциал: +6 баллов</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-chart-2/20 bg-chart-2/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                      <Award className="h-4 w-4 text-chart-2" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Закрепить</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Поддерживайте высокий уровень в системах счисления и БД
                      </p>
                      <p className="text-xs text-chart-2 font-medium">Текущий уровень: отлично</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">План подготовки до экзамена</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Badge className="bg-chart-1">Неделя 1-2</Badge>
                <p className="text-sm">Интенсивная практика рекурсии и ДП - 40 задач</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-chart-2">Неделя 3-4</Badge>
                <p className="text-sm">Повторение всех тем - 60 задач</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-chart-3">Неделя 5-6</Badge>
                <p className="text-sm">Пробные экзамены в условиях времени - 4 варианта</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-chart-4">Неделя 7</Badge>
                <p className="text-sm">Закрепление слабых мест и психологическая подготовка</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
