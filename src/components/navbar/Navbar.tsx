import Link from "next/link"
import Image from "next/image"
import { FC } from "react"
import styles from "./Navbar.module.scss"
import { menuForAdmin } from "./menuForAdmin.data"
import { menu } from "./menu.data"
import NavItem from "./NavItem"

const Navbar: FC = () => {
    return <header className={styles.header}>
        <div className={styles.wrapper}>
            <Link href="/" className={styles.title}>
                takee
            </Link>
            <nav className={styles.menu}>
                {menuForAdmin.map(item => (
                    <NavItem key={item.link} item={item} />
                ))}
            </nav>
            <Link href="/profile" className={styles.profile}>
                <p className={styles.profile_name}>admin</p>
                <Image src="/profile.svg" alt="profile" priority width={40} height={40} className={styles.profile_image} />
            </Link>
        </div>
    </header>
} 

export default Navbar