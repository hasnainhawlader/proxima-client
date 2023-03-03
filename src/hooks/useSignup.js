import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const { dispatch } = useAuthContext();
export const useSignup = () => {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = res.json();

    // res.ok == false

    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }

    // res.ok == true

    if (res.ok) {
      // update auth context
      dispatch({ type: "LOGIN", payload: json });

      // save user to local store

      localStorage.setItem("user", JSON.stringify(json));

      setLoading(false);
    }
  };
  return { signup, error, loading };
};
