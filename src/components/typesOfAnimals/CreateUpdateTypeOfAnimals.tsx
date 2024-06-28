import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Mode } from "../Mode";
import { ITypeOfAnimals } from "@/src/models/typeOfAnimals.interface";
import { TypeOfAnimalsRequest } from "@/src/services/typesOfAnimals.service";

interface Props {
  mode: Mode;
  values: ITypeOfAnimals;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: TypeOfAnimalsRequest) => void;
  handleUpdate: (id: string, request: TypeOfAnimalsRequest) => void;
}

export const CreateUpdateTypeOfAnimals = ({
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
    const typeOfAnimalsRequest: TypeOfAnimalsRequest = {
      name,
    };

    mode === Mode.Create
      ? handleCreate(typeOfAnimalsRequest)
      : handleUpdate(values.id, typeOfAnimalsRequest);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить тип животного" : "Редактировать тип животного"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="type-of-animals-form">
        <p>Название типа животного</p>
        <Input value={name} onChange={handleNameChange} />
      </div>
    </Modal>
  );
};
