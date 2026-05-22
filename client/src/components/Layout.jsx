import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  const photo = localStorage.getItem("photo");

  // ✅ Logout
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
        localStorage.removeItem("photo");
        localStorage.removeItem("email");

        navigate("/");
        window.location.reload();
      }
    });
  };

  // ✅ Toggle profile dropdown
  const showprofile = () => {
    setShowProfile(!showProfile);
  };

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-container")) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white shadow-sm">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Navbar setOpen={setOpen} />

          <Link to="/">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-transparent bg-clip-text cursor-pointer hover:scale-105 transition duration-200">
              GemCV
            </h1>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">

          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-[#2563EB] font-medium hover:text-[#7C3AED]"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#7C3AED]"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              {/* PROFILE SECTION */}
              <div className="relative profile-container">

                {/* Profile Image / Initial */}
                <div onClick={showprofile} className="cursor-pointer">
                  {photo ? (
                    <img
                      src={photo}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#2563EB]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-lg">
                      {username ? username.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>

                {/* DROPDOWN */}
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl p-5 z-50">

                    <div className="flex flex-col items-center gap-3">

                      {/* ✅ ONLY show image if exists */}
                      {photo && (
                        <img
                          src={photo}
                          alt="profile"
                          className="w-12 h-12 rounded-full border-2 border-[#2563EB]"
                        />
                      )}

                      <h2 className="text-lg font-semibold text-gray-800">
                        {username}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {localStorage.getItem("email")}
                      </p>

                    </div>

                  </div>
                )}
              </div>

              {/* ✅ KEEP LOGOUT BUTTON IN NAVBAR */}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </nav>

      {/* CONTENT */}
      <div>{children}</div>

    </div>
  );
}

export default Layout;