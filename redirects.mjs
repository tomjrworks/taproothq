// Inbound links to the pages that moved under /taproot, plus /signup, which the Mac helper opens.
// Static destinations only. No source may equal a Labs, app, API or legal route.
export const redirects = [
  { source: "/home", destination: "/taproot", permanent: true },
  { source: "/pricing", destination: "/taproot/pricing", permanent: true },
  { source: "/demo", destination: "/taproot/demo", permanent: true },
  { source: "/faq", destination: "/taproot/faq", permanent: true },
  { source: "/how-it-works", destination: "/taproot/how-it-works", permanent: true },
  { source: "/vs-memory", destination: "/taproot/vs-memory", permanent: true },
  { source: "/use-cases", destination: "/taproot/use-cases", permanent: true },
  { source: "/use-cases/:slug", destination: "/taproot/use-cases/:slug", permanent: true },
  { source: "/blog", destination: "/taproot/blog", permanent: true },
  { source: "/blog/:slug", destination: "/taproot/blog/:slug", permanent: true },
  { source: "/signup", destination: "/sign-up", permanent: true },
];
