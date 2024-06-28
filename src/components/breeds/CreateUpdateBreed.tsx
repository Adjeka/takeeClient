import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Mode } from "../Mode";
import { IBreed } from "@/src/models/breed.interface";
import { BreedRequest } from "@/src/services/breeds.service";

interface Props {
  mode: Mode;
  values: IBreed;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: BreedRequest) => void;
  handleUpdate: (id: string, request: BreedRequest) => void;
}

export const CreateUpdateBreed = ({
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
    const breedRequest: BreedRequest = {
      name,
    };

    mode === Mode.Create
      ? handleCreate(breedRequest)
      : handleUpdate(values.id, breedRequest);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить породу" : "Редактировать породу"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="breed-form">
        <p>Название породы</p>
        <Input value={name} onChange={handleNameChange} />
      </div>
    </Modal>
  );
};
