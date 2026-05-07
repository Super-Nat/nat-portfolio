"use client";

import { updateContentAction } from "@/actions/contentAction";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useContent from "@/hooks/useContent";
import { AboutReq, aboutSchema } from "@/types/about";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

const AboutForm = () => {
  const { content, isLoading, updateContent, isPending } = useContent({
    key: "about",
    table: "about",
  });
  const form = useForm<AboutReq>({
    defaultValues: {
      name: "",
      bio: "",
      image_url: "",
      cv_url: "",
    },
    resolver: zodResolver(aboutSchema),
  });

  const onSubmit = (data: AboutReq) => {
    if (!content?.id) return;
    updateContentAction({ id: content.id, data, table: "about" });
  };

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldContent>
            <Input
              placeholder="John Doe"
              {...form.register("name")}
              aria-invalid={!!form.formState.errors.name?.message}
            />
            <FieldError
              errors={[{ message: form.formState.errors.name?.message }]}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <FieldContent>
            <Textarea
              placeholder="I am a software engineer"
              {...form.register("bio")}
              aria-invalid={!!form.formState.errors.bio?.message}
            />
            <FieldError
              errors={[{ message: form.formState.errors.bio?.message }]}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Image</FieldLabel>
          <FieldContent>
            <Dropzone
              onDrop={(acceptedFiles) => {
                form.setValue("image_url", acceptedFiles[0].name);
              }}
              accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
              maxSize={5 * 1024 * 1024}
            >
              <DropzoneContent>
                <Image
                  src={form.getValues("image_url")}
                  alt="Image"
                  width={100}
                  height={100}
                />
              </DropzoneContent>
              <DropzoneEmptyState />
            </Dropzone>
            <FieldError
              errors={[{ message: form.formState.errors.image_url?.message }]}
            />
          </FieldContent>
        </Field>
      </FieldSet>
    </FormProvider>
  );
};

export default AboutForm;
