"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, Plus, Minus } from "lucide-react"

const TOPICS = [
  "Анализ информационных моделей",
  "Построение таблиц истинности логических выражений",
  "Поиск информации в реляционных базах данных",
  "Кодирование и декодирование информации",
  "Анализ и построение алгоритмов для исполнителей",
  "Определение результатов работы простейших алгоритмов",
  "Кодирование и декодирование информации. Передача информации",
  "Перебор слов и системы счисления",
  "Работа с таблицами",
  "Поиск символов в текстовом редакторе",
  "Вычисление количества информации",
  "Выполнение алгоритмов для исполнителей",
  "Организация компьютерных сетей. Адресация",
  "Кодирование чисел. Системы счисления",
  "Преобразование логических выражений",
  "Рекурсивные алгоритмы",
  "Обработки числовой последовательности",
  "Робот-сборщик монет",
  "Выигрышная стратегия. Задание 1",
  "Выигрышная стратегия. Задание 2",
  "Выигрышная стратегия. Задание 3",
  "Многопроцессорные системы",
  "Оператор присваивания и ветвления. Перебор вариантов, построение дерева",
  "Обработка символьных строк",
  "Обработка целочисленной информации",
  "Обработка целочисленной информации",
  "Программирование",
]

export function TrainingVariants() {
  const [teacherVariant, setTeacherVariant] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [topicCounts, setTopicCounts] = useState<Record<number, number>>(
    Object.fromEntries(TOPICS.map((_, i) => [i, 0])),
  )

  const handleIncrement = (index: number) => {
    setTopicCounts((prev) => ({ ...prev, [index]: Math.min(prev[index] + 1, 10) }))
  }

  const handleDecrement = (index: number) => {
    setTopicCounts((prev) => ({ ...prev, [index]: Math.max(prev[index] - 1, 0) }))
  }

  const totalTasks = Object.values(topicCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">Тренировочные варианты</h2>
            <Badge variant="secondary" className="text-xs">
              новые декабрьские
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground max-w-4xl leading-relaxed">
            Каждый месяц мы составляем варианты для самопроверки. Варианты составляются компьютером из новых заданий и
            заданий, оказавшихся самыми сложными по результатам предыдущего месяца. По окончании работы система проверит
            ваши ответы, покажет правильные решения и выставит оценку.
          </p>
        </div>
        <Badge variant="outline" className="text-xs whitespace-nowrap">
          Прошлые месяцы
        </Badge>
      </div>

      {/* Monthly Variants Grid */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 15 }, (_, i) => (
              <Button key={i} variant="outline" className="h-11 bg-transparent">
                Вариант {i + 1}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button variant="ghost" className="gap-2 text-primary">
              Ваш персональный вариант
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Variant and Catalog Search */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Вариант учителя</CardTitle>
            <CardDescription>
              Если ваш школьный учитель составил работу и сообщил вам номер, введите его здесь.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Номер варианта"
                value={teacherVariant}
                onChange={(e) => setTeacherVariant(e.target.value)}
              />
              <Button>Открыть</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Поиск в каталоге</CardTitle>
            <CardDescription>
              Задания демоверсий, банков, пробных работ и прошедших экзаменов с решениями.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="номер или текст, атрибут задания"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Constructor */}
      <Card>
        <CardHeader>
          <CardTitle>Конструктор варианта по типам и по темам</CardTitle>
          <CardDescription className="leading-relaxed">
            Чтобы целенаправленно тренироваться по определённым темам, вы можете составить вариант из необходимого вам
            количества заданий по конкретным разделам задачного каталога. Для быстрого составления типового варианта
            используйте кнопки справа.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-[100px_1fr] gap-4 pb-2 border-b font-semibold">
              <div>Количество</div>
              <div>Тема</div>
            </div>

            {/* Topic List */}
            <div className="space-y-3">
              {TOPICS.map((topic, index) => (
                <div key={index} className="grid grid-cols-[100px_1fr] gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleDecrement(index)}
                      disabled={topicCounts[index] === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{topicCounts[index]}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleIncrement(index)}
                      disabled={topicCounts[index] === 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm">
                    {index + 1}. {topic}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">Всего заданий: {totalTasks}</div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setTopicCounts(Object.fromEntries(TOPICS.map((_, i) => [i, 0])))}
                >
                  Очистить
                </Button>
                <Button disabled={totalTasks === 0}>Создать вариант</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Задания, не входящие в ЕГЭ этого года</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
