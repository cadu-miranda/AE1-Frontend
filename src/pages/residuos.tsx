import React, { useState, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { ResiduoCard } from "../components/Residuos/ResiduoCard";
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
import { IResiduo } from "../interfaces/IResiduo";
import api from "../services/api";
import AddResiduoModal from "../components/Residuos/AddResiduoModal";

const Residuos: NextPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [residuos, setResiduos] = useState<IResiduo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetAllResiduos();
  }, []);

  const handleGetAllResiduos = async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/residuos");

      if (response.status === 200) {
        setResiduos(response.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao receber lista de resíduos!",
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
        <title>Resíduos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isOpen ? (
        <AddResiduoModal
          isOpen={isOpen}
          onClose={onClose}
          handleGetAllResiduos={handleGetAllResiduos}
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
          <Text fontSize={"3xl"}>Resíduos</Text>
          <Button onClick={onOpen}>Adicionar</Button>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {isLoading ? (
            <Progress size="sm" isIndeterminate />
          ) : (
            residuos?.map((item) => {
              return (
                <ResiduoCard
                  key={item.id}
                  residuoItem={item}
                  handleGetAllResiduos={handleGetAllResiduos}
                />
              );
            })
          )}
        </SimpleGrid>
      </SidebarWithHeader>
    </>
  );
};

export default Residuos;
