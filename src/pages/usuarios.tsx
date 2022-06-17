import React, { useState, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { UserCard } from "../components/Users/UserCard";
import { SidebarWithHeader } from "../components/SidebarWithHeader";
import {
  Button,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IUser } from "../interfaces/IUser";
import api from "../services/api";
import AddUserModal from "../components/Users/AddUserModal";

const Users: NextPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/users");

      if (response.status === 200) {
        setUsers(response.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao receber lista de usuários!",
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
        <title>Usuários</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isOpen ? (
        <AddUserModal
          isOpen={isOpen}
          onClose={onClose}
          handleGetAllUsers={handleGetAllUsers}
        />
      ) : (
        false
      )}
      <SidebarWithHeader>
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Text fontSize={"3xl"}>Usuários</Text>
          <Button onClick={onOpen}>Adicionar</Button>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {isLoading ? (
            <Progress size="sm" isIndeterminate />
          ) : (
            users?.map((item) => {
              return (
                <UserCard
                  key={item.id}
                  userItem={item}
                  handleGetAllUsers={handleGetAllUsers}
                />
              );
            })
          )}
        </SimpleGrid>
      </SidebarWithHeader>
    </>
  );
};

export default Users;
