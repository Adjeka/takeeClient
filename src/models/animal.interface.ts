import { IBreed } from "./breed.interface"
import { ICurator } from "./curator.interface"
import { ITypeOfAnimals } from "./typeOfAnimals.interface"

export interface IAnimal {
    id: string
    nickname: string
    typeOfAnimals: ITypeOfAnimals
    breed: IBreed
    height: number
    weight: number
    gender: string
    dateOfBirth: Date
    color: string
    distinguishingMark: string
    description: string
    curator: ICurator
    photo: string
}