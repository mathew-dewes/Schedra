"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Vehicle } from "@/lib/db/types";

type Props = {
  vehicles: Vehicle[];
  value?: string; 
  onChange: (value: string) => void;
};

export function VehicleComboBox({ vehicles, value, onChange }: Props) {

  return (
    <Combobox items={vehicles} value={value ?? null} // 👈 important
      onValueChange={(val) => {
        if (val !== null) {
          onChange(val);
        }
      }}>
      <ComboboxInput 
      placeholder="Select a framework"
   
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
