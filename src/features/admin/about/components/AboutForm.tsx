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
import Loading from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/ui/upload-file";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useAboutForm from "../hooks/useAboutForm";

const AboutForm = () => {
  const { form, isUploading, isPending, isLoading, onSubmit } = useAboutForm();

  if (isLoading) {
    return <Loading />;
  }

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
              <UploadFile
                fieldName="image_url"
                accept="image/*"
                maxSize={1024 * 1024 * 5}
                previewHeight={128}
                previewWidth={128}
                previewClassName="w-24 h-24 rounded-lg object-cover"
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>CV</FieldLabel>
            <FieldContent>
              <UploadFile
                fieldName="cv_url"
                accept=".pdf"
                maxSize={1024 * 1024 * 5}
                previewHeight={128}
                previewWidth={128}
                previewClassName="w-24 h-24 rounded-lg object-cover"
                type="file"
              />
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
