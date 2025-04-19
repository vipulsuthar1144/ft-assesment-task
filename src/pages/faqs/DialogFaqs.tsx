"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/store";
import { FaqsAPI } from "@store/thunk-services/faqs.thunk";
import { LoaderButton } from "@ui/LoaderButton";
import toastUtils from "@utils/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(1, "Quesion is required"),
  answer: z.string().min(1, "Answer is required"),
});

type FaqsFormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  defaultValues?: {
    question: string;
    answer: string;
    id?: string;
  };
};

export default function FaqsForm({
  open,
  onClose,
  mode,
  defaultValues,
}: Props) {
  const dispatch = useAppDispatch();
  const { isFaqsCRUDLoading } = useAppSelector(state => state.faqs);

  const form = useForm<FaqsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: defaultValues?.question || "",
      answer: defaultValues?.answer || "",
    },
  });

  useEffect(() => {
    if (defaultValues && mode === "edit") {
      form.reset({
        question: defaultValues.question || "",
        answer: defaultValues.answer || "",
      });
    }
  }, [defaultValues, mode, form]);

  const onSubmit = async (data: FaqsFormData) => {
    try {
      if (mode === "create") {
        await dispatch(FaqsAPI.create(data)).unwrap();
        toastUtils.success("Faqs created");
      } else {
        if (defaultValues?.id) {
          await dispatch(
            FaqsAPI.updateById({ data: data, id: defaultValues?.id })
          );
          toastUtils.success("Faqs updated");
        }
      }

      onDialogClose();
    } catch (err: any) {
      toastUtils.error(err?.message ?? "Something went wrong");
    }
  };

  const onDialogClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onDialogClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add" : "Edit"} FAQ's</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Question<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter question?"
                      disabled={isFaqsCRUDLoading}
                      className="text-xs bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    Answer<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter answer"
                      rows={4}
                      className="text-xs resize-none bg-gray-100"
                      disabled={isFaqsCRUDLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-center gap-2">
              <LoaderButton
                label="Save"
                type="submit"
                className="w-full max-w-xs"
                isLoading={isFaqsCRUDLoading}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
