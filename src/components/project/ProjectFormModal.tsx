/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import type { Project } from "@/types/types";
import { createProject, updateProject } from "@/service/projectApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  project?: Project; // if undefined → Add mode, otherwise Edit
}

const ProjectFormModal: React.FC<Props> = ({ open, onClose, onRefresh, project }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Project>();
const handleClose = () => {
    reset();       // clear the form
    onClose();     // trigger parent close
  };
  useEffect(() => {
    if (project) reset(project); // pre-fill form in edit mode
    else reset(); // clear form in add mode
  }, [project, reset]);

  const onSubmit = async (data: Project) => {
    try {
      if (project?._id) {
        await updateProject(project._id, data);
        toast.success("Project updated!");
      } else {
        await createProject(data);
        toast.success("Project added!");
      }
      onClose();
      onRefresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register("title", { required: true })} />
          </div>
          <div>
            <Label>Description</Label>
            <Input {...register("description", { required: true })} />
          </div>
          <div>
            <Label>Project URL</Label>
            <Input {...register("project", { required: true })} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input {...register("imgURL", { required: true })} />
          </div>
          <div>
            <Label>Status</Label>
            <select {...register("status", { required: true })} className="w-full p-2 border rounded">
              <option value="active">draft</option>
              <option value="inactive">published</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {project ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormModal;
