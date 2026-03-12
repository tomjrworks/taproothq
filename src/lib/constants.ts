export const AUDIT_URL = "https://audit.mainloopsystems.com";
export const CALENDLY_URL = "https://calendly.com/tom-at-mainloop/free-discovery-call";
export const LINKEDIN_URL = "https://linkedin.com/company/mainloopsystems";
export const EMAIL = "tom@mainloopsystems.com";

export const NAV_LINKS = [
  { label: "How We Help", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog", external: false },
  { label: "Free Audit", href: AUDIT_URL, external: true },
];

export const SERVICE_CATEGORIES = [
  {
    title: "Find & Close More Customers",
    description: "Stop waiting for the phone to ring.",
    services: [
      {
        name: "Outbound Lead Gen Systems",
        problem: "You're chasing leads with spreadsheets and sticky notes",
        solution:
          "We build automated outbound systems that find, qualify, and follow up with prospects — so your pipeline fills itself while you focus on closing.",
      },
      {
        name: "Custom AI Agents",
        problem: "Your team is stretched thin and things keep slipping",
        solution:
          "AI agents that handle the busywork — answering common questions, qualifying leads, processing forms, following up on invoices. Your people focus on the work that actually needs a human.",
      },
    ],
  },
  {
    title: "Eliminate Manual Work",
    description: "Get your time back.",
    services: [
      {
        name: "AI Automation",
        problem: "Your team wastes hours on tasks a machine could handle",
        solution:
          "From intake forms to invoicing, we find the repetitive work dragging your team down and replace it with automations that run 24/7.",
      },
      {
        name: "Custom Integrations",
        problem: "Your tools don't talk to each other",
        solution:
          "QuickBooks, Google Sheets, your CRM, your booking system — we make them talk to each other so data flows automatically instead of being re-entered by hand.",
      },
    ],
  },
  {
    title: "Fix What's Broken",
    description: "Find the bottleneck. Remove it.",
    services: [
      {
        name: "Workflow Design",
        problem: "You know something's broken but can't pinpoint what",
        solution:
          "We map out how work actually moves through your business, find where things fall through the cracks, and redesign your processes so nothing gets lost.",
      },
      {
        name: "Custom Micro-Apps",
        problem: "You need a tool that doesn't exist off the shelf",
        solution:
          "A quote calculator for your sales team. A job tracker for your crew. A client portal that actually works. Small, focused apps built for exactly how you operate.",
      },
    ],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "1",
    title: "Tell us where it hurts",
    description: "Describe your workflows and pain points. We'll listen.",
  },
  {
    number: "2",
    title: "We build the fix",
    description: "Custom automation delivered in days to weeks, not months.",
  },
  {
    number: "3",
    title: "You get your time back",
    description: "Less manual work, more capacity to grow.",
  },
];
