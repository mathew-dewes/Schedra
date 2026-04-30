"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const customers = [
  "Mathew Dewes",
  "Elon Musk",
  "Donald Trump",
  "Morgan Freeman",
  "Astro",
] as const;

type CustomerSearchBoxProps = {
  value: string
  onChange: (value: string | null) => void
}

export function CustomerSearchBox({value, onChange}: CustomerSearchBoxProps) {
  return (
    <Combobox items={customers}  value={value} onValueChange={onChange}>
      <ComboboxInput placeholder="Select a customer" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
