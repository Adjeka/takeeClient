"use client"

import AnimalsList from "../components/animals/AnimalsList";
import ButtonAdd from "../components/buttons/ButtonAdd";
import Filter from "../components/filter/Filter";
import { IAnimal } from "../models/animal.interface";
import { AnimalRequest, AnimalService } from "../services/animals.service";
import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography } from "antd";
import { Mode } from "../components/Mode";
import { IBreed } from "../models/breed.interface";
import { ICurator } from "../models/curator.interface";
import { ITypeOfAnimals } from "../models/typeOfAnimals.interface";
import { CreateUpdateAnimal } from "../components/animals/CreateUpdateAnimal";
import { BreedService } from "../services/breeds.service";
import { CuratorService } from "../services/curators.service";
import { TypeOfAnimalsService } from "../services/typesOfAnimals.service";
import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";
import ButtonExport from "../components/buttons/ButtonExport";

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

    useEffect(() => {
        const fetchData = async () => {
            const fetchedAnimals = await AnimalService.getAllAnimals();
            setAnimals(fetchedAnimals);
            setLoading(false);

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
        closeModal();
        const fetchedAnimals = await AnimalService.getAllAnimals();
        setAnimals(fetchedAnimals);
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

    const openEditModal = (animal: IAnimal) => {
        setMode(Mode.Update);
        setValues(animal);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        animals.map((animal: IAnimal) =>
          tableData.push({
            Кличка: animal.nickname,
            Вид_животного: animal.typeOfAnimals.name,
            Порода: animal.breed.name,
            Рост_см: animal.height,
            Вес_кг: animal.weight,
            Пол: animal.gender,
            Дата_рождения: dayjs(animal.dateOfBirth).format("DD.MM.YYYY"),
            Окрас: animal.color,
            Отличительная_особенность: animal.distinguishingMark,
            Описание: animal.description,
            Куратор: `${animal.curator.surname} ${animal.curator.name} ${animal.curator.patronymic}`,
          })
        );
        var wb = utils.book_new(),
          ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Животные");
        writeFile(wb, "Животные.xlsx");
      };

    return (
        <div>
            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <AnimalsList
                        animals={animals}
                        handleDelete={handleDeleteAnimal}
                        handleOpen={openEditModal}
                    />
                </div>
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