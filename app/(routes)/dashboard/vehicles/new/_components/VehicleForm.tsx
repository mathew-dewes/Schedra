"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { createVehicle } from "@/lib/db/mutations/vehicles";
import { vehicleFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";




export default function VehicleForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

    
const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues:{
        plant_number: "",
        plate_number: "",
        make: "",
        model: "",
        year: "",
        vin: ""
    
    }
});


function onSubmit(values: z.infer<typeof vehicleFormSchema>){
    startTransition((async()=>{
        const res = await createVehicle(values);

        if (!res.success){
            toast.error(res.message)
        } else {
            toast.success(res.message);
            router.push('/dashboard/vehicles')

        }
    }))

}
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Vehicle Form</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="vehicleForm" onSubmit={form.handleSubmit(onSubmit)} className="w-3/4">
                <FieldGroup>
                    <Controller
                    control={form.control}
                    name="make"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>Make</FieldLabel>
                             <Input
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle make"
                             />
                              {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="model"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>Model</FieldLabel>
                             <Input
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle Model"
                             />
                              {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="year"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>Year</FieldLabel>
                             <Input
                              className="uppercase placeholder:normal-case"
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle Model"
                             />
                              {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="plant_number"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>Plant number</FieldLabel>
                             <Input
                                className="uppercase placeholder:normal-case"
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle plant number"
                             />
                              {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="plate_number"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>Licence plate number</FieldLabel>
                             <Input
                                className="uppercase placeholder:normal-case"
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle plant number"
                             />
                              {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Controller
                    control={form.control}
                    name="vin"
                    render={({field, fieldState})=>(
                        <Field>
                             <FieldLabel>VIN number - Optional</FieldLabel>
                             <Input
                                className="uppercase placeholder:normal-case"
                             {...field}
                             aria-invalid={fieldState.invalid}
                             type="text"
                             placeholder="Enter vehicle plant number"
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
                    Description
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
                <Button disabled={isPending} type="submit" form="vehicleForm">Add vehicle</Button>
            </CardFooter>

        </Card>
    )
}