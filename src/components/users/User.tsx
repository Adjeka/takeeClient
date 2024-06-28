import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { IUser } from "@/src/models/user.interface";
import { IUserRole } from "@/src/models/userRole.interface";

interface Props {
  users: IUser[];
  handleDelete: (id: string) => void;
  handleOpen: (user: IUser) => void;
}

export const UsersTable = ({ users, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Фамилия",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Отчество",
      dataIndex: "patronymic",
      key: "patronymic",
    },
    {
      title: "Дата рождения",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (text: string) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Роль",
      dataIndex: "userRole",
      key: "userRole",
      render: (role: IUserRole) => role.name,
    },
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleOpen(record)}>Редактировать</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Удалить</Button>
        </Space>
      ),
    },
  ];

  const dataSource = users.map((user: IUser) => ({
    id: user.id,
    surname: user.surname,
    name: user.name,
    patronymic: user.patronymic,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    phoneNumber: user.phoneNumber,
    userRole: user.userRole,
    login: user.login,
    password: user.password,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};
