import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import { IUserRole } from "@/src/models/userRole.interface";

interface Props {
  userRoles: IUserRole[];
  handleDelete: (id: string) => void;
  handleOpen: (breed: IUserRole) => void;
}

export const UserRolesTable = ({ userRoles, handleDelete, handleOpen }: Props) => {
  const columns: TableProps<IUserRole>["columns"] = [
    {
      title: "Название роли",
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

  const dataSource = userRoles.map((userRole: IUserRole) => ({
    id: userRole.id,
    name: userRole.name,
  }));

  return (
    <div className="Table">
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};
