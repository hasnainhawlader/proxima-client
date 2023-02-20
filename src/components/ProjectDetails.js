import React from "react";
import { currencyFormator } from "../utils/currencyFormator";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectsContext();
  const handledelete = async () => {
    const res = await fetch(
      `http://localhost:4000/api/projects/${project._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };
  return (
    <div className="project bg-slate-800 p-5 rounded-xl shadow-xl border-slate-600 flex flex-col gap-5 w-[24rem]">
      <div className="top">
        <span className="text-sky-400">ID : {project._id}</span>
        <h3 className="text-3xl font-medium truncate">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
          {project.tech}
        </span>
      </div>
      <div className="mid flex gap-10 text-stone-300">
        <div className="left flex flex-col">
          <span>Budget : {currencyFormator(project.budget)}</span>
          <span>
            Adden on : {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>Update on : {new Date(project.updatedAt).toDateString()}</span>
        </div>
        <div className="right flex flex-col">
          <span> Manager : {project.menager}</span>
          <span>
            {" "}
            Duration :{" "}
            {`${project.duration} week${project.duration == 1 ? "" : "s"}`}
          </span>
          <span> Developer : {project.dev}</span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300">
          Update
        </button>
        <button
          onClick={handledelete}
          className="text-rose-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
