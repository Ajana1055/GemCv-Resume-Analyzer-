function Navbar({ setOpen }) {
  return (
    <button
      onClick={() => setOpen(true)}
      className="text-3xl text-gray-800"
    >
      ☰
    </button>
  );
}

export default Navbar;