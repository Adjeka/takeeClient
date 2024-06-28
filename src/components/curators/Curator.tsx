import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { ICurator } from "@/src/models/curator.interface";

interface Props {
  curators: ICurator[];
  handleDelete: (id: string) => void;
  handleOpen: (curator: ICurator) => void;
}

export const CuratorsTable = ({ curators, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<ICurator>["columns"] = [
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

  const dataSource = curators.map((curator: ICurator) => ({
    id: curator.id,
    surname: curator.surname,
    name: curator.name,
    patronymic: curator.patronymic,
    email: curator.email,
    phoneNumber: curator.phoneNumber,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};