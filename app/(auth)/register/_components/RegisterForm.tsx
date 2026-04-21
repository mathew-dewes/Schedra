"use client"

import { cn, delay } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {registerSchema } from "@/lib/schemas"
import z from "zod"
import { ButtonSpinner } from "@/components/ui/buttonSpinner"
import Link from "next/link"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name:"",
            businessName:"",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    function onSubmit(values: z.infer<typeof registerSchema>) {
        startTransition(async () => {
            await delay(2000);
            alert(JSON.stringify(values))
        

        })
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <span className="sr-only">Register</span>
                        </a>
                        <h1 className="text-xl font-bold">Register</h1>
                        <FieldDescription>
                            Already have an account? <Link href="/login">Login</Link>
                        </FieldDescription>
                    </div>
                               <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="fullName">Full name (Business owner)</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="fullName"
                                    type="text"
                                    placeholder="Full name"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>
                               <Controller
                        name="businessName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="businessName">Business name</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="businessName"
                                    type="text"
                                    placeholder="Business name"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="email"
                                    type="password"
                                    placeholder="Enter password"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>
                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>

                    <Field>
                        {isPending ? <ButtonSpinner text="Registering"/> : <Button>Register</Button>}
                       
                    </Field>
          
                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
