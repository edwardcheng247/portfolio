# V5 — Current

_Current HEAD — the live, refined copy._


---

## Benny App: a homepage built to scale

**Unifying the mobile design system — so the homepage could absorb every product line on the roadmap, and new users could find their first win faster.**

`consumer fintech` · `mobile` · `design systems`

### Context

I joined Benny in October 2024 as the founding designer — the first full-time design hire, taking over product and brand from a remote contractor who had shipped V1. Our cofounders met at Cash App, and the mission was personal to the whole team: SNAP recipients are stuck with outdated government websites and apps, and we wanted to build a premium product for a population that's too often underserved.

I came in with two goals. First, I wanted to unify the mobile design system so it could scale with the product lines on our roadmap — Benny Card, Deals, and affiliate links. Second, I wanted to guide new users toward their first moment of delight: when I started, only 21% of onboarded users ever earned cash back.

### The problem — A homepage with no neutral elements

The V1 homepage was busy with competing calls to action. I audited every element — the banner, balances, promo cards, deals, SNAP offers — and found that nothing was neutral; everything was fighting for attention. There were smaller nits, too: the side-by-side balance cards left dead space for the 97% of users with only one balance, the palette had drifted away from Benny blue, and onboarding instructions stuck around long after setup.

→ _image: My audit of the existing components: nothing neutral, everything competing for attention._

But the real problem was structural, not just visual. The roadmap called for adding Benny Card, Deals, and affiliate links to this same screen, and the existing layout simply had nowhere to grow.

### Approach — Design for max and min states first

Before drawing anything, I defined the extremes. At the maximum, a Benny cardholder with linked EBT balances and every section populated; at the minimum, a brand-new user with nothing connected yet. Once I added sections for the new product lines, the existing homepage's max state fell apart. Our redesign had to look and feel good no matter where a user was in their journey.

→ _image: Bounding the problem: the homepage had to hold up at both extremes._

### Design exploration — One neutral, extensible building block

The homepage is a hub that points to every corner of the platform, so I started from a building block that was neutral but extensible. The seed was a flexible menu-item component I'd built for our settings page. From there it could grow: it can carry a subtitle, hold an image, sit in a row, stack into a list, or attach to a header card like a balance.

→ _image: The building block: one component that stacks, rows, and appends — shown here under the Benny Card balance._

Then I rebuilt the homepage section by section with the new component. Balances went from side-by-side cards to a single titled vertical stack with a simplified gradient. Offers split into clear sections with desaturated imagery and a shopping-list entry point. And the promo carousel became a stacked component that could absorb whatever we wanted to try next, like games and surveys.

→ _image: Simplifying each section on the homepage using our new component._

### Onboarding — From ignorable banner to interactive checklist

My second goal was getting new users to their first earn. I started with a bonus and a progress tracker — "Get $3 when you upload 3 SNAP receipts." That evolved into a steps carousel, and finally into a checklist that lived right on the homepage: add deals to unlock savings, upload receipts to redeem cash back, and link store accounts for effortless rewards.

→ _image: Onboarding evolution: bonus → steps carousel → checklist._

### Final design — From Times Square to Union Square

Our team was based in New York, so I liked to describe the journey this way: we went from Times Square, where every billboard is screaming for your attention, to Union Square — a unified visual language with clear hierarchy. The final homepage holds up at both its min and max states, and every product line on the roadmap slots into the same structure.

→ _image: The shipped homepage, optimized for both min and max states._

### Measuring success — 70% more earners per signup

To the whole team's delight, the new onboarding component drove a 70% improvement in earners per signup — moving new-user conversion from 21% to 36%.

→ _image: The new onboarding component drove a 70% increase in earners per signup._



---

## Launching the Benny Card

**Benny's flagship credit card, empowering SNAP recipients to build credit and earn cash back — from the logo on the physical card to every screen of the digital experience.**

`consumer fintech` · `mobile` · `0→1`

### Context

Benny Card was the biggest bet on our roadmap: a real Visa credit card that gives users 1% cash back on gas, groceries, and public transit, with built-in safeguards to help them avoid debt and a seamless way to build credit. For many of our users, this would be their very first credit card — and unlike SNAP cash back, which cost the business money, the card earned interchange revenue on every transaction.

The design scope covered just about everything: the waitlist, KYC and identity verification, the application flow with its approval, pending, and rejection states, transactions and statements, money movement, Apple Wallet, onboarding emails — and, of course, the physical card itself.

### But first — Dial in the logo

Before anything could be printed on plastic, the inherited logo needed work. I refined the letterforms and the mark into something we'd be proud to see embossed and foiled on our cards for years to come.

→ _image: The refined logos, ready to be embossed and foiled._

### The physical card — Four colorways, front and back

The card shipped in four colorways — Benny Blue, Black, Pink, and White — and users picked their color during the application. I designed the front and back layouts, then took a trip to the card factory in St. Charles, Illinois to review the proofs and sign off on production. Watching the cards come off the line was a thrilling, surreal moment.

→ _image: Card design: four colorways, front and back._

→ _image: The card mailer: activate in three steps from the Benny App._

### The application — KYC, IDV, and every outcome state

The application flow verified identity through Plaid, collected a mailing address, and let users pick their card color. I spec'd the happy path first, then the longer path with full identity document verification — and designed distinct communication for each outcome: approval, pending, and rejection.

→ _image: The KYC happy path — identity verification via Plaid._

→ _image: The longer path with IDV, spec'd end to end._

### The card tab — A home for the cardholder

The card tab brought everything together: the virtual card in the user's chosen color, available spend, quick actions, recent activity with enriched transactions and cash back, and card management — one home for the cardholder.

→ _image: The card tab: personalized color, quick actions, and recent activity._

→ _image: Apple Wallet support, so the card works before the plastic arrives._

Money movement came with real constraints to design around: instant transfers required a $50 minimum to offset same-day ACH costs of around $1.50, while standard ACH took up to three business days.

→ _image: Speed varies for money movement, to offset same-day ACH costs._

A series of onboarding emails guided new cardholders toward the actions that mattered: add money, activate your physical card, and start using Benny Card to save and build credit.

→ _image: Prompt users to add money and activate Benny Card._

### Measuring success — 30K on the waitlist

→ _image: 30K users joined the waitlist. All UX flows approved by partners. Successful friends & family launch in late 2025._

And because shipping a credit card is very much a team sport, I designed some launch merch to celebrate — hoodies for the engineers, and a 1-of-1 quarter-zip for the CEO.

→ _image: Our Benny Card celebration merch._



---

## Benny Deals

**Benny's first monetized feature: brand-sponsored grocery deals. A win for users, a win for the business — and a test of whether swiping beats scrolling.**

`consumer fintech` · `mobile` · `growth`

### Context

We needed a win-win feature. SNAP cash back was a win for users, but a cost to the business. Grocery deals would be a win for both: in our brand partnership proposal, for every dollar a user saved, Benny would earn 50¢. And our App Store reviews confirmed it — users wanted more ways to save.

Rather than pitching brands one by one, we partnered with Snipp, a deal aggregator, to seed the app with a pilot batch — a proof of concept we could use to win direct contracts. We defined success upfront: deal redemption becomes the new top KPI, and we land brand partnerships to grow the portfolio.

### Product requirements — Activation is what brands pay for

Deals had to be activated before the item was bought. Activation is what shows intent — the user bought this item specifically because they saw the deal in Benny. Without it, a brand could argue the user would have bought the item anyway, and attribution is exactly what justifies their marketing spend.

Deals also had to honor Snipp's rules: expirations, store specifications, and redemption caps. Most deals were item-specific ("$1 off Sabra Hummus"), but some were category-wide ("$1 off any soda"), so the UI had to handle both cleanly.

### Hypothesis — Users will love a swipe-style experience

We had a hunch that a fun, interactive way to show intent would beat a plain list of deals. To find out, we launched both a swiping experience and a simpler list view, and tracked activation rates across the two.

One exploration we ended up shelving: swiping right on a list item to add the deal inline, the way you queue a song in Spotify.

### Prototypes — Making the swipe feel right

In the prototype, the feedback is progressive: as you swipe, a sticker fades in while the instructions fade out. Finish the stack and you're rewarded with a completion moment — "Nice work! You added 5 deals, for up to $4.50 in savings."

→ _image: The completion moment after the last card._

### The full experience — Add from anywhere, redeem with a receipt

Beyond swiping, users could add deals from a searchable, filterable list — by brand or store — or through a bottom sheet without ever leaving their current screen. Added deals rolled up into a shopping-list view that showed their potential savings. For redemption, I reused the receipt-upload pattern users already knew from SNAP cash back, ending with an itemized "You earned $4.50!" breakdown.

→ _image: The shopping-list view: added deals and what they're worth._

### Measuring success — 12+ brand partnerships landed

By selling the story of the Snipp pilot, we booked direct contracts with Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. Every signed contract came with its own email blast and push notification: "New deals just dropped!"

We kept optimizing after launch — and killed a few darlings along the way. The deal details page went from a bottom sheet to a full screen with better hierarchy. Search and filtering gave way to lightweight category chips, which also fixed a dead end where a keyword search could return nothing. And the swiping experience came out entirely: it was fun to build, but it wasn't performant, and the simple list just kept winning.

The goal from here was to get deal redemption to half of SNAP offer redemption — on the path to netting equal, while building momentum to win larger budgets from brands. That push became its own project: Benny Boosts.



---

## Benny Boosts

**Deals made us money. SNAP offers cost us money. Both paid the user. Boosts was the framework that tipped the balance — and gave experiments a permanent home in the app.**

`consumer fintech` · `mobile` · `growth`

### Context

Deal redemption was still lagging SNAP offer redemption. Deals made us money and SNAP offers cost us money — but both put money in the user's pocket. We wanted deal redemption to reach half of SNAP offer redemption: on the path to netting equal, while building momentum to win larger budgets from brands. We were closing the gap, but we needed to move through brand budgets faster.

### First idea — "Exit through the gift shop"

The cheapest lever was friction. Instead of a global "Add receipt" button, we moved it under the Deals tab — so users had to pass their deals on the way to uploading a SNAP receipt, the same way a museum routes you out through the gift shop. I also explored a dynamic button whose state and label shifted with the active subtab.

→ _image: The "Add receipt" button relocated into the Deals tab._

### Going bigger — Three ideas, one framework

Friction alone wouldn't close the gap, so we ran a product discovery session. Three ideas came out of it: gating (unlock SNAP cash back by redeeming a deal first), sweepstakes (every deal redeemed is an entry to win $100), and streaks (redeem multiple deals from the same brand for a cash reward). The real design challenge was consolidating all three under a single framework — Boosts.

→ _image: The three mechanics, consolidated under the Boosts framework._

### Shipped — Sweepstakes and gated offers

→ _image: Sweepstakes: every deal redeemed is an entry._

→ _image: Gating: SNAP offers unlock by engaging with deals._

The shipped framework rebranded SNAP offers as "SNAP Boosts" — locked until the user redeemed a deal — with deal-group bonuses and seasonal sweepstakes all living in the same space.

### Measuring success — Retention nearly tripled

90-day retention for earners went from under 20% to 54%. Our hypothesis is that the monthly unlocking cadence of SNAP Boosts gave users a reason to keep coming back — and quietly built a habit. Beyond the metric, Boosts carved out a permanent home in the app for experimental features: new incentive mechanics could ship into the same surface without us having to invent a new one each time.



---

## UrbanFootprint App Homepage

**A post-login homepage serving two very different users — GIS power users and non-technical consultants — and the start of a new design language built on Radix.**

`B2B SaaS` · `web` · `design systems`

### Context

UrbanFootprint pairs two products: mapping for geospatial users who upload and edit data layers, and dashboards for generalists who just want data at a glance. Dashboards shipped at the end of Q1 2024 — and by the end of Q2, fewer than 4% of users had ever created one. The product we'd built for non-technical users was effectively invisible to them.

### The problem — One flow failing two audiences

The root cause was the post-login flow: users were dropped straight into the last mapping project they'd opened, with no chance to go anywhere else first.

→ _image: The post-login flow wasn't ideal for either user profile._

My hypothesis was that a homepage could solve both needs at once. I stated two sub-hypotheses upfront: surfacing teammates' recently edited projects would at least double collaboration (projects with multiple editors), and making dashboards discoverable would at least double their usage from 4%.

### First design pass — Engineering feedback changed the plan

My first pass leaned on the existing design library and codebase to minimize engineering lift. The engineers pushed back. "If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow," Evan told me. Matt had a counter-proposal: "We've been talking about moving to Radix for a while. Why don't we make the homepage a separate application built on Radix that points to the mapping and dashboards applications?"

→ _image: A first mock designed to minimize engineering lift._

It was the right call. UrbanFootprint was built on BlueprintJS — useful early on, but opinionated and hard to evolve. Radix is unstyled by design, which meant the homepage could become the proving ground for a design language we defined from scratch.

→ _image: Designing the component set for the homepage — the seed of the new design language._

### Alignment — Three executives, four jobs to be done

Everyone wanted something different from the homepage. The CEO wanted visible collaboration — to see that your teammate had just created a dashboard. The VP of Sales wanted marketing for new geospatial features. And the VP of Product wanted dashboard templates front and center to attack the discoverability problem head-on.

→ _image: I pulled together references for leadership to critique._

I ran a workshop where we critiqued external homepage references together, then distilled everyone's asks into four jobs to be done: discoverability for new users, getting the task at hand done, picking up where I (or my colleague) left off, and getting help.

→ _image: I ended the workshop by having folks align on "jobs to be done."_

### Second design pass — Designing within real constraints

I drew the second pass with the available Radix components and those four jobs-to-be-done firmly in mind.

→ _image: The second pass with our new design language._

PM feedback sharpened it further: the one-click "create dashboard" button couldn't exist in v1, and mixing dashboards and projects in a single view would be easier to build — and easier for users to learn. My action item: explore a sidebar-less homepage.

→ _image: The final spec: one unified view of projects, dashboards, and templates with real use-case descriptions._

### Features — Refining the edges

To give users full control over all their assets, they can also see a condensed table view of every project and dashboard in their org, along with metadata and editing actions:

→ _image: The table view gives users even more control over their projects._

And from the nav menu, users can search across all the assets in their org, or switch orgs altogether.

→ _image: Users can search on both dashboards and projects._

→ _image: Users can switch orgs if they are part of multiple._

### Next steps — Shipped early Q4

The homepage entered development on schedule for an early-October release. The plan from there was to refresh the legacy design language across UrbanFootprint's products to match the homepage, track whether dashboard creation and collaboration doubled as I'd hypothesized, and add a notification system so users could see their team's activity history.

→ _image: Looking ahead: users receive notifications of teammate activity._
