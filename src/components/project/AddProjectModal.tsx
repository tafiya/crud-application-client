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
import { createProject } from "@/service/projectApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const AddProjectModal: React.FC<Props> = ({ open, onClose, onRefresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Project>();

  useEffect(() => {
    if (open) reset(); // Clear form on open
  }, [open, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: Project) => {
    try {
      await createProject(data);
      toast.success("Project added!");
      handleClose();
      onRefresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
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
              Add Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
