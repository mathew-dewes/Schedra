import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type StatusSelectProps = {
    value?: string;
    onChange: (value: string) => void;
    categories: { id: string, name: string, color: string }[]
};

export default function CategorySelect({ value, onChange, categories }: StatusSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {categories.map((cat) => {
                        return <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    })}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}