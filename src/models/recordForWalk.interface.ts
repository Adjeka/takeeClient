import { IAnimal } from "./animal.interface"
import { IUser } from "./user.interface"

export interface IRecordForWalk {
    id: string
    user: IUser
    animal: IAnimal
    dateOfRecord: Date
}