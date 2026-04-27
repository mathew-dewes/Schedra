"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businessFormSchema } from "@/lib/schemas"
import { days } from "@/lib/constants"
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react"
import { createBusiness } from "@/lib/db/mutations/business"
import { timeOptions } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function BusinessForm() {

    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            name: "",
            description: "",
            email: "",
            phone: "",
            address: "",
            hours: {
                monday: { enabled: false, open: "09:00", close: "17:00" },
                tuesday: { enabled: false, open: "09:00", close: "17:00" },
                wednesday: { enabled: false, open: "09:00", close: "17:00" },
                thursday: { enabled: false, open: "09:00", close: "17:00" },
                friday: { enabled: false, open: "09:00", close: "17:00" },
                saturday: { enabled: false, open: "09:00", close: "17:00" },
                sunday: { enabled: false, open: "09:00", close: "17:00" },
            },

        },
    });

    function onSubmit(values: z.infer<typeof businessFormSchema>) {
        
        console.log(values);
        
        startTransition((async () => {
            const res = await createBusiness(values);

            if (!res.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message)
                router.push('/dashboard')
            }
        }));


    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Business setup</CardTitle>
                <CardDescription>
                    In ordering to utilize the Schedra system, you must fill out all required details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                    }
                }} id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Business name
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                                      <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Business Email
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                                      <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Business Phone - Optional
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        
                                      <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Address
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description - Optional
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

                

                        <FieldSeparator />

                        <FieldLabel>
                            Business Hours
                        </FieldLabel>
                        <FieldDescription>Click the checkbox to enable the day and select your businesses opening and closing time</FieldDescription>
                        <p className="font-medium" >Day / Open / Close:</p>
                        {days.map((day) => (
                            <div className="flex items-center gap-3" key={day}>
                                <Controller name={`hours.${day}.enabled`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(!!checked)}
                                        />

                                    )} />


                                <span className="w-20 capitalize">{day}</span>

                                <Controller
                                    name={`hours.${day}.open`}
                                    control={form.control}
                                    render={({ field }) => (
                                        // eslint-disable-next-line react-hooks/incompatible-library
                                        <Select disabled={!form.watch(`hours.${day}.enabled`)} value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-30">
                                                <SelectValue placeholder="Open" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {timeOptions.map((time) => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />



                                <Controller
                                    name={`hours.${day}.close`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select disabled={!form.watch(`hours.${day}.enabled`)} value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-30">
                                                <SelectValue placeholder="Close" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {timeOptions.map((time) => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />


                            </div>
                        ))}



                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isPending} type="submit" form="form-rhf-demo">
                        Save and exit
                    </Button>
                </Field>
            </CardFooter>

        </Card>
    )
}
