"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { ITypeOfAnimals } from "@/src/models/typeOfAnimals.interface";
import { Mode } from "@/src/components/Mode";
import { TypeOfAnimalsRequest, TypeOfAnimalsService } from "@/src/services/typesOfAnimals.service";
import { CreateUpdateTypeOfAnimals } from "@/src/components/typesOfAnimals/CreateUpdateTypeOfAnimals";
import { TypesOfAnimalsTable } from "@/src/components/typesOfAnimals/TypeOfAnimals";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function TypeOfAnimalsPage() {
    const defaultValues = {
        name: "",
    } as ITypeOfAnimals;

    const [values, setValues] = useState<ITypeOfAnimals>(defaultValues);
    const [typesOfAnimals, setTypesOfAnimals] = useState<ITypeOfAnimals[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTypesOfAnimals = await TypeOfAnimalsService.getAllTypesOfAnimals();
            setTypesOfAnimals(fetchedTypesOfAnimals);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCreateTypeOfAnimals = async (request: TypeOfAnimalsRequest) => {
        await TypeOfAnimalsService.createTypeOfAnimals(request);
        closeModal();
        const fetchedTypesOfAnimals = await TypeOfAnimalsService.getAllTypesOfAnimals();
        setTypesOfAnimals(fetchedTypesOfAnimals);
    };

    const handleUpdateTypeOfAnimals = async (id: string, request: TypeOfAnimalsRequest) => {
        await TypeOfAnimalsService.updateTypeOfAnimals(id, request);
        closeModal();
        const fetchedTypesOfAnimals = await TypeOfAnimalsService.getAllTypesOfAnimals();
        setTypesOfAnimals(fetchedTypesOfAnimals);
    };

    const handleDeleteTypeOfAnimals = async (id: string) => {
        await TypeOfAnimalsService.deleteTypeOfAnimals(id);
        closeModal();
        const fetchedTypesOfAnimals = await TypeOfAnimalsService.getAllTypesOfAnimals();
        setTypesOfAnimals(fetchedTypesOfAnimals);
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

    const openEditModal = (typeOfAnimals: ITypeOfAnimals) => {
        setMode(Mode.Update);
        setValues(typeOfAnimals);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        typesOfAnimals.map((typeOfAnimals: ITypeOfAnimals) =>
            tableData.push({
                Название_породы: typeOfAnimals.name,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Типы животных");
        writeFile(wb, "Типы животных.xlsx");
    };

    return (
        <div>
            <CreateUpdateTypeOfAnimals
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateTypeOfAnimals}
                handleUpdate={handleUpdateTypeOfAnimals}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <TypesOfAnimalsTable
                        typesOfAnimals={typesOfAnimals}
                        handleDelete={handleDeleteTypeOfAnimals}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
