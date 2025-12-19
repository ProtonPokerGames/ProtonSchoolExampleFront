"use client"

import { SelectTrigger } from "@/components/ui/select"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Copy, Download, Bug, Lightbulb, CheckCircle2, XCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const codingTasks = [
  {
    id: 1,
    number: 24,
    title: "Обработка текстового файла",
    description:
      "Требуется написать программу, которая будет обрабатывать последовательность целых чисел и находить количество пар элементов, в которых хотя бы одно число делится на 3.",
    initialCode: `# Python
def count_pairs(numbers):
    count = 0
    # Ваш код здесь
    return count

# Считываем данные
n = int(input())
numbers = [int(input()) for _ in range(n)]

result = count_pairs(numbers)
print(result)`,
    testCases: [
      { input: "5\n3\n7\n9\n2\n6", output: "7" },
      { input: "3\n1\n2\n4", output: "0" },
    ],
  },
  {
    id: 2,
    number: 25,
    title: "Анализ последовательности",
    description:
      "Напишите программу, которая находит в последовательности натуральных чисел количество чисел, сумма цифр которых равна максимальной сумме цифр в последовательности.",
    initialCode: `# Python
def digit_sum(n):
    # Функция для подсчета суммы цифр
    pass

def solve(numbers):
    # Ваше решение
    pass

n = int(input())
numbers = [int(input()) for _ in range(n)]
print(solve(numbers))`,
    testCases: [
      { input: "4\n123\n456\n99\n789", output: "1" },
      { input: "5\n11\n29\n38\n47\n92", output: "2" },
    ],
  },
]

type Language = "python" | "cpp" | "pascal"

export function CodeEditor() {
  const [selectedTask, setSelectedTask] = useState(codingTasks[0])
  const [language, setLanguage] = useState<Language>("python")
  const [code, setCode] = useState(selectedTask.initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; got: string }>
  >([])

  const handleRun = () => {
    setIsRunning(true)
    setOutput("")

    // Simulate code execution
    setTimeout(() => {
      const results = selectedTask.testCases.map((testCase) => ({
        passed: Math.random() > 0.3,
        input: testCase.input,
        expected: testCase.output,
        got: testCase.output,
      }))

      setTestResults(results)
      setOutput("Программа выполнена успешно\n\nВремя выполнения: 0.042 сек\nПамять: 12.4 МБ")
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(selectedTask.initialCode)
    setOutput("")
    setTestResults([])
  }

  const handleTaskChange = (taskId: string) => {
    const task = codingTasks.find((t) => t.id === Number.parseInt(taskId))
    if (task) {
      setSelectedTask(task)
      setCode(task.initialCode)
      setOutput("")
      setTestResults([])
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Задача {selectedTask.number}</Badge>
                <Select value={selectedTask.id.toString()} onValueChange={handleTaskChange}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {codingTasks.map((task) => (
                      <SelectItem key={task.id} value={task.id.toString()}>
                        Задача {task.number}: {task.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Lightbulb className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{selectedTask.description}</p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Редактор кода</span>
              <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="pascal">Pascal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[500px] font-mono text-sm resize-none border-0 rounded-none focus-visible:ring-0"
              placeholder="Введите ваш код здесь..."
            />
            <div className="absolute top-0 left-0 w-12 min-h-[500px] bg-muted/30 border-r flex flex-col items-center pt-3 text-xs text-muted-foreground font-mono pointer-events-none">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-4 flex gap-2">
            <Button onClick={handleRun} disabled={isRunning} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Выполнение..." : "Запустить"}
            </Button>
            <Button variant="outline">
              <Bug className="mr-2 h-4 w-4" />
              Отладка
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <Tabs defaultValue="output">
              <TabsList className="w-full">
                <TabsTrigger value="output" className="flex-1">
                  Вывод
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex-1">
                  Тесты
                </TabsTrigger>
                <TabsTrigger value="hints" className="flex-1">
                  Подсказки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="output" className="mt-4">
                <div className="min-h-[300px] max-h-[400px] overflow-y-auto">
                  {output ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <p className="text-sm">Здесь будет отображаться вывод программы</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tests" className="mt-4 space-y-3">
                {testResults.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <p className="text-sm">Запустите код для проверки тестов</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {testResults.map((result, index) => (
                      <Card key={index} className={`p-4 ${result.passed ? "border-chart-2" : "border-destructive"}`}>
                        <div className="flex items-start gap-3">
                          {result.passed ? (
                            <CheckCircle2 className="h-5 w-5 text-chart-2 shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive shrink-0" />
                          )}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Тест {index + 1}</span>
                              <Badge variant={result.passed ? "default" : "destructive"} className="text-xs">
                                {result.passed ? "Пройден" : "Не пройден"}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div>
                                <span className="text-muted-foreground">Ожидается:</span>
                                <code className="ml-2 font-mono">{result.expected}</code>
                              </div>
                              {!result.passed && (
                                <div>
                                  <span className="text-muted-foreground">Получено:</span>
                                  <code className="ml-2 font-mono">{result.got}</code>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="hints" className="mt-4">
                <div className="space-y-3">
                  <Card className="p-4 bg-accent/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Подсказка 1
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Используйте вложенные циклы для перебора всех пар элементов. Внешний цикл по индексу i, внутренний
                      по индексу j {">"} i.
                    </p>
                  </Card>

                  <Card className="p-4 bg-accent/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Подсказка 2
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Для проверки делимости на 3 используйте оператор %. Условие: (a % 3 == 0) or (b % 3 == 0)
                    </p>
                  </Card>

                  <Card className="p-4 bg-accent/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Подсказка 3
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Не забудьте увеличить счетчик count на 1 для каждой подходящей пары.
                    </p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Образцы тестов</h3>
            <div className="space-y-3">
              {selectedTask.testCases.map((test, index) => (
                <div key={index} className="text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">Входные данные {index + 1}:</span>
                    <pre className="mt-1 p-2 bg-muted rounded font-mono text-xs">{test.input}</pre>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ожидаемый результат:</span>
                    <pre className="mt-1 p-2 bg-muted rounded font-mono text-xs">{test.output}</pre>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
