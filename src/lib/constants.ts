export const AUDIT_URL = "https://audit.mainloopsystems.com";
export const CALENDLY_URL = "https://cal.com/tomgirgash/free-discovery-call";
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
    title: "Discovery",
    tagline: "Tell us where it hurts",
    description: "Walk us through your day-to-day.",
    hoverDetail:
      "Start with our free audit or book a call. We learn how your business runs day-to-day.",
  },
  {
    number: "2",
    title: "Diagnosis",
    tagline: "We find the bottlenecks",
    description:
      "We map your workflows and pinpoint what's costing you time.",
    hoverDetail:
      "We look for the copy-paste, the manual handoffs, the 'there has to be a better way' moments.",
  },
  {
    number: "3",
    title: "Build",
    tagline: "AI + automation, tailored to you",
    description:
      "Custom tools, integrations, and automations — built in days to weeks.",
    hoverDetail:
      "You get a working prototype fast — not a proposal deck. Real automations you can see running.",
  },
  {
    number: "4",
    title: "Launch",
    tagline: "Live and running",
    description:
      "We deploy, test, and make sure everything works in your real workflow.",
    hoverDetail:
      "We don't just hand it off. We make sure it works with your team, your tools, your real workflow.",
  },
  {
    number: "5",
    title: "Support",
    tagline: "We don't disappear",
    description:
      "Ongoing tweaks, new automations, and support as your business grows.",
    hoverDetail:
      "Your business changes. Your automations should too. We're here when you need us.",
  },
];
