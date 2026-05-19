"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,

} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordEmailSchema } from "@/lib/schemas"
import z from "zod"
import { ButtonSpinner } from "@/components/ui/buttonSpinner"
import { sendResetPasswordEmail } from "@/lib/auth/actions"
import { toast } from "sonner"
import { CircleCheck } from "lucide-react"


export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isPending, startTransition] = useTransition();
    const [emailSent, setEmailSent] = useState(false)
    const form = useForm({
        resolver: zodResolver(forgotPasswordEmailSchema),
        defaultValues: {
            email: "",
        }
    });

    function onSubmit(values: z.infer<typeof forgotPasswordEmailSchema>) {
        startTransition(async () => {
            const res = await sendResetPasswordEmail(values);

            if (!res.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message);
                setEmailSent(true);
            }




        })
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">Forgot Password</h1>
                        <FieldDescription>
                            Please enter your email address
                        </FieldDescription>
                    </div>
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
                                    placeholder="Enter email address"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>

                    <Field>
                        {isPending ? <ButtonSpinner text="Validating" /> : <Button type="submit">Submit</Button>}

                    </Field>


                </FieldGroup>
            </form>
            <FieldDescription className="flex items-center gap-2" hidden={!emailSent}>
                        <CircleCheck color="green" />Please check your email<br/> Note: The reset link maybe in your spam folder
            </FieldDescription>

        </div>
    )
}
