# V3 — "Scaling the Benny App" (revised)

_From the previous session transcript — the revised 5-project copy that this session inherited, just before the Figma rewrite._


---

## Scaling the Benny App

**Rebuilding Benny’s homepage around one modular component — so a scrappy V1 could grow into a platform, as the user base grew from 3K to 300K.**

`consumer fintech` · `mobile` · `design systems`

### Context

Benny pays SNAP recipients cash back on their grocery spend. I joined in October 2024 as founding designer, right as the V1 app — built with a remote contract designer — was launching. The roadmap ahead was ambitious: SNAP cash back was the only live feature, and it cost the business money on every redemption. Deals, affiliate links, and the Benny Card all needed homes on the homepage, and all needed to make money.

My goal was twofold: unify the mobile design system so it could scale with those new product lines, and prompt new users toward their first moment of delight. At the time, only 21% of onboarded users had ever earned cash back.

### The problem — No neutral elements

Auditing the homepage section by section: a banner, the Benny Card promo, SNAP balances, promo cards, deals, and SNAP offers — every one of them loud, colorful, and competing for attention. Side-by-side SNAP and EBT cash balances wasted half the row for the 97% of users who only had one. Onboarding instructions persisted long after users had finished setting up. And the loud accent colors had drifted far from Benny blue.

→ _image: Auditing the current state: everything competes for attention._

The deeper problem was structural. The roadmap called for adding Benny Card, Deals, and affiliate links to this screen — and the existing layout had no room to grow. Dropping new sections into it would make the max state completely untenable.

→ _image: The V1 homepage — busy with competing calls to action, and no space for what was coming._

### The approach — One building block, max and min states

The homepage is a hub that points to every corner of the platform — so rather than redesigning each section independently, I started with a single building block: neutral by default, extensible by design. It could take a subtitle, an icon or image, be arranged in rows, stacked into lists, or appended below a header card. The seed of it came from a flexible menu-item component I’d already built for our settings page.

→ _image: The building block — neutral, stackable, and composable with header cards._

I also designed for max and min states from day one. A power user with a Benny Card, linked EBT balances, and active deals — and a brand-new user with none of those — both needed a homepage that looked and felt right.

→ _image: Max and min states, side by side, at every design review._

### Execution — Simplify each section

Balances: consolidated into one vertically stacked section with a clear title and a simpler gradient — and the Benny Card balance slotted into the same component for cardholders. Offers: SNAP and bank card offers had been separate, noisy sections; I unified them under a single “Deals for you” entry point, desaturated the product imagery, and reduced the emphasis on SNAP cash back — the feature that cost us money.

→ _image: Working through the homepage, section by section._

The persistent onboarding instructions became their own project. The design evolved through three versions — a bonus progress tracker, then a steps carousel, and finally an interactive checklist that walks new users through each step of earning: activate deals, upload receipts, link store accounts.

→ _image: Onboarding evolution — bonus → steps carousel → checklist._

### Results — From Times Square to Union Square

The onboarding checklist drove a 70% increase in earners per signup. The simplified components went on to inform Benny’s new brand identity — anchored in a single blue, with the loud accent colors gone. And the modular structure paid off immediately: Benny Card, Deals, and Boosts all launched into the same homepage without a redesign.

→ _image: The homepage system informed the brand refresh that followed._

Our team was based in New York, so I described the journey this way: from Times Square — billboards competing for your attention — to Union Square. A unified visual language, with clearer hierarchy.

→ _image: Before and after._



---

## Launching the Benny Card

**Benny’s flagship Visa credit card, designed end to end — from the wordmark on the physical card to every screen of the application, money movement, and cardholder experience.**

`consumer fintech` · `mobile` · `0→1`

### Context

The Benny Card was the centerpiece of Benny’s business model: a real Visa credit card giving users 1% cash back on gas, groceries, and public transit — while earning Benny 1.5% interchange on other transactions. For many of our users, it would be their first credit card, with built-in safeguards to help them build credit without falling into debt.

The design scope covered everything: the physical card and its print production, the waitlist, KYC and identity verification, approval and rejection states, card management, money movement, transactions and statements, Apple Wallet — and the onboarding emails that tied it together.

### Part 1 — First, fix the logo

Before anything could be printed, the inherited logo needed work. I revisited the Benny wordmark and dialed the stylization down — more readable, still distinctive — and built out additional letterforms to create a proper “Benny Card” lockup.

→ _image: The refined wordmark, and the new Benny Card lockup._

The card launched in four colorways — Benny Blue, Black, Pink, and White — chosen by the user during the application flow. I designed the front and back of each, plus the trifold mailer it arrived in, and visited the St. Charles card factory to review proofs and sign off on production.

→ _image: The trifold mailer — “Meet your new Benny Card,” with activation in three steps._

### Part 2 — The application

The card tab moved through three states — waitlist, unlockable, unlocked — before a user ever applied. The application itself ran through education, Plaid-powered identity verification, address confirmation, and color selection, then resolved to approved, pending, or rejected. I spec’d every path: the happy path, the longer IDV path for users needing extra verification, and the rejection flow, which gracefully removed the card tab rather than leaving a dead end.

→ _image: KYC/IDV happy path — education, Plaid Layer, authentication, color selection._

→ _image: The longer IDV path, spec’d through approval, pending, and rejection._

### Part 3 — Life as a cardholder

The cardholder dashboard put the personalized card color front and center, with quick actions for adding money, recent activity, and card management — support, credit journey, payment settings. Money movement had real constraints to design around: instant transfers required a $50 minimum to offset same-day ACH costs, while standard transfers took up to three days. Transactions needed states for pending, returned, complete, and declined — plus a category icon system for when Visa’s data enrichment couldn’t find a merchant logo.

→ _image: The cardholder view — personalized color, quick actions, activity, and management._

Apple Wallet support was the most-requested feature from our waitlist, and three onboarding emails guided new cardholders through their first week: add money, activate your physical card, start building credit.

→ _image: Add to Apple Wallet — the most-requested feature from the waitlist._

### Results — 30K on the waitlist

30K users joined the card waitlist. Every UX flow was approved by our banking partners, and the card had a successful friends & family launch in late 2025. To celebrate the team effort, I designed merch — hoodies for the engineers, and Wordle-themed totes with the starting word changed to “CARDS.”

→ _image: 30K waitlist signups, partner-approved flows, and a friends & family launch._



---

## Benny Deals

**Benny’s first monetized feature — brand-sponsored grocery deals that gave users more ways to save, and gave Benny its first revenue stream.**

`consumer fintech` · `mobile` · `growth`

### Context

Benny was the first app to give cash back on SNAP spend — a huge win for users, but also our biggest user acquisition cost. We needed a win-win feature. Grocery deals fit: brands fund cash back on specific items, and in our partnership model, for every dollar a user saved, Benny earned 50¢. App Store reviews confirmed the appetite — users kept asking for more ways to save.

Rather than pitching brands one by one, we partnered with Snipp, a deal aggregator, to seed the app with an initial batch of deals — a pilot we could later use to pitch brands directly.

### Product requirements — Deals need attribution

A deal had to be “added” before the item was bought. That activation step shows intent — the user bought this item because they saw it in Benny. Without it, a brand could argue the user would have bought it anyway. Attribution is what justifies their marketing spend, and it shaped the entire UX: adding a deal had to be deliberate, not passive.

### An early hypothesis — Users will love swiping

We believed a fun, interactive way to show intent would outperform a plain list. The plan: launch both a Tinder-style fullscreen swipe experience and a simple list view, then compare activation rates between the two.

→ _image: The swiping pass — as the user swipes, a sticker fades in and instructions fade out._

→ _image: Completion — “Nice work!” — then into the Deals tab to keep browsing._

### The experience — Browse, add, redeem

Beyond swiping, users could add deals from a searchable, filterable list — by brand or by store — with a shopping-list view showing everything they’d added and how much they stood to save. Redemption ended on a celebratory screen itemizing exactly what they’d earned.

→ _image: The shopping-list view — added deals, savings at a glance._

### Iterating — Kill your darlings

Post-launch, we kept optimizing. The deal details page went from a bottom sheet to a full screen with a larger product image and better hierarchy. Search and filtering gave way to lightweight category chips — which also solved a dead end where a keyword search returned nothing. And the swiping experience? We removed it entirely. It was a fun feature to build, but it wasn’t performant — and the simple list kept winning.

### Results — 12+ brand partnerships

Deal redemption became the company’s top KPI. Selling the story of the Snipp pilot landed 12+ major brand partnerships — Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. Every contract signed came with an email and push campaign: “New deals just dropped!” The goal was for Deals redemption to reach half of SNAP offer redemption — on the path to netting equal, while building the momentum to win larger brand budgets.



---

## Benny Boosts

**Incentive mechanics to close the gap between the feature that made money and the feature that cost it — and a new home for product experiments.**

`consumer fintech` · `mobile` · `growth`

### Context

Deals made Benny money; SNAP offers cost Benny money. Both gave the user money. The economics only worked if Deals redemption caught up to SNAP redemption — and while we were closing in on the ratio, we weren’t moving through brand budgets fast enough.

### First idea — Exit through the gift shop

The simplest lever: add friction to SNAP receipt uploads. The “Add receipt” button had been global — at one point we’d even made it more prominent, and users would pop into the app and hit the money button without seeing anything else. We moved it under the Deals tab, so users had to pass our deals on the way to their receipt — like a museum routing you through the gift shop on the way out.

→ _image: The static “Add receipt” button, now inside the Deals tab._

### Going bigger — Three ideas, one framework

A product discovery session produced three mechanics: gating — unlock SNAP cash back by redeeming a deal first; streaks — redeem multiple deals from one brand for a cash reward; and sweepstakes — every deal redeemed is an entry to win $100. The challenge was consolidating them into a single framework rather than shipping three disconnected features.

→ _image: Three mechanics from the discovery session — and the consolidation challenge._

The answer was Boosts: a new sub-tab that replaced SNAP offers entirely. SNAP cash back was rebranded as “SNAP Boosts,” locked until the user redeemed one deal each month. Deal-group bonuses and seasonal sweepstakes lived in the same space — giving us a permanent home for incentive experiments.

→ _image: Gating — SNAP Boosts unlock when the user redeems a deal._

→ _image: Sweepstakes — every deal redeemed is an entry to win $100._

### Results — Retention nearly tripled

90-day retention for earners went from under 20% to 54%. Our hypothesis: the monthly unlocking cadence of SNAP Boosts gave users a reason to come back and build a habit. Boosts also became the platform for experiments that gradually replaced the SNAP mechanics that had cost the business money — each new brand contract launching with its own push and email campaign into the same space.



---

## UrbanFootprint App Homepage

**A post-login homepage serving both GIS power users and non-technical consultants — and the start of a new design language built on Radix.**

`B2B SaaS` · `design systems` · `web`

### Context

UrbanFootprint is a geospatial platform with two products: a mapping app for technical urban planners, and a dashboards product built for non-technical users — consultants, portfolio managers. Dashboards shipped at the end of Q1 2024. By the end of Q2, less than 4% of users had ever created one.

The culprit was the post-login flow: users were dropped directly into the last mapping project they’d opened. Technical users wanted a project picker. Non-technical users had no idea dashboards existed.

### The problem — Two users, one broken flow

“I’d prefer a landing page where I can select the project I want to open. Rather than directly loading the last project I worked on, which can be slow.” — urban planning customer. “I saw dashboard examples during pre-sales, where can I find those?” — consulting customer.

→ _image: The post-login flow wasn’t ideal for either user profile._

The hypothesis: one homepage could solve both. Showing teammates’ recently edited mapping projects would at least double project collaboration, and making dashboards discoverable would at least double their usage.

### First pass — Engineering changed the direction

My first pass used UrbanFootprint’s existing BlueprintJS library to minimize engineering lift. The engineers pushed back — building on the existing app codebase would drag in everything and load slowly. Their counterproposal: make the homepage a separate application built on Radix, an unstyled React component library, and let it point into the mapping and dashboards apps.

That unlocked something bigger. BlueprintJS was opinionated and had fallen behind modern visual standards; Radix’s unstyled components meant we could define UrbanFootprint’s design language from scratch — and maintain it.

→ _image: The start of a new design system — typography, states, and components for the homepage._

### Alignment — Everyone wanted something different

The CEO wanted collaboration signals — see what your teammates just edited. The VP of Sales wanted marketing real estate for new features. The VP of Product wanted dashboard discoverability front and center. I ran a workshop critiquing external homepage references, and we distilled the competing asks into four jobs to be done: discover what’s possible, get the task at hand done, pick up where I (or a colleague) left off, and get help.

→ _image: Second pass — designed against the four jobs-to-be-done, with Radix components in mind._

PM feedback sharpened it further: the one-click “new dashboard” button couldn’t exist in v1, and projects and dashboards should mix in a single view — easier to build, and users would acclimate to one screen. That pushed the final design to drop the sidebar entirely.

### The design — One unified view

→ _image: The final spec — recent dashboards, recent projects, example dashboards, and a What’s New feed._

### Results — Shipped Q4 2024

The homepage shipped at the beginning of Q4 2024 — designed in Q2, built in Q3. The new design language was slated to roll out across UrbanFootprint’s other products, with success measured against the original hypothesis: doubling dashboard creation and usage, and doubling multi-editor collaboration. Next on the roadmap: a notification system so users could see their team’s activity history right from the homepage.

→ _image: Next steps — team activity notifications, mocked for a future release._
