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
import { FormProvider, useForm } from "react-hook-form";
import { useSignIn } from "../hooks/useSignIn";
import { SignInReq, signInSchema } from "../types/signInType";

const SignInForm = () => {
  const form = useForm<SignInReq>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const { handleSubmit } = form;
  const { signIn, isPending, error } = useSignIn();

  const onSubmit = (data: SignInReq) => {
    signIn(data);
  };

  return (
    <FormProvider {...form}>
      <FieldSet className="w-full max-w-md">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input
                type="email"
                placeholder="email@example.com"
                {...form.register("email")}
                aria-invalid={!!form.formState.errors.email?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.email?.message }]}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="********"
                {...form.register("password")}
                aria-invalid={!!form.formState.errors.password?.message}
              />
              <FieldError
                errors={[{ message: form.formState.errors.password?.message }]}
              />
            </FieldContent>
          </Field>
          {error && <FieldError errors={[{ message: error?.toString() }]} />}
        </FieldGroup>
        <FieldSeparator />
        <Button
          type="submit"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
        </Button>
      </FieldSet>
    </FormProvider>
  );
};

export default SignInForm;
