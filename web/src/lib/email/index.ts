import "server-only";

import nodemailer from "nodemailer";
import { Resend } from "resend";

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  idempotencyKey?: string;
};

export type EmailSender = { send(message: EmailMessage): Promise<void> };

function required(value: string | undefined, name: string): string {
  if (!value) throw new Error(`Missing required email configuration: ${name}`);
  return value;
}

function smtpSender(): EmailSender {
  const transporter = nodemailer.createTransport({
    host: required(process.env.SMTP_HOST, "SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? "1025"),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: required(process.env.SMTP_PASSWORD, "SMTP_PASSWORD") }
      : undefined,
  });

  return {
    async send(message) {
      await transporter.sendMail({ from: required(process.env.EMAIL_FROM, "EMAIL_FROM"), ...message });
    },
  };
}

function resendSender(): EmailSender {
  const resend = new Resend(required(process.env.RESEND_API_KEY, "RESEND_API_KEY"));
  return {
    async send(message) {
      const { error } = await resend.emails.send({
        from: required(process.env.EMAIL_FROM, "EMAIL_FROM"),
        to: [message.to],
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
      if (error) throw new Error("Email provider rejected delivery");
    },
  };
}

export function getEmailSender(): EmailSender {
  if (process.env.NODE_ENV === "production") return resendSender();
  return smtpSender();
}
