import { useState, useEffect, createContext, ReactNode } from "react";
import { AxiosResponse, HeadersDefaults } from "axios";
import { useRouter } from "next/router";
import api from "../services/api";
import { IUser } from "../interfaces/IUser";
import { useToast } from "@chakra-ui/react";
import { setCookie, destroyCookie, parseCookies } from "nookies";

interface IAuthContextData {
  signed: boolean;
  isLoading: boolean;
  user: IUser | null;
  Login(email: string, password: string): Promise<void>;
  updateUser(
    name: string,
    email: string,
    phone: string,
    avatar: string
  ): Promise<void>;
  Logout(): void;
}

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoragedData = async () => {
      const cookies = parseCookies();

      const { "@Dashboard:authUser": storagedUser } = cookies;
      const { "@Dashboard:authToken": storagedToken } = cookies;

      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (storagedUser && storagedToken) {
        api.defaults.headers = {
          Authorization: `Bearer ${storagedToken}`,
        } as CommonHeaderProperties;
        setUser(JSON.parse(storagedUser));
      }

      setIsLoading(false);
    };

    loadStoragedData();
  }, []);

  const Login = async (email: string, password: string): Promise<void> => {
    try {
      const response: AxiosResponse = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.user === null) throw new Error();

      if (response.status === 200 && response.data.user !== null) {
        setUser(response.data.user);

        api.defaults.headers = {
          Authorization: `Bearer ${response.data.token}`,
        } as CommonHeaderProperties;

        setCookie(
          undefined,
          "@Dashboard:authUser",
          JSON.stringify(response?.data?.user),
          {
            path: "/",
          }
        );

        setCookie(undefined, "@Dashboard:authToken", response?.data?.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        toast({
          title: "Sucesso.",
          description: "Login realizado!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });

        response.data.user.role === "Admin"
          ? router.push("/usuarios")
          : router.push("/residuos");
      }
    } catch (e) {
      console.log(e);

      setIsLoading(false);
      router.push("/");

      toast({
        title: "Erro no login.",
        description: "Verifique suas credenciais!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const updateUser = async (
    name: string,
    email: string,
    phone: string,
    avatar: string
  ) => {
    try {
      const data = {
        name: name === "" ? user?.name : name,
        email: email === "" ? user?.email : email,
        phone: phone === "" ? user?.phone : phone,
        avatar: avatar === "" ? user?.avatar : avatar,
      };

      const response = await api.put(`users/${user?.id}`, data);

      if (response.status === 200)
        toast({
          title: "Sucesso.",
          description: "Usu??rio atualizado!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao atualizar o usu??rio!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const Logout = () => {
    setUser(null);

    destroyCookie(undefined, "@Dashboard:authUser");
    destroyCookie(undefined, "@Dashboard:authToken");

    router.push("/");

    toast({
      title: "Sucesso.",
      description: "Voc?? foi desconectado!",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        isLoading,
        user,
        Login,
        updateUser,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
