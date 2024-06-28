"use client"

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { Mode } from "@/src/components/Mode";
import { IBreed } from "@/src/models/breed.interface";
import { BreedRequest, BreedService } from "@/src/services/breeds.service";
import { CreateUpdateBreed } from "@/src/components/breeds/CreateUpdateBreed";
import { BreedsTable } from "@/src/components/breeds/Breed";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function BreedPage() {
    const defaultValues = {
        name: "",
    } as IBreed;

    const [values, setValues] = useState<IBreed>(defaultValues);
    const [breeds, setBreeds] = useState<IBreed[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedBreeds = await BreedService.getAllBreeds();
            setBreeds(fetchedBreeds);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCreateBreed = async (request: BreedRequest) => {
        await BreedService.createBreed(request);
        closeModal();
        const fetchedBreeds = await BreedService.getAllBreeds();
        setBreeds(fetchedBreeds);
    };

    const handleUpdateBreed = async (id: string, request: BreedRequest) => {
        await BreedService.updateBreed(id, request);
        closeModal();
        const fetchedBreeds = await BreedService.getAllBreeds();
        setBreeds(fetchedBreeds);
    };

    const handleDeleteBreed = async (id: string) => {
        await BreedService.deleteBreed(id);
        closeModal();
        const fetchedBreeds = await BreedService.getAllBreeds();
        setBreeds(fetchedBreeds);
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

    const openEditModal = (breed: IBreed) => {
        setMode(Mode.Update);
        setValues(breed);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        breeds.map((breed: IBreed) =>
            tableData.push({
                Название_породы: breed.name,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Породы");
        writeFile(wb, "Породы.xlsx");
    };

    return (
        <div>
            <CreateUpdateBreed
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateBreed}
                handleUpdate={handleUpdateBreed}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <BreedsTable
                        breeds={breeds}
                        handleDelete={handleDeleteBreed}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
