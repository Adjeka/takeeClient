"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { IRecordForWalk } from "@/src/models/recordForWalk.interface";
import { Mode } from "@/src/components/Mode";
import { RecordForWalkRequest, RecordForWalkService } from "@/src/services/recordsForWalk.service";
import { CreateUpdateRecordForWalk } from "@/src/components/recordsForWalk/CreateUpdateRecordForWalk";
import { RecordsForWalkTable } from "@/src/components/recordsForWalk/RecordForWalk";
import { IAnimal } from "@/src/models/animal.interface";
import { IUser } from "@/src/models/user.interface";
import { UserService } from "@/src/services/users.service";
import { AnimalService } from "@/src/services/animals.service";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function RecordForWalkPage() {
    const defaultValues = {
        user: { id: "", surname: "", name: "", patronymic: "", dateOfBirth: new Date(), email: "", phoneNumber: "", userRole: { id: "", name: "" }, login: "", password: "" },
        animal: { id: "", nickname: "", typeOfAnimals: { id: "", name: "" }, breed: { id: "", name: "" }, height: 0, weight: 0, gender: "", dateOfBirth: new Date(), color: "", distinguishingMark: "", description: "", curator: { id: "", surname: "", name: "", patronymic: "", email: "", phoneNumber: "" }, photo: "" }
    } as IRecordForWalk;

    const [values, setValues] = useState<IRecordForWalk>(defaultValues);
    const [recordsForWalk, setRecordsForWalk] = useState<IRecordForWalk[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRecordsForWalk = await RecordForWalkService.getAllRecordsForWalk();
            setRecordsForWalk(fetchedRecordsForWalk);
            setLoading(false);

            const fetchedAnimals = await AnimalService.getAllAnimals();
            setAnimals(fetchedAnimals);

            const fetchedUsers = await UserService.getAllUsers();
            setUsers(fetchedUsers);
        };

        fetchData();
    }, []);

    const handleCreateRecordForWalk = async (request: RecordForWalkRequest) => {
        await RecordForWalkService.createRecordForWalk(request);
        closeModal();
        const fetchedRecordsForWalk = await RecordForWalkService.getAllRecordsForWalk();
        setRecordsForWalk(fetchedRecordsForWalk);
    };

    const handleUpdateRecordForWalk = async (id: string, request: RecordForWalkRequest) => {
        await RecordForWalkService.updateRecordForWalk(id, request);
        closeModal();
        const fetchedRecordsForWalk = await RecordForWalkService.getAllRecordsForWalk();
        setRecordsForWalk(fetchedRecordsForWalk);
    };

    const handleDeleteRecordForWalk = async (id: string) => {
        await RecordForWalkService.deleteRecordForWalk(id);
        closeModal();
        const fetchedRecordsForWalk = await RecordForWalkService.getAllRecordsForWalk();
        setRecordsForWalk(fetchedRecordsForWalk);
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

    const openEditModal = (recordForWalk: IRecordForWalk) => {
        setMode(Mode.Update);
        setValues(recordForWalk);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        recordsForWalk.map((recordForWalk: IRecordForWalk) =>
            tableData.push({
                Дата_записи: dayjs(recordForWalk.dateOfRecord).format("DD.MM.YYYY HH:mm"),
                Пользователь: `${recordForWalk.user.surname} ${recordForWalk.user.name} ${recordForWalk.user.patronymic}`,
                Животное: recordForWalk.animal.nickname,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Записи на прогулку");
        writeFile(wb, "Записи на прогулку.xlsx");
    };

    return (
        <div>
            <CreateUpdateRecordForWalk
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateRecordForWalk}
                handleUpdate={handleUpdateRecordForWalk}
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
                    <RecordsForWalkTable
                        recordsForWalk={recordsForWalk}
                        handleDelete={handleDeleteRecordForWalk}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
