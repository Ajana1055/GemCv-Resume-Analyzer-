import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experienceLevel: "Fresher",
    tone: "Professional",

    school: "",
    schoolScore: "",

    college: "",
    collegeScore: "",

    experience: "No",
    experienceDescription: "",

    skills: "",

    projectName: "",
    projectDescription: "",

    hobbies: "",

    inputData: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const resumeRef = useRef();

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // GENERATE RESUME

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "https://gemcv-resume-analyzer-backend.onrender.com/api/generate-resume",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      setResult(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // DOWNLOAD PDF

  const downloadPDF = async () => {

    const element = resumeRef.current;

    const clonedElement = element.cloneNode(true);

    const wrapper = document.createElement("div");

    wrapper.style.position = "fixed";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.width = "210mm";
    wrapper.style.background = "#ffffff";
    wrapper.style.zIndex = "-9999";
    wrapper.style.padding = "0";

    clonedElement.style.width = "190mm";
    clonedElement.style.minHeight = "270mm";
    clonedElement.style.padding = "15mm";
    clonedElement.style.background = "#ffffff";
    clonedElement.style.color = "#000000";
    clonedElement.style.fontFamily = "Arial, sans-serif";
    clonedElement.style.lineHeight = "1.6";
    clonedElement.style.boxSizing = "border-box";
    clonedElement.style.boxShadow = "none";
    clonedElement.style.borderRadius = "0";

    wrapper.appendChild(clonedElement);

    document.body.appendChild(wrapper);

    const options = {

      margin: [5, 5, 5, 5],

      filename: "resume.pdf",

      image: {
        type: "jpeg",
        quality: 1
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        backgroundColor: "#ffffff"
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },

      pagebreak: {
        mode: ["avoid-all", "css", "legacy"]
      }
    };

    try {

      await html2pdf()
        .set(options)
        .from(clonedElement)
        .save();

    } catch (err) {

      console.log(err);

    }

    document.body.removeChild(wrapper);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">

        {/* FORM SECTION */}

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h1 className="text-3xl font-bold mb-6">
            AI Resume Builder
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="role"
              placeholder="Target Role"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="school"
              placeholder="School Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="schoolScore"
              placeholder="School Score (%)"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="college"
              placeholder="College Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="collegeScore"
              placeholder="College CGPA"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* EXPERIENCE */}

            <select
              name="experience"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="No">
                No Experience
              </option>

              <option value="Yes">
                Have Experience
              </option>
            </select>

            {formData.experience === "Yes" && (

              <textarea
                name="experienceDescription"
                placeholder="Describe your experience"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg h-28"
              />

            )}

            {/* SKILLS */}

            <input
              name="skills"
              placeholder="Skills (React, Node, MongoDB...)"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* PROJECT */}

            <input
              name="projectName"
              placeholder="Project Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="projectDescription"
              placeholder="Project Description"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-28"
            />

            {/* HOBBIES */}

            <input
              name="hobbies"
              placeholder="Hobbies"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* EXTRA */}

            <textarea
              name="inputData"
              placeholder="Additional Information"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-28"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </button>

          </form>
        </div>

        {/* OUTPUT SECTION */}

        <div className="bg-gray-200 p-4 rounded-2xl overflow-auto">

          {!result && (

            <p className="text-center text-gray-500 mt-10">
              Resume Preview
            </p>

          )}

          {result && (

            <>

              {/* DOWNLOAD BUTTON */}

              <button
                onClick={downloadPDF}
                className="mb-4 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
              >
                Download PDF
              </button>

              {/* RESUME */}

              <div
                ref={resumeRef}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  width: "190mm",
                  minHeight: "270mm",
                  padding: "15mm",
                  margin: "0 auto",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.6",
                  boxSizing: "border-box",
                  wordBreak: "break-word"
                }}
                className="rounded-lg"
              >

                {/* HEADER */}

                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    marginBottom: "8px",
                    wordBreak: "break-word"
                  }}
                >
                  {result.name}
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                    color: "#555",
                    marginBottom: "20px"
                  }}
                >
                  {result.role}
                </p>

                {/* SUMMARY */}

                <div className="mt-6">

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      borderBottom: "2px solid #999",
                      paddingBottom: "6px",
                      marginBottom: "12px"
                    }}
                  >
                    SUMMARY
                  </h2>

                  <p style={{ lineHeight: "28px" }}>
                    {result.summary}
                  </p>

                </div>

                {/* EXPERIENCE */}

                {result.experience?.length > 0 && (

                  <div className="mt-6">

                    <h2
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        borderBottom: "2px solid #999",
                        paddingBottom: "6px",
                        marginBottom: "12px"
                      }}
                    >
                      EXPERIENCE
                    </h2>

                    {result.experience.map((e, i) => (

                      <div
                        key={i}
                        style={{
                          marginTop: "16px",
                          pageBreakInside: "avoid"
                        }}
                      >

                        <h3
                          style={{
                            fontWeight: "600",
                            fontSize: "18px"
                          }}
                        >
                          {e.title}
                        </h3>

                        <p
                          style={{
                            color: "#666",
                            marginBottom: "8px"
                          }}
                        >
                          {e.company}
                        </p>

                        <p style={{ lineHeight: "28px" }}>
                          {e.description}
                        </p>

                      </div>

                    ))}

                  </div>

                )}

                {/* SKILLS */}

                <div className="mt-6">

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      borderBottom: "2px solid #999",
                      paddingBottom: "6px",
                      marginBottom: "12px"
                    }}
                  >
                    SKILLS
                  </h2>

                  <p style={{ lineHeight: "28px" }}>

                    {result.skills?.programming?.join(", ") || ""}

                    {result.skills?.frontend?.length > 0 &&
                      `, ${result.skills.frontend.join(", ")}`}

                    {result.skills?.backend?.length > 0 &&
                      `, ${result.skills.backend.join(", ")}`}

                    {result.skills?.tools?.length > 0 &&
                      `, ${result.skills.tools.join(", ")}`}

                  </p>

                </div>

                {/* PROJECTS */}

                <div className="mt-6">

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      borderBottom: "2px solid #999",
                      paddingBottom: "6px",
                      marginBottom: "12px"
                    }}
                  >
                    PROJECTS
                  </h2>

                  {result.projects?.map((p, i) => (

                    <div
                      key={i}
                      style={{
                        marginTop: "16px",
                        pageBreakInside: "avoid"
                      }}
                    >

                      <h3
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          marginBottom: "6px"
                        }}
                      >
                        {p.name}
                      </h3>

                      <p style={{ lineHeight: "28px" }}>
                        {p.description}
                      </p>

                    </div>

                  ))}

                </div>

                {/* EDUCATION */}

                <div className="mt-6">

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      borderBottom: "2px solid #999",
                      paddingBottom: "6px",
                      marginBottom: "12px"
                    }}
                  >
                    EDUCATION
                  </h2>

                  {result.education?.map((e, i) => (

                    <div
                      key={i}
                      style={{
                        marginTop: "16px",
                        pageBreakInside: "avoid"
                      }}
                    >

                      <h3
                        style={{
                          fontWeight: "600"
                        }}
                      >
                        {e.degree}
                      </h3>

                      <p>
                        {e.institution}
                      </p>

                      <p style={{ color: "#666" }}>
                        Score: {e.score}
                      </p>

                    </div>

                  ))}

                </div>

                {/* HOBBIES */}

                <div className="mt-6">

                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      borderBottom: "2px solid #999",
                      paddingBottom: "6px",
                      marginBottom: "12px"
                    }}
                  >
                    HOBBIES
                  </h2>

                  <p style={{ lineHeight: "28px" }}>
                    {result.hobbies?.join(", ")}
                  </p>

                </div>

              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
