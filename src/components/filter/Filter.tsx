import Image from "next/image"
import { FC } from "react"
import styles from "./Filter.module.scss"

const Filter: FC = () => {
    return <div className={styles.filter}>
        <button className={styles.filter_item_selected}>
            <div className={styles.filter_item_image}>
                <Image src="/all.png" alt="allAnimals" priority width={40} height={40}/>
            </div>

            <p className={styles.filter_item_text}>Все</p>
        </button>

        <button className={styles.filter_item}>
            <div className={styles.filter_item_image}>
                <Image src="/dogs.png" alt="dogs" priority width={40} height={40}/>
            </div>

            <p className={styles.filter_item_text}>Собаки</p>
        </button>

        <button className={styles.filter_item}>
            <div className={styles.filter_item_image}>
                <Image src="/cats.png" alt="cats" priority width={40} height={40}/>
            </div>

            <p className={styles.filter_item_text}>Кошки</p>
        </button>
    </div>
}

export default Filter