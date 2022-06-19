import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";
import api from "../services/api";

const ForgotPassword: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSendRecoverToken = async () => {
    try {
      const response = await api.post("/auth/forgot", { email });

      if (response.status === 200) {
        setIsTokenSent(true);
        toast({
          title: "Sucesso.",
          description: "Token enviado!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      }
    } catch (e) {
      console.log(e);
      setIsTokenSent(false);
      toast({
        title: "Erro.",
        description: "Erro ao enviar token!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      setEmail("");
    }
  };

  const handleResetPassword = async () => {
    try {
      const data = {
        email,
        token,
        password: newPassword,
      };

      const response = await api.post("/auth/reset", data);

      if (response.status === 200) {
        toast({
          title: "Sucesso.",
          description: "Nova senha cadastrada!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao cadastrar nova senha!",
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
        <title>Recuperação de senha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.75 } }}
        exit={{ opacity: 0 }}
        minH="100vh"
        direction={{ base: "column", md: "row" }}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={8} w={"full"} maxW={"md"}>
            <Stack direction="row">
              <Button
                onClick={() => router.push("/")}
                leftIcon={<BiArrowBack />}
                colorScheme="blue"
                variant="outline"
              >
                Voltar
              </Button>
            </Stack>
            <Heading fontSize={"2xl"}>
              {isTokenSent ? "Digite sua nova senha" : "Recuperação de senha"}
            </Heading>
            {isTokenSent ? (
              <>
                <FormControl id="email">
                  <FormLabel>Token</FormLabel>
                  <Input
                    isRequired
                    focusBorderColor={"blue.500"}
                    placeholder="token"
                    onChange={(e) => setToken(e.target.value)}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Nova senha</FormLabel>
                  <InputGroup>
                    <Input
                      isRequired
                      focusBorderColor={"blue.500"}
                      placeholder="senha"
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={isPasswordVisible ? "text" : "password"}
                    />
                    <InputRightElement width={"3.5rem"}>
                      {isPasswordVisible ? (
                        <AiOutlineEye
                          size={24}
                          cursor="pointer"
                          onClick={() => setIsPasswordVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          size={24}
                          cursor="pointer"
                          onClick={() => setIsPasswordVisible(true)}
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </>
            ) : (
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input
                  isRequired
                  focusBorderColor={"blue.500"}
                  placeholder="e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
            )}

            <Stack spacing={6}>
              <Button
                disabled={email === ""}
                onClick={() => {
                  isTokenSent
                    ? handleResetPassword()
                    : handleSendRecoverToken();
                }}
                colorScheme="blue"
                variant="solid"
              >
                {isTokenSent ? "Atualizar senha" : "Enviar código"}
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt="Forgot password Image"
            objectFit="cover"
            src="/static/images/papel.jpg"
          />
        </Flex>
      </Stack>
    </>
  );
};

export default ForgotPassword;
