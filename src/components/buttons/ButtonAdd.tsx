import { FC } from "react"
import styles from "./Buttons.module.scss"

interface Props {
    handleOpen: () => void;
}

const ButtonAdd: FC<Props> = ({ handleOpen }) => {
    return (
        <button className={styles.button_add} onClick={() => handleOpen()}>
            <p>Добавить</p>
        </button>
    );
}

export default ButtonAdd
