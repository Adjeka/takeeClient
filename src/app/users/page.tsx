"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { IUser } from "@/src/models/user.interface";
import { Mode } from "@/src/components/Mode";
import { UserRequest, UserService } from "@/src/services/users.service";
import { CreateUpdateUser } from "@/src/components/users/CreateUpdateUser";
import { UsersTable } from "@/src/components/users/User";
import { IUserRole } from "@/src/models/userRole.interface";
import { UserRoleService } from "@/src/services/userRoles.service";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function UserPage() {
    const defaultValues = {
        surname: "",
        name: "",
        patronymic: "",
        dateOfBirth: new Date(),
        email: "",
        phoneNumber: "",
        userRole: { id: "", name: "" },
        login: "",
        password: "",
    } as IUser;

    const [values, setValues] = useState<IUser>(defaultValues);
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [userRoles, setUserRoles] = useState<IUserRole[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUsers = await UserService.getAllUsers();
            setUsers(fetchedUsers);
            setLoading(false);

            const fetchedUserRoles = await UserRoleService.getAllUserRoles();
            setUserRoles(fetchedUserRoles);
        };

        fetchData();
    }, []);

    const handleCreateUser = async (request: UserRequest) => {
        await UserService.createUser(request);
        closeModal();
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
    };

    const handleUpdateUser = async (id: string, request: UserRequest) => {
        await UserService.updateUser(id, request);
        closeModal();
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
    };

    const handleDeleteUser = async (id: string) => {
        await UserService.deleteUser(id);
        closeModal();
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
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

    const openEditModal = (user: IUser) => {
        setMode(Mode.Update);
        setValues(user);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        users.map((user: IUser) =>
            tableData.push({
                Фамилия: user.surname,
                Имя: user.name,
                Отчество: user.patronymic,
                Дата_рождения: dayjs(user.dateOfBirth).format("DD.MM.YYYY"),
                Email: user.email,
                Телефон: user.phoneNumber,
                Роль_пользователя: user.userRole.name,
                Логин: user.login,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Пользователи");
        writeFile(wb, "Пользователи.xlsx");
    };

    return (
        <div>
            <CreateUpdateUser
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateUser}
                handleUpdate={handleUpdateUser}
                userRolesArray={userRoles}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <UsersTable
                        users={users}
                        handleDelete={handleDeleteUser}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
