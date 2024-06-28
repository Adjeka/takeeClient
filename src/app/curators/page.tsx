"use client"

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { ICurator } from "@/src/models/curator.interface";
import { Mode } from "@/src/components/Mode";
import { CuratorRequest, CuratorService } from "@/src/services/curators.service";
import { CreateUpdateCurator } from "@/src/components/curators/CreateUpdateCurator";
import { CuratorsTable } from "@/src/components/curators/Curator";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function CuratorPage() {
    const defaultValues = {
        surname: "",
        name: "",
        patronymic: "",
        email: "",
        phoneNumber: "",
    } as ICurator;

    const [values, setValues] = useState<ICurator>(defaultValues);
    const [curators, setCurators] = useState<ICurator[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCurators = await CuratorService.getAllCurators();
            setCurators(fetchedCurators);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCreateCurator = async (request: CuratorRequest) => {
        await CuratorService.createCurator(request);
        closeModal();
        const fetchedCurators = await CuratorService.getAllCurators();
        setCurators(fetchedCurators);
    };

    const handleUpdateCurator = async (id: string, request: CuratorRequest) => {
        await CuratorService.updateCurator(id, request);
        closeModal();
        const fetchedCurators = await CuratorService.getAllCurators();
        setCurators(fetchedCurators);
    };

    const handleDeleteCurator = async (id: string) => {
        await CuratorService.deleteCurator(id);
        closeModal();
        const fetchedCurators = await CuratorService.getAllCurators();
        setCurators(fetchedCurators);
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

    const openEditModal = (curator: ICurator) => {
        setMode(Mode.Update);
        setValues(curator);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        curators.map((curator: ICurator) =>
            tableData.push({
                Фамилия: curator.surname,
                Имя: curator.name,
                Отчество: curator.patronymic,
                Email: curator.email,
                Телефон: curator.phoneNumber,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Кураторы");
        writeFile(wb, "Кураторы.xlsx");
    };

    return (
        <div>
            <CreateUpdateCurator
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateCurator}
                handleUpdate={handleUpdateCurator}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <CuratorsTable
                        curators={curators}
                        handleDelete={handleDeleteCurator}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
