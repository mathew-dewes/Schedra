import "dotenv/config";
import { BOOKING_STATUSES, BOOKING_TYPES, RENEWAL_TYPES } from "../constants";

import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { BookingInsert, RenewalInsert, Vehicle } from "../types";
import { generateBookingTitle, generateDueDate, generateRandomDate, getRandom } from "../utils";


async function seedData() {
    const demo_user_id = process.env.DEMO_USER_ID!;
    const supabase = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
        const { data: vehicles, error: vehicleError } = await supabase.from("vehicles").select().eq("user_id", demo_user_id);
        const { data: centers, error: centerError } = await supabase.from("centers").select().eq("user_id", demo_user_id);

        if (vehicleError) {
            console.log(vehicleError);
            return {
                success: false,
                message: vehicleError.message
            }

        };
        if (centerError) {
            console.log(centerError);
            return {
                success: false,
                message: centerError.message
            }

        };

        const renewals = [] as RenewalInsert[];
        const bookings = [] as BookingInsert[];


        await supabase.from('renewals').delete().eq("user_id", demo_user_id);
        await supabase.from('bookings').delete().eq("user_id", demo_user_id);

        let i = 0;

        for (const vehicle of vehicles as Vehicle[]) {
            for (const type of RENEWAL_TYPES) {
                renewals.push({
                    vehicle_id: vehicle.id,
                    type,
                    due_date: generateDueDate(i++).toISOString(),
                    user_id: demo_user_id
                })
            }
        };

        for (let i = 0; i < 40; i++) {
            const randomStatus = getRandom(BOOKING_STATUSES);
            const randomType = getRandom(BOOKING_TYPES);
            
            bookings.push({
                vehicle_id: getRandom(vehicles).id,
                start_date: generateRandomDate().toISOString(),
                status: randomStatus,
                title: generateBookingTitle(randomType),
                center_id: getRandom(centers).id,
                user_id: demo_user_id,
                type: randomType
            })
        }

        const { error: renewalInsertError } = await supabase.from("renewals").insert(renewals);

        if (renewalInsertError) {
            console.log(renewalInsertError);
            return {
                success: false,
                message: renewalInsertError.message
            }

        };

        const { error: bookingInsertError } = await supabase.from("bookings").insert(bookings);

        if (bookingInsertError) {
            console.log(bookingInsertError);
            return {
                success: false,
                message: bookingInsertError.message
            }

        };

        return {
            success: true,
            renewals: renewals.length,
            bookings: bookings.length
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Seeding data failed"
        };
    }


};

seedData().then(console.log);