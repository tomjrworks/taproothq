"use client";

import { LIMITS } from "@/lib/contact";
import {
  FormCard,
  Honeypot,
  SendError,
  SentNote,
  SubmitButton,
  useLabsForm,
} from "./FormParts";
import { condensed, field, input, label } from "./tokens";

const req = <span style={{ color: "var(--accent)" }}>*</span>;

export default function ContactForm() {
  const { status, sentTo, mounted, onSubmit } = useLabsForm("contact");

  if (status === "sent") {
    return (
      <FormCard>
        <SentNote>We&apos;ll write back to {sentTo}.</SentNote>
      </FormCard>
    );
  }

  return (
    <FormCard>
      <form
        method="post"
        action="/api/contact"
        onSubmit={onSubmit}
        aria-busy={status === "sending"}
      >
        <p className={`${condensed} text-[36px]`}>
          Tell us what you want to build
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-7">
          <label className="block">
            <span className={label}>Name {req}</span>
            <input
              type="text"
              name="name"
              required
              maxLength={LIMITS.name}
              className={input}
              style={field}
            />
          </label>
          <label className="block">
            <span className={label}>Email {req}</span>
            <input
              type="email"
              name="email"
              required
              maxLength={LIMITS.email}
              className={input}
              style={field}
            />
          </label>
        </div>
        <label className="block mt-5">
          <span className={label}>What do you want to build? {req}</span>
          <textarea
            name="message"
            rows={5}
            required
            maxLength={LIMITS.message}
            className={`${input} resize-y`}
            style={field}
          />
        </label>
        <Honeypot />
        <SubmitButton sending={status === "sending"} mounted={mounted} error={status === "error"}>
          Send it
        </SubmitButton>
        {status === "error" && <SendError />}
      </form>
    </FormCard>
  );
}
