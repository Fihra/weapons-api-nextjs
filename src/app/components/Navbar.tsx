'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {name: 'Home', href: '/'},
    {name: 'Weapons', href: '/weapons'},
    {name: 'Shop', href: '/shop'}
]

const Navbar = () => {
    return(
        <div>
            <div>Main App</div>
            <ul>
                {navLinks.map((n) => {
                    return(
                        <li><Link href={n.href}>{n.name}</Link></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navbar;