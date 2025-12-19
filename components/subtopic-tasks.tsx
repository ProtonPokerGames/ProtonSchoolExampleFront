"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronLeft, BookOpen, Star, Check, X } from "lucide-react"

interface SubtopicTasksProps {
  topicId: number
  topicName: string
  subtopicName: string
  onBack: () => void
}

// Mock tasks data
const generateMockTasks = (topicId: number, count: number) => {
  return Array.from({ length: Math.min(count, 10) }, (_, i) => ({
    id: `${topicId}-${i + 1}`,
    number: i + 1,
    difficulty: ["Легкая", "Средняя", "Сложная"][Math.floor(Math.random() * 3)],
    text: `Задача ${i + 1} по теме "${topicId}". Определите значение переменной после выполнения следующего фрагмента программы...`,
    answer: Math.floor(Math.random() * 100).toString(),
    solved: Math.random() > 0.5,
  }))
}

export function SubtopicTasks({ topicId, topicName, subtopicName, onBack }: SubtopicTasksProps) {
  const [tasks] = useState(generateMockTasks(topicId, 10))
  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [userAnswer, setUserAnswer] = useState("")
  const [showSolution, setShowSolution] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleCheckAnswer = () => {
    const correct = userAnswer.trim() === selectedTask.answer
    setIsCorrect(correct)
    if (correct) {
      setShowSolution(true)
    }
  }

  const handleShowSolution = () => {
    setShowSolution(true)
  }

  const handleNextTask = () => {
    const currentIndex = tasks.findIndex((t) => t.id === selectedTask.id)
    if (currentIndex < tasks.length - 1) {
      setSelectedTask(tasks[currentIndex + 1])
      setUserAnswer("")
      setShowSolution(false)
      setIsCorrect(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Назад к каталогу
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Задание {topicId}</span>
            <span>•</span>
            <span>{topicName}</span>
          </div>
          <h2 className="text-3xl font-bold">{subtopicName}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {tasks.length} заданий
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {tasks.filter((t) => t.solved).length} решено
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Task List */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Список заданий</h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task)
                    setUserAnswer("")
                    setShowSolution(false)
                    setIsCorrect(null)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                    selectedTask.id === task.id ? "bg-primary text-primary-foreground" : "hover:bg-muted bg-background",
                  )}
                >
                  <span className="font-medium">Задание {task.number}</span>
                  {task.solved && <Check className="h-4 w-4 text-green-500" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Задание {selectedTask.number}</h3>
                <Badge
                  variant={
                    selectedTask.difficulty === "Легкая"
                      ? "secondary"
                      : selectedTask.difficulty === "Средняя"
                        ? "default"
                        : "destructive"
                  }
                >
                  {selectedTask.difficulty}
                </Badge>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="leading-relaxed">{selectedTask.text}</p>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваш ответ:</label>
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Введите ответ"
                    disabled={showSolution}
                  />
                </div>

                {isCorrect !== null && (
                  <div
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg",
                      isCorrect
                        ? "bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100"
                        : "bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
                    )}
                  >
                    {isCorrect ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Правильно!</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5" />
                        <span className="font-medium">Неправильно. Попробуйте еще раз.</span>
                      </>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleCheckAnswer} disabled={!userAnswer || showSolution} className="flex-1">
                    Проверить
                  </Button>
                  <Button onClick={handleShowSolution} variant="outline" disabled={showSolution}>
                    Показать решение
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {showSolution && (
            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Решение:</h4>
                <div className="prose prose-sm dark:prose-invert max-w-none text-blue-900 dark:text-blue-100">
                  <p>
                    Правильный ответ: <strong>{selectedTask.answer}</strong>
                  </p>
                  <p className="mt-2">
                    Для решения этой задачи необходимо пошагово выполнить алгоритм и отследить изменение значений
                    переменных. Подробное объяснение решения...
                  </p>
                </div>
                <Button onClick={handleNextTask} className="w-full">
                  Следующая задача
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
