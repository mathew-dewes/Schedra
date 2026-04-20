import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { navLinks, publicNavLinks } from "@/lib/constants";

export default function Navbar() {

    const isLoggedIn = false;
    return (
        <div className="flex justify-between mx-10 my-5">
            <h1 className="font-semibold">Schedra</h1>
            <ul className="flex items-center gap-3">
                {!isLoggedIn ? publicNavLinks.map((link) => {
                    return <Link
                        key={link.href}
                        className={buttonVariants({ variant: "outline" })} href={link.href}>{link.label}</Link>
                }) : navLinks.map((link) => {
                    return <Link
                        key={link.href}
                        className={buttonVariants({ variant: "outline" })} href={link.href}>{link.label}</Link>
                })}




            </ul>
        </div>
    )
}