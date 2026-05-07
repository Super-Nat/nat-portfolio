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
import useContent from "@/hooks/useContent";
import { HeroReq, heroSchema } from "@/types/hero";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const HeroForm = () => {
  const { content, isLoading, updateContent, isPending } = useContent({
    key: "hero",
    table: "hero",
  });

  const form = useForm<HeroReq>({
    defaultValues: {
      greeting: "",
      position: "",
    },
    resolver: zodResolver(heroSchema),
  });

  // prefill form เมื่อมีข้อมูลครับ
  useEffect(() => {
    if (content) {
      form.reset({
        greeting: content.greeting,
        position: content.position,
      });
    }
  }, [content, form]);

  const onSubmit = (data: HeroReq) => {
    if (!content?.id) return;
    updateContent({ id: content.id, data, table: "hero" });
  };

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Greeting</FieldLabel>
            <FieldContent>
              <Input
                placeholder="HELLO! I AM NAT!"
                {...form.register("greeting")}
                aria-invalid={!!form.formState.errors.greeting?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.greeting?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Position</FieldLabel>
            <FieldContent>
              <Input
                placeholder="FRONT-END DEVELOPER"
                {...form.register("position")}
                aria-invalid={!!form.formState.errors.position?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.position?.message }]}
              />
            </FieldContent>
          </Field>
        </FieldGroup>
        <FieldSeparator />
        <div className="flex justify-end ">
          <Button
            type="submit"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </FieldSet>
    </FormProvider>
  );
};

export default HeroForm;
