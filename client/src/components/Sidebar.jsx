import { Link } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform 
      ${open ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 z-50`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setOpen(false)}
          className="text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col space-y-6 px-6 text-lg font-medium">

        <Link
          to="/"
          className="hover:text-[#7C3AED]"
          onClick={() => setOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/about"
          className="hover:text-[#7C3AED]"
          onClick={() => setOpen(false)}
        >
          About
        </Link>

        <Link
          to="/contact"
          className="hover:text-[#7C3AED]"
          onClick={() => setOpen(false)}
        >
          Contact
        </Link>

        <Link
          to="/generate-resume"
          className="hover:text-[#7C3AED]"
          onClick={() => setOpen(false)}
        >
          generate-resume
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;