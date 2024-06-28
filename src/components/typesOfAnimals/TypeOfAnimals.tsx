import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { ITypeOfAnimals } from "@/src/models/typeOfAnimals.interface";

interface Props {
  typesOfAnimals: ITypeOfAnimals[];
  handleDelete: (id: string) => void;
  handleOpen: (typeOfAnimal: ITypeOfAnimals) => void;
}

export const TypesOfAnimalsTable = ({ typesOfAnimals, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<ITypeOfAnimals>["columns"] = [
    {
      title: "Тип животного",
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

  const dataSource = typesOfAnimals.map((type: ITypeOfAnimals) => ({
    id: type.id,
    name: type.name,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};
