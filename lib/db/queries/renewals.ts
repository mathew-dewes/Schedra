"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { RenewalStatusEnum, RenewalTypeEmum } from "@/lib/types/enums";
import { generateRenewalStatus } from "@/lib/utils";
import { addDays, subDays } from "date-fns";


type GetRenewalsProps = {
    status?: RenewalStatusEnum;
    type?: RenewalTypeEmum;
};

export async function getRenewals({
    status,
    type,
}: GetRenewalsProps = {}) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const ninetyDaysAgo = subDays(new Date(), 90);
    

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    let query = supabase.from("renewals")
        .select(`id, due_date, type, vehicles(make, model, year, plant_number, plate_number)`)
        .gte("due_date", ninetyDaysAgo.toISOString())
        .order("due_date", {ascending: true});


        if (type) {
        query = query.eq("type", type);
    };
    
   if (status){
        query = query.order("created_at", {ascending: false})
    };

      const { data, error } = await query;
    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

    const formatted = data?.map((renewal) => ({
        id: renewal.id,
        dueDate: new Date(renewal.due_date),
        type: renewal.type,
        vehicle: renewal.vehicles.make + " " + renewal.vehicles.model,
        plant: renewal.vehicles.plant_number.toUpperCase(),
        status: generateRenewalStatus(new Date(renewal.due_date)),
        vehicle_plate: renewal.vehicles.plate_number

    }));

       const filtered = status
        ? formatted.filter(
              (renewal) =>
                  renewal.status === status
          )
        : formatted;

 
    

    return filtered;

};

export async function getRecentRenewals(){
       const user_id = await getUserId();
    const supabase = await createClientForServer();
    const aWeekFromNow = addDays(new Date(), 7);

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const query = supabase.from("renewals")
        .select(`id, due_date, type, vehicles(make, model, year, plant_number, plate_number)`)
        .lte("due_date", aWeekFromNow.toISOString())
        .order("due_date", {ascending: true})
  

      const { data, error } = await query;
    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

    const formatted = data?.map((renewal) => ({
        id: renewal.id,
        dueDate: new Date(renewal.due_date),
        type: renewal.type,
        vehicle: renewal.vehicles.make + " " + renewal.vehicles.model,
        plant: renewal.vehicles.plant_number.toUpperCase(),
        status: generateRenewalStatus(new Date(renewal.due_date)),
        vehicle_plate: renewal.vehicles.plate_number

    }));

    return formatted;

}


export async function getRenewal(renewal_id: string){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const {data: renewal, error} = await supabase.from("renewals")
    .select("id, vehicles(make, model, plate_number, plant_number), type, due_date, notes")
    .eq("id", renewal_id).single();
       
    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

    return {
        id: renewal.id,
        dueDate: new Date(renewal.due_date),
        type: renewal.type,
        vehicle: renewal.vehicles.make + " " + renewal.vehicles.model,
        plant: renewal.vehicles.plant_number.toUpperCase(),
        status: generateRenewalStatus(new Date(renewal.due_date)),
        vehicle_plate: renewal.vehicles.plate_number,
        notes: renewal.notes
    };

};


export async function getRenewalChartData(){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const {data, error} = await supabase.from("renewals").select("due_date, type")
    .eq("user_id", user_id);

       if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

      const chartMap: Record<
    string,
    {
      date: string;
      WOF: number;
      REGO: number;
      RUC: number;
      SERVICE: number;
    }
  > = {};

    for (let i = 0; i < 30; i++) {
    const date = new Date();

    date.setDate(date.getDate() + i);

    const formattedDate = date.toISOString().split("T")[0];

    chartMap[formattedDate] = {
      date: formattedDate,
      WOF: 0,
      REGO: 0,
      RUC: 0,
      SERVICE: 0,
    };
  }
  data.forEach((renewal) => {
    const date = renewal.due_date.split("T")[0];

    // Ignore dates outside the next 30 days
    if (!chartMap[date]) return;

    switch (renewal.type) {
      case "Warrant of fitness":
        chartMap[date].WOF += 1;
        break;

      case "Registration":
        chartMap[date].REGO += 1;
        break;

      case "Road user charge":
        chartMap[date].RUC += 1;
        break;

      case "Service":
        chartMap[date].SERVICE += 1;
        break;
    }
  });

  return Object.values(chartMap);
}