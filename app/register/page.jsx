"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async () => {
    console.log(username, password);
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("grant_type", "");
      formData.append("scope", "");
      formData.append("client_id", "");
      formData.append("client_secret", "");

      const res = await fetch("http://127.0.0.1:8000/auth", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Log in failed");
      }
      setLoading(false);
      toast({ title: "Login in", status: "success" });
      router.push("/summarize");
    } catch (err) {
      setLoading(false);
      // toast({ title: err?.message, status: "error" });
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSummarizePage = () => {
    router.push("/summarize");
  };

  const navigateToLoginPage = () => {
    router.push("/login");
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to summarize your texts
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={signUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Button
                variant={"link"}
                size="md"
                height="48px"
                width="200px"
                borderColor="blue"
                onClick={navigateToLoginPage}
              >
                <Center>
                  Already a user?{" "}
                  <Text ml={1} color="blue.400">
                    {" "}
                    Login
                  </Text>
                </Center>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
