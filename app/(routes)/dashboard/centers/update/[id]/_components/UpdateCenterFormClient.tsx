"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateCenter } from "@/lib/db/mutations/centers";
import { centerFormSchema } from "@/lib/schemas";
import { CenterEntry } from "@/lib/types/entries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function UpdateCenterFormClient({center, center_id}:
    {center: CenterEntry, center_id: string}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const form = useForm<z.infer<typeof centerFormSchema>>({
        resolver: zodResolver(centerFormSchema),
        defaultValues: {
            name: center.name,
            contact_name: center.contact_name,
            email: center.email,
            address: center.address,
            phone: center.phone

        }
    });

function onSubmit(values: z.infer<typeof centerFormSchema>) {
  startTransition(async () => {
    const res = await updateCenter(values, center_id);

    if (!res.success) {
     toast.error(res.message);
    }

    toast.success(res.message);
    router.push("/dashboard/centers");
  });
}
    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Update Service Center</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="max-w-3/4" id="centerForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Service center name</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Provider name"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}

                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="contact_name"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Contact name</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Contact name"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}

                                </Field>
                            )}
                        />

                        
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email Address</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Email address"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}

                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="phone"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Phone number</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Phone number"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}

                                </Field>
                            )}
                        />
              
                                  <Controller
                            control={form.control}
                            name="address"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Address</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Phone number"
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
                    <Button disabled={isPending} type="submit" form="centerForm">
                        Update
                    </Button>
                </Field>
                </CardFooter>
        </Card>
    )
}