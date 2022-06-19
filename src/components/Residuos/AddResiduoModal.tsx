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

interface IAddResiduoModal {
  isOpen: boolean;
  onClose: () => void;
  handleGetAllResiduos: () => Promise<void>;
}

type IInputs = {
  name?: string;
};

const AddResiduoModal = ({
  isOpen,
  onClose,
  handleGetAllResiduos,
}: IAddResiduoModal) => {
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

  const handleCreateResiduo = async () => {
    try {
      const response = await api.post("/residuos", inputs);

      if (response.status === 201) {
        toast({
          title: "Sucesso.",
          description: "Resíduo adicionado!",
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
        description: "Erro ao criar resíduo!",
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
        <ModalHeader>Adicionar novo resíduo</ModalHeader>
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
            <Text>Endereço</Text>
            <Input
              name="address"
              onChange={handleInputChange}
              ref={initialRef}
              type="text"
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="blue" onClick={handleCreateResiduo}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddResiduoModal;
