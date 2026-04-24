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

export const projects: Project[] = [
  {
    slug: 'benny-card',
    title: 'Launching the Benny Card',
    subtitle: 'An all-hands effort to release our flagship Visa credit card, alongside a seamless digital experience.',
    heroImage: '/benny-wide.png',
    tags: ['consumer fintech', 'mobile'],
    collaborators: [
      { name: 'TBD', role: 'Product Manager' },
      { name: 'TBD', role: 'iOS Engineer' },
      { name: 'TBD', role: 'Android Engineer' },
    ],
    context: [
      {
        type: 'text',
        value: 'At launch, Benny focused on helping SNAP households get cash back on groceries through receipt scanning. The Benny Card expanded that mission — a real Visa credit card that earns rewards on SNAP-eligible purchases and helps users build credit for the first time.',
      },
      {
        type: 'text',
        value: 'The project spanned the full launch: in-app card activation flows, balance and transaction UIs, push notification design, and the physical card itself.',
      },
    ],
    sections: [
      {
        label: 'Part 1',
        heading: 'The in-app experience',
        blocks: [
          {
            type: 'text',
            value: 'The activation experience needed to guide new cardholders through identity verification, PIN setup, and their first look at their SNAP benefits balance — in as few steps as possible. We iterated heavily on the ordering of these steps and the microcopy at each stage.',
          },
          {
            type: 'image',
            src: '/benny-wide.png',
            alt: 'Benny app onboarding and activation screens',
            caption: 'Onboarding, activation, and card management',
          },
          {
            type: 'image',
            src: '/benny_card.png',
            alt: 'Benny Card feature screens',
            caption: 'Card screens and balance view',
          },
        ],
      },
      {
        label: 'Part 2',
        heading: 'The physical card',
        blocks: [
          {
            type: 'text',
            value: 'The Benny Card is a real, physical Visa card shipped to approved users. We wanted it to feel premium and distinct — a bold cobalt blue with the Benny mark, and a clean back with minimal clutter. The card went through four production rounds before we landed on the final finish.',
          },
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
