"use client"

import { FC } from "react";
import { IMenuItem } from "./menu.interface";
import Link from "next/link";
import styles from "./Navbar.module.scss"
import cn from "clsx";
import { usePathname } from "next/navigation";

interface INavItem {
    item: IMenuItem
}

const NavItem: FC<INavItem> = ({ item }) => {
    const pathname = usePathname()

    return <div className={styles.menu_item}>
        <Link href={item.link} className={cn("font-medium transition duration-100 hover:text-my", 
            pathname === item.link ? "text-my" : "text-black")}>
            {item.name}
        </Link>
    </div>
}

export default NavItem