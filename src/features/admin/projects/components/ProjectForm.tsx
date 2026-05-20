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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/ui/upload-file";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useProjectForm } from "../hooks/useProjectForm";
import { ProjectCallbacks, ProjectItem } from "../types/projectsType";
import { ProjectTechStackInput } from "./ProjectTechStackInput";

interface ProjectFormProps extends ProjectCallbacks {
  item?: ProjectItem;
  isCreating: boolean;
  isUpdating: boolean;
}

const ProjectForm = ({
  item,
  updateProject,
  createProject,
  isCreating,
  isUpdating,
}: ProjectFormProps) => {
  const { form, onSubmit, isUploading } = useProjectForm({
    item,
    updateProject,
    createProject,
  });

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("title")}
                aria-invalid={!!form.formState.errors.title?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.title?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <FieldContent>
              <Textarea
                {...form.register("description")}
                aria-invalid={!!form.formState.errors.description?.message}
              />
              <FieldError
                errors={[
                  { message: form.formState.errors.description?.message },
                ]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Image URL</FieldLabel>
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
            <FieldLabel>Project URL</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("project_url")}
                aria-invalid={!!form.formState.errors.project_url?.message}
              />
              <FieldError
                errors={[
                  { message: form.formState.errors.project_url?.message },
                ]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>GitHub URL</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("github_url")}
                aria-invalid={!!form.formState.errors.github_url?.message}
              />
              <FieldError
                errors={[
                  { message: form.formState.errors.github_url?.message },
                ]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Tech Stack</FieldLabel>
            <FieldContent>
              <ProjectTechStackInput />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Sort Order</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                min={0}
                step={1}
                {...form.register("sort_order", { valueAsNumber: true })}
                aria-invalid={!!form.formState.errors.sort_order?.message}
              />
              <FieldError
                errors={[
                  { message: form.formState.errors.sort_order?.message },
                ]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Is Published</FieldLabel>
            <FieldContent>
              <Switch
                checked={form.watch("is_published")}
                onCheckedChange={(checked) => {
                  form.setValue("is_published", checked);
                }}
              />
            </FieldContent>
          </Field>
        </FieldGroup>
        <FieldSeparator />
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={isCreating || isUpdating || isUploading}
        >
          {isCreating || isUpdating || isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </FieldSet>
    </FormProvider>
  );
};

export default ProjectForm;
