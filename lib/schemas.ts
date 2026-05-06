import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters')
});

export const registerSchema = z.object({
  name: z.string('Full name is required').min(5, 'Full name must be 5 or more characters').max(30, 'Full name must be 30 or less characters'),
  businessName: z.string('Business name is required').min(5, 'Business name must be 5 or more characters').max(30, 'Business name must be 30 or less characters'),
  email: z.email(),
  password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),
  confirmPassword: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters'),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirm Password do not match",
  path: ["confirmPassword"],
});





export const bookingFormSchema = z.object({
  title: z.string().min(1, 'Booking title is required'),
  description: z.string().min(1, 'Plant number is required'),
  status: z.string(),
  start_time: z.date(),
  end_time: z.date(),
  center: z.string().min(1, 'Service center is required'),
  vehicle: z.string(),
  category: z.string()
});


export const vehicleFormSchema = z.object({
  plant_number: z.string().min(1, 'Plant number is required'),
  plate_number: z.string().min(1, 'Licence plate number is required'),
  make: z.string().min(1, 'Vehicle make is required'),
  model: z.string().min(1, 'Vehicle model is required'),
  year: z.string().min(1, 'Vehicle year is required'),
  vin: z.string().optional(),
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

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Please select a color')
})


