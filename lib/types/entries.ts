import { RenewalStatus, RenewalType } from "../enums"

export type RenewalEntry = {
    id: string,
    dueDate: Date,
    type: RenewalType,
    vehicle: string,
    plant: string,
    status: RenewalStatus,
    vehicle_plate: string,
    notes: string
};


export type CenterEntry = {
    id: string,
    name: string,
    contact_name: string,
    phone: string,
    email: string,
    address: string,
    notes: string
}