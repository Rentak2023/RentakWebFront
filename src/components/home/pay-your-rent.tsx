"use client";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { orpc } from "@/lib/orpc";
import { CreateLeadSchema } from "@/schemas/lead";

export function PayYourRent() {
  const locale = useLocale();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const form = useForm({
    resolver: standardSchemaResolver(CreateLeadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
  });
  const createLeadMutation = useMutation(
    orpc.leads.createLead.mutationOptions(),
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createLeadMutation.mutateAsync({
      lang: locale,
      values: data,
    });
    setSuccessMessage(res.message);
  });

  return (
    <Container className="mt-12 flex items-center justify-center">
      <Form {...form}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="3xl" variant="default">
              Pay Your Rent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            {form.formState.isSubmitSuccessful ? (
              <div>
                <h2 className="text-primary-800 mx-4 my-8 text-center text-2xl font-medium">
                  {successMessage}
                </h2>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    Need a Credit Limit? We've Got You Covered!
                  </DialogTitle>
                  <DialogDescription className="text-base text-slate-700">
                    Don’t let a lack of a credit limit hold you back. Apply now,
                    and we’ll connect you with the right financial partner to
                    get you the limit you need.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="mt-2"
                            placeholder="Your Full Name"
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
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            className="mt-2"
                            dir="ltr"
                            placeholder="Active Mobile Number"
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="mt-2"
                            placeholder="Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            className="mt-2"
                            placeholder="Your Message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </Form>
    </Container>
  );
}
