"use client"

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";


type Props = {
  centers: {
      id: string,
    name: string
}[];
  value?: string; 
  onChange: (value: string) => void;
};

export function ServiceCenterPopover({ centers, value, onChange }: Props) {
    const [open, setOpen] = useState(false) 
  const selectedCenter = centers.find(c => c.id === value)
 return (
<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox">
          {selectedCenter?.name ?? "Select a center"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search centers..." />

          <CommandList>
            <CommandEmpty>No vehicles found.</CommandEmpty>

            <CommandGroup>
              {centers.map((center) => (
                <CommandItem
                  key={center.id}
                  value={center.name}
                  onSelect={() => {
                    onChange(center.id)
                      setOpen(false)
                  }}
                >
                  {center.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
