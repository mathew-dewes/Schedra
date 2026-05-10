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
import { BOOKING_STATUES, BOOKING_TYPES } from "@/lib/constants";
import { BookingStatusEnum, BookingTypeEnum } from "@/lib/types/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BookingFilters() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentType = searchParams.get("type") || "";
    const currentStatus = searchParams.get("status") || "";

    function handleTypeChange(value: BookingTypeEnum) {
        const params = new URLSearchParams(searchParams.toString());

        // remove param if empty
        if (!value) {
            params.delete("type");
        } else {
            params.set("type", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    function handleStatusChange(value: BookingStatusEnum) {
        const params = new URLSearchParams(searchParams.toString());

        // remove param if empty
        if (!value) {
            params.delete("status");
        } else {
            params.set("status", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="my-5">
            <h2 className="mb-2">Fitler:</h2>
            <div className="flex gap-2">
                <Select
                    value={currentType}
                    onValueChange={handleTypeChange}
                >
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Filter type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            {BOOKING_TYPES.map((type) => {
                                return <SelectItem key={type} value={type}>{type}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>

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
                            {BOOKING_STATUES.map((status) => {
                                return <SelectItem key={status} value={status}>{status}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button disabled={!currentStatus && !currentType} onClick={() => {
                    router.replace(pathname)
                }} variant={"secondary"}>Clear All</Button>

            </div>


        </div>

    )
}