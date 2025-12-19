"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"

interface GeneratedTaskProps {
  task: {
    id: number
    topic: string | undefined
    difficulty: string
    question: string
    answer: string | null
    hint: string | null
  }
  enableTimer: boolean
}

export function GeneratedTask({ task, enableTimer }: GeneratedTaskProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (enableTimer && timeLeft > 0 && !isChecked) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [enableTimer, timeLeft, isChecked])

  const handleCheck = () => {
    if (task.answer) {
      const correct = userAnswer.trim().toLowerCase() === task.answer.toLowerCase()
      setIsCorrect(correct)
      setIsChecked(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-chart-2/10 text-chart-2"
      case "medium":
        return "bg-chart-3/10 text-chart-3"
      case "hard":
        return "bg-chart-1/10 text-chart-1"
      case "expert":
        return "bg-chart-4/10 text-chart-4"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
      easy: "Легкий",
      medium: "Средний",
      hard: "Сложный",
      expert: "Эксперт",
    }
    return labels[difficulty] || difficulty
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Задача {task.id}</Badge>
          <Badge className={getDifficultyColor(task.difficulty)}>{getDifficultyLabel(task.difficulty)}</Badge>
          <Badge variant="secondary">{task.topic}</Badge>
        </div>
        {enableTimer && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={timeLeft < 60 ? "text-destructive font-semibold" : "font-mono"}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-base leading-relaxed font-mono">{task.question}</p>
      </div>

      {task.hint && (
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)} className="gap-2">
            <Lightbulb className="h-4 w-4" />
            {showHint ? "Скрыть подсказку" : "Показать подсказку"}
          </Button>
          {showHint && (
            <div className="mt-2 p-3 rounded-lg bg-accent/50 text-sm">
              <p className="text-accent-foreground">{task.hint}</p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Введите ваш ответ..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isChecked}
            className="font-mono"
          />
          <Button onClick={handleCheck} disabled={!userAnswer || isChecked}>
            Проверить
          </Button>
        </div>

        {isChecked && isCorrect !== null && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? "bg-chart-2/10" : "bg-destructive/10"}`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-chart-2" />
                <span className="font-medium text-chart-2">Правильно!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <div className="flex-1">
                  <p className="font-medium text-destructive">Неправильно</p>
                  {task.answer && <p className="text-sm text-muted-foreground">Правильный ответ: {task.answer}</p>}
                </div>
              </>
            )}
          </div>
        )}

        {isChecked && (
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="w-full gap-2">
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showDetails ? "Скрыть" : "Показать"} подробное решение
          </Button>
        )}

        {showDetails && (
          <div className="p-4 rounded-lg bg-muted space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Решение:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Проанализируйте условие задачи</li>
                <li>Определите известные и неизвестные величины</li>
                <li>Примените соответствующий метод решения</li>
                <li>Проверьте полученный результат</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Типичные ошибки:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Неправильное понимание условия</li>
                <li>Арифметические ошибки в вычислениях</li>
                <li>Неучет всех вариантов решения</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
