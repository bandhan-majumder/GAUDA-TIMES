"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { useEffect } from "react";

// Form validation schema - dynamically created based on mode
const createFormSchema = (isEditing: boolean) => {
  return z.object({
    title: z.string().min(8, {
      message: "Title must be at least 8 characters long.",
    }),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    notionDocId: z.string().min(1, { 
      message: "Notion Doc ID is required." 
    }),
    imageUrl: z.string().optional(),
  });
};

export interface PageFormData {
  title: string;
  description: string;
  notionDocId: string;
  imageUrl?: string;
}

interface PageFormProps {
  mode: "add" | "edit";
  onSubmit: (values: PageFormData) => void;
  initialData?: PageFormData;
  className?: string;
}

export function PageForm({ 
  mode = "add", 
  onSubmit, 
  initialData, 
  className = "text-white max-w-[30vw] p-10 rounded-3xl"
}: PageFormProps) {
  const isEditing = mode === "edit";
  const formSchema = createFormSchema(isEditing);
  
  // Initialize form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      notionDocId: "",
      imageUrl: "",
    },
  });

  // Update form values when in edit mode and initialData is provided
  useEffect(() => {
    if (isEditing && initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        notionDocId: initialData.notionDocId,
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [form, isEditing, initialData]);

  // Handle form submission
  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onSubmit(values);
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} className="text-gray-600"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} className="text-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notionDocId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notion Doc ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Notion Doc ID" {...field} className="text-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL (optional)" {...field} className="text-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-white text-black" >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}