"use client"

import { navLinks, publicNavLinks } from "@/lib/constants"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import SignOutButton from "./ActionButtons/SignOutButton"
import { usePathname } from "next/navigation"

export default function NavLinks({ session, onBoarding }:
    { session: boolean, onBoarding: boolean }
) {
    const excludedRoutes = [ '/bookings', '/services', '/availability', '/customers'];
    const path = usePathname();
    return (
        <ul className="flex items-center gap-3">
            {!session ? publicNavLinks.map((link) => {

                return <Link
                    key={link.href}
                    className={(buttonVariants({ variant: path == link.href ? "default" : "ghost" }))} href={link.href}>{link.label}</Link>
            }) : navLinks
                .filter(link => {
                    if (!onBoarding) {
                        return !excludedRoutes.includes(link.href);
                    }
                    return true;
                })
                .map(link => (
                    <Link
                        key={link.href}
                        className={buttonVariants({ variant: path == link.href ? "default" : "ghost" })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
            <SignOutButton session={session} />




        </ul>
    )
}