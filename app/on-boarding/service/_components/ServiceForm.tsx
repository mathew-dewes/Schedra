"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { service_durations } from "@/lib/constants";
import { createService } from "@/lib/db/mutations/service";
import { serviceFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ServiceForm({business_id}:
    {business_id: string}
) {
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            name: "",
            description: "",
            duration_minutes: "30",
            price: ""
      
       
        }
    });


    function onSubmit(values: z.infer<typeof serviceFormSchema>) {
        startTransition((async () => {
            const res = await createService(values, business_id);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message);
                form.reset()
            }
      
        }))

    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Service setup</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, fugiat.</CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="serviceForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                        }
                    }}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Service name</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter service name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />

                        <Controller
                            name="duration_minutes"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Service duration
                                    </FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {service_durations.map((duration) => (
                                                <SelectItem key={duration} value={duration}>{duration} minutes</SelectItem>
                                            ))}


                                        </SelectContent>
                                    </Select>
                                    <FieldDescription>
                                        Choose how often you want to be billed.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="price"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.error}>
                                    <FieldLabel>Price</FieldLabel>
                                    <Input
                                        type="number"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter service price"
                                        autoComplete="off"
                                    />

                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value?.length}/100 characters
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
                <Field orientation={"horizontal"}>
                    <Button onClick={() => form.reset()} type="button" variant={"outline"}>
                        Reset
                    </Button>
                    <Button disabled={isPending} type="submit" form="serviceForm">
                        Add service
                    </Button>
          

                </Field>
            </CardFooter>
        </Card>
    )
}