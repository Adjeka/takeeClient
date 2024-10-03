"use client"

import { Inconsolata } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss"
import Navbar from "../components/navbar/Navbar";
import classNames from 'classnames';
import { ILogin } from "../models/login.interface";
import { IRegister } from "../models/register.interface";
import React, { useState } from 'react';
import { LoginRequest, RegisterRequest, UserService } from "../services/users.service";
import { Login } from "../components/auth/Login";
import { useRouter } from "next/navigation";

const font = Inconsolata({ subsets: ['latin'] })

//const router = useRouter();

export let token = "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultLoginValues = {
    login: "",
    password: ""
  } as ILogin;

  const defaultRegisterValues = {
    surname: "",
    name: "",
    patronymic: "",
    dateOfBirth: new Date(),
    email: "",
    phoneNumber: "",
    login: "",
    password: "",
  } as IRegister;

  const [loginValues, setLoginValues] = useState<ILogin>(defaultLoginValues);
  const [registerValues, setRegisterValues] = useState<IRegister>(defaultRegisterValues);
  const [IsLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [IsRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginValues(defaultLoginValues);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginValues(defaultLoginValues);
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterValues(defaultRegisterValues);
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterValues(defaultRegisterValues);
    setIsRegisterModalOpen(false);
  };

  const handleLogin = async (request: LoginRequest) => {
    try {
      const tokenResponse = await UserService.login(request);
      if (tokenResponse) {
        window.location.reload();
        token = tokenResponse.token;
        localStorage.clear();
        localStorage.setItem("userId", tokenResponse.user.id)
        localStorage.setItem("login", tokenResponse.user.login)
        localStorage.setItem("role", tokenResponse.user.userRole.name)
        closeLoginModal();
      }
    } catch (error) {
      console.error(error);
      alert("Неверный логин или пароль!")
    }
  };

  const handleRegister = async (request: RegisterRequest) => {
    await UserService.register(request);
    closeRegisterModal();
  };

  return (
    <html lang="en">
      <body className={classNames(font.className, styles.antdesign)}>
        <Navbar 
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal} />
        
        {children}

        <Login
          values={loginValues}
          isModalOpen={IsLoginModalOpen}
          handleCancel={closeLoginModal}
          handleLogin={handleLogin} />
      </body>
    </html>
  );
}