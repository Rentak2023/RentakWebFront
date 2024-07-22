"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = v.object({
  username: v.string(),
  password: v.string(),
});

function LoginForm() {
  const t = useTranslations("auth");
  const form = useForm<v.InferOutput<typeof loginSchema>>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.username.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("fields.username.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("fields.password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button>{t("cta.login")}</Button>
        </div>
      </form>
    </Form>
  );
}
const signUpSchema = v.object({
  full_name: v.string(),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("A valid email address is required"),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Password is required"),
    v.minLength(8, "Password must be at least 8 characters"),
  ),
});

function SignUpForm() {
  const t = useTranslations("auth");
  const form = useForm<v.InferOutput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.full-name.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("fields.full-name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.phone.label")}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("fields.password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button>{t("cta.sign-up")}</Button>
        </div>
      </form>
    </Form>
  );
}

function LoginRegisterPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 xl:max-w-5xl">
        <Tabs defaultValue="login" className="mx-auto mt-8 max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardContent className="pt-6">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardContent className="pt-6">
                <SignUpForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginRegisterPage;
