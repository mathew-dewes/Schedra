"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { bookingFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { VehiclePopover } from "./VehiclePopover";
import StatusSelect from "./StatusSelect";
import CategorySelect from "./CategorySelect";
import {Center, Vehicle } from "@/lib/db/types";
import { bookingFormDefaultValues } from "@/lib/helpers/defaults";
import { StartDatePicker } from "./StartDatePicker";
import { createBooking } from "@/lib/db/mutations/bookings";
import { ServiceCenterPopover } from "./ServiceCenterPopover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/constants";






export default function BookingForm({ centers, vehicles }:
    { centers: Center[], vehicles: Vehicle[] }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: bookingFormDefaultValues
    });


    function onSubmit(values: z.infer<typeof bookingFormSchema>) {
        startTransition((async () => {
            const res = await createBooking(values);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.push("/dashboard/bookings")
            }

        }))
    }
    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Booking Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} id="bookingForm">
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Booking title</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Booking title"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}


                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="center_id"
                            render={({ field, fieldState }) => (
                                <Field className="sm:w-1/2" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Service Center
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a service center from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                     <ServiceCenterPopover value={field.value} onChange={field.onChange} centers={centers} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="vehicle_id"
                            render={({ field, fieldState }) => (
                                <Field className="sm:w-1/2" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Vehicle
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a service center from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <VehiclePopover value={field.value} onChange={field.onChange} vehicles={vehicles} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="status"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Status
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a booking status from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <StatusSelect value={field.value} onChange={field.onChange} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="category_id"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Category
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a category from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <CategorySelect value={field.value} onChange={field.onChange} categories={categories} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="start_date"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                         <FieldContent>
                                        <FieldLabel>
                                            Start Date
                                        </FieldLabel>
                                

                                    </FieldContent>
                                    <StartDatePicker value={field.value} onChange={field.onChange} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}

                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value?.length ?? 0}/100 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        Include steps to reproduce, expected behavior, and what
                                        actually happened.
                                    </FieldDescription>
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
                <Field orientation="horizontal">
                    <Button disabled={isPending} type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isPending} type="submit" form="bookingForm">
                        Submit
                    </Button>
                </Field>    </CardFooter>
        </Card>
    )
}