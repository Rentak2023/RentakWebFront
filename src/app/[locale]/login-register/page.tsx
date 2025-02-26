import { useLocale, useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocaleDirection } from "@/lib/utils";

import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/signup-form";

export default function LoginRegisterPage() {
  const t = useTranslations("auth");

  const locale = useLocale();
  const dir = getLocaleDirection(locale);

  return (
    <div className="pt-24">
      <Container className="xl:max-w-5xl">
        <Card className="mx-auto w-full max-w-xl">
          <Tabs defaultValue="login" className="w-full" dir={dir}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("cta.login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("cta.sign-up")}</TabsTrigger>
            </TabsList>
            <CardContent className="mt-6">
              <TabsContent value="login" className="mt-0">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup" className="mt-0">
                <SignUpForm />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
}
