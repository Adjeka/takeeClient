import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { IRecordForWalk } from "@/src/models/recordForWalk.interface";
import { Mode } from "../Mode";
import { RecordForWalkRequest } from "@/src/services/recordsForWalk.service";
import { IUser } from "@/src/models/user.interface";
import { IAnimal } from "@/src/models/animal.interface";

const dateFormat = "DD.MM.YYYY";

interface Props {
  mode: Mode;
  values: IRecordForWalk;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: RecordForWalkRequest) => void;
  handleUpdate: (id: string, request: RecordForWalkRequest) => void;
  usersArray: IUser[];
  animalsArray: IAnimal[];
}

export const CreateUpdateRecordForWalk = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  usersArray,
  animalsArray
}: Props) => {

  const [userId, setUser_Id] = useState<string>(values.user.id);
  const [animalId, setAnimal_Id] = useState<string>(values.animal.id);
  const [users, setUsers] = useState<IUser[]>([]);
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    setUser_Id(values.user.id);
    setAnimal_Id(values.animal.id);
    setUsers(usersArray);
    setAnimals(animalsArray);
  }, [values, usersArray, animalsArray]);

  const handleOnOk = async () => {
    const recordForWalkRequest: RecordForWalkRequest = {
      userId,
      animalId,
    };

    mode === Mode.Create
      ? handleCreate(recordForWalkRequest)
      : handleUpdate(values.id, recordForWalkRequest);
  };

  const handleUserChange = (value: string) => {
    setUser_Id(value);
  };

  const handleAnimalChange = (value: string) => {
    setAnimal_Id(value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить запись на прогулку" : "Редактировать запись на прогулку"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="record-for-walk-form">
        <p>Пользователь</p>
        <Select value={userId} onChange={handleUserChange} className="w-full">
          {users.map(user => (
            <Select.Option key={user.id} value={user.id}>{`${user.surname} ${user.name} ${user.patronymic}`}</Select.Option>
          ))}
        </Select>

        <p>Животное</p>
        <Select value={animalId} onChange={handleAnimalChange} className="w-full">
          {animals.map(animal => (
            <Select.Option key={animal.id} value={animal.id}>{animal.nickname}</Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};
