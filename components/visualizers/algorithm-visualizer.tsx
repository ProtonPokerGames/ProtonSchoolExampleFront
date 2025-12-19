"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, SkipForward, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AlgorithmVisualizer() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])

  const startVisualization = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setHighlightedIndices([0, 1])
  }

  const nextStep = () => {
    if (currentStep < array.length - 1) {
      setCurrentStep(currentStep + 1)
      setHighlightedIndices([currentStep + 1, currentStep + 2])
    }
  }

  const reset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setHighlightedIndices([])
  }

  const maxValue = Math.max(...array)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Визуализация алгоритма сортировки</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Массив (числа через запятую)</Label>
            <Input
              value={array.join(", ")}
              onChange={(e) => setArray(e.target.value.split(",").map((n) => Number.parseInt(n.trim()) || 0))}
              disabled={isRunning}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={startVisualization} disabled={isRunning} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Запустить
            </Button>
            <Button onClick={nextStep} disabled={!isRunning} variant="outline" className="flex-1 bg-transparent">
              <SkipForward className="mr-2 h-4 w-4" />
              Следующий шаг
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Визуализация</h3>
          {isRunning && (
            <Badge variant="outline">
              Шаг {currentStep + 1} / {array.length}
            </Badge>
          )}
        </div>

        <div className="flex items-end justify-center gap-2 h-64">
          {array.map((value, index) => {
            const height = (value / maxValue) * 100
            const isHighlighted = highlightedIndices.includes(index)

            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-full rounded-t transition-all ${isHighlighted ? "bg-chart-1" : "bg-chart-2"}`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs font-mono">{value}</span>
              </div>
            )
          })}
        </div>

        {isRunning && (
          <div className="mt-6 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <span className="font-semibold">Текущий шаг:</span> Сравнение элементов на позициях {currentStep} и{" "}
              {currentStep + 1}
            </p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Информация об алгоритме</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-3 bg-muted rounded">
            <span className="text-muted-foreground">Алгоритм:</span>
            <span className="font-semibold">Сортировка пузырьком</span>
          </div>
          <div className="flex justify-between p-3 bg-muted rounded">
            <span className="text-muted-foreground">Временная сложность:</span>
            <span className="font-mono">O(n²)</span>
          </div>
          <div className="flex justify-between p-3 bg-muted rounded">
            <span className="text-muted-foreground">Пространственная сложность:</span>
            <span className="font-mono">O(1)</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
