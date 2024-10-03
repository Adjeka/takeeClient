import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { Modal, Input, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { Mode } from "../Mode";
import { IAnimal } from "@/src/models/animal.interface";
import { AnimalRequest } from "@/src/services/animals.service";
import { IBreed } from "@/src/models/breed.interface";
import { ICurator } from "@/src/models/curator.interface";
import { ITypeOfAnimals } from "@/src/models/typeOfAnimals.interface";
import TextArea from "antd/es/input/TextArea";
import styles from "./Animal.module.scss"

dayjs.extend(utc);

const dateFormat = "DD.MM.YYYY";

interface Props {
  mode: Mode;
  values: IAnimal;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: AnimalRequest) => void;
  handleUpdate: (id: string, request: AnimalRequest) => void;
  breedsArray: IBreed[];
  curatorsArray: ICurator[];
  typesOfAnimalsArray: ITypeOfAnimals[];
}

export const CreateUpdateAnimal = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  breedsArray,
  curatorsArray,
  typesOfAnimalsArray
}: Props) => {

  const [nickname, setNickname] = useState<string>(values.nickname);
  const [typeOfAnimalsId, setTypeOfAnimalsId] = useState<string>(values.typeOfAnimals.id);
  const [breedId, setBreedId] = useState<string>(values.breed.id);
  const [height, setHeight] = useState<number>(values.height);
  const [weight, setWeight] = useState<number>(values.weight);
  const [gender, setGender] = useState<string>(values.gender);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(values.dateOfBirth ? dayjs.utc(values.dateOfBirth): null);
  const [color, setColor] = useState<string>(values.color);
  const [distinguishingMark, setDistinguishingMark] = useState<string>(values.distinguishingMark);
  const [description, setDescription] = useState<string>(values.description);
  const [curatorId, setCuratorId] = useState<string>(values.curator.id);
  const [photo, setPhoto] = useState<File | null>(null);
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const [curators, setCurators] = useState<ICurator[]>([]);
  const [typesOfAnimals, setTypesOfAnimals] = useState<ITypeOfAnimals[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setNickname(values.nickname);
    setTypeOfAnimalsId(values.typeOfAnimals.id);
    setBreedId(values.breed.id);
    setHeight(values.height);
    setWeight(values.weight);
    setGender(values.gender);
    setDateOfBirth(values.dateOfBirth ? dayjs.utc(values.dateOfBirth) : null);
    setColor(values.color);
    setDistinguishingMark(values.distinguishingMark);
    setDescription(values.description);
    setCuratorId(values.curator.id);
    setBreeds(breedsArray);
    setCurators(curatorsArray);
    setTypesOfAnimals(typesOfAnimalsArray);
  }, [values, breedsArray, curatorsArray, typesOfAnimalsArray]);

  const handleOnOk = async () => {
    const animalRequest: AnimalRequest = {
      nickname,
      typeOfAnimalsId,
      breedId,
      height,
      weight,
      gender,
      dateOfBirth: dateOfBirth?.toDate() || new Date(),
      color,
      distinguishingMark,
      description,
      curatorId,
      photo,
    };

    mode == Mode.Create
      ? handleCreate(animalRequest)
      : handleUpdate(values.id, animalRequest);
  };

  const submitModal = () => {
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleOnOk();
  }

  const closeModal = () => {
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleCancel();
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleDateOfBirthChange = (date: Dayjs | null) => {
    setDateOfBirth(date);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleDistinguishingMarkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistinguishingMark(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleCuratorChange = (value: string) => {
    setCuratorId(value);
  };

  const handlePhotoChange = (value: ChangeEvent<HTMLInputElement>) => {
    if (value.target.files && value.target.files.length > 0) {
      setPhoto(value.target.files[0]);
    }
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить животное" : "Редактировать животное"}
      open={isModalOpen}
      onOk={submitModal}
      onCancel={closeModal}
      cancelText={"Отмена"}
    >
      <div className="animal-form">
        <p>Кличка</p>
        <Input value={nickname} onChange={handleNicknameChange} />

        <p>Вид животного</p>
        <Select value={typeOfAnimalsId} onChange={setTypeOfAnimalsId} className="w-full">
          {typesOfAnimals.map(type => (
            <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
          ))}
        </Select>

        <p>Порода</p>
        <Select value={breedId} onChange={setBreedId} className="w-full">
          {breeds.map(breed => (
            <Select.Option key={breed.id} value={breed.id}>{breed.name}</Select.Option>
          ))}
        </Select>

        <p>Рост (см)</p>
        <Input type="number" value={height} onChange={handleHeightChange} />

        <p>Вес (кг)</p>
        <Input type="number" value={weight} onChange={handleWeightChange} />

        <p>Пол</p>
        <Select value={gender} onChange={handleGenderChange} className="w-full">
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>

        <p>Дата рождения</p>
        <DatePicker
          value={dateOfBirth}
          format={dateFormat}
          onChange={handleDateOfBirthChange}
        />

        <p>Окрас</p>
        <Input value={color} onChange={handleColorChange} />

        <p>Отличительная особенность</p>
        <Input value={distinguishingMark} onChange={handleDistinguishingMarkChange} />

        <p>Описание</p>
        <TextArea rows={2} value={description} onChange={handleDescriptionChange} />

        <p>Куратор</p>
        <Select value={curatorId} onChange={handleCuratorChange} className="w-full">
          {curators.map(curator => (
            <Select.Option key={curator.id} value={curator.id}>{`${curator.surname} ${curator.name} ${curator.patronymic}`}</Select.Option>
          ))}
        </Select>

        <p>Фото</p>
        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="cursor-pointer"/>

      </div>
    </Modal>
  );
};
