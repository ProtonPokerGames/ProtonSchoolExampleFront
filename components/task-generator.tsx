"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Settings2, Download, Copy, RefreshCw } from "lucide-react"
import { GeneratedTask } from "./generated-task"

const topics = [
  { value: "numeral-systems", label: "Системы счисления" },
  { value: "logic", label: "Логические выражения" },
  { value: "algorithms", label: "Алгоритмы и программирование" },
  { value: "databases", label: "Базы данных и SQL" },
  { value: "files", label: "Файловые системы" },
  { value: "encoding", label: "Кодирование информации" },
  { value: "networks", label: "Компьютерные сети" },
  { value: "recursion", label: "Рекурсия" },
]

export function TaskGenerator() {
  const [selectedTopic, setSelectedTopic] = useState("numeral-systems")
  const [difficulty, setDifficulty] = useState("medium")
  const [taskCount, setTaskCount] = useState([3])
  const [includeAnswers, setIncludeAnswers] = useState(true)
  const [includeHints, setIncludeHints] = useState(false)
  const [enableTimer, setEnableTimer] = useState(false)
  const [generatedTasks, setGeneratedTasks] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate task generation
    setTimeout(() => {
      const mockTasks = Array.from({ length: taskCount[0] }, (_, i) => ({
        id: i + 1,
        topic: topics.find((t) => t.value === selectedTopic)?.label,
        difficulty,
        question: generateMockQuestion(selectedTopic, i + 1),
        answer: includeAnswers ? generateMockAnswer(selectedTopic) : null,
        hint: includeHints ? "Используйте метод последовательного деления" : null,
      }))

      setGeneratedTasks(mockTasks)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <Card className="p-6 h-fit">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Settings2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Настройки генератора</h3>
            <p className="text-xs text-muted-foreground">Настройте параметры задач</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Тема</Label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.value} value={topic.value}>
                    {topic.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Уровень сложности</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy" className="font-normal cursor-pointer">
                  Легкий
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-normal cursor-pointer">
                  Средний
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard" className="font-normal cursor-pointer">
                  Сложный
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expert" id="expert" />
                <Label htmlFor="expert" className="font-normal cursor-pointer">
                  Эксперт
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Количество задач</Label>
              <span className="text-sm font-medium">{taskCount[0]}</span>
            </div>
            <Slider value={taskCount} onValueChange={setTaskCount} min={1} max={10} step={1} />
          </div>

          <div className="space-y-3 pt-2">
            <Label>Параметры</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="answers" checked={includeAnswers} onCheckedChange={setIncludeAnswers} />
                <Label htmlFor="answers" className="font-normal cursor-pointer">
                  Включить варианты ответов
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hints" checked={includeHints} onCheckedChange={setIncludeHints} />
                <Label htmlFor="hints" className="font-normal cursor-pointer">
                  Добавить подсказки
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="timer" checked={enableTimer} onCheckedChange={setEnableTimer} />
                <Label htmlFor="timer" className="font-normal cursor-pointer">
                  Таймер на задачу
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Сгенерировать
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {generatedTasks.length === 0 ? (
          <Card className="p-12">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Готовы к генерации</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Настройте параметры слева и нажмите кнопку генерации, чтобы получить персонализированные задачи
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Сгенерированные задачи</h3>
                <p className="text-sm text-muted-foreground">
                  Всего задач: {generatedTasks.length} · Тема: {topics.find((t) => t.value === selectedTopic)?.label}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Копировать
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Экспорт PDF
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {generatedTasks.map((task) => (
                <GeneratedTask key={task.id} task={task} enableTimer={enableTimer} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function generateMockQuestion(topic: string, index: number): string {
  const questions: Record<string, string[]> = {
    "numeral-systems": [
      "Найдите основание системы счисления, в которой выполняется равенство: 123ₓ + 45ₓ = 201ₓ",
      "Сколько единиц в двоичной записи числа 2024₁₀?",
      "В какой системе счисления десятичное число 63 записывается как 111?",
    ],
    logic: [
      "Для какого наибольшего целого числа А формула ((x ≤ 15) → (x·x ≤ A)) ∧ ((y·y ≤ A) → (y ≤ 15)) тождественно истинна?",
      "Сколько существует различных наборов значений логических переменных x₁, x₂, x₃, x₄, x₅, которые удовлетворяют условию ((x₁ → x₂) ∧ (x₃ ∨ x₄)) → x₅ = 0?",
      "Упростите логическое выражение: ¬(A ∨ B) ∧ (A ∨ ¬B)",
    ],
    algorithms: [
      "Алгоритм получает на вход натуральное число N > 1 и строит по нему новое число R следующим образом: вычисляется сумма четных цифр N, затем к ней слева приписывается последняя нечетная цифра. Какое наименьшее N нужно подать на вход, чтобы получить R = 512?",
      "Дан массив из 100 элементов. Сколько операций сравнения потребуется в худшем случае для сортировки пузырьком?",
      "Определите, что будет выведено в результате выполнения программы для n = 5",
    ],
    databases: [
      "В таблице Users хранятся данные о пользователях. Напишите SQL-запрос для выбора всех пользователей старше 18 лет.",
      "Нормализуйте следующую таблицу до третьей нормальной формы: Orders(OrderID, CustomerName, CustomerEmail, ProductName, ProductPrice)",
      "Какой JOIN использовать для получения всех записей из левой таблицы, даже если в правой таблице нет совпадений?",
    ],
    files: [
      "В каталоге /home/user находятся файлы с маской *.txt. Сколько файлов соответствует маске test_?.txt?",
      "Файловая система имеет 5 уровней вложенности. Каков максимальный путь до файла?",
      "Рассчитайте размер файла, содержащего 1000 символов в кодировке UTF-8",
    ],
  }

  const topicQuestions = questions[topic] || questions["numeral-systems"]
  return topicQuestions[index % topicQuestions.length]
}

function generateMockAnswer(topic: string): string {
  const answers: Record<string, string> = {
    "numeral-systems": "7",
    logic: "225",
    algorithms: "5124",
    databases: "SELECT * FROM Users WHERE age > 18;",
    files: "3",
  }

  return answers[topic] || "42"
}
