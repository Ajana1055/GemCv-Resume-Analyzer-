import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");

        Swal.fire("Logged Out!", "", "success");
        navigate("/");
        window.location.reload();
      }
    });
  };


  //----------------------upolad functions----------------
  const [file, setFile] = useState(null);
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const handleUpload = () => {
  if (!file) {
    Swal.fire({
            icon: "warning",
            title: "upload a file",
            text: "Please upload a file",
            confirmButtonColor: "#2563EB",
          });
    return;
  }

  navigate("/analyze", { state: { file } });
};

//-------------------------main html body--------------------


  return (
    
    // <div className="min-h-screen bg-[#F9FAFB]">

<div
  className="min-h-screen bg-cover bg-center"
  // style={{
  //   backgroundImage: "url('/bg2.jpg')" //-----------------
  // }}
>

   
  


<style>{`
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow::before {
  content: '';
  position: absolute;
  z-index: -2 ;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-position: 100% 50%;
  background-repeat: no-repeat;
  background-size: 50% 30%;
  filter: blur(6px);
  background-image: linear-gradient(#2563EB,#7C3AED,#FF0A7F);
  animation: rotate 4s linear infinite;
}
`}</style>

      


      {/* 🔹 HERO SECTION */}
      <section className="text-center px-6 py-20">
        <h2 className="text-5xl font-bold text-gray-800 leading-tight">
          Build Your <span className="text-[#7C3AED]">Perfect Resume</span>
        </h2>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Upload your CV and get AI-powered feedback instantly.
          Improve faster. Grow smarter.
        </p>

        {!token && (
          <div className="mt-10">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-[#2563EB] text-white rounded-xl text-lg hover:bg-[#7C3AED] transition shadow-md"
            >
              Get Started
            </button>
          </div>
        )}
      </section>

      {/* 🔹 BIG UPLOAD SECTION */}
      <section className="px-6 pb-20"  >
  <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-lg border border-gray-200 text-center"  style={{
    backgroundImage: "url('/bg.jpg')"
  }}>

    <h3 className="text-3xl font-semibold text-gray-800 mb-6">
      Upload Your Resume
    </h3>

    <label className="border-2 border-dashed border-[#2563EB] rounded-xl p-16 hover:border-[#7C3AED] transition cursor-pointer block">

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-gray-500 text-lg">
        Drag & Drop your resume here
      </p>

      <p className="text-gray-400 mt-2">
        or click to browse
      </p>

      {file && (
        <p className="mt-4 text-green-600 font-medium">
          {file.name}
        </p>
      )}
    </label>

    { (

      
      <div className="mt-8 flex justify-center">
  <div className="rainbow relative z-0 overflow-hidden p-[4px] rounded-full hover:scale-105 transition duration-300">

    <button
      onClick={handleUpload}
      className="px-10 py-3 text-white rounded-full font-semibold bg-gray-900"
    >
      Analyze Resume
    </button>

  </div>
</div>
    )}

  </div>
</section>

    </div>
  );
}

export default Home;