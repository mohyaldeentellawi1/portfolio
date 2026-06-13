"use client";

import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { useAddNewMessage } from "@/lib/helpers/use-add-new-message";

const input =
  "w-full h-10 rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function SendMessageForm() {
  const t = useTranslations("Home");

  const {
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
  } = useAddNewMessage();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        addNewMessage({ e });
      }}
    >
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          className={input}
          type="text"
          placeholder={t("name")}
          value={name}
          onChange={handleNameChange}
        />
        <input
          required
          className={input}
          type="email"
          placeholder={t("Email")}
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      {/* Row 2: Subject */}
      <input
        required
        className={input}
        type="text"
        placeholder={t("Subject")}
        value={subject}
        onChange={handleSubjectChange}
      />

      {/* Row 3: Message */}
      <textarea
        required
        placeholder={t("Message")}
        rows={6}
        value={content}
        onChange={handleContentChange}
        className={
          "w-full resize-none rounded border border-input bg-background px-3 py-2.5 " +
          "text-sm text-foreground placeholder:text-muted-foreground " +
          "transition-colors duration-200 focus-visible:outline-none " +
          "focus-visible:ring-2 focus-visible:ring-ring"
        }
      />

      {/* Submit */}
      <Button
        style={{
          borderRadius: "4px",
        }}
        type="submit"
        className="w-full"
        disabled={isAdding}
      >
        {t("SendMessage")}
      </Button>
    </form>
  );
}
