# ProSourced (prosourced.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. A global marketplace to find and compare accountants, payroll, HR, consultants, web designers, marketers and more, with free quotes. Repo: `Shmorai/shmor-prosourced` (private until launch). Status: **live**, with CJ referral links (see "Affiliate partners").

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage) |
| Design: header, logo, footer | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults; add this site's theme block at the bottom) |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/` |

## Pages (51)
Home (Bark-style hero finder: service + region → service page) · services hub (6 groups of photo tiles) · 26 sector pages: accounting, bookkeeping, tax-advisory, payroll, funding-advisers, hr-outsourcing, recruitment, health-and-safety, management-consulting, legal-services, company-formation, sustainability-consulting, digital-marketing, branding, copywriting, public-relations, video-production, web-design, software-development, ai-automation, it-cyber-security, virtual-assistants, customer-support-outsourcing, ecommerce-management, logistics-fulfilment, translation · free-tools hub + outsourcing-cost-calculator, project-brief-builder, hourly-rate-calculator · regions hub + united-states, united-kingdom, europe, canada, australia · how-it-works · for-professionals · blog + 10 posts (each with official sources).
Each sector page: what they do, rules/credentials by country (US/UK/EU+), questions to ask, what affects the cost, FAQs, a "Get quotes" band linking to the brief builder with ?service=<slug>, related pages.
Top menu (navOrder): All services, Free tools, Blog, How it works, For professionals, plus the green "Get quotes" header button.

## Free tools
`assets/prosourced.js` (loaded in layout): hero finder, cost calculator, brief builder (copy / download / mailto, prefilled from ?service= and ?region=), hourly rate calculator. All client-side; nothing is sent anywhere. Tool forms are "html" blocks in the tool pages' JSON.

## Design
"Global boardroom", in line with the Shmor brand: dark ink-violet #0C0A14 base (surfaces #14111F / #1C1830, lines #2A2540), orchid #B07CFF brand and links, Shmor Node Purple #7644B0 / Deep Purple #2E1F5E gradients, Node Green #2FAF82 action buttons, Outfit headings + Inter body. Logo: orchid wireframe globe in a #1A1233 rounded square with a green check node, plus "Pro**Sourced**" (Sourced in orchid) and a "by Shmor.ai" pill. Home hero = NASA Earth-at-night photo with a violet overlay. Home shows 11 popular sectors + an "all services" tile; the services hub shows all sectors as photo tiles (each sector page's hero photo). Every sector page and blog post also has a credited in-article photo (figure.prose-fig, free-licence Unsplash only). Theme block is at the bottom of `assets/site.css`. Checked at 320/375/768/900/1024/1280 px.

## Search routing vs ProFinders
ProFinders (UK-leaning, local) keeps accountant, lawyer/solicitor, HR consultant, VAT, web designer. ProSourced takes outsourcing/global terms: payroll (moved from ProFinders), EOR/PEO, management consulting, fractional execs, virtual assistants, translation, company formation, recruitment, branding, digital marketing agency, Shopify/web development, plus tax/transfer pricing, software and app development, AI and automation, copywriting, video, PR, Amazon/ecommerce agencies, call centres/BPO, 3PL/freight/customs, grants and fundraising, ESG/sustainability, and health and safety. ProFinders still wins plain "accountant", "bookkeeper", "tax advisor" and "seo agency" searches. Padded short words: " eor ", " peo ".

## Footer
Curated, not generated: brand blurb, 5 popular services + All services, ProSourced pages, 3 sister sites + all marketplaces, then one inline legal row and the disclosure. The kit's footer_nav placeholder is intentionally not used (it listed every page).

## Backlinks
Footer and home "links" block point to sister Shmor sites (ProFinders, OnBusLaw, DomComInsure, BestVPNs, FullBars, StorageSavings, EnergySavers); in-content links to OnBusLaw, BestVPNs, DomComInsure, ProFinders where relevant; dense internal linking between sectors, tools and posts.


## Commands (run here)
```bash
node tools/build.js           # rebuild after ANY change to content/, templates/ or shmor-site.json
node tools/serve.js <port>    # local preview (see the "prosourced" preview config)
```
After changing `shmor-site.json`, also run `node tools/sync-network.js` in `../../shmor-ai`.

## Affiliate partners (live, added 2026-11-18)
- **Corel** (CJ advertiser 998086): 10% (5% on upgrades), 45–60-day cookie. Terms: no Corel/product names in our domains or URLs (slugs `cj998086-*`), CJ creatives only, programme codes only, no keyword bidding outside the Americas. Codes for the **ProSourced property (PID 101926926)**: evergreen `cj998086-home`, CorelDRAW Go `cj998086-go`, CorelDRAW Graphics Suite `cj998086-suite`; CorelDRAW Go banners 728x90 + 300x250 (self-hosted JPGs in `assets/img/partners/`). 200+ older (2023-era) creatives not used.
- **24-7PressRelease** (CJ 2898768): $15 per first press release ($20 after $225 total), 45-day cookie; no brand bidding; never say "free press release". Text links only (no banners in CJ): `cj2898768-home`, `cj2898768-plans` (pricing page).
- Placed: branding (cards + Corel links + Go banner), web-design (vector files tip), website-design-brief post, free-tools (cards), public-relations (card, link, plans button), digital-marketing (link). ProFinders could take both later.
- **AOMEI** (CJ 7529241, added 2026-11-19): 30%, 30-day cookie; no "AOMEI" in our URLs (`cj7529241-*`), CJ images only, programme codes only, **no email promotion** (never put these links in newsletters or RSS-to-email). Text links only. Codes for ProSourced (PID 101926926): home, backupper, partition, anyviewer. Skipped flash-sale / Black Friday / Christmas "% off" links (undated). Placed: it-cyber-security (backup + remote-support paragraph, cards) and the cyber-security-basics post (backup step). ProFinders it-support could take it later.

## Referral links
None yet. Planned: Bark-style quote platforms and EOR / payroll / agency partners. Add to `shmor-site.json` → `"links"`, list slugs in each sector page's `"partners"` (or add `"offers"`), optionally set `"fallback"`, rebuild, sync the master, then commit both repos.

## Content source
The page JSON in `content/` is the source of truth (it was first generated by one-off scripts; edit the JSON directly now).
