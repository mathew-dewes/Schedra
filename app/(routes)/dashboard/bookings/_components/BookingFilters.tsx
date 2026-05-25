"use client";

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
import { BOOKING_STATUSES, BOOKING_TYPES } from "@/lib/constants";
import { BookingStatus } from "@/lib/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BookingFilters() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentType = searchParams.get("type") || "";
    const currentStatus = searchParams.get("status") || "";

    function handleStatusChange(value: BookingStatus) {
        const params = new URLSearchParams(searchParams.toString());
        if (!value) {
            params.delete("status");
        } else {
            params.set("status", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    }
    function handleTypeChange(value: BookingStatus) {
        const params = new URLSearchParams(searchParams.toString());
        if (!value) {
            params.delete("type");
        } else {
            params.set("type", value);
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
                            <SelectLabel>Status</SelectLabel>
                            {BOOKING_STATUSES.map((status) => {
                                return <SelectItem key={status} value={status}>{status}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select
                    value={currentType}
                    onValueChange={handleTypeChange}
                >
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Filter type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            {BOOKING_TYPES.map((type) => {
                                return <SelectItem key={type} value={type}>{type}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button disabled={!currentStatus && !currentType} onClick={() => {
                    router.replace(pathname)
                }} variant={"secondary"}>Clear All</Button>

            </div>

    )
}