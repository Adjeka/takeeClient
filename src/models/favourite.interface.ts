import { IAnimal } from "./animal.interface"
import { IUser } from "./user.interface"

export interface IFavourite {
    id: string
    user: IUser
    animal: IAnimal
}