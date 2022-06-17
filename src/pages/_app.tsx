import React, { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/auth";
import { useAuth } from "../hooks/useAuth";
import Lottie from "lottie-web";

const ApiProvider = ({ Component, pageProps }: AppProps) => {
  const container = useRef(null);
  const { isLoading } = useAuth();

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container?.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/lotties/rocket.json"),
      rendererSettings: {},
    });

    return () => instance.destroy();
  }, []);

  return (
    <AuthProvider>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            ref={container}
            style={{
              width: "300px",
              height: "300px",
            }}
          />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
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
