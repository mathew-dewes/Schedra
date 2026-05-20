"use client"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,

} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/schemas"
import z from "zod"
import { ButtonSpinner } from "@/components/ui/buttonSpinner"
import Link from "next/link"
import { signInWithEmailPassword } from "@/lib/auth/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm({
    className,
    credentials,
    demo,
    ...props
}: React.ComponentProps<"div"> & {
    credentials: {
        email: string,
        password: string
    },
    demo: boolean
}) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    useEffect(() => {
        if (demo) {
            form.reset({
                email: credentials.email,
                password: credentials.password,
            });
        } else {
            form.reset({
                email: "",
                password: "",
            });
        }
    }, [demo, form, credentials]);

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const res = await signInWithEmailPassword(values);

            if (!res.success) {
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
                        <h1 className="text-xl font-bold">Login</h1>
                        <FieldDescription>
                            {demo ? "Hit the view demo button to get started"
                                : <>Don&apos;t have an account? <Link href="/register">Register</Link></>}

                        </FieldDescription>
                    </div>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input disabled={demo}
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
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input disabled={demo}
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    >

                    </Controller>

                    <Field>
                        {isPending ? <ButtonSpinner text="Logging in" /> : 
                        <Button>
                            {demo ? "View Demo" : "Login"}</Button>}

                    </Field>

                </FieldGroup>
            </form>
            <FieldDescription className="px-6 text-center">
                {demo ?
                    <>Don&apos;t want to view the demo? click <Link href={'/register'}>HERE</Link> to register and start from scratch</>
                    :
                    <>Forgot your password? Click <Link href={'/password/forgot'}>HERE</Link> to request a new one</>}

            </FieldDescription>
                <div hidden={!demo} className="flex justify-center gap-2">
                     
                            <Link className={buttonVariants({className: "w-30", variant: "secondary"})} href={'/login'}>Login</Link>
                            <Link className={buttonVariants({className: "w-30", variant: "secondary"})} href={'/register'}>Register</Link>

                    
                    
                    </div>
        </div>
    )
}
