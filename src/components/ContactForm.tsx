import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { contactSchema, type ContactInput } from "~/schemas/contact.schema";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { ReloadIcon, CheckIcon } from "@radix-ui/react-icons";
import { useReCaptcha } from "next-recaptcha-v3";

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const { executeRecaptcha } = useReCaptcha();

  const { mutate, error, isLoading, isSuccess } = api.contact.send.useMutation({
    onSuccess: () => {
      console.log("SENT");
    },
  });

  async function onSubmit(values: ContactInput) {
    console.log(values);

    const token = await executeRecaptcha("contact_form_submit");

    mutate({ ...values, token });
  }

  console.log("FORM RENDER");

  if (error) {
    console.log("SEND EMAIL ERROR: ", error);
    console.log(error.data?.zodError?.formErrors);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
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
                <Input placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-baseline">
          <Button
            className="mr-2 flex-[0_0_auto]"
            disabled={isLoading || isSuccess}
            type="submit"
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : isSuccess ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                Sent
              </>
            ) : (
              "Send Message"
            )}
          </Button>
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {error.data?.zodError?.formErrors || "Something went wrong"}
            </p>
          )}
          {isSuccess && (
            <p className="text-[0.8rem] font-medium text-green-500">
              Form submitted successfully
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
