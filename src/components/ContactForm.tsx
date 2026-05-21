"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm({ defaultTitle = "" }: { defaultTitle?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function clientAction(formData: FormData) {
    setStatus("loading");
    setErrorMessage("");
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Message Sent Successfully!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <Button className="mt-4" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form action={clientAction} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" required placeholder="0123456789" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Inquiry Title</Label>
        <Input id="title" name="title" required defaultValue={defaultTitle} placeholder="Subject of inquiry" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="How can we help you?"
        />
      </div>
      {status === "error" && (
        <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
