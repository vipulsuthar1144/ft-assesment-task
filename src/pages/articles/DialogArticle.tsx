"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
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
import { ArticleAPI } from "@store/thunk-services/article.thunk";
import Image from "@ui/Image";
import { LoaderButton } from "@ui/LoaderButton";
import toastUtils from "@utils/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required").optional()
    ,
});

type ArticleFormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  defaultValues?: {
    title: string;
    description: string;
    imageUrl?: string;
    id?: string;
  };
};

export default function ArticleForm({
  open,
  onClose,
  mode,
  defaultValues,
}: Props) {


  const dispatch = useAppDispatch();
  const {isArticleCRUDLoading} = useAppSelector(state=>state.article)

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      image: undefined,
    },
  });

  useEffect(() => {
  if (defaultValues && mode === "edit") {
    form.reset({
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      image: undefined, // File input can't be pre-filled — leave as undefined
    });
  }
}, [defaultValues, mode, form]);

  const image = form.watch("image");

  const onSubmit = async (data: ArticleFormData) => {
    try {

    
      
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

    
      
      if (mode === "create") {
        await dispatch(ArticleAPI.create(formData)).unwrap();
        toastUtils.success("Article created");
      } else {
       if(defaultValues?.id){
 await dispatch(ArticleAPI.updateById({data:{title: data.title,description:data.description},id:defaultValues?.id}));
        toastUtils.success("Article updated");
       }
      }

     onDialogClose()
    } catch (err: any) {
      toastUtils.error(err?.message ?? "Something went wrong");
    }
  };

  const onDialogClose = ()=>{
     form.reset();
      onClose();
  }

 

  return (
    <Dialog open={open} onOpenChange={onDialogClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add" : "Edit"} Article</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Image Upload */}
            <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem className="flex flex-col items-center gap-2">
      <FormLabel htmlFor="image-upload" className="cursor-pointer">
        {image?.[0] ? (
          <img
            src={URL.createObjectURL(image[0])}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : defaultValues?.imageUrl ? (
          <Image
            highResSrc={defaultValues.imageUrl}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 grid place-content-center bg-gray-200 p-2 rounded-full">

            <Image
              highResSrc={"https://static.thenounproject.com/png/2635330-200.png"}
              alt="Preview"
              className="w-10 h-10 object-contain"
            />
          </div>
        )}
      </FormLabel>
      <FormControl>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          disabled= {mode == "edit"}
          onChange={(e) => {
            field.onChange(e.target.files);
          }}
        />
      </FormControl>
      <span className="text-sm text-blue-600">Upload Image</span>
      <FormMessage />
    </FormItem>
  )}
/>


            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Title<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Article title"
                      disabled={isArticleCRUDLoading}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Description<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter article description"
                      rows={4}
                     
                      className="text-xs resize-none bg-gray-100"
                      disabled={isArticleCRUDLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-center gap-2">
            
              <LoaderButton label="Save" type="submit" className="w-full max-w-xs" isLoading={isArticleCRUDLoading}/>
          
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
