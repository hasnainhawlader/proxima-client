import React, { useState } from "react";
import { toast } from "react-toastify";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [menager, setMenager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //data
    const projectObj = { title, tech, budget, duration, menager, dev };
    const res = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj),
    });
    const json = await res.json();

    // !res.ok set error
    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.error);

      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "red",
      });
    }

    // req.ok reset

    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setDuration("");
      setMenager("");
      setDev("");
      setError("");

      // real time update

      dispatch({ type: "CREATE_PROJECT", payload: json });

      toast.success("well done", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="projectForm flex flex-col gap-5">
      <h2 className="text-3xl font-medium text-sky-400 mb-10">
        Add a New Project
      </h2>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g. e-commerce website"
          id="title"
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400  `}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g. AI Redux"
          id="tech"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Budget(USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g. 500"
          id="budget"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 "
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Total duration
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g. 5"
          id="duration"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 "
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Manager name
        </label>
        <input
          value={menager}
          onChange={(e) => setMenager(e.target.value)}
          type="text"
          placeholder="e.g. Hasnain"
          id="manager"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 "
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="developer"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Total developer
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g. 5"
          id="developer"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 "
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-50"
      >
        Add project
      </button>
    </form>
  );
};

export default ProjectForm;
