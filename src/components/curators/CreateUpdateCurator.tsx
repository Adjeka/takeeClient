import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Mode } from "../Mode";
import { CuratorRequest } from "@/src/services/curators.service";
import { ICurator } from "@/src/models/curator.interface";

interface Props {
  mode: Mode;
  values: ICurator;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: CuratorRequest) => void;
  handleUpdate: (id: string, request: CuratorRequest) => void;
}

export const CreateUpdateCurator = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
}: Props) => {

  const [surname, setSurname] = useState<string>(values.surname);
  const [name, setName] = useState<string>(values.name);
  const [patronymic, setPatronymic] = useState<string>(values.patronymic);
  const [email, setEmail] = useState<string>(values.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(values.phoneNumber);

  useEffect(() => {
    setSurname(values.surname);
    setName(values.name);
    setPatronymic(values.patronymic);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
  }, [values]);

  const handleOnOk = async () => {
    const curatorRequest: CuratorRequest = {
      surname,
      name,
      patronymic,
      email,
      phoneNumber,
    };

    mode === Mode.Create
      ? handleCreate(curatorRequest)
      : handleUpdate(values.id, curatorRequest);
  };

  const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePatronymicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить куратора" : "Редактировать куратора"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="curator-form">
        <p>Фамилия</p>
        <Input value={surname} onChange={handleSurnameChange} />

        <p>Имя</p>
        <Input value={name} onChange={handleNameChange} />

        <p>Отчество</p>
        <Input value={patronymic} onChange={handlePatronymicChange} />

        <p>Email</p>
        <Input value={email} onChange={handleEmailChange} />

        <p>Телефон</p>
        <Input value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
    </Modal>
  );
};
