"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateBusinessName } from "@/lib/auth/actions";
import { businessFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function BusinessForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm<z.infer<typeof businessFormSchema>>({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            name: ""
        }
    });

    function onSubmit(values: z.infer<typeof businessFormSchema>) {
        startTransition((async () => {
            const res = await updateBusinessName(values);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.push('/dashboard')
            }

        }))
    }
    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Business Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="bookingForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Business name</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Business name"
                                    />
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