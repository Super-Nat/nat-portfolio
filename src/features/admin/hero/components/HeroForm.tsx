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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHero } from "../hooks/useHero";
import { heroSchema, type HeroReq } from "../types/heroType";

const HeroForm = () => {
  const { hero, isLoading, updateHero, isPending } = useHero();

  const form = useForm<HeroReq>({
    defaultValues: {
      greeting: "",
      position: "",
    },
    resolver: zodResolver(heroSchema),
  });

  // prefill form เมื่อมีข้อมูลครับ
  useEffect(() => {
    if (hero) {
      form.reset({
        greeting: hero.greeting,
        position: hero.position,
      });
    }
  }, [hero, form]);

  const onSubmit = (data: HeroReq) => {
    if (!hero?.id) return;
    updateHero({ id: hero.id, data });
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
