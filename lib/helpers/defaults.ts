import { BookingStatus } from "../db/types";

export const bookingFormDefaultValues = {
    title: "",
    center_id: "",
    vehicle_id: "",
    category_id: "",
    description: "",
    start_time: new Date(),
    status: "Scheduled" as BookingStatus

}