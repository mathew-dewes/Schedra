import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BOOKING_STATUS_OPTIONS } from "@/lib/utils"

type StatusSelectProps = {
    value?: string;
    onChange: (value: string) => void;
};

export default function StatusSelect({ value, onChange }: StatusSelectProps){
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
                                                <SelectLabel>Status</SelectLabel>
                                                {BOOKING_STATUS_OPTIONS.map((option) => {
                                                    return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                })}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
    )
}