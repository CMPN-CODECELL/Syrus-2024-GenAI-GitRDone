import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDu5m5zm0dG0x62imyoytotf8j5hfVIHxw"; // Replace with your API key
const genAI = new GoogleGenerativeAI(API_KEY);

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

function GeminiProVision() {
  const fileInputRef = useRef();
  const [info, setInfo] = useState("");
  const run = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    // const prompt = `Based on the data given in  the file and gemini ai's self inteligence over the topic generate parent children relations between the topics.The format must be similar as below relation
    // Generate a structured relation that can be easily put on following type of mind map Dont put \n's in your answer as it may disrupt the flow The heirarchy must resemble to following structure:
    // [{
    //   "parent": "Blockchain",
    //   "children": ["Decentralization", "Transparency", "Direct Transactions"],
    // },
    // {
    //   "parent": "Decentralization",
    //   "children": ["Trust in Banks", "Failure of Banks"],
    // },
    // { "parent": "Transparency", "children": ["Visibility", "Public Ledger"] },......] Give the complete object`;
    const prompt = `Based on the given image file generate a description`;
    const imageParts = await Promise.all(
      [...fileInputRef.current.files].map(fileToGenerativePart)
    );
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    setInfo(text);
  };

  return (
    <div>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={run}>Generate Content</button>
      <>{info}</>
    </div>
  );
}

export default GeminiProVision;
