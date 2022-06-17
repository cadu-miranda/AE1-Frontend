import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { FiUsers, FiMenu, FiChevronDown } from "react-icons/fi";
import { HiViewGridAdd } from "react-icons/hi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useAuth } from "../hooks/useAuth";
import { IUser } from "../interfaces/IUser";
import api from "../services/api";

interface LinkItemProps {
  name: string;
  pageLink: string;
  private: boolean;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Usuários", pageLink: "/usuarios", private: true, icon: FiUsers },
  {
    name: "Resíduos",
    pageLink: "/residuos",
    private: false,
    icon: HiViewGridAdd,
  },
];

export const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useAuth();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Projeto - E1
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {user?.role === "Admin"
        ? LinkItems?.map((link) => (
            <NavItem key={link.name} icon={link.icon} pageLink={link.pageLink}>
              {link.name}
            </NavItem>
          ))
        : LinkItems?.filter((x) => x.private === false).map((link) => (
            <NavItem key={link.name} icon={link.icon} pageLink={link.pageLink}>
              {link.name}
            </NavItem>
          ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  pageLink: string;
  children: ReactText;
}
const NavItem = ({ pageLink, icon, children, ...rest }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link
      onClick={() => router.push(pageLink)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user, Logout } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  useEffect(() => {
    handleGetUserById();
  }, []);

  const handleGetUserById = async () => {
    try {
      const response = await api.get(`users/${user?.id}`);

      if (response.status === 200) setUserProfile(response.data);
    } catch (e) {
      console.log(e);
      toast({
        title: "Erro.",
        description: "Erro ao receber dados do usuário!",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Projeto - E1
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={userProfile?.avatar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userProfile?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userProfile?.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => router.push("/profile")}>
                Perfil
              </MenuItem>
              <MenuItem onClick={() => router.push("/settings")}>
                Configurações
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={Logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
