import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { SidebarWithHeader } from "../components/SidebarWithHeader";
import { Text, Stack, Switch, useColorMode } from "@chakra-ui/react";

const Settings: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Configurações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarWithHeader>
        <Text fontSize={"3xl"}>Configurações</Text>
        <Stack spacing={6} mt={8}>
          <Stack spacing={2} isInline>
            <Text>Modo {colorMode} ativado</Text>
            <Switch
              value={colorMode}
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
          </Stack>
        </Stack>
      </SidebarWithHeader>
    </>
  );
};

export default Settings;
