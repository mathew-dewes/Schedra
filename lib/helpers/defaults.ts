
import { BookingStatusEnum } from "../types/enums";

export const bookingFormDefaultValues = {
                title: "",
                center_id: "",
                vehicle_id: "",
                description: "",
                start_date: new Date(),
                status: "Scheduled" as BookingStatusEnum
        }