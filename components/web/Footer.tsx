import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Footer(){
    return (
        <footer className="px-20 py-15 space-y-2">
            <h2 className="font-bold">Schedra</h2>
            <p>Modern scheduling and renewal management software.</p>
            <ul className="text-right flex gap-10 mt-5">
                <Link className={buttonVariants({variant: "link"})} href={'/'}>Features</Link>
                <Link className={buttonVariants({variant: "link"})} href={'/'}>Contact</Link>
                <Link className={buttonVariants({variant: "link"})} href={'/'}>Login</Link>

            </ul>
            <p className="mt-5 text-muted-foreground">© 2026 Schedra. All rights reserved.</p>
        </footer>
    )
}