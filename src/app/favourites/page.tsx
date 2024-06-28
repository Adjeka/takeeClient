"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { IFavourite } from "@/src/models/favourite.interface";
import { Mode } from "@/src/components/Mode";
import { FavouriteRequest, FavouriteService } from "@/src/services/favourites.service";
import { CreateUpdateFavourite } from "@/src/components/favourites/CreateUpdateFavourite";
import { FavouritesTable } from "@/src/components/favourites/Favourite";
import { AnimalService } from "@/src/services/animals.service";
import { UserService } from "@/src/services/users.service";
import { IAnimal } from "@/src/models/animal.interface";
import { IUser } from "@/src/models/user.interface";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function FavouritePage() {
    const defaultValues = {
        user: { id: "", surname: "", name: "", patronymic: "", dateOfBirth: new Date(), email: "", phoneNumber: "", userRole: { id: "", name: "" }, login: "", password: "" },
        animal: { id: "", nickname: "", typeOfAnimals: { id: "", name: "" }, breed: { id: "", name: "" }, height: 0, weight: 0, gender: "", dateOfBirth: new Date(), color: "", distinguishingMark: "", description: "", curator: { id: "", surname: "", name: "", patronymic: "", email: "", phoneNumber: "" }, photo: "" }
    } as IFavourite;

    const [values, setValues] = useState<IFavourite>(defaultValues);
    const [favourites, setFavourites] = useState<IFavourite[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedFavourites = await FavouriteService.getAllFavourites();
            setFavourites(fetchedFavourites);
            setLoading(false);

            const fetchedAnimals = await AnimalService.getAllAnimals();
            setAnimals(fetchedAnimals);

            const fetchedUsers = await UserService.getAllUsers();
            setUsers(fetchedUsers);
        };

        fetchData();
    }, []);

    const handleCreateFavourite = async (request: FavouriteRequest) => {
        await FavouriteService.createFavourite(request);
        closeModal();
        const fetchedFavourites = await FavouriteService.getAllFavourites();
        setFavourites(fetchedFavourites);
    };

    const handleUpdateFavourite = async (id: string, request: FavouriteRequest) => {
        await FavouriteService.updateFavourite(id, request);
        closeModal();
        const fetchedFavourites = await FavouriteService.getAllFavourites();
        setFavourites(fetchedFavourites);
    };

    const handleDeleteFavourite = async (id: string) => {
        await FavouriteService.deleteFavourite(id);
        closeModal();
        const fetchedFavourites = await FavouriteService.getAllFavourites();
        setFavourites(fetchedFavourites);
    };

    const openModal = () => {
        setValues(defaultValues);
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (favourite: IFavourite) => {
        setMode(Mode.Update);
        setValues(favourite);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        favourites.map((favourite: IFavourite) =>
            tableData.push({
                Пользователь: `${favourite.user.surname} ${favourite.user.name} ${favourite.user.patronymic}`,
                Животное: favourite.animal.nickname,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Избранное");
        writeFile(wb, "Избранное.xlsx");
    };

    return (
        <div>
            <CreateUpdateFavourite
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateFavourite}
                handleUpdate={handleUpdateFavourite}
                animalsArray={animals}
                usersArray={users}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <FavouritesTable
                        favourites={favourites}
                        handleDelete={handleDeleteFavourite}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
