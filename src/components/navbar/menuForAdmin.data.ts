import { IMenuItem } from "./menu.interface";

export const menuForAdmin : IMenuItem[] = [
    {
        name: "Животные",
        link: "/"
    },
    {
        name: "Пользователи",
        link: "/users"
    },
    {
        name: "Записи на прогулку",
        link: "/recordsForWalk"
    },
    {
        name: "Избранное",
        link: "/favourites"
    },
    {
        name: "Кураторы",
        link: "/curators"
    },
    {
        name: "Породы",
        link: "/breeds"
    },
    {
        name: "Типы животных",
        link: "/typesOfAnimals"
    },
    {
        name: "Роли",
        link: "/userRoles"
    },
    {
        name: "График",
        link: "/chart"
    }
]