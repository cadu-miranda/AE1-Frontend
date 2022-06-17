import React, { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Main: NextPage = () => {
  const { Login } = useAuth();
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Head>
        <title>Login</title>
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
        <Flex flex={1}>
          <Image
            alt="Login Image"
            objectFit="cover"
            src="/static/images/mind-wp.jpeg"
          />
        </Flex>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Entre com suas credenciais</Heading>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                isRequired
                focusBorderColor={"blue.500"}
                placeholder="e-mail"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </FormControl>
            <FormControl id="senha">
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  focusBorderColor={"blue.500"}
                  placeholder="senha"
                  onChange={(e) => setPassword(e.target.value)}
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
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"flex-end"}
              >
                <Link
                  color={"blue.500"}
                  onClick={() => router.push("/forgot-password")}
                >
                  Esqueceu sua senha?
                </Link>
              </Stack>
              <Button
                disabled={email === "" || password === ""}
                onClick={() => Login(email, password)}
                colorScheme="blue"
                variant="solid"
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default Main;
