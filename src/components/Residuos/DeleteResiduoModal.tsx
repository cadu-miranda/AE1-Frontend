import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "../../services/api";
import { IResiduo } from "../../interfaces/IResiduo";

interface IDeleteResiduoModal {
  isOpen: boolean;
  onClose: () => void;
  chosenResiduo: IResiduo;
  handleGetAllResiduos: () => Promise<void>;
}

const DeleteResiduoModal = ({
  isOpen,
  onClose,
  chosenResiduo,
  handleGetAllResiduos,
}: IDeleteResiduoModal) => {
  const toast = useToast();

  const handleDeleteResiduo = async () => {
    try {
      const response = await api.delete(`/residuos/${chosenResiduo?.id}`);

      if (response.status === 200) {
        toast({
          title: "Sucesso.",
          description: "Resíduo removido!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        onClose();
        handleGetAllResiduos();
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao remover resíduo!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remover resíduo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Tem certeza que deseja remover o resíduo {chosenResiduo?.name}?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={handleDeleteResiduo}>
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteResiduoModal;
