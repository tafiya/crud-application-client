/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import type { Project } from "@/types/types";
import { deleteProject, getProjects } from "@/service/projectApi";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.data);
  };

const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

//   const handleAdd = () => {
//     setSelectedProject(undefined);
//     setModalOpen(true);
//   };

    const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Project List</h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Project URL</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                <a href={project.project} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                  Visit
                </a>
              </TableCell>
              <TableCell>
                <img src={project.imgURL} className="h-12 w-12 object-cover rounded" />
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-white ${project.status === "published" ? "bg-green-600" : "bg-gray-500"}`}>
                  {project.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id!)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

        {/* Modals */}
      <AddProjectModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onRefresh={fetchProjects}
      />

      {selectedProject && (
        <EditProjectModal
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedProject(null);
          }}
          onRefresh={fetchProjects}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectTable;
