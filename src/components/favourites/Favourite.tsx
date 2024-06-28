import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { IUser } from "@/src/models/user.interface";
import { IAnimal } from "@/src/models/animal.interface";
import { IFavourite } from "@/src/models/favourite.interface";

interface Props {
  favourites: IFavourite[];
  handleDelete: (id: string) => void;
  handleOpen: (favourite: IFavourite) => void;
}

export const FavouritesTable = ({ favourites, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<IFavourite>["columns"] = [
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      render: (user: IUser) => `${user.surname} ${user.name} ${user.patronymic}`,
    },
    {
      title: "Животное",
      dataIndex: "animal",
      key: "animal",
      render: (animal: IAnimal) => animal.nickname,
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

  const dataSource = favourites.map((favourite: IFavourite) => ({
    id: favourite.id,
    user: favourite.user,
    animal: favourite.animal,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};