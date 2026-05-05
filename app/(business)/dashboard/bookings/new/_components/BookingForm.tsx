"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { bookingFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import BookingDatePicker from "./BookingDatePicker";
import { Button } from "@/components/ui/button";
import { CustomerSearchBox } from "./CustomerSearchBox";
import { ServiceTypeDropDown } from "./ServiceTypeDropDown";
import { StartTimeDropDown } from "./StartTimeDropDown";
import { toast } from "sonner";

export default function BookingForm() {

    

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
          shouldUnregister: true,
        defaultValues: {
            date: new Date(),
            start_time: "",
            customer_id: "",
            service_type: "",
            customer: undefined,
            customer_mode: "existing",
        }
    });


    function onSubmit(data: z.infer<typeof bookingFormSchema>) {
        console.log(data);
        toast(JSON.stringify(data))

    }

    return (

        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Booking Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="w-3/4" onSubmit={form.handleSubmit(onSubmit)} id="bookingForm">
                    <FieldGroup>
            
                            <Controller
                                name="customer_id"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Customer</FieldLabel>

                                        <CustomerSearchBox value={field.value ?? ""}
                                            onChange={field.onChange} />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                     

                        <Controller
                            control={form.control}
                            name="date"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Booking Date</FieldLabel>
                                    <BookingDatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="start_time"
                            render={({ field ,fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Start time</FieldLabel>
                                    <StartTimeDropDown 
                                      value={field.value}
                                        onChange={field.onChange}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />


                        <Controller
                            control={form.control}
                            name="service_type"
                            render={({ field ,fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Service type</FieldLabel>
                                    <ServiceTypeDropDown 
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Button form="bookingForm">Create Booking</Button>
            </CardFooter>

        </Card>

    )
}