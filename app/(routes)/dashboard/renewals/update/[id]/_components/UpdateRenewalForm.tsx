"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateRenewalFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { RenewalDatePicker } from "../../../new/_components/RenewalDatePicker";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { RenewalEntry } from "@/lib/types";
import { format } from "date-fns";
import { updateRenewal } from "@/lib/db/mutations/renewals";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type Props = {
    renewal: RenewalEntry,
    renewal_id: string
    
}

export default function UpdateRenewalForm({
    renewal, renewal_id }: Props) {
const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof updateRenewalFormSchema>>({
        resolver: zodResolver(updateRenewalFormSchema),
        defaultValues: {
            dueDate: new Date(),
            notes: renewal.notes
        }
    });


    function onSubmit(values: z.infer<typeof updateRenewalFormSchema>) {
        startTransition((async () => {

            const res = await updateRenewal(values, renewal_id);

            if (!res.success){
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.push('/dashboard/renewals')
            }
            

        }))
    }

    return (
        <Card className="w-full max-w-lg my-4">
            <CardHeader>
                <CardTitle>Update Renewal Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="mb-3">
     <h2>Vehicle: {renewal.vehicle} - {renewal.vehicle_plate}</h2>
     <h2>Renewal type: {renewal.type}</h2>
     <h2>Previous renewal date: {format(renewal.dueDate, "dd/MM/yy") }</h2>
                </div>
           
                <form onSubmit={form.handleSubmit(onSubmit)} id="updateRenewalForm">
                    <FieldGroup>
                                  <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Notes:
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


                        <Controller
                            control={form.control}
                            name="dueDate"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                         <FieldLabel>
                                            Renewal date
                                        </FieldLabel>
                                    <FieldContent>
                                   
                                        <RenewalDatePicker value={field.value} onChange={field.onChange} />
                                    </FieldContent>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>


                            )}
                        />
     

                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Button form="updateRenewalForm" disabled={isPending}>Submit</Button>
            </CardFooter>
        </Card>
    )
}