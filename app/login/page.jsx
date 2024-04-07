"use client";

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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Center, Square, Circle } from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();

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
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign={"center"}
        >
          Login
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>

        <Stack spacing={6}>
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
            onClick={navigateToSummarizePage}
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
          onClick={navigatePage}
        >
          <Center>
            Don't have an account?
            <Text ml={1} color="blue.400">
              Register
            </Text>
          </Center>
        </Button>
      </Stack>
    </Flex>
  );
}
