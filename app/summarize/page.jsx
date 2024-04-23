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
  Spinner, Progress
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {CONFIG} from "@/app/config/config";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // Redirect if the token is not found

    if (!localStorage.getItem("token")) {
        router.push("/login");
    }


  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ content: text }).toString();

      const response = await fetch(`${CONFIG.API_ROOT}/summarize?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });



      const data = await response.json();
      if (!response.ok) {
        if(response.status === 401){
            setTimeout(() => {
                logout();
            }, 10000);
        }
        throw new Error(response.status === 401 ? 'Token has expired, you will be redirected to the login page in 10 secs' : data.detail);

      }
      const content = data.choices[0].message.content;
      setSummary(content);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: error.message,
        status: "error",
      });
    }
    finally{
      setLoading(false);
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
      <Button disabled={loading} color={"blue"} mt={4} onClick={handleSubmit}>
        {loading ? <Spinner size={'xs'} /> : "Summarize"}
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

      <Text mt={4} mb={4} fontWeight={"bold"} fontSize={"lg"}>
        Result:
      </Text>
      {loading ? <Progress size='xs' isIndeterminate /> : summary && <Text mb={4}>{summary}</Text> }

    </Container>
  );
}
