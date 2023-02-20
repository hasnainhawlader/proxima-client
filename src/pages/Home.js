import React, { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/projects");
        if (!res.ok) throw new Error("something went wrong");
        const data = await res.json();
        setProjects(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProjects();
  }, []);
  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-5">
      <div className="left col-span-2 ">
        <h2 className="text-3xl  font-medium text-sky-400 mb-10">
          All projects
        </h2>
        <div className="project-wrapper flex  gap-5 flex-wrap">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>

      <ProjectForm />
    </div>
  );
};

export default Home;
