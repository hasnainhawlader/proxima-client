import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-sky-900">
      <div>
        <Link to="/" className="logo text-2xl font-medium text-sky-400">
          Proxima
        </Link>
      </div>
      <div className="flex gap-5">
        <Link
          to="/login"
          className="logo text-2xl font-medium hover:text-sky-400"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="logo text-2xl font-medium hover:text-sky-400"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
