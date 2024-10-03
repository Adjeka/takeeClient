import { FC } from "react"
import styles from "./Buttons.module.scss"

interface Props {
    handleOpen: () => void;
}

const ButtonRegister: FC<Props> = ({ handleOpen }) => {
    return (
        <button className={styles.button_register} onClick={() => handleOpen()}>
            <p>Регистрация</p>
        </button>
    );
}

export default ButtonRegister
