// Real facts only. No em dashes in any copy.

// The apps are never listed publicly; these only drive the counts on About.
export const apps: { name: string; status: string }[] = [
  { name: "Recess", status: "Live" },
  { name: "Taproot", status: "Live" },
  { name: "Glug", status: "Live" },
  { name: "Bookbug", status: "In App Review" },
  { name: "Twine", status: "In build" },
];

export const hero = {
  sub: "Taproot Labs builds its own SaaS products and takes on contract work for companies. Apps, internal tools, AI automations and hands-on AI training for your team.",
  tally: "3 live, 2 in the works",
};

// Services are never matched to our own products. Every stack tool is sourced from the repos.
export const pillars = [
  {
    n: "01",
    title: "AI tools",
    body: "Assistants and AI features that work on your own data. They read documents, draft, sort and answer questions, inside the files and tools your team already uses.",
    tags: ["Assistants", "Document reading", "Drafting", "Search your data"],
  },
  {
    n: "02",
    title: "AI training",
    body: "Hands-on training for your team. We look at how they work, find where AI saves real time, and teach them to use it. Workshops for the whole team, or one-on-one coaching.",
    tags: ["Workshops", "Coaching", "Use cases", "Consulting"],
  },
  {
    n: "03",
    title: "Automation",
    body: "Work that runs without you, like scheduled jobs, webhooks, and email and lead pipelines, with an AI step where it helps. If someone does it by hand every week, we can usually automate it.",
    tags: ["Scheduled jobs", "Webhooks", "Email", "Lead pipelines"],
  },
  {
    n: "04",
    title: "Web apps",
    body: "Full SaaS products with sign-up, payments, dashboards and admin, or internal tools for your team.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe"],
  },
  {
    n: "05",
    title: "iOS apps",
    body: "Native iPhone apps with subscriptions, widgets and notifications. We take it from the first screen through App Store review.",
    tags: ["Swift", "SwiftUI", "RevenueCat", "App Store"],
  },
];

export const howWeBuild = [
  {
    n: "01",
    title: "Plan",
    body: "We write the problem down in plain words and agree what's in and what's out.",
    tags: ["One-page brief", "Scope", "Estimate"],
  },
  {
    n: "02",
    title: "Build",
    body: "You get a working build early and use it. Not a slide deck.",
    tags: ["Working build early", "Design in the real thing", "Your feedback"],
  },
  {
    n: "03",
    title: "Measure",
    body: "Real people and real data before we add more.",
    tags: ["Analytics", "Real users", "What to fix next"],
  },
  {
    n: "04",
    title: "Ship",
    body: "Launch on the web or the App Store, then keep improving it.",
    tags: ["Launch", "Monitoring", "Updates"],
  },
];

export const stack = [
  {
    layer: "iOS",
    tools: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "WidgetKit",
      "RevenueCat",
      "Screen Time APIs",
      "Vision",
    ],
  },
  { layer: "Web", tools: ["Next.js", "React", "TypeScript", "Tailwind"] },
  {
    layer: "Backend and data",
    tools: ["Supabase", "Postgres", "Express", "Hono", "Stripe", "Resend"],
  },
  { layer: "Hosting", tools: ["Vercel", "Railway"] },
];

export const contact = {
  first: "Have something to build?",
  second: "Tell us about it.",
  body: "An app, a web app, a tool for your team, or AI training.",
  email: "tom@taproothq.com",
};
