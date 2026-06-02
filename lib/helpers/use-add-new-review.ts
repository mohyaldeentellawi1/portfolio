"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addNewReviewAction } from "../actions/reviews/action";

export const useAddNewReview = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const addNewReview = async ({ e }: { e: { preventDefault: () => void } }) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const { success, message } = await addNewReviewAction({
        name,
        content,
      });
      if (success) {
        toast.success(message);
        setName("");
        setContent("");
        setIsOpen(false);
        onSuccess?.();
      } else {
        toast.error(message);
        setName("");
        setContent("");
      }
      return { success, message };
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    name,
    handleNameChange,
    content,
    handleContentChange,
    isAdding,
    isOpen,
    setIsOpen,
    addNewReview,
  };
};
