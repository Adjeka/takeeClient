import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, Input, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { Mode } from "../Mode";
import { IUser } from "@/src/models/user.interface";
import { UserRequest } from "@/src/services/users.service";
import { IUserRole } from "@/src/models/userRole.interface";

dayjs.extend(utc);

const dateFormat = "DD.MM.YYYY";

interface Props {
  mode: Mode;
  values: IUser;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: UserRequest) => void;
  handleUpdate: (id: string, request: UserRequest) => void;
  userRolesArray: IUserRole[];
}

export const CreateUpdateUser = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
  userRolesArray
}: Props) => {

  const [surname, setSurname] = useState<string>(values.surname);
  const [name, setName] = useState<string>(values.name);
  const [patronymic, setPatronymic] = useState<string>(values.patronymic);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(values.dateOfBirth ? dayjs.utc(values.dateOfBirth): null);
  const [email, setEmail] = useState<string>(values.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(values.phoneNumber);
  const [userRoleId, setUserRole_Id] = useState<string>(values.userRole.id);
  const [login, setLogin] = useState<string>(values.login);
  const [password, setPassword] = useState<string>(values.password);
  const [userRoles, setUserRoles] = useState<IUserRole[]>([]);

  useEffect(() => {
    setSurname(values.surname);
    setName(values.name);
    setPatronymic(values.patronymic);
    setDateOfBirth(values.dateOfBirth ? dayjs.utc(values.dateOfBirth) : null);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
    setUserRole_Id(values.userRole.id);
    setLogin(values.login);
    setPassword(values.password);
    setUserRoles(userRolesArray);
  }, [values, userRolesArray]);

  const handleOnOk = async () => {
    const userRequest: UserRequest = {
      surname,
      name,
      patronymic,
      dateOfBirth: dateOfBirth?.toDate() || new Date(),
      email,
      phoneNumber,
      userRoleId,
      login,
      password,
    };

    mode === Mode.Create
      ? handleCreate(userRequest)
      : handleUpdate(values.id, userRequest);
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

  const handleDateOfBirthChange = (date: Dayjs | null) => {
    setDateOfBirth(date);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleUserRoleChange = (value: string) => {
    setUserRole_Id(value);
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Modal
      title={mode === Mode.Create ? "Добавить пользователя" : "Редактировать пользователя"}
      open={isModalOpen}
      onOk={handleOnOk}
      onCancel={handleCancel}
      cancelText={"Отмена"}
    >
      <div className="user-form">
        <p>Фамилия</p>
        <Input value={surname} onChange={handleSurnameChange} />

        <p>Имя</p>
        <Input value={name} onChange={handleNameChange} />

        <p>Отчество</p>
        <Input value={patronymic} onChange={handlePatronymicChange} />

        <p>Дата рождения</p>
        <DatePicker
          value={dateOfBirth}
          format={dateFormat}
          onChange={handleDateOfBirthChange}
        />

        <p>Email</p>
        <Input value={email} onChange={handleEmailChange} />

        <p>Телефон</p>
        <Input value={phoneNumber} onChange={handlePhoneNumberChange} />

        <p>Роль пользователя</p>
        <Select value={userRoleId} onChange={handleUserRoleChange} className="w-full">
          {userRoles.map(role => (
            <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
          ))}
        </Select>

        <p>Логин</p>
        <Input value={login} onChange={handleLoginChange} />

        <p>Пароль</p>
        <Input type="password" value={password} onChange={handlePasswordChange} />
      </div>
    </Modal>
  );
};
