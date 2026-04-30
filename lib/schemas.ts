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


export const businessFormSchema = z.object({
  name: z.string().min(3, 'Business name must be 3 or more characters'),
  description: z.string().optional(),
  phone: z.string().optional(),
  email: z.email(),
  address: z.string().min(1, "Address is required"),
  hours: z.object({
    monday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    tuesday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    wednesday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    thursday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    friday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    saturday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
    sunday: z.object({
      open: z.string(),
      enabled: z.boolean(),
      close: z.string(),
    }),
  }),

});


export const serviceFormSchema = z.object({
  name: z.string().min(3, 'Service name must be 3 or more characters'),
  description: z.string(),
  duration_minutes: z.string(),
  price: z.string().optional()
});


export const bookingFormSchema = z.object({
  customerName: z.string(),
  date: z.date(),
  service_type: z.string(),
  start_time: z.string(),
  customer_mode: z.enum(["existing", "new"]),
  customer_id: z.string().optional(),
  customer: z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
    })
    .optional(),
}).refine((data) => {
  if (data.customer_mode === "existing") {
    return !!data.customer_id;
  }
  if (data.customer_mode === "new") {
    return !!data.customer;
  }
  return false;
}, {
  message: "Customer information is required",
  path: ["customer"],
});
