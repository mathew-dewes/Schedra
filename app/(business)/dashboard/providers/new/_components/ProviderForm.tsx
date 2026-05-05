"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { createProvider } from "@/lib/db/mutations/providers";
import { serviceProviderFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ProviderForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const form = useForm<z.infer<typeof serviceProviderFormSchema>>({
        resolver: zodResolver(serviceProviderFormSchema),
        defaultValues: {
            name: "",
            contact_name: "",
            email: "",
            address: "",
            notes: undefined,
            phone: ""

        }
    });

    function onSubmit(values: z.infer<typeof serviceProviderFormSchema>) {
        startTransition((async () => {
            const res = await createProvider(values);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message)
                router.push('/dashboard/providers')
            }

        }))
    }
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Provider Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="max-w-3/4" id="providerForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Service provider name</FieldLabel>
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

                        <Controller
                            name="notes"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Notes - Optional
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
                <Button disabled={isPending} form="providerForm">Add Provider</Button>
            </CardFooter>
        </Card>
    )
}