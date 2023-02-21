import React, { useState } from "react";
import { currencyFormator } from "../utils/currencyFormator";
import { useProjectsContext } from "../hooks/useProjectsContext";
import moment from "moment";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
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
  const handleUpdate = () => {
    setIsModalOpen(true);
    setOverlayOpen(true);
  };
  const handleOverlay = () => {
    setIsModalOpen(false);
    setOverlayOpen(false);
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
            Adden on : {moment(project.createdAt).format("DD MMM hh:mm A")}
          </span>
          <span>
            Update on : {moment(project.updatedAt).format("DD MMM hh:mm A")}
          </span>
        </div>
        <div className="right flex flex-col">
          <span> Manager : {project.manager}</span>
          <span>
            {" "}
            Duration :{" "}
            {`${project.duration} week${project.duration == 1 ? "" : "s"}`}
          </span>
          <span> Developer : {project.dev}</span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button
          onClick={handleUpdate}
          className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300"
        >
          Update
        </button>
        <button
          onClick={handledelete}
          className="text-rose-500 hover:underline"
        >
          Delete
        </button>
      </div>
      {/*overlay */}

      <div
        onClick={handleOverlay}
        className={`overlay fixed z-1 h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>
      {/*modal */}
      <div
        className={`update-modal overflow-y-auto w-[35rem]  h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded-md shadow-lg z-2 ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <h2 className="text-3xl font-medium text-sky-400 mb-10">
          Update project
        </h2>
        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setOverlayOpen={setOverlayOpen}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
