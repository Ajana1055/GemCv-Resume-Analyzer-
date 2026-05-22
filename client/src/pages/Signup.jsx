import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";


function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/"); // redirect to home
    }
  }, []);




  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://gemcv-resume-analyzer-backend.onrender.com/api/auth/signup",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
     localStorage.setItem("photo", res.data.user.photo);
      localStorage.setItem("email", res.data.user.email);


      Swal.fire({
        icon: "success",
        title: "Signup Successful 🎉",
        text: res.data.message,
        confirmButtonColor: "#2563EB"
      });

      navigate("/");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed ❌",
        text: err.response?.data?.message || "Signup failed",
        confirmButtonColor: "#7C3AED"
      });
    }
  };




  // continue with google

  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // send to backend
    const res = await axios.post(
      "https://gemcv-resume-analyzer-backend.onrender.com/api/auth/google",
      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.name);
     localStorage.setItem("photo", res.data.user.photo);
localStorage.setItem("email", res.data.user.email);

    navigate("/");
window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200">

        <h2 className="text-3xl font-bold text-center text-[#2563EB] mb-8">
          Create Account
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-[#7C3AED] transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </div>

        {/* Small Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Not interested?{" "}
          <button
            onClick={() => navigate(-1)}
            className="text-[#7C3AED] hover:underline"
          >
            Go Back
          </button>
        </div>



        <button
  onClick={handleGoogleLogin}
  className="w-full mt-4 py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
>
  Continue with Google
</button>

      </div>

    </div>
  );
}

export default Signup;
