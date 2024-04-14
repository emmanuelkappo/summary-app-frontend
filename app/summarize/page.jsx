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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const router = useRouter();
  const toast = useToast();
  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const query = new URLSearchParams({ content: text }).toString();

      const response = await fetch(`http://127.0.0.1:8000/summarize?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to summarize text");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      setSummary(content);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "could not summarize. You have to login",
        status: "error",
      });
    }
  };

  return (
    <Container padding={10} alignItems={"center"}>
      <Text mb={4} fontWeight={"bold"} fontSize={"lg"}>
        Summarize App
      </Text>

      <FormControl>
        <FormLabel fontSize={"sm"}>Input Large Text:</FormLabel>
        <Textarea value={text} onChange={handleTextChange} />
      </FormControl>
      <Button color={"blue"} mt={4} onClick={handleSubmit}>
        Summarize
      </Button>

      <Button
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={logout}
      >
        Log Out
      </Button>

      <Text mt={4} mb={4} fontWeight={"bold"} fontSize={"lg"}>
        Result:
      </Text>
      {summary && <Text mb={4}>{summary}</Text>}
    </Container>
  );
}
