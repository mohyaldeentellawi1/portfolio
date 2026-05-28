"use client";

import { useAddNewReview } from "@/lib/helpers/use-add-new-review";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";

const inputCls =
  "w-full rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function AddNewReviewDialog() {
  const t = useTranslations("Home");
  const {
    name,
    handleNameChange,
    content,
    handleContentChange,
    isAdding,
    isOpen,
    setIsOpen,
    addNewReview,
  } = useAddNewReview();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button>
            <PenLine />
            {t("AddReview")}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("AddReview")}</DialogTitle>
          <DialogDescription>
            {t("ShareyourexperienceworkingwithmeYourfeedbackmeansalot")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => addNewReview({ e })}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder={t("name")}
              required
              className={`${inputCls} h-9`}
            />
          </div>

          {/* Review content */}
          <div className="flex flex-col gap-1.5">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder={t("Tellmeaboutyourexperience")}
              required
              rows={4}
              className={`${inputCls} py-2.5 resize-none`}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? <Loader2 className="animate-spin" /> : <PenLine />}
              {t("AddReview")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
