import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ReturnToDash(){
    return(
    <Link 
    className={buttonVariants({ variant: "secondary" })} 
    href={'/dashboard'}>
        <ArrowLeftIcon />Return to Dashboard</Link>)
}