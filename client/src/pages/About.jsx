import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {

  const navigate = useNavigate();

  const tokenCheck = async () => {
    try {
      await axios.get("https://gemcv-resume-analyzer-backend.onrender.com/api/about", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
    } catch (err) {
      alert("Session expired. Please login again");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* 🔹 Title */}
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-[#2563EB] to-[#7C3AED] text-transparent bg-clip-text text-center mb-10">
          About GemCV
        </h1>

        {/* 🔹 Main Card */}
        <div className="bg-white shadow-lg rounded-2xl p-10 border border-gray-200">

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            AI-Powered Resume Analysis Platform
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            GemCV is a modern AI-based Resume Analysis web application built using 
            the MERN stack (MongoDB, Express.js, React.js, Node.js). 
            The platform leverages the Google Gemini AI API to analyze resumes, 
            generate professional feedback, assign performance scores, and provide 
            actionable suggestions for improvement.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Our mission is to help job seekers enhance their resumes 
            using intelligent AI insights. The system evaluates structure, 
            keywords, formatting, clarity, and relevance — helping users 
            optimize their CVs for better job opportunities.
          </p>

          {/* 🔹 Tech Stack Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div className="bg-[#F3F4F6] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#2563EB] mb-3">
                🚀 Tech Stack
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• MongoDB</li>
                <li>• Express.js</li>
                <li>• React.js</li>
                <li>• Node.js</li>
                <li>• Google Gemini AI API</li>
                <li>• JWT Authentication</li>
              </ul>
            </div>

            <div className="bg-[#F3F4F6] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#7C3AED] mb-3">
                ✨ Key Features
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Resume Upload & Analysis</li>
                <li>• AI-Based Scoring System</li>
                <li>• Improvement Suggestions</li>
                <li>• Secure Login & Signup</li>
                <li>• JWT Protected Routes</li>
              </ul>
            </div>

          </div>

        </div>

        {/* 🔹 Developer Section */}
        <div className="mt-12 bg-white shadow-md rounded-2xl p-8 border border-gray-200">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            👨‍💻 Developer Information
          </h2>

          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> Anirban Jana
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> 8649817523
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> janaanirban292@gmail.com
          </p>

          <p className="text-gray-700 mb-2">
            <strong>GitHub:</strong>{" "}
            <a 
              href="https://github.com/Ajana1055" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              github.com/Ajana1055
            </a>
          </p>

          <p className="text-gray-700">
            <strong>LinkedIn:</strong>{" "}
            <a 
              href="https://www.linkedin.com/in/ajana1055" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7C3AED] hover:underline"
            >
              linkedin.com/in/ajana1055
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;
