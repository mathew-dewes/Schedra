"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Center } from "@/lib/db/types";


type Props = {
  centers: Center[];
  value?: string; 
  onChange: (value: string) => void;
};

export function ServiceCenterComboBox({ centers, value, onChange }: Props) {
  return (
    <Combobox items={centers} value={value ?? null} // 👈 important
      onValueChange={(val) => {
        if (val !== null) {
          onChange(val);
        }
      }}
      >
      <ComboboxInput 
      placeholder="Select a center" 
    />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item.name}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
