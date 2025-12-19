"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

export function NumeralSystemVisualizer() {
  const [inputNumber, setInputNumber] = useState("2024")
  const [fromBase, setFromBase] = useState("10")
  const [toBase, setToBase] = useState("2")
  const [result, setResult] = useState("")
  const [steps, setSteps] = useState<string[]>([])

  const convert = () => {
    try {
      const decimal = Number.parseInt(inputNumber, Number.parseInt(fromBase))
      const converted = decimal.toString(Number.parseInt(toBase)).toUpperCase()
      setResult(converted)

      // Generate conversion steps
      const conversionSteps: string[] = []
      if (fromBase !== "10") {
        conversionSteps.push(`Шаг 1: Перевод ${inputNumber} из системы ${fromBase} в десятичную`)
        const digits = inputNumber.split("").reverse()
        const calculation = digits.map((d, i) => `${d}×${fromBase}^${i}`).join(" + ")
        conversionSteps.push(`${calculation} = ${decimal}₁₀`)
      }

      if (toBase !== "10") {
        conversionSteps.push(`Шаг 2: Перевод ${decimal} из десятичной в систему ${toBase}`)
        let n = decimal
        const divisions: string[] = []
        while (n > 0) {
          const remainder = n % Number.parseInt(toBase)
          divisions.push(`${n} ÷ ${toBase} = ${Math.floor(n / Number.parseInt(toBase))} (остаток ${remainder})`)
          n = Math.floor(n / Number.parseInt(toBase))
        }
        conversionSteps.push(...divisions)
        conversionSteps.push(`Результат (читаем остатки снизу вверх): ${converted}`)
      }

      setSteps(conversionSteps)
    } catch {
      setResult("Ошибка преобразования")
      setSteps([])
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Конвертер систем счисления</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Исходное число</Label>
            <Input value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} placeholder="Введите число" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Из системы</Label>
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Двоичная (2)</SelectItem>
                  <SelectItem value="8">Восьмеричная (8)</SelectItem>
                  <SelectItem value="10">Десятичная (10)</SelectItem>
                  <SelectItem value="16">Шестнадцатеричная (16)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>В систему</Label>
              <Select value={toBase} onValueChange={setToBase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Двоичная (2)</SelectItem>
                  <SelectItem value="8">Восьмеричная (8)</SelectItem>
                  <SelectItem value="10">Десятичная (10)</SelectItem>
                  <SelectItem value="16">Шестнадцатеричная (16)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convert} className="w-full">
            Преобразовать
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {result && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Результат:</p>
              <p className="text-2xl font-mono font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Пошаговое решение</h3>

        {steps.length > 0 ? (
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-mono">{step}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">Выполните преобразование, чтобы увидеть решение</p>
          </div>
        )}
      </Card>
    </div>
  )
}
