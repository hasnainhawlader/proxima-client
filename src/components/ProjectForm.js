import React, { useState } from "react";
import { toast } from "react-toastify";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectForm = ({ project, setIsModalOpen, setOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //data
    const projectObj = { title, tech, budget, duration, manager, dev };
    // if there is no project post request

    if (!project) {
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
        if (!res.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
        console.log(emptyFields);

        toast.error(`something went wrong`, {
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
        setManager("");
        setDev("");
        setError("");
        setEmptyFields([]);

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
      return;
    }
    // if there is a project
    if (project) {
      // send patch

      const res = await fetch(
        `http://localhost:4000/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();
      // !res.ok
      if (!res.od) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      // res ok
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        // dispatch

        dispatch({ type: "UPDATE_PROJECT", payload: json });

        // close overlay and modals

        setIsModalOpen(false);
        setOverlayOpen(false);
      }
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="projectForm flex flex-col gap-5">
      <h2
        className={`text-3xl font-medium text-sky-400 mb-10 ${
          project ? "hidden" : ""
        }`}
      >
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
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="text"
          placeholder="e.g. Hasnain"
          id="manager"
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 
          ${
            emptyFields.includes("dev") ? "border-rose-500" : "border-slate-500"
          }`}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-50"
      >
        {project ? "Confirm update" : "Add project"}
      </button>
    </form>
  );
};

export default ProjectForm;
