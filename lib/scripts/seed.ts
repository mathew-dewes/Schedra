import "dotenv/config";
import { BOOKING_STATUSES, RENEWAL_TYPES } from "../constants";
import { BookingInsert, RenewalInsert, Vehicle } from "../db/types";
import { generateDueDate, generateRandomDate, getRandom } from "../helpers/generate";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";


async function seedData() {
    const demo_user_id = process.env.DEMO_USER_ID!;
    const supabase = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
        const { data: vehicles, error: vehicleError } = await supabase.from("vehicles").select().eq("user_id", demo_user_id);
        const { data: centers, error: centerError } = await supabase.from("service_centers").select().eq("user_id", demo_user_id);

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


        for (const vehicle of vehicles as Vehicle[]) {
            for (const type of RENEWAL_TYPES) {
                renewals.push({
                    vehicle_id: vehicle.id,
                    type,
                    due_date: generateDueDate().toISOString(),
                    user_id: demo_user_id
                })
            }
        };

        for (let i = 0; i < 40; i++) {
            bookings.push({
                vehicle_id: getRandom(vehicles).id,
                start_date: generateRandomDate().toISOString(),
                status: getRandom(BOOKING_STATUSES),
                title: "Testing seeding data",
                center_id: getRandom(centers).id,
                user_id: demo_user_id
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