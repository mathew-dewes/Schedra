"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { renewalFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import RenewalTypeSelect from "./RenewalTypeSelect";
import { VehiclePopover } from "../../../bookings/new/_components/VehiclePopover";
import { createRenewal } from "@/lib/db/mutations/renewals";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RenewalDatePicker } from "./RenewalDatePicker";


type Vehicle = {
    id: string, name: string
    
}

export default function RenewalFormClient(
    { vehicles }: { vehicles: Vehicle[]}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm<z.infer<typeof renewalFormSchema>>({
        resolver: zodResolver(renewalFormSchema),
        defaultValues: {
            type: "Registration",
            due_date: new Date(),
            vehicle_id: ""
        }
    });


    function onSubmit(values: z.infer<typeof renewalFormSchema>) {
        startTransition((async () => {
            const selectedVehicle = vehicles.find((vehicle) => {
                return vehicle.id == values.vehicle_id
            }) as Vehicle;



            const res = await createRenewal(values, selectedVehicle);

            if (!res.success) {
                if (res.fieldErrors?.type) {
                    form.setError("type", {
                        type: "server",
                        message: res.fieldErrors.type
                    });

                }
                toast.error(res.message);

            } else {
                toast.success(res.message);
                router.push('/dashboard/renewals')
            }

        }))
    }
    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Renewal Form</CardTitle>
                  <CardDescription>
                    Please fill out the required fields to add a renewal to the system
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="renewalForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="vehicle_id"
                            render={({ field, fieldState }) => (
                                <Field className="sm:w-1/2" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Vehicle *
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a vehicle from the list below
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
                            name="type"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Renewal Type *
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a renewal type from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <RenewalTypeSelect value={field.value} onChange={field.onChange} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="due_date"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Due Date
                                        </FieldLabel>

                                        <RenewalDatePicker value={field.value} onChange={field.onChange} />
                                    </FieldContent>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal">
                    <Button disabled={isPending} type="submit" form="renewalForm">
                        Add Renewal
                    </Button>
                </Field>
                </CardFooter>

        </Card>
    )
}