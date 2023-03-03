import { useState } from "react";

import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, loading } = useSignup();

  const handleSignup = async (e) => {
    e.prevenDefault();

    // signup user
  };
  return (
    <form
      onSubmit={handleSignup}
      className="login-form flex flex-col gap-5 py-20 mx-auto max-w-sm"
    >
      <h2 className="text-4xl font-medium text-sky-400 mb-10"> Signup</h2>

      <div className="form-control flex flex-col gap-3 ">
        <label
          htmlFor="email"
          className="cursor-pointer hover:text-sky-400 duration-300 "
        >
          Email address
        </label>
        <input
          type="text"
          id="email"
          placeholder="enter your email"
          value={password}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-4 rounded-xl outline-none  focus:border-sky-500"
        />
        <label
          htmlFor="password"
          className="cursor-pointer hover:text-sky-400 duration-300 "
        >
          Your Password
        </label>
        <input
          type="text"
          id="password"
          placeholder="enter your password"
          value={email}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-4 rounded-xl outline-none  focus:border-sky-500"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-500 py-2 mt-3 rounded-xl hover:bg-sky-200 hover:text-black  duration-300"
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
