import { FC } from "react"
import AnimalItem from "./AnimalItem"
import { IAnimal } from "@/src/models/animal.interface"
import styles from "./Animal.module.scss"

interface IAnimalsList {
    animals: IAnimal[];
    handleDelete: (id: string) => void;
    handleOpen: (animal: IAnimal) => void;
}

const AnimalsList: FC<IAnimalsList> = ({ animals, handleOpen, handleDelete }) => {
    return <div className={styles.animal_list}>
        {animals.map((animal) => (
            <AnimalItem key={animal.id} animal={animal} handleDelete={handleDelete} handleOpen={handleOpen} />
        ))}
    </div>
}

export default AnimalsList