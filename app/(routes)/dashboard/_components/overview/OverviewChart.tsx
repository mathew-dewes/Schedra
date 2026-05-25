"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RenewalChartEntry } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

type RenewalTotals = {
    WOF: number;
    REGO: number;
    RUC: number;
    SERVICE: number;
}

const chartConfig = {

  WOF: {
    label: "WOF",
    color: "var(--chart-1)",
  },
  REGO: {
    label: "REGO",
    color: "var(--chart-2)",
  },
  RUC: {
    label: "RUC",
    color: "var(--chart-3)",
  },
  SERVICE: {
    label: "SERVICE",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function OverviewChart({renewalData, renewalTotals}:{
  renewalData: RenewalChartEntry[], renewalTotals: RenewalTotals
}) {
  const [timeRange, setTimeRange] = React.useState("30d")

  const filteredData = renewalData.filter((item) => {
      
    const date = new Date(item.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    let daysToAdd = 30;

    if (timeRange === "14d") {
      daysToAdd = 14
    } else if (timeRange === "7d") {
      daysToAdd = 7
    }

      const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + daysToAdd)
      return date >= today && date <= endDate
  })

  return (
    <Card className="pt-0 xl:col-span-3 col-span-5">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-center sm:text-left">Renewal forcast</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Showing upcoming renewals for the next 30 days
          </CardDescription>
          <div>
        
            <div className="flex gap-2 mt-2">
                  <p>Totals:</p>
              <Badge className="bg-chart-1/80">WOF: {renewalTotals.WOF}</Badge>
              <Badge className="bg-chart-2/80">REGO: {renewalTotals.REGO}</Badge>
              <Badge className="bg-chart-3/80">RUC: {renewalTotals.RUC}</Badge>
              <Badge className="bg-chart-4/80">SERVICE: {renewalTotals.SERVICE}</Badge>

            </div>
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              Next 30 days
            </SelectItem>
            <SelectItem value="14d" className="rounded-lg">
              Next 14 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Next 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
 <defs>
  <linearGradient id="WOF" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="var(--color-WOF)" stopOpacity={0.35} />
    <stop offset="95%" stopColor="var(--color-WOF)" stopOpacity={0.02} />
  </linearGradient>

  <linearGradient id="REGO" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="var(--color-REGO)" stopOpacity={0.35} />
    <stop offset="95%" stopColor="var(--color-REGO)" stopOpacity={0.02} />
  </linearGradient>

  <linearGradient id="RUC" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="var(--color-RUC)" stopOpacity={0.35} />
    <stop offset="95%" stopColor="var(--color-RUC)" stopOpacity={0.02} />
  </linearGradient>

  <linearGradient id="SERVICE" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="var(--color-SERVICE)" stopOpacity={0.35} />
    <stop offset="95%" stopColor="var(--color-SERVICE)" stopOpacity={0.02} />
  </linearGradient>
</defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="WOF"
              type="natural"
              fill="url(#WOF)"
              stroke="var(--color-WOF)"
              stackId="a"
            />
            <Area
              dataKey="REGO"
              type="natural"
              fill="url(#REGO)"
              stroke="var(--color-REGO)"
              stackId="b"
            />
            <Area
              dataKey="RUC"
              type="natural"
              fill="url(#RUC)"
              stroke="var(--color-RUC)"
              stackId="c"
            />
            <Area
              dataKey="SERVICE"
              type="natural"
              fill="url(#SERVICE)"
              stroke="var(--color-SERVICE)"
              stackId="d"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
