# V2 — "Scaling the Benny App" (early)

_From the previous session transcript (earliest full 5-project draft). The earlier-model copy, before any Figma-based rewrite._


---

## Scaling the Benny App

**Building a modular design system to take Benny from a scrappy V1 to a platform that could support new product lines — as the user base grew from 3K to 300K.**

`consumer fintech` · `mobile` · `design systems`

### Context

I joined Benny in 2024 as their first full-time design hire. Benny had launched with a remote contract designer — they had a working V1 app, but it showed. The homepage was cluttered with competing calls to action, colors were loud and disconnected from the brand, and the structure had no room to grow.

The goal was to unify the mobile design system so it could scale with new product lines — Benny Card, Deals, and Affiliate links were all on the roadmap. A secondary goal was to get more new users to their first moment of delight: at launch, only 21% of onboarded users had earned any cash back.

### The problem — Everything competed for attention

The V1 homepage had no neutral elements. EBT balance cards, offer carousels, and promotional banners all screamed at the same volume. Side-by-side SNAP and EBT cash balances wasted space — 97% of users only had one balance. The logo needed a refresh before it would go on a physical credit card. And the persistent onboarding instructions cluttered the home screen long after users had completed setup.

The deeper structural problem: the roadmap called for adding Benny Card, Deals, and Affiliate links to the home screen. Dropping new sections into the existing layout would make it completely untenable.

→ _image: The existing homepage had no clear hierarchy — before the redesign._

### The approach — Start with a neutral building block

Rather than redesigning every section independently, I started by designing a single flexible row component. The component could hold an icon or image, support a title and subtitle, and be arranged in rows, stacked in lists, or composited with a summary card on top. Neutral by default, but extensible.

I also designed for max and min states from day one. No matter where a user was in their product journey — whether they had a Benny Card or not, whether they'd linked EBT balances or not — the homepage needed to look and feel right.

### Execution — Simplifying section by section

Balances: I collapsed the side-by-side card layout into a single stacked section with a clear section title and a simpler gradient. The Benny Card balance slotted cleanly into the same component when users had one.

Offers: SNAP offers and bank card offers had been separate, noisy sections. I unified them under a single "Deals for you" entry point, reduced color saturation, and added a shopping list entry point for users who wanted to browse before buying.

Promos: The promotional banner carousel evolved into a stacked component that could house time-sensitive offers like Boosts without overwhelming the rest of the screen.

→ _image: The redesigned homepage — modular, extensible, and calm._

### Results — 70% more earners per signup

The new onboarding component drove a 70% increase in earners per signup — the share of new users who earned cash back in their first session. The simplified homepage also informed Benny's updated brand identity, anchoring the brand in a single blue and removing the loud accent colors that had crept in over time.

The modular component system paid off as the roadmap grew: Benny Card, Deals, and Boosts all launched into the same homepage structure without requiring a redesign.



---

## Launching the Benny Card

**An all-hands effort to ship Benny's flagship Visa credit card — from the physical card design to a full digital experience for a new cardholder.**

`consumer fintech` · `mobile` · `0→1`

### Context

Benny's original product gave SNAP households cash back on groceries through receipt scanning. The Benny Card expanded that mission — a real Visa credit card that earns 1% cash back on groceries, gas, and public transit, and helps users build credit for the first time. For many of our users, this would be their first credit card.

This was a full-stack design effort. I worked on the physical card itself — logo, colorways, print production — as well as every digital touchpoint: the waitlist experience, KYC and identity verification flows, card management, money movement, statements, Apple Wallet integration, and onboarding emails.

### Part 1 — The card itself

Before anything else, I needed to dial in the Benny logo. The inherited logo had never been printed at physical scale — it needed refinement before going on a card. I simplified the letterforms and reworked the mark so it held up both digitally and in embossed, debossed, and foil print applications.

The card launched in four colorways: Benny Blue (the flagship), Black, Pink, and White. Users chose their color during the application flow. I visited the St. Charles factory to review proofs and sign off on the final production run.

### Part 2 — The digital experience

The application flow needed to guide users through identity verification (KYC/IDV), address collection, and color selection — then resolve to one of three outcomes: approved, pending, or rejected. Each state had its own communication strategy, and the approved path needed to feel celebratory without being over the top.

Card management covered the cardholder dashboard, virtual card number reveal, freeze/unfreeze, PIN management, and the full transaction and statement experience. Add money (ACH) was designed for both a quick-add path and a custom-amount flow, each spec'd with all loading and error states.

→ _image: Application flow, card management, and money movement._

Apple Wallet integration was a highly requested feature from our waitlist. I designed the add-to-wallet flow and coordinated with Apple's provisioning requirements for card art and metadata.

Three onboarding emails guided new cardholders through their first week: add money, activate your physical card, and use it to save and build credit. Each email was designed alongside the in-app experience to feel like a coherent system.

### Results — 30K on the waitlist

30,000 users joined the Benny Card waitlist before launch. The friends and family launch in late 2025 went smoothly — all UX flows were approved by Visa and our issuing partners without revision. The card generated immediate enthusiasm from users who had never had a credit card before.



---

## Benny Deals

**Launching Benny's first monetized feature — brand-sponsored grocery deals that gave users more ways to save and gave Benny a path to revenue.**

`consumer fintech` · `mobile` · `growth`

### Context

SNAP cash back was Benny's flagship feature — but it cost the business money for every redemption. We needed a feature that was a win for both users and the business. Grocery deals fit the bill: brands pay Benny a fee for every deal redeemed, while users get cash back on specific items they were already buying.

App Store reviews confirmed the demand. Users consistently asked for more ways to save beyond SNAP. We partnered with Snipp — a deal aggregator — as a proof of concept to populate the app with an initial batch of deals, then used that to pitch individual brands directly.

### Product requirements — Deals need attribution

Deals had to be "activated" before a user bought the item. Without an activation step, a brand could argue the user would have bought the item anyway — activation establishes intent, which is what justifies their marketing spend. This shaped the entire UX: activation had to be intentional, not passive.

Snipp's initial batch had specific rules: expiration dates, store restrictions, redemption limits, and item specificity (some were brand-specific like "$1 off Sabra Hummus"; others were category-based like "$1 off any soda"). All of this needed to be surfaced clearly without overwhelming users.

### An early hypothesis — Would users love swiping?

We believed a fun, interactive experience would show more intent than a list. The hypothesis: a Tinder-style fullscreen card swipe would drive higher activation rates than a traditional list view. We decided to test both in parallel at launch and track activation rates across the two.

I designed a fullscreen swipe experience where swiping right added a deal and swiping left skipped it. As the user swiped, a sticker progressively faded in and the initial instructions faded out. I also explored having the swipe gesture work inline within the list view itself — queuing a deal like adding a song to a Spotify queue.

### The experience — Browse, add, redeem

Beyond swiping, users could add deals from a searchable, filterable list — organized by brand or store, with a shopping list view showing which deals you'd already added and how much you stood to save. A bottom sheet let users add deals contextually without leaving their current screen.

Redemption required uploading a receipt. The camera flow, review screen, and submission confirmation all needed to feel fast and trustworthy — users were used to the SNAP receipt flow, so we kept the patterns consistent.

→ _image: Swiping, browsing, and redeeming deals._

### Results — 12+ brand partnerships

Using the Snipp pilot as a proof of concept, we landed 12+ major brand partnerships — Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. For every new contract signed, we promoted the new products via email blast and push notification ("New deals just dropped!").

Deal redemption climbed toward half of SNAP offer redemption — on track to net equal while building the brand-side momentum needed to win larger marketing budgets.



---

## Benny Boosts

**Designing incentive mechanics to close the engagement gap between Deals and SNAP — and carving out a new space in the app for experimental features.**

`consumer fintech` · `mobile` · `growth`

### Context

Deals made Benny money; SNAP offers cost Benny money. Both gave the user money. The gap between them was the business model: we needed Deals redemption to reach parity with SNAP offer redemption to make the economics work.

We were closing in on the ratio, but not fast enough. Rather than incrementally tweaking the Deals UI, we ran a product discovery session to generate bigger structural ideas.

### First idea — "Exit through the gift shop"

The simplest lever: add friction to SNAP offer redemption. We moved the "Add receipt" button out of the global nav and placed it under the Deals tab — so users had to see their deals before they could submit a SNAP receipt. The metaphor was deliberate: like a museum exit through the gift shop, you pass through the thing we want you to see on your way to the thing you came for.

### Three frameworks — Gating, sweepstakes, and streaks

From our product discovery session, three distinct incentive mechanics emerged. Gating: users could unlock access to SNAP cash back by redeeming a deal first — making Deals a prerequisite, not an afterthought. Sweepstakes: each deal redeemed that month counted as one entry to win $100, with 50 winners drawn on a set date.

Streaks: users who redeemed multiple deals from the same brand would unlock a cash reward — rewarding loyalty to specific partners while giving brands a reason to invest more in their Benny presence.

I consolidated these three ideas into a single "Boosts" framework — a dedicated space in the app for time-limited, experimental incentives. This gave us a flexible container for future experiments without requiring a new surface each time.

### Results — A platform for experiments

Boosts became the home for a range of product experiments that lived alongside — and gradually replaced — the SNAP offer mechanics that had cost the business money. Each new brand contract came with a matching push and email campaign, and Boosts gave us a consistent in-app home for those promotions.



---

## UrbanFootprint App Homepage

**A new post-login homepage to serve both technical GIS power users and non-technical consultants — paired with a new design language built on Radix.**

`B2B SaaS` · `design systems` · `web`

### Context

UrbanFootprint is a geospatial platform with two distinct products: a mapping application for technical urban planners and GIS professionals, and a dashboards product for non-technical users like consultants and portfolio managers. The dashboards product shipped end of Q1 2024 — but by end of Q2, less than 4% of users had ever created a dashboard.

The root problem: after login, users landed directly in the last mapping project they'd worked on. Technical users wanted a project selection screen. Non-technical users didn't know dashboards existed at all. We needed a homepage that served both.

### The problem — Two users, one broken flow

"I'd prefer to have a landing page where I can select the project I want to open. Rather than directly loading the last project I worked on, which can be slow." — Urban planning customer (technical user)

"I saw dashboard examples during pre-sales, where can I find those?" — Consulting customer (non-technical user)

Our hypothesis: making dashboards discoverable via the homepage would at least double their usage. Showing users mapping projects their teammates recently edited would at least double collaboration — defined as projects with more than one editor.

### First design pass — Working within the existing system

My initial pass used UrbanFootprint's existing BlueprintJS component library to minimize engineering lift. The feedback from the engineering team changed the direction of the project.

"If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow." — Evan, Staff Frontend Engineer. "We've been talking about moving to Radix for a while. Why don't we make the homepage a separate application built on Radix?" — Matt, Senior Frontend Engineer.

BlueprintJS was opinionated and hard to maintain. Radix was unstyled by design — it gave us full control over the visual language without inheriting the legacy constraints. This made the homepage a natural place to define a new design language from scratch.

### Stakeholder alignment — A workshop to surface the real goals

Before a second design pass, I ran a workshop to align stakeholders on what should actually go on the homepage. The inputs were varied: the CEO wanted to see increasing collaboration signals. The VP of Sales wanted to use it as marketing real estate for new geospatial features. The VP of Product wanted dashboard discoverability front and center.

We critiqued external homepage references and distilled the competing requests into four jobs to be done: discoverability for new users, get the task at hand done, pick up where I left off (or where my colleague left off), and get help.

### Second design pass — A new design language

With the four jobs-to-be-done and the available Radix components as constraints, I designed a second pass. The PM feedback led to an important scope change: removing a sidebar in favor of a single unified view that mixed mapping projects and dashboards — simpler to build, and easier for users to learn.

→ _image: Final homepage design — projects and dashboards in one unified view._

### Results — Shipped Q4 2024

The homepage shipped beginning of Q4 2024. Looking ahead, the team planned to track dashboard creation and usage doubling, as well as multi-editor collaboration rates. The new design language from the homepage was slated to roll out across UrbanFootprint's other products in subsequent quarters.
