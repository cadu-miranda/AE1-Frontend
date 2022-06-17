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
import { IUser } from "../../interfaces/IUser";

interface IDeleteUserModal {
  isOpen: boolean;
  onClose: () => void;
  chosenUser: IUser;
  handleGetAllUsers: () => Promise<void>;
}

const DeleteUserModal = ({
  isOpen,
  onClose,
  chosenUser,
  handleGetAllUsers,
}: IDeleteUserModal) => {
  const toast = useToast();

  const handleDeleteUser = async () => {
    try {
      const response = await api.delete(`/users/${chosenUser?.id}`);

      if (response.status === 200) {
        toast({
          title: "Sucesso.",
          description: "Usuário removido!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        onClose();
        handleGetAllUsers();
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao remover usuário!",
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
        <ModalHeader>Remover usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Tem certeza que deseja remover o usuário {chosenUser?.name}?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={handleDeleteUser}>
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
