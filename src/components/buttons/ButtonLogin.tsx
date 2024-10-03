import { FC } from "react"
import styles from "./Buttons.module.scss"

interface Props {
    handleOpen: () => void;
}

const ButtonLogin: FC<Props> = ({ handleOpen }) => {
    return (
        <button className={styles.button_login} onClick={() => handleOpen()}>
            <p>Войти</p>
        </button>
    );
}

export default ButtonLogin
