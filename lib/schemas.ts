import z from "zod";
import { RENEWAL_TYPES } from "./constants";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be 6 or more characters').max(30, 'Password must be 30 or less characters')
});

export const forgotPasswordEmailSchema = z.object({
  email: z.email()
})

export const forgotPasswordSchema = z.object({
  password: z.string().min(6, "Password must be 6 or more characters ")
});

export const registerSchema = z.object({
  name: z.string('Full name is required').min(5, 'Full name must be 5 or more characters').max(30, 'Full name must be 30 or less characters'),
  email: z.email(),
  password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),
  confirmPassword: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirm Password do not match",
  path: ["confirmPassword"],
});





export const bookingFormSchema = z.object({
  title: z.string().min(1, 'Booking title is required'),
  description: z.string().optional(),
  start_date: z.date(),
  center_id: z.string().min(1, 'Service center is required'),
  vehicle_id: z.string().min(1, 'Vehicle is required')
});


export const vehicleFormSchema = z.object({
  plant_number: z.string().min(1, 'Plant number is required'),
  plate_number: z.string().min(1, 'Licence plate number is required'),
  make: z.string().min(1, 'Vehicle make is required'),
  model: z.string().min(1, 'Vehicle model is required'),
  year: z.string().min(1, 'Vehicle year is required'),
  notes: z.string().optional()
});


export const serviceProviderFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contact_name: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.email(),
  address: z.string().min(1, 'Address is required'),
  notes: z.string().optional()
});


export const renewalFormSchema = z.object({
  type: z.enum(RENEWAL_TYPES, "Please select a renewal type"),
  vehicle_id: z.string().min(1, 'Please select a vehicle'),
  due_date: z.date(),

});


export const updateRenewalFormSchema = z.object({
  dueDate: z.date(),
  notes: z.string().optional()
})


export const businessFormSchema = z.object({
  name: z.string().min(3)
})




