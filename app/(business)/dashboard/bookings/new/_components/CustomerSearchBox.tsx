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
] as const

export function CustomerSearchBox() {
  return (
    <Combobox items={customers}>
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
