import type { Collaborator } from './projects'

// ── V2 case study schema ──
// Outcome-first anatomy: metric hero → tl;dr → why this, why now → problem →
// goals (user ↔ business) → exploration → build → outcomes → reflection.

export interface V2Metric {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export type V2Block =
  | { type: 'text'; value: string }
  | { type: 'image'; src: string; caption?: string; href?: string }
  | { type: 'pairs'; pairs: { user: string; business: string }[] }

export interface V2Section {
  label: string
  heading?: string
  blocks: V2Block[]
}

export interface ProjectV2 {
  slug: string
  title: string
  role: string
  heroImage: string
  tags?: string[]
  metrics: V2Metric[]
  tldr: string
  collaborators: Collaborator[]
  sections: V2Section[]
}

export const projectsV2: ProjectV2[] = [
  // ─────────────────────────────────────────────────────────
  // Benny App — v2 pilot
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-app',
    title: 'Benny App: a homepage built to scale',
    role: 'Founding designer · Benny (seed, team of 6) · 2024–2025',
    heroImage: '/benny_app.png',
    tags: ['consumer fintech', 'mobile', 'design systems'],
    metrics: [
      { value: 36, suffix: '%', label: 'week-1 earners, up from 21%' },
      { value: 70, prefix: '+', suffix: '%', label: 'earners per signup' },
      { value: 4, label: 'product lines absorbed since, no redesign needed' },
    ],
    tldr:
      'Benny\'s V1 homepage had nowhere to grow, and the roadmap was about to triple the product surface. I rebuilt it around one neutral, extensible component, and used the redesign to fix onboarding along the way. Week-1 earners went from 21% to 36%, and every product line since has shipped into the same structure.',
    collaborators: [
      { name: 'Surabhi Jain', role: 'Founding Engineer' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Steve Austin', role: 'CTO' },
    ],
    sections: [
      {
        label: 'Why this, why now',
        heading: 'The roadmap had no room to land',
        blocks: [
          {
            type: 'text',
            value:
              'Benny pays SNAP recipients 1–3% cash back when they upload grocery receipts. Users loved it. It was also our biggest user acquisition cost, since every dollar of cash back came out of our pocket.',
          },
          {
            type: 'text',
            value:
              'The roadmap was the answer: Deals, Benny Card, and affiliate links would each make money instead of costing it. The catch was that all three needed a home on the same homepage, and the existing structure didn\'t give us much space to grow.',
          },
          {
            type: 'image',
            src: '/bennyapp_roadmap.png',
            caption: 'The consumer app roadmap: everything to the right of SNAP cash back makes money, and all of it needed homepage real estate.',
          },
          {
            type: 'text',
            value:
              'So this wasn\'t a coat of paint. The homepage refresh was the runway for everything the business needed to ship next.',
          },
        ],
      },
      {
        label: 'The problem',
        heading: 'No neutral elements',
        blocks: [
          {
            type: 'text',
            value:
              'I audited every element on the V1 homepage: the banner, balances, promo cards, deals, SNAP offers. Nothing was neutral. Everything was fighting for attention.',
          },
          {
            type: 'image',
            src: '/bennyapp_audit.png',
            caption: 'The audit: everything competes, nothing recedes.',
          },
          {
            type: 'text',
            value:
              'There were smaller nits, too: side-by-side balance cards left dead space for the 97% of users with only one balance, the palette had drifted away from Benny Blue, and onboarding instructions stuck around long after setup was done.',
          },
        ],
      },
      {
        label: 'Goals',
        heading: 'Every user goal paired with a business one',
        blocks: [
          {
            type: 'pairs',
            pairs: [
              {
                user: 'Guide new users to their first cash back moment, faster',
                business: 'Week-1 earners sat at 21%. Every earner is a receipt, and every receipt is a step toward revenue',
              },
              {
                user: 'Keep every section calm, neutral, and extensible',
                business: 'Card, Deals, and future bets ship into the homepage without another redesign',
              },
              {
                user: 'Unify the visual language around Benny Blue',
                business: 'A brand we\'d be proud to emboss on a physical credit card',
              },
            ],
          },
        ],
      },
      {
        label: 'Approach',
        heading: 'Bound the problem with max and min states',
        blocks: [
          {
            type: 'text',
            value:
              'Before drawing anything, I defined the extremes. At the maximum: a Benny cardholder with linked EBT balances and every section populated. At the minimum: a brand-new user with nothing connected yet. Once I added sections for the new product lines, the existing homepage\'s max state simply fell apart.',
          },
          {
            type: 'image',
            src: '/bennyapp_max-min.png',
            caption: 'The redesign had to look and feel good no matter where a user was in their journey.',
          },
        ],
      },
      {
        label: 'Exploration',
        heading: 'One building block, stress-tested',
        blocks: [
          {
            type: 'text',
            value:
              'The homepage is a hub that points to every corner of the platform, so I started from a building block that was neutral but extensible. The seed was a flexible menu-item component I\'d built for our settings page, with more states than I\'d like to admit.',
          },
          {
            type: 'image',
            src: '/bennyapp_anatomy.png',
            caption: 'The starting point: one menu-item component, every state accounted for.',
          },
          {
            type: 'text',
            value:
              'From there it could grow: it can carry a subtitle, hold an image, sit in a row, stack into a list, or append to a header card like a balance. If the component couldn\'t express a section, that was a sign the section needed simplifying — not the component.',
          },
          {
            type: 'image',
            src: '/bennyapp_component.png',
            caption: 'The building block: stacks, rows, and appends — shown here under the Benny Card balance.',
          },
          {
            type: 'text',
            value:
              'Not everything made the cut. I explored a link-first homepage that led with store connections: link Walmart, then watch the earning states tick from "Link stores to earn" to "Earning 1%." It put the mechanic ahead of the reward, so it stayed an exploration.',
          },
          {
            type: 'image',
            src: '/bennyapp_linkfirst.png',
            caption: 'Shelved: the link-first experience, with every store state designed.',
          },
          {
            type: 'text',
            value:
              'The new components paid an unexpected dividend: dark mode came nearly for free.',
          },
          {
            type: 'image',
            src: '/bennyapp_darkmode.png',
            caption: 'Dark mode, enabled by the new component system.',
          },
        ],
      },
      {
        label: 'Onboarding',
        heading: 'Bonus → steps carousel → checklist',
        blocks: [
          {
            type: 'text',
            value:
              'My second goal was getting new users to their first earn. The first idea was a bonus with a progress tracker: "Get $3 when you upload 3 SNAP receipts." That evolved into a steps carousel, and finally into an interactive checklist that lived right on the homepage: activate deals to unlock savings, upload receipts to redeem cash back, link store accounts for effortless rewards.',
          },
          {
            type: 'image',
            src: '/bennyapp_evolution.png',
            caption: 'Three swings at onboarding: bonus tracker → steps carousel → checklist.',
          },
        ],
      },
      {
        label: 'The build',
        heading: 'Simplify each section with the new component',
        blocks: [
          {
            type: 'text',
            value:
              'Then I rebuilt the homepage section by section. Balances went from side-by-side cards to a single titled vertical stack with a simplified gradient. Offers split into clear sections with desaturated imagery and a shopping-list entry point. The promo carousel became a stacked component that could absorb whatever we wanted to try next.',
          },
          {
            type: 'image',
            src: '/bennyapp_simplifying.png',
            caption: 'Each section, simplified with the new component.',
          },
          {
            type: 'text',
            value:
              'Our team was based in New York, so I liked to describe the journey this way: we went from Times Square, where every billboard is screaming for your attention, to Union Square — a unified visual language with clear hierarchy.',
          },
          {
            type: 'image',
            src: '/bennyapp_before-after.png',
            caption: 'Before and after: Times Square → Union Square.',
          },
        ],
      },
      {
        label: 'Outcomes',
        heading: '70% more earners per signup',
        blocks: [
          {
            type: 'text',
            value:
              'To the whole team\'s delight, the onboarding checklist drove a 70% improvement in earners per signup. Week-1 earners went from 21% to 36% of new users.',
          },
          {
            type: 'image',
            src: '/bennyapp_onboarding.png',
            caption: 'The shipped checklist: each step checks off on the way to the first $5.',
          },
          {
            type: 'text',
            value:
              'The structural bet paid off, too. The new homepage gave us a clean slate to incorporate new products over time: Benny Card, the Deals redesign, Boosts, and Promos all shipped into the same structure without touching the foundations. And the simplified component language went on to inform Benny\'s new brand identity, from the app to the website.',
          },
        ],
      },
      {
        label: 'Reflection',
        heading: 'What I\'d do differently',
        blocks: [
          {
            type: 'text',
            value:
              'I\'d define the metric before the first mock. "Week-1 earners" became our sharpest tool for judging onboarding ideas, but we only landed on it after the first bonus experiment, which means our earliest design debates ran on taste when they could have run on data. Taste matters; it\'s just a better tiebreaker than a compass.',
          },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────
  // Benny Card
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-card',
    title: 'Benny Card: a credit card from scratch',
    role: 'Founding designer · Benny (seed, team of 6) · 2025–2026',
    heroImage: '/benny_card.png',
    tags: ['consumer fintech', 'mobile', '0→1'],
    metrics: [
      { value: 30, suffix: 'K', label: 'users on the waitlist before launch' },
      { value: 50, suffix: '%', label: 'of monthly actives joined the waitlist' },
      { value: 4, label: 'colorways of a physical Visa card' },
    ],
    tldr:
      'Benny Card was the company\'s biggest bet: a real Visa credit card that pays 1% back on gas, groceries, and transit, built for people who\'d mostly never held a credit card before. I designed all of it, from the wordmark embossed on the plastic to KYC, money movement, and the rejection screen. 30K users joined the waitlist, half our monthly actives, and the friends & family launch shipped in late 2025.',
    collaborators: [
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Ariel, Jackie, Surabhi', role: 'Engineering' },
    ],
    sections: [
      {
        label: 'Why this, why now',
        heading: 'The roadmap pointed at the card',
        blocks: [
          {
            type: 'text',
            value:
              'Everything on Benny\'s roadmap led here. SNAP cash back acquired users but cost us money on every receipt. Benny Card flipped that: 1% back to the user on gas, groceries, and transit, funded by interchange revenue on every swipe.',
          },
          {
            type: 'image',
            src: '/bennyapp_roadmap.png',
            caption: 'The roadmap: Benny Card was the biggest "makes money" box on it.',
          },
          {
            type: 'text',
            value:
              'For many of our users, this would be the first credit card they\'d ever hold. No fees, no credit checks, guardrails against debt. That\'s a product worth sweating every detail for. The scope covered all of it: waitlist, KYC and identity verification, approval and rejection, money movement, transactions and statements, Apple Wallet, onboarding emails, and the physical card itself.',
          },
        ],
      },
      {
        label: 'But first',
        heading: 'Dial in the logo',
        blocks: [
          {
            type: 'text',
            value:
              'Before anything got printed on plastic, the inherited wordmark needed work. I dialed the stylization down a bit: more readable, still distinctive. I also built out additional letters, so we had a proper "Benny Card" lockup.',
          },
          {
            type: 'image',
            src: '/bennycard_logos.png',
            caption: 'The refined wordmark, ready to be embossed and foiled.',
          },
        ],
      },
      {
        label: 'The physical card',
        heading: 'Four colorways and a factory visit',
        blocks: [
          {
            type: 'text',
            value:
              'The card shipped in four colorways: Benny Blue, Black, Pink, and White. Users picked theirs during the application, complete with an out-of-stock state for when a color ran dry.',
          },
          {
            type: 'image',
            src: '/bennycard_colors.png',
            caption: 'Four colorways, front and back, issued by TransPecos Bank.',
          },
          {
            type: 'text',
            value:
              'Then I flew to the card factory in St. Charles, Illinois to sign off on production, holding a Pantone Formula Guide against the press sheets to check our blues. Watching the cards come off the line was a thrilling, surreal moment.',
          },
          {
            type: 'image',
            src: '/bennycard_trifold.png',
            caption: 'The trifold mailer: activate in three steps from the Benny App.',
          },
        ],
      },
      {
        label: 'The application',
        heading: 'Every outcome designed, not just approval',
        blocks: [
          {
            type: 'text',
            value:
              'Identity verification ran through Plaid. I spec\'d the happy path first, then the longer path with full document verification: fourteen screens of capture states, retakes, and selfie alignment.',
          },
          {
            type: 'image',
            src: '/bennycard_happypath.png',
            caption: 'The KYC happy path, verified through Plaid.',
          },
          {
            type: 'image',
            src: '/bennycard_longerpath.png',
            caption: 'The longer path with IDV, spec\'d end to end.',
          },
          {
            type: 'text',
            value:
              'Pending kept the card grayed out in the user\'s chosen color. Rejection got a plain-language message, then quietly removed the Benny Card tab from the app. A dead end shouldn\'t keep advertising itself.',
          },
        ],
      },
      {
        label: 'The card tab',
        heading: 'One home for the cardholder',
        blocks: [
          {
            type: 'text',
            value:
              'The card tab brought everything together: the virtual card in the user\'s color, available spend, quick actions, recent activity, and card management. The chosen color carries through every screen, from pending to approved.',
          },
          {
            type: 'image',
            src: '/bennycard_home.png',
            caption: 'The card tab: personalized color, quick actions, recent activity.',
          },
          {
            type: 'text',
            value:
              'Money movement came with a constraint I liked designing around: same-day ACH costs about $1.50, so instant transfers required a $50 minimum. The amount picker flags which amounts are instant-eligible, and the CTA swaps between "3-day transfer" and "Instant transfer" as you type.',
          },
          {
            type: 'image',
            src: '/bennycard_addmoney.png',
            caption: 'Varying speeds: the $50 threshold, made legible in the picker.',
          },
          {
            type: 'text',
            value:
              'Transactions needed four states (pending, complete, returned, declined) plus a fallback icon system for when Visa\'s data enrichment can\'t find a merchant logo.',
          },
          {
            type: 'image',
            src: '/bennycard_states.png',
            caption: 'Transaction states and metadata, each with its own detail sheet.',
          },
          {
            type: 'text',
            value:
              'And a short series of onboarding emails walked new cardholders to the actions that mattered: add money, activate the physical card, start earning 1%.',
          },
          {
            type: 'image',
            src: '/benny_card-emails.png',
            caption: 'Onboarding emails, one key action each.',
          },
        ],
      },
      {
        label: 'Exploration',
        heading: 'How loud should the promo be?',
        blocks: [
          {
            type: 'text',
            value:
              'We debated how hard the homepage should sell the card. I explored a carrot-and-stick direction: a banner listing the benefits up top, plus a locked Sam\'s Club offer that only a cardholder could redeem.',
          },
          {
            type: 'image',
            src: '/bennycard_promo-exploration.png',
            caption: 'Explored: the banner as carrot, the locked offer as stick.',
          },
          {
            type: 'text',
            value:
              'We shipped quieter. The homepage stayed clean, the card tab carried a full-bleed promo, and the "stick" moved into Boosts instead. For cardholders, cash back consolidated into the card tab too — which freed up the fourth tab slot for promos.',
          },
          {
            type: 'image',
            src: '/bennycard_promo-shipped.png',
            caption: 'Shipped: promo on the card tab only, homepage untouched.',
          },
        ],
      },
      {
        label: 'Outcomes',
        heading: '30K on the waitlist',
        blocks: [
          {
            type: 'text',
            value:
              'Every UX flow cleared review with our banking partners: Lithic, LoanPro, and TransPecos Bank. 30K users joined the waitlist, half of our monthly actives. The friends & family launch shipped in late 2025.',
          },
          {
            type: 'image',
            src: '/bennycard_waitlist.png',
            caption: 'The card tab through its waitlist, unlockable, and unlocked states.',
          },
          {
            type: 'text',
            value:
              'And because shipping a credit card is a team sport, I designed launch merch to celebrate: hoodies for the engineers, and a 1-of-1 quarter-zip for the CEO.',
          },
          {
            type: 'image',
            src: '/benny_card-merch.png',
            caption: 'Launch merch, embroidered with the new lockup.',
          },
        ],
      },
      {
        label: 'Reflection',
        heading: 'The honest ending',
        blocks: [
          {
            type: 'text',
            value:
              'Our partner bank dropped the ball on the public launch, and Benny wound down by April 2026. Nothing in the product failed; the dependency did. On a team of six, the design work was never the biggest risk. If I could rerun it, I\'d have pushed us to treat the banking partnership the way we treated the UX: with an explicit state for every way it could go wrong.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Benny Deals
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-deals',
    title: 'Benny Deals: a 0→1 product launch',
    role: 'Founding designer · Benny (seed, team of 6) · 2024–2025',
    heroImage: '/slide-benny-deals-swipe.png',
    tags: ['consumer fintech', 'mobile', 'growth'],
    metrics: [
      { value: 22, suffix: '%', label: 'discovery → redemption conversion, up from 4%' },
      { value: 12, label: 'brand partnerships landed off the pilot' },
      { value: 4, suffix: 'K', label: 'deals redeemed a week after crossing 1K' },
    ],
    tldr:
      'Deals was Benny\'s first feature that made money instead of costing it: brand-sponsored grocery deals where every redemption paid the user and earned us a fee. We seeded it with an aggregator pilot, launched two browsing experiences head-to-head, and let the data pick the winner. Conversion from discovery to redemption went from 4% to 22%, and the pilot\'s story landed 12+ direct brand contracts.',
    collaborators: [
      { name: 'Jackie Levine', role: 'Founding Engineer' },
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
    ],
    sections: [
      {
        label: 'Why this, why now',
        heading: 'We needed a win-win feature',
        blocks: [
          {
            type: 'text',
            value:
              'Benny was the first app to give cash back on SNAP spend. Users loved it, and it was also our biggest user acquisition cost. Deals were the win-win: the user saves a dollar, the brand pays us 50¢ per redemption. Our App Store reviews were already asking for it. "Good app, wish i could get more savings like coupons or surveys," wrote one 5-star reviewer.',
          },
          {
            type: 'text',
            value:
              'Rather than pitching brands one by one with no track record, we partnered with Snipp, a deal aggregator, to seed the app with a $25K pilot campaign. The pilot was the proof of concept we\'d use to win direct contracts.',
          },
          {
            type: 'image',
            src: '/bennydeals_program.png',
            caption: 'The program details from our partnerships deck: 50¢ per $1 redeemed, no setup fees.',
          },
        ],
      },
      {
        label: 'Goals',
        heading: 'User goals, paired with business goals',
        blocks: [
          {
            type: 'pairs',
            pairs: [
              {
                user: 'More ways to save. Our reviews asked for it, verbatim',
                business: 'Deal redemption becomes the new top KPI, ahead of SNAP offers',
              },
              {
                user: 'Adding a deal should feel effortless, even fun',
                business: 'Activation before purchase shows intent, and intent is what brands pay for',
              },
              {
                user: 'Every rule stays legible: expirations, stores, redemption caps',
                business: 'A clean pilot with Snipp becomes the sales story for direct contracts',
              },
            ],
          },
          {
            type: 'text',
            value:
              'That second pair carried real weight. Without activation, a brand can argue the user would have bought the item anyway. Attribution is exactly what justifies their marketing spend.',
          },
        ],
      },
      {
        label: 'Exploration',
        heading: 'Swipe vs. list: launch both, count everything',
        blocks: [
          {
            type: 'text',
            value:
              'Our hypothesis was that a fun, swipe-style way to browse deals would beat a plain list. Slack\'s swipe-to-mark-as-read was the reference. Instead of debating it, we launched both experiences side by side and tracked activation on each.',
          },
          {
            type: 'image',
            src: '/bennydeals_swipes.png',
            caption: 'The swiping pass: rotated cards, SKIP and ADD stickers.',
          },
          {
            type: 'text',
            value:
              'In the prototype, feedback is progressive: the sticker fades in as you drag while the instructions fade out. Finish the stack and you get a completion moment with your total potential savings.',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-completion.png',
            caption: 'The completion moment after the last card.',
          },
          {
            type: 'text',
            value:
              'One idea stayed on the shelf: swiping right on a list item to add the deal inline, like queuing a song in Spotify. Fun gesture, invisible feature.',
          },
          {
            type: 'text',
            value:
              'To make any of it scale, I built an asset library that could turn any product shot and brand logo into a deal card, each with its own pastel background. Fifty-plus brands, one system.',
          },
          {
            type: 'image',
            src: '/bennydeals_assets.png',
            caption: 'The asset library: a scalable system for any image or brand logo.',
          },
        ],
      },
      {
        label: 'The full experience',
        heading: 'Add from anywhere, redeem with a receipt',
        blocks: [
          {
            type: 'text',
            value:
              'Beyond swiping, users could add deals from a searchable, filterable list or a bottom sheet, without leaving their current screen. Added deals rolled up into a shopping-list view with their potential savings. Redemption reused the receipt-upload pattern users already knew from SNAP cash back, ending in an itemized "You earned $4.50!" moment.',
          },
          {
            type: 'image',
            src: '/slide-benny-deals-list.png',
            caption: 'The shopping-list view: added deals and what they\'re worth.',
          },
        ],
      },
      {
        label: 'The data decides',
        heading: '11:1, and a darling gets killed',
        blocks: [
          {
            type: 'text',
            value:
              'The funnels came back lopsided: for every deal added by swiping, eleven were added from the humble plus button. We removed the swiping experience entirely. It was a fun feature to build, and it wasn\'t performant, and those two facts don\'t cancel out.',
          },
          {
            type: 'image',
            src: '/bennydeals_data.png',
            caption: 'The 11:1 ratio that retired the swipe.',
          },
          {
            type: 'text',
            value:
              'The optimizations kept coming after launch. The deal details page grew from a bottom sheet into a full screen with better hierarchy. Search and filters gave way to lightweight category chips, which also fixed a dead end where a keyword search could return nothing.',
          },
        ],
      },
      {
        label: 'Outcomes',
        heading: 'From 4% to 22% conversion',
        blocks: [
          {
            type: 'text',
            value:
              'Discovery-to-redemption conversion climbed from 4% to 22% across the redesigns. Momentum showed up in Slack before it showed up in the board deck: "Crossed 1K deals redeemed over the weekend 💪," Rishi posted. A week later: "we\'ve crossed 4K deals 🎉."',
          },
          {
            type: 'text',
            value:
              'By selling the story of the Snipp pilot, we booked direct contracts with Kraft, Olipop, Liquid Death, and more — 12+ brand partnerships that added 85 new deals to the app. Each signed contract got its own email blast and push notification.',
          },
          {
            type: 'image',
            src: '/bennydeals_brands.png',
            caption: 'The partner wall: Hot Pockets to Liquid Death.',
          },
        ],
      },
      {
        label: 'Reflection',
        heading: 'Ship the experiment with its own funnel',
        blocks: [
          {
            type: 'text',
            value:
              'I\'m glad we built the swipe, not because it won (it lost, eleven to one) but because we launched it beside the list with its own funnel from day one. The data retired it in weeks instead of letting it linger for quarters. Experiments without their own instrumentation don\'t die; they just take up residence.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Benny Boosts
  // ─────────────────────────────────────────────────────────
  {
    slug: 'benny-boosts',
    title: 'Benny Boosts: tipping the unit economics',
    role: 'Founding designer · Benny (seed, team of 6) · 2025',
    heroImage: '/slide-benny-boosts-ideas.png',
    tags: ['consumer fintech', 'mobile', 'growth'],
    metrics: [
      { value: 54, suffix: '%', label: '90-day earner retention, up from under 20%' },
      { value: 3, label: 'incentive mechanics, consolidated into one framework' },
      { value: 100, prefix: '$', label: 'sweepstakes prize; every deal redeemed was an entry' },
    ],
    tldr:
      'Deals made us money, SNAP offers cost us money, and both paid the user. Boosts was the framework that nudged users toward the profitable one. A discovery session produced three mechanics (gating, streaks, sweepstakes), and the design challenge was consolidating them into a single surface. 90-day earner retention nearly tripled, from under 20% to 54%.',
    collaborators: [
      { name: 'Steve Austin', role: 'CTO' },
      { name: 'Rishi Ahuja', role: 'CEO' },
      { name: 'Surabhi Jain', role: 'Founding Engineer' },
    ],
    sections: [
      {
        label: 'Why this, why now',
        heading: 'Closing the ratio, faster',
        blocks: [
          {
            type: 'text',
            value:
              'Deal redemption was still lagging SNAP offer redemption. The target: get deals to half of SNAP redemptions, on the path to netting equal, while building the momentum to win larger brand budgets. The ratio was climbing week over week, but not fast enough to move through those budgets on schedule.',
          },
          {
            type: 'image',
            src: '/bennyboosts_ratio.png',
            caption: 'The Deal : SNAP offer ratio, closing in on 0.5 but needing a push.',
          },
        ],
      },
      {
        label: 'First idea',
        heading: '"Exit through the gift shop"',
        blocks: [
          {
            type: 'text',
            value:
              'The cheapest lever was friction. We\'d actually made the "Add receipt" button more prominent at one point, and users would pop in, hit the money button, and leave. So we moved it under the Deals tab: to upload a SNAP receipt, you now walk past your deals, the way a museum routes you out through the gift shop.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-giftshop.png',
            caption: 'The "Add receipt" button, relocated into the Deals tab.',
          },
          {
            type: 'text',
            value:
              'I also explored a dynamic version whose label shifted with context: "Get $2.75 · From 3 deals" when you had deals waiting, "Get 1-3% back" when you didn\'t. We shipped the static button. The dynamic one was clever, and clever wasn\'t the point.',
          },
          {
            type: 'image',
            src: '/bennyboosts_dynamic.png',
            caption: 'Explored: a dynamic button that reads the room. Shipped: the boring one.',
          },
        ],
      },
      {
        label: 'Discovery',
        heading: 'A structured session beats a brainstorm',
        blocks: [
          {
            type: 'text',
            value:
              'Friction alone wouldn\'t close the gap, so I ran a product discovery session with the team in FigJam. We warmed up on Cialdini\'s principles of persuasion, pulled competitor references (Acorns\' path to $1M, gopuff\'s spin-to-win), brainstormed on stickies, then voted and put dates on the winners before the call ended.',
          },
          {
            type: 'image',
            src: '/bennyboosts_discovery.png',
            caption: 'The session board: analysis → warmup → brainstorm → prioritized timeline.',
          },
        ],
      },
      {
        label: 'The framework',
        heading: 'Three ideas, one surface',
        blocks: [
          {
            type: 'text',
            value:
              'Three mechanics survived: gating (unlock SNAP cash back by redeeming a deal first), streaks (redeem multiple deals from one brand for a cash bonus), and sweepstakes (every deal is an entry to win $100). Any one of them could ship alone. The design challenge was giving all three a shared home, so we weren\'t inventing a new surface per experiment.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-ideas.png',
            caption: 'The three mechanics, consolidated under Boosts.',
          },
          {
            type: 'text',
            value:
              'The answer was a Boosts sub-tab that rebranded SNAP offers as "SNAP Boosts," locked until the user redeemed one deal, with deal-group bonuses and seasonal sweepstakes living alongside.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-sweepstakes.png',
            caption: 'Sweepstakes: every deal redeemed is an entry.',
          },
          {
            type: 'image',
            src: '/slide-benny-boosts-locked.png',
            caption: 'Gating: SNAP Boosts unlock by engaging with deals.',
          },
        ],
      },
      {
        label: 'Outcomes',
        heading: 'Retention nearly tripled',
        blocks: [
          {
            type: 'text',
            value:
              '90-day retention for earners went from under 20% to 54%. Our working hypothesis: the monthly unlock cadence of SNAP Boosts gave users a reason to come back on a rhythm, and rhythms build habits. Boosts also gave experimental features a permanent home, so the next mechanic could ship into an existing surface instead of a new one.',
          },
        ],
      },
      {
        label: 'Reflection',
        heading: 'Rhythms beat moments',
        blocks: [
          {
            type: 'text',
            value:
              'We built Boosts to move deal redemptions, and it did. But the number I still think about is retention. The mechanics that moved it weren\'t the flashy ones; they were the ones with a cadence, a reason to return next month. Since then, when I evaluate an incentive idea, I ask whether it creates a moment or a rhythm. Moments spike. Rhythms compound.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // UrbanFootprint App Homepage
  // ─────────────────────────────────────────────────────────
  {
    slug: 'urbanfootprint',
    title: 'UrbanFootprint: a homepage for two audiences',
    role: 'Product designer · UrbanFootprint (Series B, team of 60) · 2024',
    heroImage: '/urbanfootprint_hero.png',
    tags: ['B2B SaaS', 'web', 'design systems'],
    metrics: [
      { value: 4, suffix: '%', label: 'dashboard adoption at kickoff. The number to double' },
      { value: 4, label: 'jobs to be done, distilled from three executives\' asks' },
      { value: 2, suffix: '×', label: 'the usage and collaboration targets we designed against' },
    ],
    tldr:
      'UrbanFootprint\'s new dashboards product was invisible: a quarter after launch, fewer than 4% of users had created one, because login dropped everyone into their last mapping project. I made the case for a post-login homepage serving both technical and non-technical users, ran a workshop to align three executives on four jobs to be done, and designed it as a standalone Radix app that seeded a new design language. It entered development on schedule for an early-October release.',
    collaborators: [
      { name: 'Nick McIntosh', role: 'VP of Product' },
      { name: 'Dan Cory', role: 'Principal Product Manager' },
      { name: 'Evan Davis', role: 'Staff Frontend Engineer' },
      { name: 'Matt Catoe', role: 'Senior Frontend Engineer' },
    ],
    sections: [
      {
        label: 'Why this, why now',
        heading: 'A product nobody could find',
        blocks: [
          {
            type: 'text',
            value:
              'UrbanFootprint pairs two products: mapping for geospatial power users, and dashboards for generalists who want data at a glance. Dashboards shipped at the end of Q1 2024. By the end of Q2, fewer than 4% of users had created one.',
          },
          {
            type: 'text',
            value:
              'The root cause was the post-login flow: everyone got dropped straight into the last mapping project they\'d opened. "I\'d prefer to have a landing page where I can select the project I want to open," a technical customer told us. A non-technical one asked, "I saw dashboard examples during pre-sales, where can I find those?" Same flow, failing both.',
          },
          {
            type: 'image',
            src: '/uf_login.png',
            caption: 'Login → the last edited project, whether you wanted it or not.',
          },
        ],
      },
      {
        label: 'Goals',
        heading: 'Two audiences, two testable bets',
        blocks: [
          {
            type: 'pairs',
            pairs: [
              {
                user: 'Technical users pick their project at login, instead of waiting on the wrong one to load',
                business: 'Double project collaboration, measured as projects with multiple editors',
              },
              {
                user: 'Non-technical users find the dashboards they were sold in pre-sales',
                business: 'Double dashboard usage from its 4% baseline',
              },
            ],
          },
          {
            type: 'text',
            value:
              'I wrote both sub-hypotheses down before drawing anything, so we\'d know later whether the homepage actually worked or just looked like it did.',
          },
        ],
      },
      {
        label: 'First pass',
        heading: 'Engineering feedback changed the plan',
        blocks: [
          {
            type: 'text',
            value:
              'My first pass leaned on the existing design library and codebase to minimize engineering lift. The engineers pushed back. "If we build the homepage on top of our existing application codebase, it will load in a bunch of extra things and be super slow," Evan told me. Matt countered with something better: make the homepage a separate application built on Radix, pointing at the mapping and dashboards apps.',
          },
          {
            type: 'image',
            src: '/uf_firstpass.png',
            caption: 'The first mock, designed to minimize engineering lift. It didn\'t survive, for good reason.',
          },
          {
            type: 'text',
            value:
              'It was the right call. UrbanFootprint ran on BlueprintJS, which was useful early but opinionated and hard to evolve. Radix is unstyled by design, so the homepage became the proving ground for a design language we defined from scratch.',
          },
          {
            type: 'image',
            src: '/uf_designsystem.png',
            caption: 'The component set for the homepage: the seed of the new design language.',
          },
        ],
      },
      {
        label: 'Alignment',
        heading: 'Three executives, four jobs to be done',
        blocks: [
          {
            type: 'text',
            value:
              'Everyone senior wanted something different from this page. The CEO wanted visible collaboration. The VP of Product wanted dashboard templates front and center. The VP of Sales wanted marketing for new geospatial features; ads, essentially. All reasonable, all competing for the same pixels.',
          },
          {
            type: 'image',
            src: '/uf_references.png',
            caption: 'The workshop: critiquing eight external homepages, from Felt to Tableau.',
          },
          {
            type: 'text',
            value:
              'So I ran a workshop. We critiqued external homepage references together, voted, then distilled every ask into four jobs to be done: discoverability for new users, get the task at hand done, pick up where I (or my colleague) left off, and get help. Once those were on the wall, the debates got shorter.',
          },
          {
            type: 'image',
            src: '/uf_jtbd.png',
            caption: 'Ending the workshop with alignment on jobs to be done.',
          },
        ],
      },
      {
        label: 'Second pass',
        heading: 'Designing inside real constraints',
        blocks: [
          {
            type: 'text',
            value:
              'The second pass used the available Radix components and the four jobs-to-be-done as hard boundaries.',
          },
          {
            type: 'image',
            src: '/uf_secondpass.png',
            caption: 'The second pass, annotated against the four jobs.',
          },
          {
            type: 'text',
            value:
              'PM feedback sharpened it again. The one-click "create dashboard" button couldn\'t exist in v1; there was no such workflow yet. And mixing dashboards and projects in one view was both easier to build and easier to learn. My action item: explore a sidebar-less homepage.',
          },
          {
            type: 'image',
            src: '/uf_finalpass.png',
            caption: 'The final spec: one unified view of projects, dashboards, and templates. Tap to open the prototype.',
            href: 'https://www.figma.com/proto/RKvw882oYowkxcJAdZNkZc/%E2%AD%90-Q2-2024---Analyst-Homepage?node-id=5490-4057&node-type=FRAME&t=VFj7MP6Cwf9IpxHj-0&scaling=scale-down-width&content-scaling=fixed&page-id=2527%3A2&starting-point-node-id=5490%3A4057&hide-ui=1',
          },
          {
            type: 'text',
            value:
              'Around the core view, I refined the edges: a condensed table of every asset in the org, search across projects and dashboards, and org switching from the nav.',
          },
          {
            type: 'image',
            src: '/uf_table.png',
            caption: 'The table view, for users who want full control of their assets.',
          },
        ],
      },
      {
        label: 'Outcomes',
        heading: 'Shipped into development, hypotheses on the record',
        blocks: [
          {
            type: 'text',
            value:
              'The homepage entered development on schedule for an early-October release at home.urbanfootprint.com. The roadmap from there: refresh the legacy design language across UrbanFootprint\'s products to match, watch whether dashboard creation and collaboration doubled as hypothesized, and add a notification system for team activity.',
          },
          {
            type: 'image',
            src: '/uf_notifications.png',
            caption: 'Next: notifications, so teammate activity is visible from the homepage.',
          },
        ],
      },
      {
        label: 'Reflection',
        heading: 'The best call wasn\'t mine',
        blocks: [
          {
            type: 'text',
            value:
              'The decision that unlocked this project (a standalone app on Radix) came from a frontend engineer, not from me. My contribution was building a process where that idea could surface early and win: sharing work in progress before it was precious, and treating engineering feedback as design input. I\'ve worked that way ever since.',
          },
        ],
      },
    ],
  },
]

export function getProjectV2(slug: string): ProjectV2 | undefined {
  return projectsV2.find(p => p.slug === slug)
}
