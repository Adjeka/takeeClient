import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { IBreed } from "@/src/models/breed.interface";

interface Props {
  breeds: IBreed[];
  handleDelete: (id: string) => void;
  handleOpen: (breed: IBreed) => void;
}

export const BreedsTable = ({ breeds, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<IBreed>["columns"] = [
    {
      title: "Название породы",
      dataIndex: "name",
      key: "name",
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

  const dataSource = breeds.map((breed: IBreed) => ({
    id: breed.id,
    name: breed.name,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};