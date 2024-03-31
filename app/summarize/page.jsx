// pages/upload.js

"use client";

import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function SummarizePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    console.log("Changed");
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log("Submitted");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Select MP3 file:</FormLabel>
        <Input type="file" accept=".mp3" onChange={handleFileChange} />
      </FormControl>
      <Button onClick={handleSubmit}>Upload</Button>
    </div>
  );
}
