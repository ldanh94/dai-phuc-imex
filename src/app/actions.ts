"use server";

import { prisma } from "@/lib/prisma";

export async function submitContact(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !phone || !title || !message) {
      return { success: false, error: "All fields are required" };
    }

    await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        phone,
        title,
        message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to submit form" };
  }
}
