import React, { useEffect, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { SidebarWithHeader } from "../components/SidebarWithHeader";
import { Avatar, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { IUser } from "../interfaces/IUser";
import api from "../services/api";

const Profile: NextPage = () => {
  const toast = useToast();
  const { user, updateUser } = useAuth();

  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    handleGetUserById();
  }, []);

  const handleGetUserById = async () => {
    try {
      const response = await api.get(`users/${user?.id}`);

      if (response.status === 200) setUserProfile(response.data);
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao receber dados do usuário!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Meu perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarWithHeader>
        <Text fontSize={"3xl"} mb={6}>
          Meu perfil
        </Text>
        <Stack
          spacing={4}
          justifyContent="space-between"
          alignItems="stretch"
          mt={3}
          mb={2}
        >
          <Text>Nome</Text>
          <Input
            focusBorderColor={"blue.500"}
            onChange={(e) => setName(e.target.value)}
            defaultValue={userProfile?.name}
          />
          <Text>E-mail</Text>
          <Input
            focusBorderColor={"blue.500"}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={userProfile?.email}
          />
          <Text>Telefone</Text>
          <Input
            placeholder="(99) 99999-9999"
            focusBorderColor={"blue.500"}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={userProfile?.phone}
            minLength={14}
            maxLength={15}
          />
          <Text>Avatar</Text>
          <Input
            placeholder="Cole aqui seu avatar"
            focusBorderColor={"blue.500"}
            onChange={(e) => setAvatar(e.target.value)}
            defaultValue={userProfile?.avatar}
            maxLength={500}
          />
          <Stack
            spacing={5}
            isInline
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar src={user?.avatar} />
            <Text>Meu avatar atual</Text>
          </Stack>
          <Button
            colorScheme={"blue"}
            onClick={() => updateUser(name, email, phone, avatar)}
            variant="solid"
            size="md"
          >
            Salvar
          </Button>
        </Stack>
      </SidebarWithHeader>
    </>
  );
};

export default Profile;
