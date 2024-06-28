import { IUserRole } from "./userRole.interface"

export interface IUser {
    id: string
    surname: string
    name: string
    patronymic: string
    dateOfBirth: Date
    email: string
    phoneNumber: string
    userRole: IUserRole
    login: string
    password: string
}