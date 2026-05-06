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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Center = { id: string; name: string };
type Vehicle = { id: string; name: string };
type Category = {id: string, name: string, color: string}
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { BOOKING_STATUS_OPTIONS } from "@/lib/utils";


export default function BookingForm({ centers, vehicles, categories}:
    { centers: Center[], vehicles: Vehicle[], categories: Category[] }
) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            center: "",
            vehicle: "",
            start_time: new Date(),
            end_time: new Date(),
            status: "scheduled"

        }
    });


    function onSubmit(values: z.infer<typeof bookingFormSchema>) {
        startTransition((async () => {
            console.log(values);

        }))
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
                            name="center"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Service Center
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a service center from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <Combobox<Center>
                                        items={centers}
                                        value={centers.find(c => c.id === field.value) ?? null}
                                        onValueChange={(item) => field.onChange(item?.id ?? "")}
                                    >
                                        <ComboboxInput
                                            aria-invalid={fieldState.invalid}
                                            value={
                                                centers.find(c => c.id === field.value)?.name ?? ""
                                            }
                                            placeholder="Select a framework" />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.id} value={item}>
                                                        {item.name}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="vehicle"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel>
                                            Vehicle
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a service center from the list below
                                        </FieldDescription>

                                    </FieldContent>
                                    <Combobox<Vehicle>
                                        items={vehicles}
                                        value={vehicles.find(c => c.id === field.value) ?? null}
                                        onValueChange={(item) => field.onChange(item?.id ?? "")}
                                    >
                                        <ComboboxInput
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Select a framework"
                                            value={
                                                vehicles.find(c => c.id === field.value)?.name ?? ""
                                            } />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.id} value={item}>
                                                        {item.name}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
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
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                {BOOKING_STATUS_OPTIONS.map((option) => {
                                                    return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                })}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="category"
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
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {categories.map((cat) => {
                                                    return <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                })}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                                {field.value.length}/100 characters
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