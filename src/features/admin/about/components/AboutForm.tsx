"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, Loader2, UploadIcon, X } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useAboutForm from "../hooks/useAboutForm";

const AboutForm = () => {
  const {
    form,
    handleImageChange,
    handleRemoveImage,
    handleCvChange,
    handleRemoveCv,
    imagePreview,
    isUploading,
    isPending,
    isLoading,
    onSubmit,
    cvUrl,
    content,
    cvFile,
  } = useAboutForm();

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input
                placeholder="NATCHAPON"
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
                placeholder="Hello! I'm a front-end developer..."
                rows={4}
                {...form.register("bio")}
                aria-invalid={!!form.formState.errors.bio?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.bio?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Profile Image</FieldLabel>
            <FieldContent>
              {imagePreview && (
                <div className="relative w-24 h-24 mb-2">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {!imagePreview && (
                <InputGroup>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                  />
                  <InputGroupAddon align="inline-start">
                    <UploadIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              )}
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>CV</FieldLabel>
            <FieldContent>
              {cvUrl && (
                <div className="flex items-center gap-2 mb-2 relative w-25">
                  <a
                    href={cvUrl}
                    target="_blank"
                    className="text-sm text-muted-foreground rounded-sm w-full"
                  >
                    <FileIcon className="w-25 h-25" />
                    <p className="mt-2 w-full text-xs text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap ">
                      {content?.cv_url || cvFile?.name}
                    </p>
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveCv}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {!cvUrl && (
                <InputGroup>
                  <InputGroupInput
                    type="file"
                    accept=".pdf"
                    onChange={handleCvChange}
                    disabled={isUploading}
                  />
                  <InputGroupAddon align="inline-start">
                    <UploadIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              )}
            </FieldContent>
          </Field>
        </FieldGroup>
        <FieldSeparator />
        <Button
          type="submit"
          disabled={isPending || isUploading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending || isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </FieldSet>
    </FormProvider>
  );
};

export default AboutForm;
