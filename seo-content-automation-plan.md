# SEO Content Automation Plan

## Phase 1: Keyword Research Pipeline
1. Use DataForSEO API (or Perplexity) to find low-competition queries: `"[niche] automation"`, `"AI for [niche]"`, `"how to automate [niche]"`
2. Cross-reference with your 221 ranked niches — prioritize niches you're actively emailing
3. Store keyword opportunities in a simple JSON/DB table

## Phase 2: Content Generation
1. For each keyword target, Claude generates a GEO-optimized blog post using Princeton GEO methods:
   - **Citations** — reference real studies/statistics (+40% AI visibility)
   - **Statistics** — include specific numbers ("saves 10-20 hrs/week")
   - **FAQ sections** — FAQPage schema for Google featured snippets + AI search
   - **Authoritative tone** — position Tom as the expert
2. Each post ends with the audit CTA (already built into the blog template)
3. Output as `.mdx` files dropped into `content/blog/`

## Phase 3: Publishing Flow
1. New MDX file → git push → Vercel auto-deploys
2. Sitemap updates automatically (already built)
3. Weekly SERP tracking via DataForSEO to measure ranking

## Recommended Cadence
- **2 posts/week** — one niche-specific ("AI for pest control"), one general ("5 signs your business needs automation")
- **Batch write**: generate a month of content in one session
- **Content from ColdCraft research**: you already have research data on 2,500+ businesses — mine that for real examples and insights
