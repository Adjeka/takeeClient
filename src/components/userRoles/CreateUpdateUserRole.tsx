import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Mode } from "../Mode";
import { IUserRole } from "@/src/models/userRole.interface";
import { UserRoleRequest } from "@/src/services/userRoles.service";

interface Props {
  mode: Mode;
  values: IUserRole;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: UserRoleRequest) => void;
  handleUpdate: (id: string, request: UserRoleRequest) => void;
}

export const CreateUpdateUserRole = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
}: Props) => {

  const [name, setName] = useState<string>(values.name);

  useEffect(() => {
    setName(values.name);
  }, [values]);

  const handleOnOk = async () => {
    const userRoleRequest: UserRoleRequest = {
      name,
    };

    mode === Mode.Create
      ? handleCreate(userRoleRequest)
      : handleUpdate(values.id, userRoleRequest);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить роль пользователя" : "Редактировать роль пользователя"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="user-role-form">
        <p>Название роли пользователя</p>
        <Input value={name} onChange={handleNameChange} />
      </div>
    </Modal>
  );
};
