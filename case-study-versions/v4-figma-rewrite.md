# V4 — Figma rewrite

_Commit dace592 — the full rewrite from the portfolio deck / Figma slides ("a homepage built to scale")._


---

## Benny App: a homepage built to scale

**Unifying the mobile design system around one neutral building block — so the homepage could absorb every product line on the roadmap, and new users could find their first win faster.**

`consumer fintech` · `mobile` · `design systems`

### Context

I joined Benny in October 2024 as founding designer — the first full-time design hire, taking over product and brand from a remote contract designer who had shipped V1. Benny's cofounders met at Cash App, and the mission was personal to the whole team: SNAP recipients deal with outdated government websites and apps, and we wanted to build a premium product for an underserved population.

The project had two goals. First, unify the mobile design system so it could scale with the product lines on our roadmap — Benny Card, Deals, and affiliate links. Second, prompt new users toward their first moment of delight: when I started, only 21% of onboarded users ever earned cash back.

### The problem — A homepage with no neutral elements

The V1 homepage was busy with competing calls to action. I audited every element — banner, balances, promo cards, deals, SNAP offers — and found nothing neutral. Everything competed for attention. There were smaller nits too: side-by-side balance cards left empty space for the 97% of users with only one balance, the color palette had drifted from Benny blue, and onboarding instructions persisted long after setup.

→ _image: Auditing existing components: no neutral elements — everything competes for attention._

The structural problem was bigger than aesthetics. The roadmap called for adding Benny Card, Deals, and affiliate links to this screen, and the existing layout simply had no space to grow.

### Approach — Design for max and min states first

Before drawing anything, I defined the extremes. Maximum: a Benny cardholder with linked EBT balances and every section populated. Minimum: a brand-new user with nothing connected. After adding sections for the new product lines, the existing homepage's max state was untenable. Our redesign had to look and feel good no matter where a user was in their journey.

→ _image: Bounding the problem: the homepage had to hold up at both extremes._

### Design exploration — One neutral, extensible building block

The homepage is a hub that points to all corners of the platform — so I started with a building block that was neutral but extensible. The seed was a flexible menu-item component I'd built for our settings page. From there: it can have a subtitle. It can include an image. It can be arranged in a row, stacked into a list, or appended to a header card like a balance.

→ _image: The building block: one component that stacks, rows, and appends — shown here under the Benny Card balance._

Then I rebuilt the homepage section by section with the new component. Balances went from side-by-side cards to a single titled vertical stack with a simplified gradient. Offers split into clear sections with desaturated imagery and a shopping-list entry point. The promo carousel became a stacked component that could absorb future experiments, like games and surveys.

→ _image_

→ _image_

→ _image_

### Onboarding — From ignorable banner to interactive checklist

The second goal was getting new users to their first earn. The first idea was a bonus with a progress tracker — "Get $3 when you upload 3 SNAP receipts." That evolved into a steps carousel, and finally into a checklist that lived directly in the homepage: add deals to unlock savings, upload receipts to redeem cash back, link store accounts for effortless rewards.

→ _image: Onboarding evolution: bonus → steps carousel → checklist._

### Final design — From Times Square to Union Square

Our team was based in New York, so I described the journey this way: we went from Times Square — billboards competing for your attention — to Union Square: a unified visual language with clear hierarchy. The final homepage holds up at both min and max states, and every roadmap product line slots into the same structure.

→ _image: The shipped homepage, optimized for both min and max states._

### Measuring success — 70% more earners per signup

→ _image: The onboarding component drove 70% more earners per signup._

The simplified component language also informed Benny's new brand identity — the app redesign and the brand refresh fed each other.

→ _image: Simplifying components helped inform the new brand identity._



---

## Launching the Benny Card

**Benny's flagship credit card, empowering SNAP recipients to build credit and earn cash back — from the logo on the physical card to every screen of the digital experience.**

`consumer fintech` · `mobile` · `0→1`

### Context

Benny Card was the biggest bet on our roadmap: a real Visa credit card giving users 1% cash back on gas, groceries, and public transit, with built-in safeguards to help them avoid debt and a seamless way to build credit. For many of our users, this would be their first credit card — and unlike SNAP cash back, which cost the business money, the card earned interchange revenue on every transaction.

The design scope covered everything: the waitlist, KYC and identity verification, the application flow with approval, pending, and rejection states, transactions and statements, money movement, Apple Wallet, onboarding emails — and the physical card itself.

### But first — Dial in the logo

Before anything could be printed on plastic, the inherited logo needed work. I refined the letterforms and the mark to something that we would be proud to see embossed and foiled on our cards.

→ _image: The refined logo, ready for print._

### The physical card — Four colorways, front and back

The card shipped in four colorways — Benny Blue, Black, Pink, and White — and users picked their color during application. I designed the front and back layouts, then visited the St. Charles card factory to review proofs and sign off on production.

→ _image: Card design: four colorways, front and back._

→ _image: The card mailer: activate in three steps from the Benny App._

### The application — KYC, IDV, and every outcome state

The application flow verified identity through Plaid, collected a mailing address, and let users pick their card color. I spec'd the happy path first, then the longer path with full identity document verification — and designed distinct communication for each outcome: approval (your card is on its way), pending (we'll notify you in a few days), and rejection (a respectful, plain-language explanation).

→ _image: The KYC happy path — identity verification via Plaid._

→ _image: The longer path with IDV, spec'd end to end._

### The card tab — A home for the cardholder

The card tab brought everything together: the virtual card with personalized color, available spend, quick actions, recent activity with enriched transactions and cash back, and card management.

→ _image: The card tab: personalized color, quick actions, and recent activity._

→ _image: Apple Wallet support, so the card works before the plastic arrives._

Money movement had real constraints to design around: instant transfers required a $50 minimum to offset same-day ACH costs of around $1.50, while standard ACH took up to three business days.

→ _image: To offset same-day ACH costs: speed varies for money movement._

Onboarding emails guided new cardholders toward the key actions: add money, activate your physical card, and use Benny Card to save and build credit.

→ _image: Prompt users to add money and activate Benny Card._

### Measuring success — 30K on the waitlist

→ _image: 30K users joined the waitlist. All UX flows approved by partners. Successful friends & family launch in late 2025._

And because shipping a credit card is a team sport, I designed launch merch to celebrate — hoodies for the engineers, and a 1-of-1 quarter-zip for the CEO.

→ _image: Our Benny Card celebration merch._



---

## Benny Deals

**Benny's first monetized feature: brand-sponsored grocery deals. A win for users, a win for the business — and a test of whether swiping beats scrolling.**

`consumer fintech` · `mobile` · `growth`

### Context

We needed a win-win feature. SNAP cash back was a win for users but a cost to the business. Grocery deals would be a win for both: in our brand partnership proposal, for every dollar saved by the user, Benny would earn 50¢. App Store reviews confirmed users wanted more ways to save.

Rather than pitching brands one by one, we partnered with Snipp, a deal aggregator, to seed the app with a pilot batch — a proof of concept we could use to win direct contracts. Success was defined upfront: deal redemption becomes the new top KPI, and we land brand partnerships to expand the portfolio.

### Product requirements — Activation is what brands pay for

Deals had to be activated before the item is bought. Activation shows intent — the user bought this item specifically because they saw the deal in Benny. Without it, a brand could argue the user would have bought the item anyway. Attribution is what justifies their marketing spend.

Deals also had to honor Snipp's rules: expirations, store specifications, and redemption caps. Most deals were item-specific ("$1 off Sabra Hummus"), but some were category-wide ("$1 off any soda") — the UI had to handle both cleanly.

### Hypothesis — Users will love a swipe-style experience

We believed a fun, interactive way to show intent would be more effective than a list of deals. To test it, we launched both a swiping experience and a simpler list view, and tracked activation rates across the two.

One exploration we ultimately shelved: swiping right on a list item to add the deal inline, like queuing a song in Spotify.

### Prototypes — Making the swipe feel right

In the prototype, the feedback is progressive: as you swipe, a sticker fades in and the instructions fade out. Finish the stack and you get a completion moment — "Nice work! You added 5 deals, for up to $4.50 in savings."

→ _image: The completion moment after the last card._

### The full experience — Add from anywhere, redeem with a receipt

Beyond swiping, users could add deals from a searchable, filterable list — by brand or store — or through a bottom sheet without leaving their current screen. Added deals rolled up into a shopping-list view showing potential savings. Redemption reused the receipt-upload pattern users already knew from SNAP cash back, ending with an itemized "You earned $4.50!" breakdown.

→ _image: The shopping-list view: added deals and what they're worth._

### Measuring success — 12+ brand partnerships landed

By selling the story of the Snipp pilot, we booked direct contracts with Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. Every signed contract came with an email blast and push notification: "New deals just dropped!"

We kept optimizing after launch — and killed our darlings. The deal details page went from bottom sheet to full screen with better hierarchy. Search and filtering gave way to lightweight category chips, which also fixed a dead end where a keyword search could return nothing. And the swiping experience came out entirely: fun to build, but not performant — and the simple list kept winning.

The goal from here: get deal redemption to half of SNAP offer redemption — on the path to netting equal, while building momentum to win larger budgets from brands. That push became its own project: Benny Boosts.



---

## Benny Boosts

**Deals made us money. SNAP offers cost us money. Both paid the user. Boosts was the framework that tipped the balance — and gave experiments a permanent home in the app.**

`consumer fintech` · `mobile` · `growth`

### Context

Deals redemption was lagging SNAP offer redemption. Deals made us money, SNAP offers cost us money — both gave the user money. We wanted deal redemption to reach half of SNAP offer redemption: on the path to netting equal, while building momentum to win larger budgets from brands. We were closing the gap, but needed to move through brand budgets faster.

### First idea — "Exit through the gift shop"

The cheapest lever was friction. Instead of a global "Add receipt" button, we moved it under the Deals tab — so users had to pass their deals on the way to uploading a SNAP receipt, the way a museum routes you through the gift shop. I also explored a dynamic button whose state and label changed with the active subtab.

→ _image: The "Add receipt" button relocated into the Deals tab._

### Going bigger — Three ideas, one framework

Friction alone wouldn't close the gap, so we ran a product discovery session. Three ideas emerged: gating (unlock SNAP cash back by redeeming a deal first), sweepstakes (every deal redeemed is an entry to win $100), and streaks (redeem multiple deals from the same brand for a cash reward). The design challenge was consolidating all three under a single framework — Boosts.

→ _image: The three mechanics, consolidated under the Boosts framework._

### Shipped — Sweepstakes and gated offers

→ _image: Sweepstakes: every deal redeemed is an entry._

→ _image: Gating: SNAP offers unlock by engaging with deals._

The shipped framework rebranded SNAP offers as "SNAP Boosts" — locked until the user redeemed a deal — with deal-group bonuses and seasonal sweepstakes living in the same space.

### Measuring success — Retention nearly tripled

90-day retention for earners went from under 20% to 54%. Our hypothesis: the monthly unlocking cadence of SNAP Boosts gave users a reason to keep coming back — and built a habit. Beyond the metric, Boosts carved out a permanent space in the app for experimental features: new incentive mechanics could ship into the same surface without inventing a new one each time.



---

## UrbanFootprint App Homepage

**A post-login homepage serving two very different users — GIS power users and non-technical consultants — and the start of a new design language built on Radix.**

`B2B SaaS` · `web` · `design systems`

### Context

UrbanFootprint pairs two products: mapping for geospatial users who upload and edit data layers, and dashboards for generalists who want data at a glance. Dashboards shipped at the end of Q1 2024 — and by the end of Q2, less than 4% of users had ever created one. The product built for non-technical users was invisible to them.

The root cause was the post-login flow: users were dropped straight into the last mapping project they'd opened.

### The problem — One flow failing two audiences

→ _image: The post-login flow wasn't ideal for either user profile._

The hypothesis: a homepage could solve both needs. Sub-hypotheses, stated upfront — surfacing teammates' recently edited projects would at least double collaboration (projects with multiple editors), and making dashboards discoverable would at least double their usage from 4%.

### First design pass — Engineering feedback changed the plan

My first pass used the existing design library and codebase to minimize engineering lift. The engineers pushed back. "If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow," said Evan. Matt's counter-proposal: "We've been talking about moving to Radix for a while. Why don't we make the homepage a separate application built on Radix that points to the mapping and dashboards applications?"

→ _image: A first mock designed to minimize engineering lift._

It was the right call. UrbanFootprint was built on BlueprintJS — useful early, but opinionated and hard to evolve. Radix is unstyled by design, which meant the homepage could become the proving ground for a design language defined from scratch.

→ _image: Designing the component set for the homepage — the seed of the new design language._

### Alignment — Three executives, four jobs to be done

Everyone wanted something different from the homepage. The CEO wanted visible collaboration — see that your teammate just created a dashboard. The VP of Sales wanted marketing for new geospatial features. The VP of Product wanted dashboard templates front and center to attack the discoverability problem.

→ _image: I pulled together references for leadership to critique._

I ran a workshop critiquing external homepage references, and we distilled the asks into four jobs to be done: discoverability for new users, get the task at hand done, pick up where I (or my colleague) left off, and get help.

→ _image: I ended the workshop by having folks align on "jobs to be done."_

### Second design pass — Designing within real constraints

The second pass was drawn with the available Radix components and the four jobs-to-be-done in mind.

→ _image: The second pass with our new design language._

PM feedback sharpened it further: the one-click "create dashboard" button couldn't exist in v1, and mixing dashboards and projects in a single view would be easier to build — and easier for users to learn. Action item: explore a sidebar-less homepage.

→ _image: The final spec: one unified view of projects, dashboards, and templates with real use-case descriptions._

### Next steps — Shipped early Q4

The homepage entered development on schedule for an early-October release. The plan from there: refresh the legacy design language across UrbanFootprint's products to match the homepage, track whether dashboard creation and collaboration double as hypothesized, and add a notification system so users can see team activity history.

→ _image: Looking ahead: design language rollout, metrics, and notifications._
