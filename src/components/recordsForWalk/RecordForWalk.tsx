import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { IRecordForWalk } from "@/src/models/recordForWalk.interface";
import { IUser } from "@/src/models/user.interface";
import { IAnimal } from "@/src/models/animal.interface";

interface Props {
  recordsForWalk: IRecordForWalk[];
  handleDelete: (id: string) => void;
  handleOpen: (record: IRecordForWalk) => void;
}

export const RecordsForWalkTable = ({ recordsForWalk, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<IRecordForWalk>["columns"] = [
    {
      title: "Дата записи",
      dataIndex: "dateOfRecord",
      key: "dateOfRecord",
      width: "150px",
      render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
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

  const dataSource = recordsForWalk.map((record: IRecordForWalk) => ({
    id: record.id,
    dateOfRecord: record.dateOfRecord,
    user: record.user,
    animal: record.animal,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};
