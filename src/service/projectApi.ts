import type { Project } from "@/types/types";


const BASE_URL = 'https://crud-application-server-zeta.vercel.app/api/project';

export const getProjects = async (): Promise<{ data: Project[] }> => {
  const res = await fetch('https://crud-application-server-zeta.vercel.app/api/project');
  return res.json(); // returns: { data: Project[] }
};
export const createProject = async (data: Project): Promise<Project> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProject = async (id: string, data: Project): Promise<Project> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const deleteProject = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
