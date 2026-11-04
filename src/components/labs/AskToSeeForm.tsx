"use client";

import { INTERESTS, LIMITS } from "@/lib/contact";
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

export default function AskToSeeForm() {
  const { status, sentTo, mounted, onSubmit } = useLabsForm("work");

  if (status === "sent") {
    return (
      <FormCard>
        <SentNote>We&apos;ll write back to {sentTo} to set up a call.</SentNote>
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
        <p className={`${condensed} text-[36px]`}>Ask to see our work</p>
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
          <label className="block">
            <span className={label}>Company </span>
            <input
              type="text"
              name="company"
              maxLength={LIMITS.company}
              className={input}
              style={field}
            />
          </label>
        </div>
        <fieldset className="mt-6">
          <legend className={label}>What do you want to see?</legend>
          <div className="flex flex-wrap gap-2 mt-3">
            {INTERESTS.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 f-s4 text-[15px] px-3 py-2 rounded-[4px] cursor-pointer"
                style={field}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={t}
                  style={{ accentColor: "var(--accent)" }}
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block mt-6">
          <span className={label}>Anything we should know?</span>
          <textarea
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            className={`${input} resize-y`}
            style={field}
          />
        </label>
        <Honeypot />
        <SubmitButton sending={status === "sending"} mounted={mounted}>
          Send
        </SubmitButton>
        {status === "error" && <SendError />}
      </form>
    </FormCard>
  );
}
