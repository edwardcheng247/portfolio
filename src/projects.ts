export interface Collaborator {
  name: string
  role: string
}

export interface ContentBlock {
  type: 'text' | 'image' | 'image-pair'
  value?: string
  src?: string
  srcs?: [string, string]
  alt?: string
  caption?: string
  href?: string
}

export interface ProjectSection {
  label: string
  heading?: string
  blocks: ContentBlock[]
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  heroImage: string
  tags?: string[]
  collaborators: Collaborator[]
  context: ContentBlock[]
  sections: ProjectSection[]
}

export interface WorkCard {
  // A card with a slug links to /project/<slug> and shows a "Read Case Study"
  // tooltip subtitle. A card without a slug is display-only (no link, no subtitle).
  slug?: string
  title: string
  image: string
  imageMobile?: string
  width: number
  height: number
}

// Homepage "Selected work" order — single source of truth.
// Reordering this array reorders both the homepage grid and the
// Home / next-project links on each project page. The first card renders
// full-width on top; the rest fill two rows. Cards without a slug are
// stashed (visible but not clickable, omitted from project navigation).
export const workCards: WorkCard[] = [
  { slug: 'benny-app', title: 'Benny App', image: '/benny_app.png', imageMobile: '/benny_app_mobile.png', width: 2070, height: 844 },
  { slug: 'benny-card', title: 'Benny Card', image: '/benny_card.png', width: 1642, height: 844 },
  { slug: 'urbanfootprint', title: 'UrbanFootprint', image: '/urbanfootprint_series_b.png', width: 1390, height: 704 },
  { title: 'Benny API', image: '/benny_merchants.png', imageMobile: '/benny_merchants_mobile.png', width: 1014, height: 2332 },
  { title: 'Benny Dashboards', image: '/benny_dashboards.png', width: 2502, height: 3132 },
]

export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────
  // 1. Benny App — setting up a system to scale (1 → N)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-app',
    title: 'Benny App: a homepage built to scale',
    subtitle: 'Unifying the mobile design system around one neutral building block — so the homepage could absorb every product line on the roadmap, and new users could find their first win faster.',
    heroImage: '/benny_app.png',
    tags: ['consumer fintech', 'mobile', 'design systems'],
    collaborators: [
      { name: 'Surabhi Jain', role: 'Founding Engineer' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Steve Austin', role: 'CTO' },
    ],
    context: [
      {
        type: 'text',
        value: 'I joined Benny in October 2024 as founding designer — the first full-time design hire, taking over product and brand from a remote contract designer who had shipped V1. Benny\'s cofounders met at Cash App, and the mission was personal to the whole team: SNAP recipients deal with outdated government websites and apps, and we wanted to build a premium product for an underserved population.',
      },
      {
        type: 'text',
        value: 'The project had two goals. First, unify the mobile design system so it could scale with the product lines on our roadmap — Benny Card, Deals, and affiliate links. Second, prompt new users toward their first moment of delight: when I started, only 21% of onboarded users ever earned cash back.',
      },
    ],
    sections: [
      {
        label: 'The problem',
        heading: 'A homepage with no neutral elements',
        blocks: [
          {
            type: 'text',
            value: 'The V1 homepage was busy with competing calls to action. I audited every element — banner, balances, promo cards, deals, SNAP offers — and found nothing neutral. Everything competed for attention. There were smaller nits too: side-by-side balance cards left empty space for the 97% of users with only one balance, the color palette had drifted from Benny blue, and onboarding instructions persisted long after setup.',
          },
          {
            type: 'image',
            src: '/slide-benny-app-audit.png',
            alt: 'Audit of the existing homepage — banner, Benny Card, SNAP balances, promo cards, deals, SNAP offers all competing',
            caption: 'Auditing existing components: no neutral elements — everything competes for attention.',
          },
          {
            type: 'text',
            value: 'The structural problem was bigger than aesthetics. The roadmap called for adding Benny Card, Deals, and affiliate links to this screen, and the existing layout simply had no space to grow.',
          },
        ],
      },
      {
        label: 'Approach',
        heading: 'Design for max and min states first',
        blocks: [
          {
            type: 'text',
            value: 'Before drawing anything, I defined the extremes. Maximum: a Benny cardholder with linked EBT balances and every section populated. Minimum: a brand-new user with nothing connected. After adding sections for the new product lines, the existing homepage\'s max state was untenable. Our redesign had to look and feel good no matter where a user was in their journey.',
          },
          {
            type: 'image',
            src: '/slide-benny-app-maxmin.png',
            alt: 'Max and min state definitions for the redesigned homepage',
            caption: 'Bounding the problem: the homepage had to hold up at both extremes.',
          },
        ],
      },
      {
        label: 'Design exploration',
        heading: 'One neutral, extensible building block',
        blocks: [
          {
            type: 'text',
            value: 'The homepage is a hub that points to all corners of the platform — so I started with a building block that was neutral but extensible. The seed was a flexible menu-item component I\'d built for our settings page. From there: it can have a subtitle. It can include an image. It can be arranged in a row, stacked into a list, or appended to a header card like a balance.',
          },
          {
            type: 'image',
            src: '/benny_app-building-block.png',
            alt: 'The building block component stacked and appended to a Benny Card balance header',
            caption: 'The building block: one component that stacks, rows, and appends — shown here under the Benny Card balance.',
          },
          {
            type: 'text',
            value: 'Then I rebuilt the homepage section by section with the new component. Balances went from side-by-side cards to a single titled vertical stack with a simplified gradient. Offers split into clear sections with desaturated imagery and a shopping-list entry point. The promo carousel became a stacked component that could absorb future experiments, like games and surveys.',
          },
          {
            type: 'image',
            src: '/benny_app-simplifying-balances.png',
            alt: 'Original homepage next to the simplified redesign',
          },
          {
            type: 'image',
            src: '/benny_app-simplifying-offers.png',
            alt: 'Original homepage next to the simplified redesign',
          },
          {
            type: 'image',
            src: '/benny_app-simplifying-promos.png',
            alt: 'Original homepage next to the simplified redesign',
          },
        ],
      },
      {
        label: 'Onboarding',
        heading: 'From ignorable banner to interactive checklist',
        blocks: [
          {
            type: 'text',
            value: 'The second goal was getting new users to their first earn. The first idea was a bonus with a progress tracker — "Get $3 when you upload 3 SNAP receipts." That evolved into a steps carousel, and finally into a checklist that lived directly in the homepage: add deals to unlock savings, upload receipts to redeem cash back, link store accounts for effortless rewards.',
          },
          {
            type: 'image',
            src: '/slide-benny-app-onboarding.png',
            alt: 'Onboarding design evolution: bonus tracker, steps carousel, checklist',
            caption: 'Onboarding evolution: bonus → steps carousel → checklist.',
          },
        ],
      },
      {
        label: 'Final design',
        heading: 'From Times Square to Union Square',
        blocks: [
          {
            type: 'text',
            value: 'Our team was based in New York, so I described the journey this way: we went from Times Square — billboards competing for your attention — to Union Square: a unified visual language with clear hierarchy. The final homepage holds up at both min and max states, and every roadmap product line slots into the same structure.',
          },
          {
            type: 'image',
            src: '/benny_app-union-square.png',
            alt: 'Final homepage refresh shown in both max and min states',
            caption: 'The shipped homepage, optimized for both min and max states.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: '70% more earners per signup',
        blocks: [
          {
            type: 'image',
            src: '/slide-benny-app-earners.png',
            alt: '70% more earners per signup, from the onboarding component',
            caption: 'The onboarding component drove 70% more earners per signup.',
          },
          {
            type: 'text',
            value: 'The simplified component language also informed Benny\'s new brand identity — the app redesign and the brand refresh fed each other.',
          },
          {
            type: 'image',
            src: '/slide-benny-app-brand.png',
            alt: 'Old and new Benny brand identity side by side',
            caption: 'Simplifying components helped inform the new brand identity.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 2. Benny Card — an end-to-end product launch (0 → 1)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-card',
    title: 'Launching the Benny Card',
    subtitle: 'Benny\'s flagship credit card, empowering SNAP recipients to build credit and earn cash back — from the logo on the physical card to every screen of the digital experience.',
    heroImage: '/benny_card.png',
    tags: ['consumer fintech', 'mobile', '0→1'],
    collaborators: [
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Ariel, Jackie, Surabhi', role: 'Engineering' },
    ],
    context: [
      {
        type: 'text',
        value: 'Benny Card was the biggest bet on our roadmap: a real Visa credit card giving users 1% cash back on gas, groceries, and public transit, with built-in safeguards to help them avoid debt and a seamless way to build credit. For many of our users, this would be their first credit card — and unlike SNAP cash back, which cost the business money, the card earned interchange revenue on every transaction.',
      },
      {
        type: 'text',
        value: 'The design scope covered everything: the waitlist, KYC and identity verification, the application flow with approval, pending, and rejection states, transactions and statements, money movement, Apple Wallet, onboarding emails — and the physical card itself.',
      },
    ],
    sections: [
      {
        label: 'But first',
        heading: 'Dial in the logo',
        blocks: [
          {
            type: 'text',
            value: 'Before anything could be printed on plastic, the inherited logo needed work. I refined the letterforms and the mark to something that we would be proud to see embossed and foiled on our cards.',
          },
          {
            type: 'image',
            src: '/benny_card-logo-redesign.png',
            alt: 'The refined Benny logo',
            caption: 'The refined logo, ready for print.',
          },
        ],
      },
      {
        label: 'The physical card',
        heading: 'Four colorways, front and back',
        blocks: [
          {
            type: 'text',
            value: 'The card shipped in four colorways — Benny Blue, Black, Pink, and White — and users picked their color during application. I designed the front and back layouts, then visited the St. Charles card factory to review proofs and sign off on production.',
          },
          {
            type: 'image',
            src: '/slide-benny-card-colorways.png',
            alt: 'Front and back of the Benny Card in Black, Pink, White, and Benny Blue',
            caption: 'Card design: four colorways, front and back.',
          },
          {
            type: 'image',
            src: '/slide-benny-card-mailer.png',
            alt: 'Benny Card mailer and activation instructions',
            caption: 'The card mailer: activate in three steps from the Benny App.',
          },
        ],
      },
      {
        label: 'The application',
        heading: 'KYC, IDV, and every outcome state',
        blocks: [
          {
            type: 'text',
            value: 'The application flow verified identity through Plaid, collected a mailing address, and let users pick their card color. I spec\'d the happy path first, then the longer path with full identity document verification — and designed distinct communication for each outcome: approval (your card is on its way), pending (we\'ll notify you in a few days), and rejection (a respectful, plain-language explanation).',
          },
          {
            type: 'image',
            src: '/slide-benny-card-kyc.png',
            alt: 'KYC happy path screens',
            caption: 'The KYC happy path — identity verification via Plaid.',
          },
          {
            type: 'image',
            src: '/slide-benny-card-idv.png',
            alt: 'The longer application path with identity document verification',
            caption: 'The longer path with IDV, spec\'d end to end.',
          },
        ],
      },
      {
        label: 'The card tab',
        heading: 'A home for the cardholder',
        blocks: [
          {
            type: 'text',
            value: 'The card tab brought everything together: the virtual card with personalized color, available spend, quick actions, recent activity with enriched transactions and cash back, and card management.',
          },
          {
            type: 'image',
            src: '/slide-benny-card-dashboard.png',
            alt: 'Card tab with personalized card color, quick actions, manage card, and recent activity',
            caption: 'The card tab: personalized color, quick actions, and recent activity.',
          },
          {
            type: 'image',
            src: '/slide-benny-card-wallet.png',
            alt: 'Add to Apple Wallet flow',
            caption: 'Apple Wallet support, so the card works before the plastic arrives.',
          },
          {
            type: 'text',
            value: 'Money movement had real constraints to design around: instant transfers required a $50 minimum to offset same-day ACH costs of around $1.50, while standard ACH took up to three business days.',
          },
          {
            type: 'image',
            src: '/benny_card-add-money.png',
            alt: 'Add to Apple Wallet flow',
            caption: 'To offset same-day ACH costs: speed varies for money movement.',
          },
          {
            type: 'text',
            value: 'Onboarding emails guided new cardholders toward the key actions: add money, activate your physical card, and use Benny Card to save and build credit.',
          },
          {
            type: 'image',
            src: '/benny_card-emails.png',
            alt: 'Add to Apple Wallet flow',
            caption: 'Prompt users to add money and activate Benny Card.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: '30K on the waitlist',
        blocks: [
          {
            type: 'image',
            src: '/slide-benny-card-results.png',
            alt: 'Benny Card results: 30K waitlist, partner-approved flows, successful friends and family launch',
            caption: '30K users joined the waitlist. All UX flows approved by partners. Successful friends & family launch in late 2025.',
          },
          {
            type: 'text',
            value: 'And because shipping a credit card is a team sport, I designed launch merch to celebrate — hoodies for the engineers, and a 1-of-1 quarter-zip for the CEO.',
          },
          {
            type: 'image',
            src: '/benny_card-merch.png',
            alt: 'Benny Card results: 30K waitlist, partner-approved flows, successful friends and family launch',
            caption: 'Our Benny Card celebration merch.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 3. Benny Deals — the first monetized feature
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-deals',
    title: 'Benny Deals',
    subtitle: 'Benny\'s first monetized feature: brand-sponsored grocery deals. A win for users, a win for the business — and a test of whether swiping beats scrolling.',
    heroImage: '/slide-benny-deals-swipe.png',
    tags: ['consumer fintech', 'mobile', 'growth'],
    collaborators: [
      { name: 'Jackie Levine', role: 'Founding Engineer' },
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
    ],
    context: [
      {
        type: 'text',
        value: 'We needed a win-win feature. SNAP cash back was a win for users but a cost to the business. Grocery deals would be a win for both: in our brand partnership proposal, for every dollar saved by the user, Benny would earn 50¢. App Store reviews confirmed users wanted more ways to save.',
      },
      {
        type: 'text',
        value: 'Rather than pitching brands one by one, we partnered with Snipp, a deal aggregator, to seed the app with a pilot batch — a proof of concept we could use to win direct contracts. Success was defined upfront: deal redemption becomes the new top KPI, and we land brand partnerships to expand the portfolio.',
      },
    ],
    sections: [
      {
        label: 'Product requirements',
        heading: 'Activation is what brands pay for',
        blocks: [
          {
            type: 'text',
            value: 'Deals had to be activated before the item is bought. Activation shows intent — the user bought this item specifically because they saw the deal in Benny. Without it, a brand could argue the user would have bought the item anyway. Attribution is what justifies their marketing spend.',
          },
          {
            type: 'text',
            value: 'Deals also had to honor Snipp\'s rules: expirations, store specifications, and redemption caps. Most deals were item-specific ("$1 off Sabra Hummus"), but some were category-wide ("$1 off any soda") — the UI had to handle both cleanly.',
          },
        ],
      },
      {
        label: 'Hypothesis',
        heading: 'Users will love a swipe-style experience',
        blocks: [
          {
            type: 'text',
            value: 'We believed a fun, interactive way to show intent would be more effective than a list of deals. To test it, we launched both a swiping experience and a simpler list view, and tracked activation rates across the two.',
          },
          {
            type: 'text',
            value: 'One exploration we ultimately shelved: swiping right on a list item to add the deal inline, like queuing a song in Spotify.',
          },
        ],
      },
      {
        label: 'Prototypes',
        heading: 'Making the swipe feel right',
        blocks: [
          {
            type: 'text',
            value: 'In the prototype, the feedback is progressive: as you swipe, a sticker fades in and the instructions fade out. Finish the stack and you get a completion moment — "Nice work! You added 5 deals, for up to $4.50 in savings."',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-completion.png',
            alt: 'Completion screen after finishing the swipe stack',
            caption: 'The completion moment after the last card.',
          },
        ],
      },
      {
        label: 'The full experience',
        heading: 'Add from anywhere, redeem with a receipt',
        blocks: [
          {
            type: 'text',
            value: 'Beyond swiping, users could add deals from a searchable, filterable list — by brand or store — or through a bottom sheet without leaving their current screen. Added deals rolled up into a shopping-list view showing potential savings. Redemption reused the receipt-upload pattern users already knew from SNAP cash back, ending with an itemized "You earned $4.50!" breakdown.',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-list.png',
            alt: 'Shopping list view of added deals',
            caption: 'The shopping-list view: added deals and what they\'re worth.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: '12+ brand partnerships landed',
        blocks: [
          {
            type: 'text',
            value: 'By selling the story of the Snipp pilot, we booked direct contracts with Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. Every signed contract came with an email blast and push notification: "New deals just dropped!"',
          },
          {
            type: 'text',
            value: 'We kept optimizing after launch — and killed our darlings. The deal details page went from bottom sheet to full screen with better hierarchy. Search and filtering gave way to lightweight category chips, which also fixed a dead end where a keyword search could return nothing. And the swiping experience came out entirely: fun to build, but not performant — and the simple list kept winning.',
          },
          {
            type: 'text',
            value: 'The goal from here: get deal redemption to half of SNAP offer redemption — on the path to netting equal, while building momentum to win larger budgets from brands. That push became its own project: Benny Boosts.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 4. Benny Boosts — incentives under one framework
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-boosts',
    title: 'Benny Boosts',
    subtitle: 'Deals made us money. SNAP offers cost us money. Both paid the user. Boosts was the framework that tipped the balance — and gave experiments a permanent home in the app.',
    heroImage: '/slide-benny-boosts-ideas.png',
    tags: ['consumer fintech', 'mobile', 'growth'],
    collaborators: [
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Surabhi Jain', role: 'Founding Engineer' },
    ],
    context: [
      {
        type: 'text',
        value: 'Deals redemption was lagging SNAP offer redemption. Deals made us money, SNAP offers cost us money — both gave the user money. We wanted deal redemption to reach half of SNAP offer redemption: on the path to netting equal, while building momentum to win larger budgets from brands. We were closing the gap, but needed to move through brand budgets faster.',
      },
    ],
    sections: [
      {
        label: 'First idea',
        heading: '"Exit through the gift shop"',
        blocks: [
          {
            type: 'text',
            value: 'The cheapest lever was friction. Instead of a global "Add receipt" button, we moved it under the Deals tab — so users had to pass their deals on the way to uploading a SNAP receipt, the way a museum routes you through the gift shop. I also explored a dynamic button whose state and label changed with the active subtab.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-giftshop.png',
            alt: 'Add receipt button moved under the Deals tab',
            caption: 'The "Add receipt" button relocated into the Deals tab.',
          },
        ],
      },
      {
        label: 'Going bigger',
        heading: 'Three ideas, one framework',
        blocks: [
          {
            type: 'text',
            value: 'Friction alone wouldn\'t close the gap, so we ran a product discovery session. Three ideas emerged: gating (unlock SNAP cash back by redeeming a deal first), sweepstakes (every deal redeemed is an entry to win $100), and streaks (redeem multiple deals from the same brand for a cash reward). The design challenge was consolidating all three under a single framework — Boosts.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-ideas.png',
            alt: 'Three ideas to increase deal redemption: gating SNAP offers, sweepstakes, streaks',
            caption: 'The three mechanics, consolidated under the Boosts framework.',
          },
        ],
      },
      {
        label: 'Shipped',
        heading: 'Sweepstakes and gated offers',
        blocks: [
          {
            type: 'image',
            src: '/slide-benny-boosts-sweepstakes.png',
            alt: 'Sweepstakes UI: you have 2 entries to win $100',
            caption: 'Sweepstakes: every deal redeemed is an entry.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-locked.png',
            alt: 'SNAP offers shown locked until a deal is redeemed',
            caption: 'Gating: SNAP offers unlock by engaging with deals.',
          },
          {
            type: 'text',
            value: 'The shipped framework rebranded SNAP offers as "SNAP Boosts" — locked until the user redeemed a deal — with deal-group bonuses and seasonal sweepstakes living in the same space.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: 'Retention nearly tripled',
        blocks: [
          {
            type: 'text',
            value: '90-day retention for earners went from under 20% to 54%. Our hypothesis: the monthly unlocking cadence of SNAP Boosts gave users a reason to keep coming back — and built a habit. Beyond the metric, Boosts carved out a permanent space in the app for experimental features: new incentive mechanics could ship into the same surface without inventing a new one each time.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 5. UrbanFootprint App Homepage
  // ─────────────────────────────────────────────────────────
  {
    slug: 'urbanfootprint',
    title: 'UrbanFootprint App Homepage',
    subtitle: 'A post-login homepage serving two very different users — GIS power users and non-technical consultants — and the start of a new design language built on Radix.',
    heroImage: '/urbanfootprint_hero.png',
    tags: ['B2B SaaS', 'web', 'design systems'],
    collaborators: [
      { name: 'Nick McIntosh', role: 'VP of Product' },
      { name: 'Dan Cory', role: 'Principal Product Manager' },
      { name: 'Evan Davis', role: 'Staff Frontend Engineer' },
      { name: 'Matt Catoe', role: 'Senior Frontend Engineer' },
    ],
    context: [
      {
        type: 'text',
        value: 'UrbanFootprint pairs two products: mapping for geospatial users who upload and edit data layers, and dashboards for generalists who want data at a glance. Dashboards shipped at the end of Q1 2024 — and by the end of Q2, less than 4% of users had ever created one. The product built for non-technical users was invisible to them.',
      },
      {
        type: 'text',
        value: 'The root cause was the post-login flow: users were dropped straight into the last mapping project they\'d opened.',
      },
    ],
    sections: [
      {
        label: 'The problem',
        heading: 'One flow failing two audiences',
        blocks: [
          {
            type: 'image',
            src: '/slide-uf-feedback.png',
            alt: 'User feedback on the post-login flow, from both technical and non-technical customers',
            caption: 'The post-login flow wasn\'t ideal for either user profile.',
          },
          {
            type: 'text',
            value: 'The hypothesis: a homepage could solve both needs. Sub-hypotheses, stated upfront — surfacing teammates\' recently edited projects would at least double collaboration (projects with multiple editors), and making dashboards discoverable would at least double their usage from 4%.',
          },
        ],
      },
      {
        label: 'First design pass',
        heading: 'Engineering feedback changed the plan',
        blocks: [
          {
            type: 'text',
            value: 'My first pass used the existing design library and codebase to minimize engineering lift. The engineers pushed back. "If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow," said Evan. Matt\'s counter-proposal: "We\'ve been talking about moving to Radix for a while. Why don\'t we make the homepage a separate application built on Radix that points to the mapping and dashboards applications?"',
          },
          {
            type: 'image',
            src: '/urbanfootprint_first-pass.png',
            alt: 'New design system components: typography, cards, buttons, dropdowns, search, hover and active states',
            caption: 'A first mock designed to minimize engineering lift.',
          },
          {
            type: 'text',
            value: 'It was the right call. UrbanFootprint was built on BlueprintJS — useful early, but opinionated and hard to evolve. Radix is unstyled by design, which meant the homepage could become the proving ground for a design language defined from scratch.',
          },
          {
            type: 'image',
            src: '/slide-uf-components.png',
            alt: 'New design system components: typography, cards, buttons, dropdowns, search, hover and active states',
            caption: 'Designing the component set for the homepage — the seed of the new design language.',
          },
        ],
      },
      {
        label: 'Alignment',
        heading: 'Three executives, four jobs to be done',
        blocks: [
          {
            type: 'text',
            value: 'Everyone wanted something different from the homepage. The CEO wanted visible collaboration — see that your teammate just created a dashboard. The VP of Sales wanted marketing for new geospatial features. The VP of Product wanted dashboard templates front and center to attack the discoverability problem.',
          },
          {
            type: 'image',
            src: '/urbanfootprint_references.png',
            alt: 'Second design pass for the homepage',
            caption: 'I pulled together references for leadership to critique.',
          },
          {
            type: 'text',
            value: 'I ran a workshop critiquing external homepage references, and we distilled the asks into four jobs to be done: discoverability for new users, get the task at hand done, pick up where I (or my colleague) left off, and get help.',
          },
          {
            type: 'image',
            src: '/urbanfootprint_jtbd.png',
            alt: 'Second design pass for the homepage',
            caption: 'I ended the workshop by having folks align on "jobs to be done."',
          },
        ],
      },
      {
        label: 'Second design pass',
        heading: 'Designing within real constraints',
        blocks: [
          {
            type: 'text',
            value: 'The second pass was drawn with the available Radix components and the four jobs-to-be-done in mind.',
          },
          {
            type: 'image',
            src: '/urbanfootprint_second-pass.png',
            alt: 'Second design pass for the homepage',
            caption: 'The second pass with our new design language.',
          },
          {
            type: 'text',
            value: 'PM feedback sharpened it further: the one-click "create dashboard" button couldn\'t exist in v1, and mixing dashboards and projects in a single view would be easier to build — and easier for users to learn. Action item: explore a sidebar-less homepage.',
          },
          {
            type: 'image',
            src: '/urbanfootprint_final-pass.png',
            alt: 'Final design spec for the UrbanFootprint homepage',
            caption: 'The final spec: one unified view of projects, dashboards, and templates with real use-case descriptions.',
            href: 'https://www.figma.com/proto/RKvw882oYowkxcJAdZNkZc/%E2%AD%90-Q2-2024---Analyst-Homepage?node-id=5490-4057&node-type=FRAME&t=VFj7MP6Cwf9IpxHj-0&scaling=scale-down-width&content-scaling=fixed&page-id=2527%3A2&starting-point-node-id=5490%3A4057&hide-ui=1',
          },
        ],
      },
      {
        label: 'Next steps',
        heading: 'Shipped early Q4',
        blocks: [
          {
            type: 'text',
            value: 'The homepage entered development on schedule for an early-October release. The plan from there: refresh the legacy design language across UrbanFootprint\'s products to match the homepage, track whether dashboard creation and collaboration double as hypothesized, and add a notification system so users can see team activity history.',
          },
          {
            type: 'image',
            src: '/urbanfootprint_next-steps.png',
            alt: 'Next steps: design language refresh, usage data, and a notification system',
            caption: 'Looking ahead: design language rollout, metrics, and notifications.',
          },
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
