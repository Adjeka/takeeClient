import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { Mode } from "../Mode";
import { FavouriteRequest } from "@/src/services/favourites.service";
import { IFavourite } from "@/src/models/favourite.interface";
import { IUser } from "@/src/models/user.interface";
import { IAnimal } from "@/src/models/animal.interface";

interface Props {
  mode: Mode;
  values: IFavourite;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: FavouriteRequest) => void;
  handleUpdate: (id: string, request: FavouriteRequest) => void;
  usersArray: IUser[];
  animalsArray: IAnimal[];
}

export const CreateUpdateFavourite = ({
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
    const favouriteRequest: FavouriteRequest = {
      userId,
      animalId,
    };

    mode === Mode.Create
      ? handleCreate(favouriteRequest)
      : handleUpdate(values.id, favouriteRequest);
  };

  const handleUserChange = (value: string) => {
    setUser_Id(value);
  };

  const handleAnimalChange = (value: string) => {
    setAnimal_Id(value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить избранное" : "Редактировать избранное"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="favourite-form">
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
