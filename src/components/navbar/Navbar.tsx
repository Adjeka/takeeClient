import Link from "next/link"
import Image from "next/image"
import { FC, useState, useEffect } from "react"
import styles from "./Navbar.module.scss"
import { menuForAdmin } from "./menuForAdmin.data"
import { menu } from "./menu.data"
import NavItem from "./NavItem"
import ButtonLogin from "../buttons/ButtonLogin";
import ButtonRegister from "../buttons/ButtonRegister"

interface Props {
    openLoginModal: () => void;
    openRegisterModal: () => void;
}

const Navbar: FC<Props> = ({ openLoginModal, openRegisterModal }) => {
    return <header className={styles.header}>
        <div className={styles.wrapper}>
            <Link href="/" className={styles.title}>
                takee
            </Link>
            <nav className={styles.menu}>
                {localStorage.getItem("role") == "admin" ? 
                (
                    menuForAdmin.map(item => (
                        <NavItem key={item.link} item={item} />
                    ))
                ) : 
                (
                    menu.map(item => (
                        <NavItem key={item.link} item={item} />
                    ))
                )}
            </nav>
            {localStorage.length == 0 ? 
            (<div className="ml-auto flex pt-[20px] justify-between">
                <ButtonLogin handleOpen={openLoginModal} />
                <ButtonRegister handleOpen={openRegisterModal} />
            </div>) :
            (
                localStorage.getItem("role") == "user" ? (
                    <div className="ml-auto flex justify-between">
                        <Link href="/myFavourites" className={styles.favourites}>
                            <Image src="/favourites.png" alt="favourites" priority width={30} height={30} className={styles.favourites_image} />
                        </Link>
                        <Link href="/profile" className={styles.profile}>
                            <p className={styles.profile_name}>{localStorage.getItem("login")}</p>
                            <Image src="/profile.svg" alt="profile" priority width={40} height={40} className={styles.profile_image} />
                        </Link>
                    </div>
                ) : (
                    <Link href="/profile" className={styles.profile}>
                        <p className={styles.profile_name}>{localStorage.getItem("login")}</p>
                        <Image src="/profile.svg" alt="profile" priority width={40} height={40} className={styles.profile_image} />
                    </Link>
                )
            )}
        </div>
    </header>
} 

export default  Navbar