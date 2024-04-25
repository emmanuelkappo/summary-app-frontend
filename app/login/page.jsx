"use client";

import { useState } from "react";

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

// import { useRouter } from "next/router";

import { Center, Square, Circle } from "@chakra-ui/react";
import { CONFIG } from "@/app/config/config";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If the token is found, redirect to the summarize page
  if (typeof window !== "undefined") {
    if (window.localStorage) {
      if (localStorage.getItem("token")) {
        router.push("/summarize");
      }
    }
  }

  const signIn = async () => {
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("grant_type", "");
      formData.append("scope", "");
      formData.append("client_id", "");
      formData.append("client_secret", "");

      const res = await fetch(`${CONFIG.API_ROOT}/auth/token`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error("Log in failed");
      }
      setLoading(false);
      toast({ title: "Login in successfully", status: "success" });
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          localStorage.setItem("token", data.access_token);
        }
      }

      router.push("/summarize");
    } catch (err) {
      setLoading(false);
      toast({ title: err?.message, status: "error" });
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };
  const navigatePage = () => {
    router.push("/register");
  };

  const navigateToSummarizePage = () => {
    router.push("/summarize");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2x1", md: "3xl" }}
          textAlign={"center"}
        >
          Welcome to the Summarize App
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {/* {error && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {error}
          </Text>
        )} */}

        <Stack spacing={6} px={"2%"}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Text color={"blue.500"}>Forgot password?</Text>
          </Stack>

          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={signIn}
          >
            Log In
          </Button>
        </Stack>

        <Button
          variant={"link"}
          size="md"
          height="48px"
          width="200px"
          borderColor="blue"
          marginLeft={"8%"}
          onClick={navigatePage}
        >
          <Center>
            Dont have an account?
            <Text ml={1} color="blue.400">
              Register
            </Text>
          </Center>
        </Button>
      </Stack>
    </Flex>
  );
}
