import React, { useState } from "react";
import {
  Heading,
  Box,
  Center,
  Image,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IUser } from "../../interfaces/IUser";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import DeleteUserModal from "./DeleteUserModal";

interface IUserCardProps {
  userItem: IUser;
  handleGetAllUsers: () => Promise<void>;
}

export const UserCard = ({ userItem, handleGetAllUsers }: IUserCardProps) => {
  const { user } = useAuth();
  const [chosenUser, setChosenUser] = useState<IUser | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOpen && chosenUser ? (
        <DeleteUserModal
          isOpen={isOpen}
          onClose={onClose}
          chosenUser={chosenUser}
          handleGetAllUsers={handleGetAllUsers}
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
            alt="Card que mostra informações sobre um usuário"
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {userItem?.name}
              </Heading>
              <Text color={"gray.500"}>{userItem?.email}</Text>
            </Stack>

            <Stack display={"flex"} justifyContent={"space-between"}>
              <IconButton
                disabled={user?.id === userItem?.id}
                onClick={() => {
                  onOpen();
                  setChosenUser(userItem);
                }}
                aria-label="icon"
                icon={<FiTrash2 />}
                size="md"
              />
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};
