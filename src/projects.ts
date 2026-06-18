export interface Collaborator {
  name: string
  role: string
}

export interface ContentBlock {
  type: 'text' | 'image' | 'image-pair'
  value?: string
  src?: string
  srcs?: [string, string]
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
  // tooltip subtitle. A card with an href opens that URL in a new tab on
  // desktop only (not mobile) and shows a "View prototype" subtitle. A card
  // with neither is display-only (visible but not clickable, no subtitle).
  slug?: string
  href?: string
  title: string
  image: string
  imageMobile?: string
  width: number
  height: number
}

// Homepage "Selected work" order — single source of truth.
// Reordering this array reorders both the homepage grid and the
// Home / next-project links on each project page. The first card renders
// full-width on top; the rest fill two rows. Cards with neither slug nor
// href are display-only and omitted from project navigation.
export const workCards: WorkCard[] = [
  { slug: 'benny-app', title: 'Benny App', image: '/benny_app.png', imageMobile: '/benny_app_mobile.png', width: 2070, height: 844 },
  { slug: 'benny-card', title: 'Benny Card', image: '/benny_card.png', width: 1642, height: 844 },
  { slug: 'urbanfootprint', title: 'UrbanFootprint', image: '/urbanfootprint_series_b.png', width: 1390, height: 704 },
  { title: 'Benny API', href: '/benny-merchants.html', image: '/benny_merchants.png', imageMobile: '/benny_merchants_mobile.png', width: 1014, height: 2332 },
  { title: 'Benny Dashboards', href: 'https://app.subframe.com/dacbdd49e5f4/sandbox/38fd543d-f7a8-4036-80b6-723fa85de274/share', image: '/benny_dashboards.png', width: 2502, height: 3132 },
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
        value: 'I joined Benny in October 2024 as the founding designer — the first full-time design hire, taking over product and brand from a remote contractor who had shipped V1. Our cofounders met at Cash App, and the mission was personal to the whole team: SNAP recipients are stuck with outdated government websites and apps, and we wanted to build a premium product for a population that\'s too often underserved.',
      },
      {
        type: 'text',
        value: 'I came in with two goals. First, I wanted to unify the mobile design system so it could scale with the product lines on our roadmap — Benny Card, Deals, and affiliate links. Second, I wanted to guide new users toward their first moment of delight: when I started, only 21% of onboarded users ever earned cash back.',
      },
    ],
    sections: [
      {
        label: 'The problem',
        heading: 'A homepage with no neutral elements',
        blocks: [
          {
            type: 'text',
            value: 'The V1 homepage was busy with competing calls to action. I audited every element — the banner, balances, promo cards, deals, SNAP offers — and found that nothing was neutral; everything was fighting for attention. There were smaller nits, too: the side-by-side balance cards left dead space for the 97% of users with only one balance, the palette had drifted away from Benny blue, and onboarding instructions stuck around long after setup.',
          },
          {
            type: 'image',
            src: '/bennyapp_audit.png',
            caption: 'My audit of the existing components: nothing neutral, everything competing for attention.',
          },
          {
            type: 'text',
            value: 'But the real problem was structural, not just aesthetic. The roadmap called for adding Benny Card, Deals, and affiliate links to this same screen, and the existing layout simply had nowhere to grow.',
          },
        ],
      },
      {
        label: 'Approach',
        heading: 'Design for max and min states first',
        blocks: [
          {
            type: 'text',
            value: 'Before drawing anything, I defined the extremes. At the maximum, a Benny cardholder with linked EBT balances and every section populated; at the minimum, a brand-new user with nothing connected yet. Once I added sections for the new product lines, the existing homepage\'s max state fell apart. Our redesign had to look and feel good no matter where a user was in their journey.',
          },
          {
            type: 'image',
            src: '/bennyapp_max-min.png',
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
            value: 'The homepage is a hub that points to every corner of the platform, so I started from a building block that was neutral but extensible. The seed was a flexible menu-item component I\'d built for our settings page. From there it could grow: it can carry a subtitle, hold an image, sit in a row, stack into a list, or attach to a header card like a balance.',
          },
          {
            type: 'image',
            src: '/bennyapp_component.png',
            caption: 'The building block: one component that stacks, rows, and appends — shown here under the Benny Card balance.',
          },
          {
            type: 'text',
            value: 'Then I rebuilt the homepage section by section with the new component. Balances went from side-by-side cards to a single titled vertical stack with a simplified gradient. Offers split into clear sections with desaturated imagery and a shopping-list entry point. And the promo carousel became a stacked component that could absorb whatever we wanted to try next, like games and surveys.',
          },
          {
            type: 'image',
            src: '/bennyapp_simplifying.png',
            caption: 'Simplifying each section on the homepage using our new component.',
          },
        ],
      },
      {
        label: 'Onboarding',
        heading: 'From ignorable banner to interactive checklist',
        blocks: [
          {
            type: 'text',
            value: 'My second goal was getting new users to their first earn. I started with a bonus and a progress tracker — "Get $3 when you upload 3 SNAP receipts." That evolved into a steps carousel, and finally into a checklist that lived right on the homepage: add deals to unlock savings, upload receipts to redeem cash back, and link store accounts for effortless rewards.',
          },
          {
            type: 'image',
            src: '/bennyapp_evolution.png',
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
            value: 'Our team was based in New York, so I liked to describe the journey this way: we went from Times Square, where every billboard is screaming for your attention, to Union Square — a unified visual language with clear hierarchy. The final homepage holds up at both its min and max states, and every product line on the roadmap slots into the same structure.',
          },
          {
            type: 'image',
            src: '/bennyapp_before-after.png',
            caption: 'The shipped homepage, optimized for both min and max states.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: '70% more earners per signup',
        blocks: [
          {
            type: 'text',
            value: 'To the whole team\'s delight, the new onboarding component drove a 70% improvement in earners per signup — moving new-user conversion from 21% to 36%.',
          },
          {
            type: 'image',
            src: '/bennyapp_onboarding.png',
            caption: 'The new onboarding component drove a 70% increase in earners per signup.',
          },
//          {
//            type: 'text',
//            value: 'The simplified component language also informed Benny\'s new brand identity — the app redesign and the brand refresh fed each other.',
//          },
//          {
//            type: 'image',
//            src: '/slide-benny-app-brand.png',
//            alt: 'Old and new Benny brand identity side by side',
//            caption: 'Simplifying components helped inform the new brand identity.',
//          },
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
        value: 'Benny Card was the biggest bet on our roadmap: a real Visa credit card that gives users 1% cash back on gas, groceries, and public transit, with built-in safeguards to help them avoid debt and a seamless way to build credit. For many of our users, this would be their very first credit card — and unlike SNAP cash back, which cost the business money, the card earned interchange revenue on every transaction.',
      },
      {
        type: 'text',
        value: 'The design scope covered just about everything: the waitlist, KYC and identity verification, the application flow with its approval, pending, and rejection states, transactions and statements, money movement, Apple Wallet, onboarding emails — and, of course, the physical card itself.',
      },
    ],
    sections: [
      {
        label: 'But first',
        heading: 'Dial in the logo',
        blocks: [
          {
            type: 'text',
            value: 'Before anything could be printed on plastic, the inherited logo needed work. I refined the letterforms and the mark into something we\'d be proud to see embossed and foiled on our cards for years to come.',
          },
          {
            type: 'image',
            src: '/bennycard_logos.png',
            caption: 'The refined logos, ready to be embossed and foiled.',
          },
        ],
      },
      {
        label: 'The physical card',
        heading: 'Four colorways, front and back',
        blocks: [
          {
            type: 'text',
            value: 'The card shipped in four colorways — Benny Blue, Black, Pink, and White — and users picked their color during the application. I designed the front and back layouts, then took a trip to the card factory in St. Charles, Illinois to review the proofs and sign off on production. Watching the cards come off the line was a thrilling, surreal moment.',
          },
          {
            type: 'image',
            src: '/bennycard_colors.png',
            caption: 'Card design: four colorways, front and back.',
          },
          {
            type: 'image',
            src: '/bennycard_trifold.png',
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
            value: 'The application flow verified identity through Plaid, collected a mailing address, and let users pick their card color. I spec\'d the happy path first, then the longer path with full identity document verification — and designed distinct communication for each outcome: approval (your card is on its way), pending (we\'ll notify you in a few days), and rejection (a respectful, plain-language explanation, because how you say no matters).',
          },
          {
            type: 'image',
            src: '/bennycard_happypath.png',
            caption: 'The KYC happy path — identity verification via Plaid.',
          },
          {
            type: 'image',
            src: '/bennycard_longerpath.png',
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
            value: 'The card tab brought everything together: the virtual card in the user\'s chosen color, available spend, quick actions, recent activity with enriched transactions and cash back, and card management — one home for the cardholder.',
          },
          {
            type: 'image',
            src: '/bennycard_home.png',
            caption: 'The card tab: personalized color, quick actions, and recent activity.',
          },
          {
            type: 'image',
            src: '/bennycard_applewallet.png',
            caption: 'Apple Wallet support, so the card works before the plastic arrives.',
          },
          {
            type: 'text',
            value: 'Money movement came with real constraints to design around: instant transfers required a $50 minimum to offset same-day ACH costs of around $1.50, while standard ACH took up to three business days.',
          },
          {
            type: 'image',
            src: '/bennycard_addmoney.png',
            caption: 'Speed varies for money movement, to offset same-day ACH costs.',
          },
          {
            type: 'text',
            value: 'A series of onboarding emails guided new cardholders toward the actions that mattered: add money, activate your physical card, and start using Benny Card to save and build credit.',
          },
          {
            type: 'image',
            src: '/benny_card-emails.png',
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
            src: '/bennycard_waitlist.png',
            caption: '30K users joined the waitlist. All UX flows approved by partners. Successful friends & family launch in late 2025.',
          },
          {
            type: 'text',
            value: 'And because shipping a credit card is very much a team sport, I designed some launch merch to celebrate — hoodies for the engineers, and a 1-of-1 quarter-zip for the CEO.',
          },
          {
            type: 'image',
            src: '/benny_card-merch.png',
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
        value: 'We needed a win-win feature. SNAP cash back was a win for users, but a cost to the business. Grocery deals would be a win for both: in our brand partnership proposal, for every dollar a user saved, Benny would earn 50¢. And our App Store reviews confirmed it — users wanted more ways to save.',
      },
      {
        type: 'text',
        value: 'Rather than pitching brands one by one, we partnered with Snipp, a deal aggregator, to seed the app with a pilot batch — a proof of concept we could use to win direct contracts. We defined success upfront: deal redemption becomes the new top KPI, and we land brand partnerships to grow the portfolio.',
      },
    ],
    sections: [
      {
        label: 'Product requirements',
        heading: 'Activation is what brands pay for',
        blocks: [
          {
            type: 'text',
            value: 'Deals had to be activated before the item was bought. Activation is what shows intent — the user bought this item specifically because they saw the deal in Benny. Without it, a brand could argue the user would have bought the item anyway, and attribution is exactly what justifies their marketing spend.',
          },
          {
            type: 'text',
            value: 'Deals also had to honor Snipp\'s rules: expirations, store specifications, and redemption caps. Most deals were item-specific ("$1 off Sabra Hummus"), but some were category-wide ("$1 off any soda"), so the UI had to handle both cleanly.',
          },
        ],
      },
      {
        label: 'Hypothesis',
        heading: 'Users will love a swipe-style experience',
        blocks: [
          {
            type: 'text',
            value: 'We had a hunch that a fun, interactive way to show intent would beat a plain list of deals. To find out, we launched both a swiping experience and a simpler list view, and tracked activation rates across the two.',
          },
          {
            type: 'text',
            value: 'One exploration we ended up shelving: swiping right on a list item to add the deal inline, the way you queue a song in Spotify.',
          },
        ],
      },
      {
        label: 'Prototypes',
        heading: 'Making the swipe feel right',
        blocks: [
          {
            type: 'text',
            value: 'In the prototype, the feedback is progressive: as you swipe, a sticker fades in while the instructions fade out. Finish the stack and you\'re rewarded with a completion moment — "Nice work! You added 5 deals, for up to $4.50 in savings."',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-completion.png',
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
            value: 'Beyond swiping, users could add deals from a searchable, filterable list — by brand or store — or through a bottom sheet without ever leaving their current screen. Added deals rolled up into a shopping-list view that showed their potential savings. For redemption, I reused the receipt-upload pattern users already knew from SNAP cash back, ending with an itemized "You earned $4.50!" breakdown.',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-list.png',
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
            value: 'By selling the story of the Snipp pilot, we booked direct contracts with Kraft, Olipop, Liquid Death, and more — adding 85 new deals to the app. Every signed contract came with its own email blast and push notification: "New deals just dropped!"',
          },
          {
            type: 'text',
            value: 'We kept optimizing after launch — and killed a few darlings along the way. The deal details page went from a bottom sheet to a full screen with better hierarchy. Search and filtering gave way to lightweight category chips, which also fixed a dead end where a keyword search could return nothing. And the swiping experience came out entirely: it was fun to build, but it wasn\'t performant, and the simple list just kept winning.',
          },
          {
            type: 'text',
            value: 'The goal from here was to get deal redemption to half of SNAP offer redemption — on the path to netting equal, while building momentum to win larger budgets from brands. That push became its own project: Benny Boosts.',
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
        value: 'Deal redemption was still lagging SNAP offer redemption. Deals made us money and SNAP offers cost us money — but both put money in the user\'s pocket. We wanted deal redemption to reach half of SNAP offer redemption: on the path to netting equal, while building momentum to win larger budgets from brands. We were closing the gap, but we needed to move through brand budgets faster.',
      },
    ],
    sections: [
      {
        label: 'First idea',
        heading: '"Exit through the gift shop"',
        blocks: [
          {
            type: 'text',
            value: 'The cheapest lever was friction. Instead of a global "Add receipt" button, we moved it under the Deals tab — so users had to pass their deals on the way to uploading a SNAP receipt, the same way a museum routes you out through the gift shop. I also explored a dynamic button whose state and label shifted with the active subtab.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-giftshop.png',
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
            value: 'Friction alone wouldn\'t close the gap, so we ran a product discovery session. Three ideas came out of it: gating (unlock SNAP cash back by redeeming a deal first), sweepstakes (every deal redeemed is an entry to win $100), and streaks (redeem multiple deals from the same brand for a cash reward). The real design challenge was consolidating all three under a single framework — Boosts.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-ideas.png',
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
            caption: 'Sweepstakes: every deal redeemed is an entry.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-locked.png',
            caption: 'Gating: SNAP offers unlock by engaging with deals.',
          },
          {
            type: 'text',
            value: 'The shipped framework rebranded SNAP offers as "SNAP Boosts" — locked until the user redeemed a deal — with deal-group bonuses and seasonal sweepstakes all living in the same space.',
          },
        ],
      },
      {
        label: 'Measuring success',
        heading: 'Retention nearly tripled',
        blocks: [
          {
            type: 'text',
            value: '90-day retention for earners went from under 20% to 54%. Our hypothesis is that the monthly unlocking cadence of SNAP Boosts gave users a reason to keep coming back — and quietly built a habit. Beyond the metric, Boosts carved out a permanent home in the app for experimental features: new incentive mechanics could ship into the same surface without us having to invent a new one each time.',
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
        value: 'UrbanFootprint pairs two products: mapping for geospatial users who upload and edit data layers, and dashboards for generalists who just want data at a glance. Dashboards shipped at the end of Q1 2024 — and by the end of Q2, fewer than 4% of users had ever created one. The product we\'d built for non-technical users was effectively invisible to them.',
      },
    ],
    sections: [
      {
        label: 'The problem',
        heading: 'One flow failing two audiences',
        blocks: [
           
          {
            type: 'text',
            value: 'The root cause was the post-login flow: users were dropped straight into the last mapping project they\'d opened, with no chance to go anywhere else first.',
          },
          {
            type: 'image',
            src: '/uf_login.png',
            caption: 'The post-login flow wasn\'t ideal for either user profile.',
          },
          {
            type: 'text',
            value: 'My hypothesis was that a homepage could solve both needs at once. I stated two sub-hypotheses upfront: surfacing teammates\' recently edited projects would at least double collaboration (projects with multiple editors), and making dashboards discoverable would at least double their usage from 4%.',
          },
        ],
      },
      {
        label: 'First design pass',
        heading: 'Engineering feedback changed the plan',
        blocks: [
          {
            type: 'text',
            value: 'My first pass leaned on the existing design library and codebase to minimize engineering lift. The engineers pushed back. "If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow," Evan told me. Matt had a counter-proposal: "We\'ve been talking about moving to Radix for a while. Why don\'t we make the homepage a separate application built on Radix that points to the mapping and dashboards applications?"',
          },
          {
            type: 'image',
            src: '/uf_firstpass.png',
            caption: 'A first mock designed to minimize engineering lift.',
          },
          {
            type: 'text',
            value: 'It was the right call. UrbanFootprint was built on BlueprintJS — useful early on, but opinionated and hard to evolve. Radix is unstyled by design, which meant the homepage could become the proving ground for a design language we defined from scratch.',
          },
          {
            type: 'image',
            src: '/uf_designsystem.png',
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
            value: 'Everyone wanted something different from the homepage. The CEO wanted visible collaboration — to see that your teammate had just created a dashboard. The VP of Sales wanted marketing for new geospatial features. And the VP of Product wanted dashboard templates front and center to attack the discoverability problem head-on.',
          },
          {
            type: 'image',
            src: '/uf_references.png',
            caption: 'I pulled together references for leadership to critique.',
          },
          {
            type: 'text',
            value: 'I ran a workshop where we critiqued external homepage references together, then distilled everyone\'s asks into four jobs to be done: discoverability for new users, getting the task at hand done, picking up where I (or my colleague) left off, and getting help.',
          },
          {
            type: 'image',
            src: '/uf_jtbd.png',
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
            value: 'I drew the second pass with the available Radix components and those four jobs-to-be-done firmly in mind.',
          },
          {
            type: 'image',
            src: '/uf_secondpass.png',
            caption: 'The second pass with our new design language.',
          },
          {
            type: 'text',
            value: 'PM feedback sharpened it further: the one-click "create dashboard" button couldn\'t exist in v1, and mixing dashboards and projects in a single view would be easier to build — and easier for users to learn. My action item: explore a sidebar-less homepage.',
          },
          {
            type: 'image',
            src: '/uf_finalpass.png',
            caption: 'The final spec: one unified view of projects, dashboards, and templates with real use-case descriptions.',
            href: 'https://www.figma.com/proto/RKvw882oYowkxcJAdZNkZc/%E2%AD%90-Q2-2024---Analyst-Homepage?node-id=5490-4057&node-type=FRAME&t=VFj7MP6Cwf9IpxHj-0&scaling=scale-down-width&content-scaling=fixed&page-id=2527%3A2&starting-point-node-id=5490%3A4057&hide-ui=1',
          },
        ],
      },
      {
        label: 'Features',
        heading: 'Refining the edges',
        blocks: [
          {
            type: 'text',
            value: 'To give users full control over all their assets, the chevron buttons take them to a table view where they can see every project and dashboard in their org, along with metadata and editing actions:',
          },
          {
            type: 'image',
            src: '/uf_table.png',
            caption: 'The table view gives users even more control over their projects.',
          },
          {
            type: 'text',
            value: 'And from the nav menu, users can search across all the assets in their org, or switch orgs altogether.',
          },
          {
            type: 'image',
            src: '/uf_search.png',
            caption: 'Users can search on both dashboards and projects.',
          },
          {
            type: 'image',
            src: '/uf_orgs.png',
            caption: 'Users can switch orgs if they are part of multiple.',
          },
        ],
      },
      {
        label: 'Next steps',
        heading: 'Shipped early Q4',
        blocks: [
          {
            type: 'text',
            value: 'The homepage entered development on schedule for an early-October release. The plan from there was to refresh the legacy design language across UrbanFootprint\'s products to match the homepage, track whether dashboard creation and collaboration doubled as I\'d hypothesized, and add a notification system so users could see their team\'s activity history.',
          },
          {
            type: 'image',
            src: '/uf_notifications.png',
            caption: 'Looking ahead: users receive notifications of teammate activity.',
          },
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
