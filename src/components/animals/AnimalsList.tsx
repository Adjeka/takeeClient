import { FC } from "react"
import AnimalItem from "./AnimalItem"
import { IAnimal } from "@/src/models/animal.interface"
import styles from "./Animal.module.scss"
import { FavouriteRequest } from "@/src/services/favourites.service";

interface IAnimalsList {
    animals: IAnimal[];
    handleDelete: (id: string) => void;
    handleAddToFavourites: (request: FavouriteRequest) => void;
    handleDeleteFromFavourites: (id: string) => void;
    handleOpen: (animal: IAnimal) => void;
}

const AnimalsList: FC<IAnimalsList> = ({ animals, handleOpen, handleDelete, handleAddToFavourites, handleDeleteFromFavourites }) => {
    return <div className={styles.animal_list}>
        {animals.map((animal) => (
            <AnimalItem key={animal.id} animal={animal} handleDelete={handleDelete} handleAddToFavourites={handleAddToFavourites} handleDeleteFromFavourites={handleDeleteFromFavourites} handleOpen={handleOpen} />
        ))}
    </div>
}

export default AnimalsList