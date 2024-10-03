"use client"

import AnimalsList from "../../components/animals/AnimalsList";
import ButtonAdd from "../../components/buttons/ButtonAdd";
import Filter from "../../components/filter/Filter";
import { IAnimal } from "../../models/animal.interface";
import { AnimalRequest, AnimalService } from "../../services/animals.service";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography } from "antd";
import { Mode } from "../../components/Mode";
import { IBreed } from "../../models/breed.interface";
import { ICurator } from "../../models/curator.interface";
import { ITypeOfAnimals } from "../../models/typeOfAnimals.interface";
import { CreateUpdateAnimal } from "../../components/animals/CreateUpdateAnimal";
import { BreedService } from "../../services/breeds.service";
import { CuratorService } from "../../services/curators.service";
import { TypeOfAnimalsService } from "../../services/typesOfAnimals.service";
import { FavouriteRequest, FavouriteService } from "../../services/favourites.service";
import { IFavourite } from "@/src/models/favourite.interface";

const { Title } = Typography;

export default function AnimalPage() {
    const defaultValues = {
        nickname: "",
        typeOfAnimals: { id: "", name: "" },
        breed: { id: "", name: "" },
        height: 0,
        weight: 0,
        gender: "",
        dateOfBirth: new Date(),
        color: "",
        distinguishingMark: "",
        description: "",
        curator: { id: "", surname: "", name: "", patronymic: "", email: "", phoneNumber: "" },
        photo: "",
    } as IAnimal;

    const [values, setValues] = useState<IAnimal>(defaultValues);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [breedsArray, setBreeds] = useState<IBreed[]>([]);
    const [curatorsArray, setCurators] = useState<ICurator[]>([]);
    const [typesOfAnimalsArray, setTypesOfAnimals] = useState<ITypeOfAnimals[]>([]);
    
    const [key, setKey] = useState(0);
    const userId = localStorage.getItem("userId");

    const resetComponent = () => {
        setKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userId !== null) {
                const fetchedFavourites: IFavourite[] = await FavouriteService.getFavouritesByUserId(userId);
                fetchedFavourites.map(favourite => favourite.animal);
                setAnimals(fetchedFavourites.map(favourite => favourite.animal));
                setLoading(false);
            }

            const fetchedBreeds = await BreedService.getAllBreeds();
            setBreeds(fetchedBreeds);

            const fetchedCurators = await CuratorService.getAllCurators();
            setCurators(fetchedCurators);

            const fetchedTypesOfAnimals = await TypeOfAnimalsService.getAllTypesOfAnimals();
            setTypesOfAnimals(fetchedTypesOfAnimals);
        };

        fetchData();
    }, []);

    const handleCreateAnimal = async (request: AnimalRequest) => {
        await AnimalService.createAnimal(request);
        closeModal();
        const fetchedAnimals = await AnimalService.getAllAnimals();
        setAnimals(fetchedAnimals);
    };

    const handleUpdateAnimal = async (id: string, request: AnimalRequest) => {
        await AnimalService.updateAnimal(id, request);
        closeModal();
        const fetchedAnimals = await AnimalService.getAllAnimals();
        setAnimals(fetchedAnimals);
    };

    const handleDeleteAnimal = async (id: string) => {
        await AnimalService.deleteAnimal(id);
        const fetchedAnimals = await AnimalService.getAllAnimals();
        setAnimals(fetchedAnimals);
    };

    const handleAddAnimalToFavourites = async (request: FavouriteRequest) => {
        await FavouriteService.createFavourite(request);
        resetComponent();
    };

    const handleDeleteAnimalFromFavourites = async (id: string) => {
        await FavouriteService.deleteFavourite(id);
        if (userId !== null) {
            const fetchedFavourites: IFavourite[] = await FavouriteService.getFavouritesByUserId(userId);
            fetchedFavourites.map(favourite => favourite.animal);
            setAnimals(fetchedFavourites.map(favourite => favourite.animal));
            setLoading(false);
        }
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (animal: IAnimal) => {
        setMode(Mode.Update);
        setValues(animal);
        setIsModalOpen(true);
    };

    return (
        <div>
            {loading ? (
                <Title>Loading</Title>
            ) : (
                <AnimalsList
                    animals={animals}
                    handleDelete={handleDeleteAnimal}
                    handleAddToFavourites={handleAddAnimalToFavourites}
                    handleDeleteFromFavourites={handleDeleteAnimalFromFavourites}
                    handleOpen={openEditModal}
                    key={key}
                />
            )}

            <CreateUpdateAnimal
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateAnimal}
                handleUpdate={handleUpdateAnimal}
                breedsArray={breedsArray}
                curatorsArray={curatorsArray}
                typesOfAnimalsArray={typesOfAnimalsArray}
            />
        </div>
    );
}