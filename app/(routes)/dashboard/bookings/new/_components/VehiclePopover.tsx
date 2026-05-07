"use client"

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Vehicle } from "@/lib/db/types";
import { useState } from "react";

type Props = {
  vehicles: Vehicle[];
  value?: string; 
  onChange: (value: string) => void;
};

export function VehiclePopover({ vehicles, value, onChange }: Props) {
      const [open, setOpen] = useState(false)  
  const selectedVehicle = vehicles.find(v => v.id === value)
 return (
<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox">
          {selectedVehicle?.name ?? "Select a vehicle"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search vehicle..." />

          <CommandList>
            <CommandEmpty>No vehicles found.</CommandEmpty>

            <CommandGroup>
              {vehicles.map((vehicle) => (
                <CommandItem
                  key={vehicle.id}
                  value={vehicle.name}
                      onSelect={() => {
                    onChange(vehicle.id)
                      setOpen(false)
                  }}       >
                  {vehicle.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
