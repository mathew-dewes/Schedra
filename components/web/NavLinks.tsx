"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import SignOutButton from "./ActionButtons/SignOutButton"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./ThemeToggle"

export default function NavLinks({ session }:
    { session: boolean}
) {
    const path = usePathname();
    return (
        <ul className="flex items-center gap-3">

                <Link hidden={session} className={buttonVariants({variant:path == "/login" ? "default" : "secondary"})} href={'/login'}>Login</Link>
                <Link hidden={session} className={buttonVariants({variant:path == "/register" ? "default" : "secondary"})} href={'/register'}>Register</Link>
    
            <SignOutButton session={session} />
            <ThemeToggle/>




        </ul>
    )
}