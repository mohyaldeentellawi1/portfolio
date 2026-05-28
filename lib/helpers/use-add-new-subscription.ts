"use client";
import { toast } from "sonner";
import { useState } from "react";
import { addSubscriptionAction } from "../actions/subscriptions/action";

export const useAddNewSubscription = () => {
  const [email, setEmail] = useState<string>("");

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const addNewSubscription = async () => {
    setIsAdding(true);
    try {
      const { success, message } = await addSubscriptionAction({ email });
      if (success) {
        toast.success(message);
        setEmail("");
      } else {
        toast.error(message);
        setEmail("");
      }
      return { success, message };
    } catch (error) {
      console.error("Error adding subscription:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return { email, handleEmailChange, isAdding, addNewSubscription };
};
