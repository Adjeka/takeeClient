import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { ILogin } from "@/src/models/login.interface";
import { LoginRequest } from "@/src/services/users.service";
import { Button, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";

interface Props {
    values: ILogin;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleLogin: (request: LoginRequest) => void;
}

export const Login = ({
  values,
  isModalOpen,
  handleCancel,
  handleLogin
}: Props) => {
  const router = useRouter();
  const [login, setLogin] = useState<string>(values.login);
  const [password, setPassword] = useState<string>(values.password);

  useEffect(() => {
    setLogin(values.login);
    setPassword(values.password);
  }, [values]);

  const handleOnOk = async () => {
    const loginRequest: LoginRequest = {
      login, 
      password
    };

    handleLogin(loginRequest);
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Modal
      title={"Авторизация"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOnOk} >
          Войти
        </Button>
      ]}
    >
      <div>
        <p>Логин</p>
        <Input 
          name="login"
          prefix={<UserOutlined />}
          placeholder="Логин пользователя" 
          required
          value={login} onChange={handleLoginChange} />

        <p>Пароль</p>
        <Input.Password
          name="password"
          prefix={<LockOutlined />}
          placeholder="Пароль"
          required 
          value={password} onChange={handlePasswordChange}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
      </div>
      {/* <Form
        name="login" >
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин пользователя!" }]} >
          <Input
            value={login}
            prefix={<UserOutlined />}
            placeholder="Логин пользователя"
            onChange={handleLoginChange} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]} >
          <Input
            value={password}
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange} />
        </Form.Item>
      </Form> */}
    </Modal>
  );
}