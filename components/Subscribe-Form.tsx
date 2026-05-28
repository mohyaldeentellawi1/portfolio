"use client";

import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { useAddNewSubscription } from "@/lib/helpers/use-add-new-subscription";

export default function SubscribeForm() {
  const t = useTranslations("Home");

  const { email, handleEmailChange, isAdding, addNewSubscription } =
    useAddNewSubscription();
  return (
    <form
      onSubmit={addNewSubscription}
      className="w-full lg:w-auto lg:min-w-100"
    >
      {/* Outer wrapper acts as the visual input container */}
      <div
        className="flex h-13 w-full items-center rounded border border-input
                         bg-background pr-1.5 transition-colors duration-200
                         focus-within:ring-2 focus-within:ring-ring"
      >
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={t("YourEmailAddress")}
          className="h-full flex-1 bg-transparent px-4 text-sm text-foreground
                           placeholder:text-muted-foreground outline-none"
        />
        <Button
          type="submit"
          className="shrink-0 h-9 mx-1.5"
          disabled={isAdding}
        >
          {t("Subscribe")}
        </Button>
      </div>
    </form>
  );
}
