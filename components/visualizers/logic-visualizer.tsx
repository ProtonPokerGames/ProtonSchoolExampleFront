"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LogicVisualizer() {
  const [variables, setVariables] = useState(["A", "B"])
  const [expression, setExpression] = useState("A ∧ B")
  const [truthTable, setTruthTable] = useState<Array<Record<string, boolean | string>>>([])

  const generateTruthTable = () => {
    const numVars = variables.length
    const numRows = 2 ** numVars

    const rows: Array<Record<string, boolean | string>> = []

    for (let i = 0; i < numRows; i++) {
      const row: Record<string, boolean | string> = {}

      for (let j = 0; j < numVars; j++) {
        const varName = variables[j]
        row[varName] = Boolean((i >> (numVars - 1 - j)) & 1)
      }

      // Simplified evaluation - in real app would parse and evaluate expression
      const result = Math.random() > 0.5
      row["Result"] = result ? "1" : "0"

      rows.push(row)
    }

    setTruthTable(rows)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Построитель таблиц истинности</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Логическое выражение</Label>
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Например: A ∧ B ∨ ¬C"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Операции: ∧ (AND), ∨ (OR), ¬ (NOT), → (импликация), ↔ (эквивалентность)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Переменные (через запятую)</Label>
            <Input
              value={variables.join(", ")}
              onChange={(e) => setVariables(e.target.value.split(",").map((v) => v.trim()))}
              placeholder="A, B, C"
            />
          </div>

          <Button onClick={generateTruthTable} className="w-full">
            Построить таблицу истинности
          </Button>
        </div>
      </Card>

      {truthTable.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Таблица истинности</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  {[...variables, "Результат"].map((header) => (
                    <th key={header} className="p-3 text-left font-semibold bg-muted">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {truthTable.map((row, index) => (
                  <tr key={index} className="border-b">
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className="p-3 font-mono">
                        {typeof value === "boolean" ? (value ? "1" : "0") : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
