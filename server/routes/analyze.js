const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL
});

router.post("/", upload.single("resume"), async (req, res) => {
        console.log("File received:", req.file);

  try {
    let resumeText = "";

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 📄 Read PDF
    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(file.buffer);
      resumeText = data.text;
    }

    // 📄 Read DOCX
    else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer
      });

      resumeText = result.value;
    }

    else {
      return res.status(400).json({
        message: "Unsupported file type"
      });
    }

    // 🤖 Send to Gemini
    const prompt = `
You are an AI resume analyzer.

Analyze the resume and return STRICT JSON like this:

{
 "score": number,
 "strengths": [],
 "weaknesses": [],
 "suggestions": []
}

Resume:
${resumeText}
`;

    const result = await model.generateContent(prompt);
let response = result.response.text();

response = response.replace(/```json|```/g, "").trim();

const parsed = JSON.parse(response);

res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI analysis failed"
    });
  }
});

module.exports = router;