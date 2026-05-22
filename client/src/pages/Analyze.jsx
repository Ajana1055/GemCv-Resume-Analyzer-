import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ResumeAnalysis() {

  const location = useLocation();
  const navigate = useNavigate();

  const file = location.state?.file;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {

    const analyzeResume = async () => {

      const formData = new FormData();
      formData.append("resume", file);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/analyze",
          formData
        );

        setResult(res.data);
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    };

    analyzeResume();

  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center p-6">

      {loading ? (

        <div className="text-center">

          {/* Modern Loader */}
          <div className="w-16 h-16 border-4 border-[#2563EB] border-dashed rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-xl font-semibold text-gray-700">
            Analyzing your resume with AI...
          </h2>

          <p className="text-gray-500 mt-2">
            This may take a few seconds
          </p>

        </div>

      ) : (

        <div className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg">

          <h1 className="text-3xl font-bold text-[#2563EB] mb-6">
            Resume Analysis Result
          </h1>

          <h2 className="text-xl font-semibold mb-4">
            Score: {result.score}/100
          </h2>

          <div className="space-y-3">

            <h3 className="text-lg font-semibold mt-6">
              Suggestions
            </h3>

            <ul className="list-disc list-inside mt-3 space-y-2">
              {result.suggestions.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>

          </div>

          {/* GENERATE NEW RESUME BUTTON */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/generate-resume")}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Generate New Resume
            </button>
          </div>

        </div>

      )}

    </div>
  );
}

export default ResumeAnalysis;