"use client"

import { useState } from "react"
import { DashboardNav } from "./dashboard-nav"
import { DashboardHome } from "./dashboard-home"
import { TaskGenerator } from "./task-generator"
import { CodeEditor } from "./code-editor"
import { ProgressAnalytics } from "./progress-analytics"
import { PracticeMode } from "./practice-mode"
import { Leaderboard } from "./leaderboard"
import { Gamification } from "./gamification"
import { TrainingVariants } from "./training-variants"
import { TopicsCatalog } from "./topics-catalog"
import { SubtopicTasks } from "./subtopic-tasks"
import { ThemeToggle } from "./theme-toggle"

export type NavSection =
  | "home"
  | "generator"
  | "variants"
  | "catalog"
  | "practice"
  | "editor"
  | "analytics"
  | "leaderboard"
  | "achievements"

export function DashboardShell() {
  const [activeSection, setActiveSection] = useState<NavSection>("home")
  const [selectedSubtopic, setSelectedSubtopic] = useState<{
    topicId: number
    topicName: string
    subtopicName: string
  } | null>(null)

  const handleSubtopicSelect = (topicId: number, topicName: string, subtopicName: string) => {
    setSelectedSubtopic({ topicId, topicName, subtopicName })
  }

  const handleBackToCatalog = () => {
    setSelectedSubtopic(null)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-3">
          <h1 className="text-xl font-semibold">
            {activeSection === "home" && "Главная"}
            {activeSection === "generator" && "Генератор задач"}
            {activeSection === "variants" && "Тренировочные варианты"}
            {activeSection === "catalog" && (selectedSubtopic ? "Задания" : "Каталог заданий")}
            {activeSection === "practice" && "Практика"}
            {activeSection === "editor" && "Редактор кода"}
            {activeSection === "analytics" && "Аналитика"}
            {activeSection === "leaderboard" && "Таблица лидеров"}
            {activeSection === "achievements" && "Достижения"}
          </h1>
          <ThemeToggle />
        </div>

        <div className="p-6">
          {activeSection === "home" && <DashboardHome onNavigate={setActiveSection} />}
          {activeSection === "generator" && <TaskGenerator />}
          {activeSection === "variants" && <TrainingVariants />}
          {activeSection === "catalog" &&
            (selectedSubtopic ? (
              <SubtopicTasks
                topicId={selectedSubtopic.topicId}
                topicName={selectedSubtopic.topicName}
                subtopicName={selectedSubtopic.subtopicName}
                onBack={handleBackToCatalog}
              />
            ) : (
              <TopicsCatalog onSubtopicSelect={handleSubtopicSelect} />
            ))}
          {activeSection === "practice" && <PracticeMode />}
          {activeSection === "editor" && <CodeEditor />}
          {activeSection === "analytics" && <ProgressAnalytics />}
          {activeSection === "leaderboard" && <Leaderboard />}
          {activeSection === "achievements" && <Gamification />}
        </div>
      </main>
    </div>
  )
}
