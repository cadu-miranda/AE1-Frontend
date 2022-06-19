import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/auth";

const ApiProvider = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <ApiProvider
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
