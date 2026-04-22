"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
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

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  services: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      duration: z.string().min(1),
      price: z.string().optional(),
    })
  ).min(1, "At least one service must be added"),
});

export function OnBoardingForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
       services: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "services",
});

const [draft, setDraft] = React.useState({
  name: "",
  duration: "30",
  price: "",
});

function handleAddService() {
  if (!draft.name.trim()) return;

  append(
    {
      name: draft.name,
      duration: draft.duration,
      price: draft.price,
    },
    {
      shouldFocus: false,
    }
  );

  form.trigger("services");

  setDraft({
    name: "",
    duration: "30",
    price: "",
  });
}

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success(JSON.stringify(data, null, 2))
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>
          In ordering to utilize the Schedra system, you must fill out all required details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form   onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }} id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
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
            <FieldSeparator />

            {/* Service form */}
            <CardTitle>Services</CardTitle>
            <Field >
              <FieldLabel htmlFor="form-rhf-demo-title">
                Service name
              </FieldLabel>
           <Input

  value={draft.name}
  onChange={(e) =>
    setDraft((prev) => ({ ...prev, name: e.target.value }))
  }
  placeholder="Service name"
/>


            </Field>


            <Field>
              <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                Duration
              </FieldLabel>
              <Select
             value={draft.duration}
  onValueChange={(value) =>
    setDraft((prev) => ({ ...prev, duration: value }))
  }
              >
                <SelectTrigger
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose how often you want to be billed.
              </FieldDescription>

            </Field>

            <Field>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Price
              </FieldLabel>
              <Input

                  value={draft.price}
  onChange={(e) =>
    setDraft((prev) => ({ ...prev, price: e.target.value }))
  }
  placeholder="Price"
              />

<Button type="button" onClick={handleAddService}>
  Add Service
</Button>
{form.formState.submitCount > 0 &&
  form.formState.errors.services?.message && (
    <p className=" text-red-500 font-medium">
      {form.formState.errors.services.message}
    </p>
)}
            </Field>



<ul className="mt-4 space-y-2">
  {fields.map((field, index) => (
    <li
      key={field.id}
      className="flex items-center justify-between text-sm"
    >
      <span>
        • {field.name} ({field.duration} min)
        {field.price && ` - $${field.price}`}
      </span>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500"
      >
        ✕
      </button>
    </li>
  ))}
</ul>
            <FieldSeparator />


            <Controller
              name="description"
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>

    </Card>
  )
}
