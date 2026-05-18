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
import Loading from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useHeroForm from "../hooks/useHeroForm";

const HeroForm = () => {
  const { form, handleSubmit, isPending, isLoading } = useHeroForm();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Greeting</FieldLabel>
            <FieldContent>
              {isLoading ? (
                <Skeleton className="w-full h-10 rounded-md" />
              ) : (
                <Input
                  placeholder="HELLO! I AM NAT!"
                  {...form.register("greeting")}
                  aria-invalid={!!form.formState.errors.greeting?.message}
                />
              )}
              <FieldError
                errors={[{ message: form.formState.errors.greeting?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Position</FieldLabel>
            <FieldContent>
              {isLoading ? (
                <Skeleton className="w-full h-10 rounded-md" />
              ) : (
                <Input
                  placeholder="FRONT-END DEVELOPER"
                  {...form.register("position")}
                  aria-invalid={!!form.formState.errors.position?.message}
                />
              )}
              <FieldError
                errors={[{ message: form.formState.errors.position?.message }]}
              />
            </FieldContent>
          </Field>
        </FieldGroup>
        <FieldSeparator />
        <Button
          type="submit"
          disabled={isPending}
          onClick={form.handleSubmit(handleSubmit)}
          size="lg"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </FieldSet>
    </FormProvider>
  );
};

export default HeroForm;
