"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { IUserRole } from "@/src/models/userRole.interface";
import { Mode } from "@/src/components/Mode";
import { UserRoleRequest, UserRoleService } from "@/src/services/userRoles.service";
import { CreateUpdateUserRole } from "@/src/components/userRoles/CreateUpdateUserRole";
import { UserRolesTable } from "@/src/components/userRoles/UserRole";
import ButtonAdd from "@/src/components/buttons/ButtonAdd";
import { utils, writeFile } from "xlsx";
import ButtonExport from "@/src/components/buttons/ButtonExport";

const { Title } = Typography;

export default function UserRolePage() {
    const defaultValues = {
        name: "",
    } as IUserRole;

    const [values, setValues] = useState<IUserRole>(defaultValues);
    const [userRoles, setUserRoles] = useState<IUserRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUserRoles = await UserRoleService.getAllUserRoles();
            setUserRoles(fetchedUserRoles);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCreateUserRole = async (request: UserRoleRequest) => {
        await UserRoleService.createUserRole(request);
        closeModal();
        const fetchedUserRoles = await UserRoleService.getAllUserRoles();
        setUserRoles(fetchedUserRoles);
    };

    const handleUpdateUserRole = async (id: string, request: UserRoleRequest) => {
        await UserRoleService.updateUserRole(id, request);
        closeModal();
        const fetchedUserRoles = await UserRoleService.getAllUserRoles();
        setUserRoles(fetchedUserRoles);
    };

    const handleDeleteUserRole = async (id: string) => {
        await UserRoleService.deleteUserRole(id);
        closeModal();
        const fetchedUserRoles = await UserRoleService.getAllUserRoles();
        setUserRoles(fetchedUserRoles);
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

    const openEditModal = (userRole: IUserRole) => {
        setMode(Mode.Update);
        setValues(userRole);
        setIsModalOpen(true);
    };

    const exportData = async () => {
        let tableData: any[] = [];
        userRoles.map((userRole: IUserRole) =>
            tableData.push({
                Название_породы: userRole.name,
            })
        );
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(tableData);
        utils.book_append_sheet(wb, ws, "Роли пользователей");
        writeFile(wb, "Роли пользователей.xlsx");
    };

    return (
        <div>
            <CreateUpdateUserRole
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateUserRole}
                handleUpdate={handleUpdateUserRole}
            />

            {loading ? (
                <Title>Loading</Title>
            ) : (
                <div>
                    <div className="flex flex-row-reverse">
                        <ButtonExport handleExport={exportData} />
                        <ButtonAdd handleOpen={openModal} />
                    </div>
                    <UserRolesTable
                        userRoles={userRoles}
                        handleDelete={handleDeleteUserRole}
                        handleOpen={openEditModal}
                    />
                </div>
            )}
        </div>
    );
}
