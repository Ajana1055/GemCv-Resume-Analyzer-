const express = require("express");
const router = express.Router();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const buildFullResumePrompt = ({
  name,
  role,
  experienceLevel,
  tone,
  includeMetrics,
  school,
  schoolScore,
  college,
  collegeScore,
  experience,
  experienceDescription,
  skills,
  projectName,
  projectDescription,
  hobbies,
  inputData
}) => {
  return `
You are a professional ATS resume generator.

IMPORTANT:
- Return ONLY valid JSON
- No markdown
- No comments
- Use proper formatting

Create a modern professional resume.

INPUT:

Name: ${name}
Role: ${role}
Experience Level: ${experienceLevel}
Tone: ${tone}

School: ${school}
School Score: ${schoolScore}

College: ${college}
College Score: ${collegeScore}

Has Experience: ${experience}

Experience Description:
${experienceDescription}

Skills:
${skills}

Project Name:
${projectName}

Project Description:
${projectDescription}

Hobbies:
${hobbies}

Additional Information:
${inputData}

RETURN FORMAT:

{
  "name": "",
  "role": "",
  "summary": "",
  "experience": [],
  "projects": [],
  "skills": {
    "programming": [],
    "frontend": [],
    "backend": [],
    "tools": []
  },
  "education": [],
  "hobbies": []
}
`;
};

router.post("/", async (req, res) => {
  try {

    const prompt = buildFullResumePrompt(req.body);

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const text = result.response.text();

    const parsed = JSON.parse(text);

    res.json(parsed);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

module.exports = router;