"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { VEHICLE_STATUES } from "@/lib/constants";
import { VehicleStatusEnum } from "@/lib/types/enums";
export default function VehicleFilters(){
        const router = useRouter();
        const pathname = usePathname();
        const searchParams = useSearchParams();

        const currentStatus = searchParams.get("status") || "";

        
            function handleStatusChange(value: VehicleStatusEnum) {
                const params = new URLSearchParams(searchParams.toString());
    
                if (!value) {
                    params.delete("status");
                } else {
                    params.set("status", value);
                }
        
                router.push(`${pathname}?${params.toString()}`);
            }
          return (
            <div className="flex gap-2 mt-4">
                <Select
                    value={currentStatus}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filter status</SelectLabel>
                            {VEHICLE_STATUES.map((type) => {
                                return <SelectItem key={type} value={type}>{type}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button disabled={!currentStatus} onClick={() => {
                    router.replace(pathname)
                }} variant={"secondary"}>Clear All</Button>

            </div>


     )
}