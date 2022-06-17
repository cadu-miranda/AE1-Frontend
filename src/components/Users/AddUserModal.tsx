import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "../../services/api";

interface IAddUserModal {
  isOpen: boolean;
  onClose: () => void;
  handleGetAllUsers: () => Promise<void>;
}

type IInputs = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
};

const AddUserModal = ({
  isOpen,
  onClose,
  handleGetAllUsers,
}: IAddUserModal) => {
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [inputs, setInputs] = useState<IInputs | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/users", inputs);

      if (response.status === 201) {
        toast({
          title: "Sucesso.",
          description: "Usuário adicionado!",
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
        description: "Erro ao criar usuário!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar novo usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>Nome</Text>
            <Input
              name="name"
              onChange={handleInputChange}
              ref={initialRef}
              type="text"
            />
            <Text>E-mail</Text>
            <Input name="email" onChange={handleInputChange} type="email" />
            <Text>Telefone</Text>
            <Input
              name="phone"
              onChange={handleInputChange}
              type="tel"
              minLength={14}
              maxLength={15}
            />
            <Text>Senha</Text>
            <Input
              name="password"
              onChange={handleInputChange}
              type="password"
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={handleCreateUser}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
