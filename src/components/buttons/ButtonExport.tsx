import { FC } from "react"
import styles from "./Buttons.module.scss"

interface Props {
    handleExport: () => void;
}

const ButtonExport: FC<Props> = ({ handleExport }) => {
    return (
        <button className={styles.button_export} onClick={() => handleExport()}>
            <p>Экспорт</p>
        </button>
    );
}

export default ButtonExport
