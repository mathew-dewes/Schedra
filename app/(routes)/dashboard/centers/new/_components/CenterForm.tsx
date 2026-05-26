"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCenter } from "@/lib/db/mutations/centers";
import { centerFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CenterForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const form = useForm<z.infer<typeof centerFormSchema>>({
        resolver: zodResolver(centerFormSchema),
        defaultValues: {
            name: "",
            contact_name: "",
            email: "",
            address: "",
            phone: ""

        }
    });

function onSubmit(values: z.infer<typeof centerFormSchema>) {
  startTransition(async () => {
    const res = await createCenter(values);

    if (!res.success) {
      if (res.fieldErrors?.email) {
        form.setError("email", {
          type: "server",
          message: res.fieldErrors.email
        });
        
      } else {
        toast.error(res.message);
      }
      return;
    }

    toast.success(res.message);
    router.push("/dashboard/centers");
  });
}
    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Center Form</CardTitle>
                <CardDescription>
                    Please fill out the required fields to add a center to the system.
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
                                    <FieldLabel>Center name *</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Center name"
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
                                    <FieldLabel>Contact name *</FieldLabel>
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
                                    <FieldLabel>Email Address *</FieldLabel>
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
                                    <FieldLabel>Phone number *</FieldLabel>
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
                                    <FieldLabel>Address *</FieldLabel>
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
                    <Button disabled={isPending} type="button" variant="outline" onClick={() => form.reset()}>
                        Clear
                    </Button>
                    <Button disabled={isPending} type="submit" form="centerForm">
                        Add center
                    </Button>
                </Field>
                </CardFooter>
        </Card>
    )
}