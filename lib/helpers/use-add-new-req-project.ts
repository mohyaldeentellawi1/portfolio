"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { addProjectRequestAction } from "../actions/projects/action";

export interface ReqProjectFormData {
  projectType: string;
  vision: string;
  isMvp: boolean;
  budget: string;
  timeLine: string;
  name: string;
  email: string;
  note: string;
}

const INITIAL: ReqProjectFormData = {
  projectType: "",
  vision: "",
  isMvp: true,
  budget: "",
  timeLine: "",
  name: "",
  email: "",
  note: "",
};

export const useAddNewReqProject = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReqProjectFormData>(INITIAL);

  const setField = useCallback(
    <K extends keyof ReqProjectFormData>(key: K, value: ReqProjectFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const addNewReqProject = useCallback(async () => {
    setIsAdding(true);
    try {
      const { success, message } = await addProjectRequestAction({
        ...formData,
        note: formData.note.trim() || null,
      });
      if (success) {
        toast.success(message);
        setIsSubmitted(true);
        setFormData(INITIAL);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error submitting project request:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  }, [formData]);

  return {
    isAdding,
    isSubmitted,
    formData,
    setField,
    handleInputChange,
    addNewReqProject,
  };
};
