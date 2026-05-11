"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { buttonVariants } from "@/components/ui/button"
import { normalizeText } from "@/lib/utils"
import { VEHICLE_STATUES } from "@/lib/constants"
import Link from "next/link"

export const description = "A pie chart with a label";

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
  data}: {  data?: { status: string; total: number }[]}) {
 
  const chartData = data?.map((item) => {
     const key = normalizeText(item.status)
    return {
    ...item,
    statusKey: key,
    fill: colorMap[item.status] || "#808080",}
  });



const totalVehicles = data?.reduce((sum, item) => {
  return sum + item.total;
}, 0);



  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vehicle Status</CardTitle>
               <CardDescription>
                <div className="flex items-center flex-wrap gap-5">
                  {VEHICLE_STATUES.map((status)=>{
                    return <div key={status} className="flex items-center gap-1">
            <h2>{status}</h2>
            <div style={{backgroundColor: colorMap[status]}} className={`size-3 rounded`}/>
                  </div>
                  })}
            
             
                </div>
               </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
    
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

          </PieChart>
        </ChartContainer>
       
    
 
      </CardContent>
      <CardFooter className="flex-col gap-5 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total vehicles: {totalVehicles}
        </div>
     
        <Link href={'/dashboard/vehicles'} className={buttonVariants()}>View vehicles</Link>
      </CardFooter>
    </Card>
  )
}
