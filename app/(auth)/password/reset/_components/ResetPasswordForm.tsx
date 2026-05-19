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
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/lib/schemas"
import z from "zod"
import { ButtonSpinner } from "@/components/ui/buttonSpinner"
import { updatePassword } from "@/lib/auth/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        startTransition(async () => {
       const res = await updatePassword(values);

       if (!res.success){
        toast.error(res.message)
       } else {
        toast.success(res.message);
        router.push('/dashboard')
       }
       
    
        

        })
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">Reset Password</h1>
                        <FieldDescription>
                        Please enter a new password
                        </FieldDescription>
                    </div>
              
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>

                    <Field>
                        {isPending ? <ButtonSpinner text="Updating Password"/> : <Button>Update</Button>}
                       
                    </Field>
                 
    
                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
            Once updated, you will be redirected to the dashboard
            </FieldDescription>
        </div>
    )
}
