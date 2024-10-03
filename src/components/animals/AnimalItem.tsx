"use client"

import { FC, useState, useEffect } from "react"
import Image from "next/image"
import styles from "./Animal.module.scss"
import { IAnimal } from "@/src/models/animal.interface"
import dayjs from "dayjs"
import { useRouter } from "next/navigation";
import { AnimalService } from "@/src/services/animals.service"
import { FavouriteRequest, FavouriteService } from "@/src/services/favourites.service"
import { IFavourite } from "@/src/models/favourite.interface"

interface IAnimalItem {
  animal: IAnimal;
  handleDelete: (id: string) => void;
  handleAddToFavourites: (request: FavouriteRequest) => void;
  handleDeleteFromFavourites: (id: string) => void;
  handleOpen: (animal: IAnimal) => void;
}

const AnimalItem: FC<IAnimalItem> = ({ animal, handleDelete, handleOpen, handleAddToFavourites, handleDeleteFromFavourites }) => {
  const image = `data:image/png;base64, ${animal.photo}`;

  const age = () => {
    var dateOfBirth = new Date(animal.dateOfBirth);
    var m1 = dateOfBirth.getMonth();
    var y1 = dateOfBirth.getFullYear();

    var dateNow = new Date();
    var m2 = dateNow.getMonth();
    var y2 = dateNow.getFullYear();
    if(m1 > m2){
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    var m = m2 - m1;
    var y = y2 - y1;

    const yo = (y : string) => /\d*1\d$/.test(y) || /[05-9]$/.test(y) ? 'лет' : ( /1$/.test(y) ? 'год' : 'года');
    const mo = (m : string) => /\d*1\d$/.test(m) || /[05-9]$/.test(m) ? 'месяцев' : ( /1$/.test(m) ? 'месяц' : 'месяца');

    if (y === 0)
      return `${m} ${mo(m.toString())}`;
    else return `${y} ${yo(y.toString())}`
  }

  const userId = localStorage.getItem("userId");
  const animalId = animal.id;

  const favouriteRequest = {
    userId,
    animalId
  } as FavouriteRequest

  const [favourite, setFavourite] = useState<IFavourite>();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("role") === "user") {
        const fetchedFavourite = await FavouriteService.getFavouriteByUserIdAndAnimalId(favouriteRequest);
          setFavourite(fetchedFavourite);
      }
    };
    fetchData();
}, []);

  return <div className={styles.animal_item}>
    <div className={styles.animal_div_image} onClick={() => handleOpen(animal)}>
      <Image src={image} alt="animal" priority width={350} height={225} className={styles.animal_image} />
    </div>
    <div className={styles.animal_info} onClick={() => handleOpen(animal)}>
      <div className={styles.animal_name_and_age}>
        <span className={styles.animal_name}>{animal.nickname}</span>
        <span className={styles.animal_age}>{age()}</span>
      </div>
      <div className={styles.animal_div_breed}>
        <p className={styles.animal_breed}>{animal.breed.name}</p>
      </div>
    </div>
    {localStorage.getItem("role") === "admin" ? (
      <button className={styles.button_delete} onClick={() => handleDelete(animal.id)}>
        <Image src="/delete.png" alt="delete" priority width={30} height={30} className={styles.button_delete_image} />
      </button>
    ) : (
      favourite == null ? (
        <button className={styles.button_delete} onClick={() => handleAddToFavourites(favouriteRequest)}>
          <Image src="/favourites.png" alt="addToFavourites" priority width={30} height={30} className={styles.button_delete_image} />
        </button>
      ) : (
        <button className={styles.button_delete} onClick={() => handleDeleteFromFavourites(favourite.id)}>
          <Image src="/inFavourites.png" alt="addToFavourites" priority width={30} height={28} className={styles.button_delete_image} />
        </button>
      )
    )}
  </div>
}

export default AnimalItem