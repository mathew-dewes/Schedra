import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RenewalTypeEmum } from "@/lib/types/enums";


type StatusSelectProps = {
    value?: string;
    onChange: (value: string) => void;
};

const RENEWAL_TYPES = ["Service", "REGO", "RUC", "WOF"] as RenewalTypeEmum[]

export default function RenewalTypeSelect({ value, onChange }: StatusSelectProps){
    return (
                    <Select
                                        value={value}
                                        onValueChange={onChange}
                                    >
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Types</SelectLabel>
                                                {RENEWAL_TYPES.map((type) => {
                                                    return <SelectItem key={type} value={type}>{type}</SelectItem>
                                                })}

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
    )
}