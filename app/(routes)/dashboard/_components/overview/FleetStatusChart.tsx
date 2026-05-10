"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

export const description = "A pie chart with a label";

const normalizeStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace(/\s+/g, "") // "In service" -> "inservice"
}

const colorMap: Record<string, string> = {
  Available: "#3b82f6",
  "In service": "#10b981",
  "Out of service": "#ef4444",
  "Under maintenance": "#f59e0b",
}

const chartConfig = {
  available: {
    label: "Available",
  },
  inservice: {
    label: "In Service",
  },
  outofservice: {
    label: "Out of Service",
  },
  undermaintenance: {
    label: "Under Maintenance",
  },
} satisfies ChartConfig

export function FleetStatusChart({
  data,}: {  data?: { status: string; total: number }[]}) {
 
  const chartData = data?.map((item) => {
     const key = normalizeStatus(item.status)
    return {
    ...item,
    statusKey: key,
    fill: colorMap[item.status] || "#808080",}
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fleet Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={chartData} 
              dataKey="total" 
              nameKey="statusKey"
              label 
            />
            <ChartLegend
              content={<ChartLegendContent />}
               className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
        <Button>View vehicles</Button>
      </CardFooter>
    </Card>
  )
}
