import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BOOKING_TYPES } from "@/lib/constants";


type StatusSelectProps = {
    value?: string;
    onChange: (value: string) => void;
};

export default function BookingTypeSelect({ value, onChange }: StatusSelectProps){
    return (
                    <Select
                                        value={value}
                                        onValueChange={onChange}
                                    >
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select a status" />
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
    )
}