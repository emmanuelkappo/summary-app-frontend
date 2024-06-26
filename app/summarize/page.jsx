// pages/SummarizePage.js
"use client";

import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  useToast,
  Spinner,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/app/config/config";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // Redirect if the token is not found
  if (typeof window !== "undefined") {
    if (window.localStorage) {
      if (!localStorage.getItem("token")) {
        router.push("/login");
      }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      if (window.localStorage) {
        window.localStorage.removeItem("token");
      }
    }

    router.push("/login");
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ content: text }).toString();
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          const response = await fetch(
            `${CONFIG.API_ROOT}/summarize?${query}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("token"),
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            if (response.status === 401) {
              setTimeout(() => {
                logout();
              }, 10000);
            }
            throw new Error(
              response.status === 401
                ? "Token has expired, you will be redirected to the login page in 10 secs"
                : data.detail
            );
          }
          // Paste toast

          toast({
            title: "Summary successful",
            status: "success",
          });
          const content = data.choices[0].message.content;
          setSummary(content);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container padding={10} alignItems={"center"}>
      <Text mb={4} fontWeight={"bold"} fontSize={"lg"}>
        Summarize App
      </Text>

      <FormControl>
        <Box display={"flex"} justifyContent={"space-between"}>
          <FormLabel fontSize={"sm"}>Input Large Text:</FormLabel>
          <a target="_blank" href={"architecture.pdf"}>
            Download Architecture
          </a>
        </Box>

        <Textarea value={text} onChange={handleTextChange} />
      </FormControl>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button disabled={loading} color={"blue"} mt={4} onClick={handleSubmit}>
          {loading ? <Spinner size={"xs"} /> : "Summarize"}
        </Button>

        <Button
          mt={4}
          mx={4}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={logout}
        >
          Log Out
        </Button>
      </Box>

      <Text mt={4} mb={4} fontWeight={"bold"} fontSize={"lg"}>
        Result:
      </Text>
      {loading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        summary && <Text mb={4}>{summary}</Text>
      )}
    </Container>
  );
}
