import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";




function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
        "https://gemcv-resume-analyzer-backend.onrender.com/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);

      await Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: res.data.message,
        confirmButtonColor: "#2563EB",
      });

      navigate(from, { replace: true });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#7C3AED",
      });
    }
};


     
//-----------------auth login --------------


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

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-[#2563EB] mb-8">
          Welcome Back
        </h2>

        <div className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#7C3AED] transition duration-300"
          >
            Login
          </button>

        </div>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#7C3AED] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>


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

export default Login;
