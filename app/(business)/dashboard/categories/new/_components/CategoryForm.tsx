"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { categoryFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { createCategory } from "@/lib/db/mutations/categories";
import { toast } from "sonner";

export default function CategoryForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof categoryFormSchema>>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "",
            color: ""
        }
    });


    function OnSubmit(values: z.infer<typeof categoryFormSchema>) {
        startTransition((async () => {
            const res = await createCategory(values);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message)
                router.push('/dashboard/categories')
            }

        }))

    }


    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Category Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(OnSubmit)} className="max-w-3/4" id="categoryForm">
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Category name</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Category name"
                                    />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}


                                </Field>
                            )}

                        />
                        <Controller
                            control={form.control}
                            name="color"
                            render={({ field, fieldState }) => (
                                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-rhf-select-language">
                                            Colors
                                        </FieldLabel>
                                        <FieldDescription>
                                            Select a color from the list to be used for your category
                                        </FieldDescription>
                                    
                                    </FieldContent>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger aria-invalid={fieldState.invalid} className="min-w-30">
                                            <SelectValue placeholder="Select a color" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectGroup>
                                                <SelectLabel>Colors</SelectLabel>
                                                <SelectItem value="red">
                                                    <div className="bg-red-400 size-4 rounded-full" />
                                                    <p>Red</p>

                                                </SelectItem>
                                                <SelectItem value="green">
                                                    <div className="bg-green-400 size-4 rounded-full" />
                                                    <p>Green</p>

                                                </SelectItem>
                                                <SelectItem value="yellow">
                                                    <div className="bg-yellow-400 size-4 rounded-full" />
                                                    <p>Yellow</p>

                                                </SelectItem>
                                                <SelectItem value="orange">
                                                    <div className="bg-orange-400 size-4 rounded-full" />
                                                    <p>Orange</p>

                                                </SelectItem>
                                                <SelectItem value="blue">
                                                    <div className="bg-blue-400 size-4 rounded-full" />
                                                    <p>Blue</p>

                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}

                        />

                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Button disabled={isPending} form="categoryForm" type="submit">Add Category</Button>
            </CardFooter>

        </Card>
    )

}