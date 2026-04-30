"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { bookingFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import BookingDatePicker from "./BookingDatePicker";
import { Button } from "@/components/ui/button";
import { CustomerSearchBox } from "./CustomerSearchBox";
import { ServiceTypeDropDown } from "./ServiceTypeDropDown";
import { StartTimeDropDown } from "./StartTimeDropDown";

export default function BookingForm() {

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            date: new Date(),
            start_time: "12:00",
            customer_id: "",
            customer: undefined,
            customer_mode: "existing"
        }
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const customerMode = form.watch("customer_mode");


    function onSubmit(data: z.infer<typeof bookingFormSchema>) {
        console.log(data);

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
                            control={form.control}
                            name="customer_mode"
                            render={({ field }) => (
                                <div className="flex gap-2 mb-4">
                                    <Button
                                        type="button"
                                        variant={field.value === "existing" ? "default" : "secondary"}
                                        onClick={() => field.onChange("existing")}
                                    >
                                        Existing Customer
                                    </Button>

                                    <Button
                                        variant={field.value === "new" ? "default" : "secondary"}
                                        type="button"
                                        onClick={() => field.onChange("new")}
                                    >
                                        New Customer
                                    </Button>
                                </div>
                            )}
                        />

                        {customerMode === "new" && (
                            <FieldGroup>
                                <Controller
                                    name="customer.name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Name</FieldLabel>
                                            <Input {...field} placeholder="Customer name" />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="customer.email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input {...field} placeholder="Customer email" />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="customer.phone"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>Phone</FieldLabel>
                                            <Input {...field} placeholder="Customer phone number" />
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        )}



                        {customerMode === "existing" && (
                            <Controller
                                name="customer_id"
                                control={form.control}
                                render={({ fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Customer</FieldLabel>

                                        <CustomerSearchBox />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        )}

                                 <Controller
                            control={form.control}
                            name="date"
                            render={({ fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Booking Date</FieldLabel>
                                    <BookingDatePicker />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="date"
                            render={({ fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Start time</FieldLabel>
                                    <StartTimeDropDown />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />

               
                        <Controller
                            control={form.control}
                            name="service_type"
                            render={({ fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Service type</FieldLabel>
                                    <ServiceTypeDropDown />
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
                <Button>Create Booking</Button>
            </CardFooter>

        </Card>

    )
}