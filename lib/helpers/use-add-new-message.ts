"use client";

import { useState } from "react";
import { sendMessageAction } from "../actions/messages/action";
import { toast } from "sonner";

export const useAddNewMessage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubject(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const addNewMessage = async ({
    e,
  }: {
    e: { preventDefault: () => void };
  }) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const { success, message } = await sendMessageAction({
        name,
        email,
        subject,
        content,
      });
      if (success) {
        toast.success(message);
        setName("");
        setEmail("");
        setSubject("");
        setContent("");
      } else {
        toast.error(message);
        setName("");
        setEmail("");
        setSubject("");
        setContent("");
      }
      return { success, message };
    } catch (error) {
      console.error("Error adding subscription:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    name,
    handleNameChange,
    email,
    handleEmailChange,
    subject,
    handleSubjectChange,
    content,
    handleContentChange,
    isAdding,
    addNewMessage,
  };
};
