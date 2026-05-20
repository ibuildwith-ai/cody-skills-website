/**
 * Site-wide configuration constants.
 *
 * Anything that's repeated across pages/components and might need to change
 * later (contact email, parent-brand URL, etc.) lives here. Components and
 * pages import these instead of hardcoding values, so a single edit
 * propagates everywhere.
 */

/** Contact email for the Cody Skills site. Used by:
 *  - MarketingHeader: "Contact" link in the topbar and mobile drawer
 *  - src/pages/index.astro: footer "Contact" link
 *  - SkillCard: coming-soon "Notify me" mailto
 */
export const CONTACT_EMAIL = 'marcelo@ibuildwith.ai';

/** Parent brand URL. Used by topbar and footer "iBuildWith.ai ↗" links. */
export const IBUILDWITH_AI_URL = 'https://www.ibuildwith.ai';
