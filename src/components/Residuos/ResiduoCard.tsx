import React, { useState } from "react";
import {
  Heading,
  Box,
  Center,
  Image,
  Stack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { IResiduo } from "../../interfaces/IResiduo";
import { FiTrash2 } from "react-icons/fi";
import DeleteResiduoModal from "./DeleteResiduoModal";
import api from "../../services/api";

interface IResiduoCardProps {
  residuoItem: IResiduo;
  handleGetAllResiduos: () => Promise<void>;
}

export const ResiduoCard = ({
  residuoItem,
  handleGetAllResiduos,
}: IResiduoCardProps) => {
  const toast = useToast();

  const [chosenResiduo, setChosenResiduo] = useState<IResiduo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCollectResiduo = async (residuo: IResiduo) => {
    try {
      const response = await api.put(`residuos/${residuo?.id}`, {
        collected: true,
      });

      if (response.status === 200) {
        handleGetAllResiduos();
        toast({
          title: "Sucesso.",
          description: "Resíduo coletado com sucesso!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao atualizar dados do resíduo!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      {isOpen && chosenResiduo ? (
        <DeleteResiduoModal
          isOpen={isOpen}
          onClose={onClose}
          chosenResiduo={chosenResiduo}
          handleGetAllResiduos={handleGetAllResiduos}
        />
      ) : (
        false
      )}
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            alt="Card que mostra informações sobre um resíduo"
            h={"120px"}
            w={"full"}
            src={
              "https://cdn.pixabay.com/photo/2018/08/01/11/37/plastic-3577044_960_720.jpg"
            }
            objectFit={"cover"}
          />

          <Box p={6}>
            <Stack spacing={4} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {residuoItem?.name}
              </Heading>
              <Text>{residuoItem.address}</Text>
            </Stack>

            <Stack display={"flex"} justifyContent={"space-between"}>
              <IconButton
                disabled={residuoItem.collected}
                onClick={() => {
                  onOpen();
                  setChosenResiduo(residuoItem);
                }}
                aria-label="icon"
                icon={<FiTrash2 />}
                size="md"
              />
              <Button
                disabled={residuoItem.collected}
                onClick={() => {
                  setChosenResiduo(residuoItem);
                  handleCollectResiduo(residuoItem);
                }}
                aria-label="icon"
                size="md"
              >
                {residuoItem.collected ? "Coletado" : "Coletar"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};
