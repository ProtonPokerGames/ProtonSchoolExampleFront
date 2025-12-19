"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Subtopic {
  name: string
  count: number
}

interface Topic {
  id: number
  name: string
  subtopics: Subtopic[]
}

const TOPICS_DATA: Topic[] = [
  {
    id: 1,
    name: "Анализ информационных моделей",
    subtopics: [
      { name: "Неоднозначное соотнесение таблицы и графа", count: 39 },
      { name: "Однозначное соотнесение таблицы и графа", count: 30 },
    ],
  },
  {
    id: 2,
    name: "Построение таблиц истинности логических выражений",
    subtopics: [{ name: "Строки с пропущенными значениями", count: 65 }],
  },
  {
    id: 3,
    name: "Поиск информации в реляционных базах данных",
    subtopics: [{ name: "Задания для подготовки", count: 52 }],
  },
  {
    id: 4,
    name: "Кодирование и декодирование информации",
    subtopics: [
      { name: "Выбор кода при неиспользуемых сигналах", count: 22 },
      { name: "Передача информации. Выбор кода", count: 58 },
    ],
  },
  {
    id: 5,
    name: "Анализ и построение алгоритмов для исполнителей",
    subtopics: [
      { name: "Посимвольное двоичное преобразование", count: 49 },
      { name: "Посимвольное десятичное преобразование", count: 22 },
    ],
  },
  {
    id: 6,
    name: "Определение результатов работы простейших алгоритмов",
    subtopics: [{ name: "Задания для подготовки", count: 42 }],
  },
  {
    id: 7,
    name: "Кодирование и декодирование информации. Передача информации",
    subtopics: [
      { name: "Хранение текстовых документов", count: 2 },
      { name: "Передача звуковых файлов", count: 9 },
      { name: "Хранение звуковых файлов", count: 16 },
      { name: "Хранение изображений", count: 40 },
    ],
  },
  {
    id: 8,
    name: "Перебор слов и системы счисления",
    subtopics: [
      { name: "Подсчет количества разных последовательностей", count: 22 },
      { name: "Подсчет количества слов с ограничениями", count: 46 },
      { name: "Слова по порядку", count: 51 },
    ],
  },
  {
    id: 9,
    name: "Работа с таблицами",
    subtopics: [{ name: "Задания для подготовки", count: 38 }],
  },
  {
    id: 10,
    name: "Поиск символов в текстовом редакторе",
    subtopics: [{ name: "Задания для подготовки", count: 42 }],
  },
  {
    id: 11,
    name: "Вычисление количества информации",
    subtopics: [
      { name: "Пароли с дополнительными сведениями", count: 64 },
      { name: "Пароли", count: 32 },
    ],
  },
  {
    id: 12,
    name: "Выполнение алгоритмов для исполнителей",
    subtopics: [
      { name: "Машина Тьюринга", count: 10 },
      { name: "Исполнитель Редактор", count: 57 },
    ],
  },
  {
    id: 13,
    name: "Организация компьютерных сетей. Адресация",
    subtopics: [
      { name: "Восстановить ip-адрес", count: 6 },
      { name: "Подсчет количества адресов в сети", count: 14 },
      { name: "Восстановить url", count: 5 },
      { name: "Определение адреса сети", count: 34 },
      { name: "Определение маски", count: 35 },
    ],
  },
  {
    id: 14,
    name: "Кодирование чисел. Системы счисления",
    subtopics: [
      { name: "Операции в разных СС с двумя переменными", count: 10 },
      { name: "Операции в разных СС с одной переменной", count: 10 },
      { name: "Операции в одной СС", count: 22 },
      { name: "Прямое сложение в СС", count: 53 },
    ],
  },
  {
    id: 15,
    name: "Преобразование логических выражений",
    subtopics: [
      { name: "Побитовая конъюнкция", count: 11 },
      { name: "Числовые отрезки", count: 29 },
      { name: "Координатная плоскость", count: 37 },
      { name: "Разное", count: 10 },
    ],
  },
  {
    id: 16,
    name: "Рекурсивные алгоритмы",
    subtopics: [
      { name: "Рекурсивные функции с возвращаемыми значениями", count: 17 },
      { name: "Алгоритмы, опирающиеся на несколько предыдущих значений", count: 49 },
      { name: "Алгоритмы, опирающиеся на одно предыдущее значение", count: 22 },
    ],
  },
  {
    id: 17,
    name: "Обработки числовой последовательности",
    subtopics: [{ name: "Задания для подготовки", count: 69 }],
  },
  {
    id: 18,
    name: "Робот-сборщик монет",
    subtopics: [{ name: "Задания для подготовки", count: 54 }],
  },
  {
    id: 19,
    name: "Выигрышная стратегия. Задание 1",
    subtopics: [
      { name: "Одна куча", count: 46 },
      { name: "Две кучи", count: 19 },
    ],
  },
  {
    id: 20,
    name: "Выигрышная стратегия. Задание 2",
    subtopics: [
      { name: "Одна куча", count: 50 },
      { name: "Две кучи", count: 18 },
    ],
  },
  {
    id: 21,
    name: "Выигрышная стратегия. Задание 3",
    subtopics: [
      { name: "Одна куча", count: 51 },
      { name: "Две кучи", count: 18 },
    ],
  },
  {
    id: 22,
    name: "Многопроцессорные системы",
    subtopics: [{ name: "Задания для подготовки", count: 68 }],
  },
  {
    id: 23,
    name: "Оператор присваивания и ветвления. Перебор вариантов, построение дерева",
    subtopics: [
      { name: "Количество программ с обязательным этапом", count: 25 },
      { name: "Количество программ с избегаемым этапом", count: 5 },
      { name: "Количество программ с обязательным и избегаемым этапами", count: 30 },
      { name: "Поиск количества программ по заданному числу", count: 20 },
    ],
  },
  {
    id: 24,
    name: "Обработка символьных строк",
    subtopics: [{ name: "Задания для подготовки", count: 65 }],
  },
  {
    id: 25,
    name: "Обработка целочисленной информации",
    subtopics: [
      { name: "Маска числа", count: 20 },
      { name: "Нахождение делителей", count: 29 },
    ],
  },
  {
    id: 26,
    name: "Обработка целочисленной информации",
    subtopics: [{ name: "Задания для подготовки", count: 66 }],
  },
  {
    id: 27,
    name: "Программирование",
    subtopics: [{ name: "Задания для подготовки", count: 75 }],
  },
]

interface TopicsCatalogProps {
  onSubtopicSelect: (topicId: number, topicName: string, subtopicName: string) => void
}

export function TopicsCatalog({ onSubtopicSelect }: TopicsCatalogProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set())

  const toggleTopic = (topicId: number) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(topicId)) {
        newSet.delete(topicId)
      } else {
        newSet.add(topicId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-2">
      {TOPICS_DATA.map((topic) => {
        const isExpanded = expandedTopics.has(topic.id)

        return (
          <Card key={topic.id} className="overflow-hidden">
            <CardContent className="p-0">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center gap-2 p-4 text-left hover:bg-muted/50 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="font-medium">
                  {topic.id}. {topic.name}
                </span>
              </button>

              {isExpanded && (
                <div className="border-t bg-muted/30">
                  {topic.subtopics.map((subtopic, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSubtopicSelect(topic.id, topic.name, subtopic.name)}
                      className="w-full flex items-center justify-between px-4 py-3 pl-14 text-sm hover:bg-muted/50 transition-colors border-b last:border-b-0"
                    >
                      <span className="text-left">{subtopic.name}</span>
                      <span className="text-muted-foreground text-xs">· {subtopic.count} шт.</span>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
