import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import emailjs from "emailjs-com";

emailjs.init("O1Y15Ceve6FjPp07J");
const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
  name: name,
  message: message,
  time: new Date().toLocaleString()
};

    emailjs
      .send(
        "service_qbt7102",
        "template_hncnsk9",
        templateParams,
        "O1Y15Ceve6FjPp07J"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setMessage("");
          setName("");
        },
        (error) => {
             console.log(error);
          setStatus("❌ Failed to send message");
        }
      );
  };

  //token check
  const tokenCheck = async () => {
    try {
      await axios.get("http://localhost:5000/api/contact", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
    } catch (err) {
      alert("Session expired. Please login again");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("photo");
      navigate("/login");
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      
      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-8 w-full max-w-5xl grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Let’s Connect 🚀
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question, idea, or collaboration? Reach out anytime.
          </p>

          <div className="space-y-4">

            <a href="mailto:janaanirban292@gmail.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition shadow-sm">
              <Mail className="text-blue-500" />
              <span>Email</span>
            </a>

            <a href="tel:8649817523" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition shadow-sm">
              <Phone className="text-green-500" />
              <span>Phone</span>
            </a>

            <a href="https://www.linkedin.com/in/ajana1055" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition shadow-sm">
              <Linkedin className="text-blue-700" />
              <span>LinkedIn</span>
            </a>

            <a href="https://github.com/Ajana1055" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition shadow-sm">
              <Github />
              <span>GitHub</span>
            </a>

            <a href="https://www.instagram.com/anirbanjana123" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition shadow-sm">
              <Instagram className="text-pink-500" />
              <span>Instagram</span>
            </a>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Send Message 💬
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Write your message..."
              className="w-full h-40 p-4 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {status}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;