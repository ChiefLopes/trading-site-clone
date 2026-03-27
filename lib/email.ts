import { Resend } from "resend";

// ⚡ Replace this with your actual Resend API key
const resend = new Resend(process.env.RESEND_API_KEY!);

// ⚡ Your registered Gmail (sandbox will allow sending only to this)
const SANDBOX_EMAIL = "chieflopesekede@gmail.com";

// Helper function
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // If using sandbox sender, override recipient
  const recipient = process.env.SEND_SANDBOX === "true" ? SANDBOX_EMAIL : to;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // sandbox sender
      to: recipient,
      subject,
      html,
    });

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
