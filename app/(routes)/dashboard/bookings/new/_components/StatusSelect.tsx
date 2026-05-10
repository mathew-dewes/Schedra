import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BOOKING_STATUES } from "@/lib/constants";


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
                                                {BOOKING_STATUES.map((status) => {
                                                    return <SelectItem key={status} value={status}>{status}</SelectItem>
                                                })}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
    )
}