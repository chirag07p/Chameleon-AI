## Chameleon AI – Product Requirements Document (PRD)

### 1. Product overview

- **Product name**: Chameleon AI – Contextual Ad Camouflage Platform  
- **One‑liner**: A contextual ad platform that dynamically camouflages ads to match any website’s native design, boosting performance without cookies or intrusive tracking.  
- **Primary assets in this MVP**:
  - `index.html`: main marketing / investor page with interactive Ad Creator.
  - `mvp.html`: interactive demo of "camouflaged ad vs host page" with embedded Ad Creator.
  - `styles.css`: shared visual system including Ad Creator and preview panel styles.
  - `script.js`: interactivity (nav, tabs, form submission, real-time ad preview).

### 2. Problem statement

- **Current state of digital ads**:
  - Generic banners feel intrusive and visually disconnected from content.
  - Users have banner blindness; they ignore obvious ad units.
  - Heavy reliance on cookies and user tracking is increasingly restricted.
- **Impact**:
  - Lower CTR and conversion for advertisers.
  - Lower yield and RPM for publishers.
  - Poor, distrustful user experience.

### 3. Goals and non‑goals

- **Goals (for this MVP site)**:
  - Clearly communicate what Chameleon AI is and the value proposition.
  - Visually demonstrate the idea of “camouflaged contextual ads”.
  - Capture demo requests from qualified leads via the “Request a demo” form.
  - Provide a simple hosted MVP (via GitHub Pages or similar) that can be shared with investors, partners, and early adopters.
- **Non‑goals (for this MVP)**:
  - No live ad serving or integration with real ad exchanges.
  - No full multi‑tenant dashboard, billing, or production‑grade auth.
  - No complex analytics pipeline; only front‑end demo and lead capture.

### 4. Target users and personas

- **Primary persona: Mid‑market digital ad agency lead**
  - Role: Performance / programmatic lead or strategy director.
  - Needs:
    - Higher CTR and ROI on campaigns.
    - Brand‑safe, privacy‑respecting placements.
    - Differentiated offering to pitch to clients.
  - Success: Understands Chameleon AI in 2–3 minutes and is willing to “Request a demo”.

- **Secondary persona: Publisher / media house product owner**
  - Needs:
    - Increase page RPM without hurting UX.
    - Replace low‑performing banners with native‑style units.

- **Tertiary persona: Investor / accelerator reviewer**
  - Needs:
    - Quickly grasp problem, solution, market, competition, and basic financial upside.

### 5. User journeys (for the MVP site)

1. **Investor journey**
   - Lands on `index.html` (from a deck, email, etc.).
   - Skims hero, problem, solution, features, competitive landscape, and financials.
   - Optionally clicks into `mvp.html` to see a visual demo.
   - Leaves with a clear narrative of what Chameleon AI does and why now.

2. **Prospective customer (agency / publisher) journey**
   - Lands on `index.html`.
   - Reads hero and problem sections, sees native vs generic visual in hero.
   - Skims solution and features and benefits (tabs).   - Explores Ad Creator section to create a custom ad with their own branding.
   - Toggles between light and dark themes to see contextual adaptation.   - Scrolls to contact section and fills out “Request a demo”.
   - Their email client opens with a prefilled message to the founder’s email.

3. **Demo exploration journey**
   - Lands directly on `mvp.html` (from a deck or email).
   - Sees host article shell with a Chameleon AI ad that visually matches.
   - Toggles theme between light and dark to see ad restyle.   - Uses embedded Ad Creator to customize headline, branding, and CTA.
   - Observes how customized ad maintains contextual styling across themes.   - Clicks “See how it works”, accepts warning, and is taken to `index.html`.

### 6. Functional requirements

#### 6.1 Main site (`index.html`)

- **Hero section**
  - Display a clear headline, subheadline, and primary CTA: “Book a strategy call” / “See how it works”.
  - Show a visual representation of host content plus a Chameleon AI native ad.
  - “See how it works” must scroll or link to the solution section.

- **Navigation**
  - Sticky header with logo and nav links: Problem, Solution, Features, Benefits, Customers, Market, Financials, Ad Creator, Contact.
  - On desktop: horizontal nav.
  - On smaller screens: hamburger menu toggling an overlay nav (`script.js`).

- **Sections**
  - Problem, Solution, Features, Benefits, Ad Creator, Customers, Competitors, Financials, Contact as currently structured in `index.html`.
  - Tabs in Benefits section:
    - Three tabs: Functional, Emotional, Social & Macro.
    - Clicking a tab switches the visible panel and active state.

- **Ad Creator section**
  - Interactive form allowing users to create and preview custom contextual ads:
    - Form fields:
      - Headline: Text input for the ad headline (default: "Contextual ads that blend in, not stick out.")
      - Description: Textarea for ad body text (default: pre-filled description)
      - CTA Button Text: Text input for call-to-action (default: "See how it works")
      - Brand Name: Text input for brand identifier (default: "Chameleon AI")
      - Brand Logo URL: URL input for logo image (optional)
      - Preview Theme: Toggle buttons for Light Theme / Dark Theme
  - Live preview panel:
    - Displays ad in real-time as user types
    - Shows logo (if URL provided), brand badge, headline, description, and CTA button
    - Theme toggle:
      - Light theme: white background with dark text and button
      - Dark theme: dark slate background with light text and button
      - Smooth transitions between themes
    - Visual treatment:
      - Green accent border and glow effect
      - Theme-appropriate colors and contrast
      - Sticky positioning on desktop (scrolls with page on mobile)
  - Real-time updates:
    - All form inputs update preview instantly via JavaScript event listeners
    - Logo URL updates preview image source dynamically
    - Theme selection updates both wrapper and ad preview styling

- **Request a demo form**
  - Fields: Name, Company / Agency, Work email, Monthly ad spend (select), Message.
  - Client‑side behavior:
    - On submit, prevent default.
    - Build a `mailto:` URL addressed to `pradhanchirag03@gmail.com` with:
      - Subject: “Chameleon AI – Demo request”.
      - Body: includes all form field values.
    - Trigger `window.location.href = mailto:...` to open the visitor’s email client.
    - Show an alert explaining that their email client opened and they must click Send.

#### 6.2 MVP demo page (`mvp.html`)

- **Layout**
  - Top bar with logo and “MVP demo” label.
  - Host article shell with title, metadata, and paragraphs.
  - Sidebar with a single Chameleon AI ad block.

- **Theme toggle**
  - Two buttons: “News blog (light)” and “Tech article (dark)”.
  - Default: dark theme active.
  - Clicking a theme:
    - Updates active state styles on toggle buttons.
    - Applies `.light` / `.dark` classes to the host shell.
    - Triggers `applyChameleonStyles()` to restyle the ad.

- **Chameleon styling logic**
  - Read computed background, text color, and font from host container.
  - Apply these to the ad container and button with sufficient contrast.
  - Detect perceived luminance to choose light/dark button styling.

- **CTA behavior**
  - “See how it works” button:
    - On click, show a confirm dialog warning that the user is leaving the MVP demo.
    - If confirmed, navigate to `index.html` in the same tab.
- **Ad Creator (embedded in MVP)**
  - Compact inline form below the main demo:
    - Form fields:
      - Headline: Updates the ad headline in real-time
      - Brand Name: Updates the badge text
      - Description: Updates the ad body text
      - CTA Button: Updates the button text
      - Logo URL: Updates the ad logo image
  - Form updates:
    - All inputs update the Chameleon AI ad block above instantly
    - Changes persist while toggling between light/dark themes
    - Logo updates dynamically when valid URL is provided
  - Integration with theme toggle:
    - Custom ad content maintains styling when switching themes
    - Ad continues to "camouflage" with user-entered content

### 7. Non‑functional requirements

- **Performance**
  - Static assets only (no backend); suitable for GitHub Pages.
  - Page should load and become interactive quickly on typical broadband and modern mobile.

- **Compatibility**
  - Modern evergreen browsers (Chrome, Edge, Firefox, Safari).
  - Responsive layout for desktop, tablet, and mobile widths.

- **Reliability**
  - No JavaScript errors in console on initial load or basic interactions.
  - Graceful behavior if:
    - `mailto:` is blocked or no email client is configured (alert still shows, but submission depends on client).

### 8. Analytics and instrumentation (future)

- Track:
  - Visits to main page and MVP page.
  - Clicks on “See how it works” (both hero and MVP).
  - Demo form submissions (and eventual conversion).  - Ad Creator interactions:
    - Number of users who interact with Ad Creator form
    - Theme toggle usage (light vs dark preferences)
    - Form field completion rates
    - Time spent customizing ads
- Initial MVP may launch **without** actual analytics; this is an explicit future enhancement.

### 9. Launch and hosting

- **Hosting**: GitHub Pages.
  - Repository: public repo with these static files.
  - Pages source: `main` branch, `/root`.
  - Primary URL: `https://chirag07p.github.io/Chameleon-AI/chameleon%20ai/index.html`.
  - Demo URL: `https://chirag07p.github.io/Chameleon-AI/chameleon%20ai/mvp.html`.

- **Additional assets**:
  - `logo.png`: Chameleon AI brand logo used in header and ad previews.
  - `venture-journey.pdf`: Supporting documentation (pitch deck or investor materials).
  - `TODO.md`: Development task tracking and feature implementation checklist.

### 10. Open questions / future extensions

- Replace `mailto:` flow with a backend or form service for reliable lead capture.
- Add simple CRM / spreadsheet integration for demo requests.
- Add more realistic configuration view (e.g., how agencies configure campaigns).
- Build a "live" code demo or interactive inspector showing how style extraction works on arbitrary pages.
- **Ad Creator enhancements**:
  - Save and export created ads (JSON download, shareable link).
  - Add image upload for logo instead of URL-only.
  - Additional customization options: ad size, layout variations, font choices.
  - Preview on multiple theme presets (e.g., news, blog, e-commerce).
  - Code snippet export showing how to implement the ad on real sites.
  - A/B testing visualization showing performance predictions.
---

### 11. Version history

#### v1.1 – Ad Creator Feature (March 2026)
- **Added**: Interactive Ad Creator section to `index.html`
  - Form with real-time preview of contextual ads
  - Theme toggle (light/dark) with live styling updates
  - Customizable fields: headline, description, CTA, brand name, logo URL
  - Sticky preview panel with smooth theme transitions
- **Added**: Embedded Ad Creator in `mvp.html`
  - Compact inline form to customize the demo ad
  - Real-time updates to the Chameleon AI ad block
  - Seamless integration with existing theme toggle
- **Enhanced**: JavaScript (`script.js`)
  - Event listeners for all Ad Creator form inputs
  - Dynamic theme switching logic with CSS class management
  - Logo URL validation and dynamic image loading
- **Enhanced**: Styles (`styles.css`)
  - Ad Creator form styling with focus states
  - Preview panel with light/dark theme support
  - Theme selector toggle buttons with active states
  - Responsive design for mobile and tablet viewports
- **Updated**: Navigation to include "Ad Creator" link

#### v1.0 – Initial MVP (Launch)
- Core marketing site with hero, problem, solution, features, benefits sections
- MVP demo page with contextual ad camouflage demonstration
- Theme toggle (light/dark) for host article simulation
- Contact form with mailto integration
- Responsive design and mobile navigation
