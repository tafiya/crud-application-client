/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import type { Project } from "@/types/types";
import { updateProject } from "@/service/projectApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  project: Project;
}

const EditProjectModal: React.FC<Props> = ({ open, onClose, onRefresh, project }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Project>();

  useEffect(() => {
    if (open) reset(project);
  }, [open, project, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: Project) => {
    try {
      await updateProject(project._id!, data);
      toast.success("Project updated!");
      handleClose();
      onRefresh();
    } catch (error) {
      toast.error("Failed to update project!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
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
            <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              Update Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
