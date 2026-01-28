"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Pie, PieChart, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ROASChartProps {
  data: { mois: string; roas: number }[]
}

interface BudgetChartProps {
  data: { produit: string; budget: number }[]
}

const COLORS = [
  "hsl(260, 60%, 55%)",
  "hsl(160, 50%, 50%)",
  "hsl(40, 70%, 55%)",
  "hsl(300, 50%, 55%)",
  "hsl(80, 50%, 50%)",
  "hsl(200, 60%, 50%)",
  "hsl(20, 70%, 55%)",
]

export function ROASByMonthChart({ data }: ROASChartProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">ROAS par mois</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis 
                dataKey="mois" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Tooltip 
                formatter={(value: number) => [value.toFixed(2), "ROAS"]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
              />
              <Bar dataKey="roas" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.roas >= 1 ? "hsl(160, 50%, 50%)" : "hsl(0, 70%, 55%)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function BudgetByProductChart({ data }: BudgetChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const pieData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Budget par produit</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="budget"
                nameKey="produit"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Budget"]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
              />
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle"
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
