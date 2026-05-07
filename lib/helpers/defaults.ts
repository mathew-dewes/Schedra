
import { BookingStatusEnum, BookingTypeEnum } from "../types/enums";

export const bookingFormDefaultValues = {
                title: "",
                center_id: "",
                vehicle_id: "",
                booking_type: "" as BookingTypeEnum,
                description: "",
                start_date: new Date(),
                status: "Scheduled" as BookingStatusEnum
        }