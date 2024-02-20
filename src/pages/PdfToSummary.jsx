import React, { useState } from "react";
import styles from "./PdfToSummary.module.css";

function PdfToSummary() {
  const [pdfText, setPdfText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPdfText("");
    setSummary("");
  };

  const handleExtractText = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5001/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPdfText(data.text || "");
        } else {
          console.error("Failed to extract text from PDF");
        }
      } catch (error) {
        console.error("Error communicating with the server:", error);
      }
    } else {
      console.error("Please select a PDF file");
    }
  };

  const generateSummary = async () => {
    if (pdfText) {
      try {
        const generatedSummary = await fetchSummaryFromOpenAI(pdfText);
        setSummary(generatedSummary);
      } catch (error) {
        console.error("Error generating summary:", error.message);
      }
    } else {
      console.error("Please extract text from a PDF file first");
    }
  };

  const fetchSummaryFromOpenAI = async (text) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: ` Summarize the following:\n${text}` },
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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", // Replace with your OpenAI API key
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      } else {
        throw new Error(`OpenAI API Error: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <button onClick={handleExtractText} className={styles.button}>
        Extract Text
      </button>
      <button onClick={generateSummary} className={styles.button}>
        Generate Summary
      </button>
      {summary && <div className={styles.summary}>Summary: {summary}</div>}
    </div>
  );
}

export default PdfToSummary;