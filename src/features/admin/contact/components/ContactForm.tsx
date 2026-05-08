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
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useContactForm from "../hooks/useContactForm";

const ContactForm = () => {
  const { form, handleSubmit, isPending, isLoading } = useContactForm();
  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              {isLoading ? (
                <Skeleton className="w-full h-10 rounded-md" />
              ) : (
                <Input
                  {...form.register("email")}
                  aria-invalid={!!form.formState.errors.email?.message}
                />
              )}
              <FieldError
                errors={[{ message: form.formState.errors.email?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>GitHub</FieldLabel>
            <FieldContent>
              {isLoading ? (
                <Skeleton className="w-full h-10 rounded-md" />
              ) : (
                <Input
                  {...form.register("github")}
                  aria-invalid={!!form.formState.errors.github?.message}
                />
              )}
            </FieldContent>
            <FieldError
              errors={[{ message: form.formState.errors.github?.message }]}
            />
          </Field>
          <Field>
            <FieldLabel>LinkedIn</FieldLabel>
            <FieldContent>
              {isLoading ? (
                <Skeleton className="w-full h-10 rounded-md" />
              ) : (
                <Input
                  {...form.register("linkedin")}
                  aria-invalid={!!form.formState.errors.linkedin?.message}
                />
              )}
            </FieldContent>
            <FieldError
              errors={[{ message: form.formState.errors.linkedin?.message }]}
            />
          </Field>
        </FieldGroup>
        <FieldSeparator />
        <Button
          type="submit"
          disabled={isPending}
          onClick={form.handleSubmit(handleSubmit)}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </FieldSet>
    </FormProvider>
  );
};

export default ContactForm;
