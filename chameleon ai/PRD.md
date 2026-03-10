## Chameleon AI – Product Requirements Document (PRD)

### 1. Product overview

- **Product name**: Chameleon AI – Contextual Ad Camouflage Platform  
- **One‑liner**: A contextual ad platform that dynamically camouflages ads to match any website’s native design, boosting performance without cookies or intrusive tracking.  
- **Primary assets in this MVP**:
  - `index.html`: main marketing / investor page.
  - `mvp.html`: interactive demo of “camouflaged ad vs host page”.
  - `styles.css`: shared visual system.
  - `script.js`: basic interactivity (nav, tabs, form submission).

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
   - Skims solution and features and benefits (tabs).
   - Scrolls to contact section and fills out “Request a demo”.
   - Their email client opens with a prefilled message to the founder’s email.

3. **Demo exploration journey**
   - Lands directly on `mvp.html` (from a deck or email).
   - Sees host article shell with a Chameleon AI ad that visually matches.
   - Toggles theme between light and dark to see ad restyle.
   - Clicks “See how it works”, accepts warning, and is taken to `index.html`.

### 6. Functional requirements

#### 6.1 Main site (`index.html`)

- **Hero section**
  - Display a clear headline, subheadline, and primary CTA: “Book a strategy call” / “See how it works”.
  - Show a visual representation of host content plus a Chameleon AI native ad.
  - “See how it works” must scroll or link to the solution section.

- **Navigation**
  - Sticky header with logo and nav links: Problem, Solution, Features, Benefits, Customers, Market, Financials, Contact.
  - On desktop: horizontal nav.
  - On smaller screens: hamburger menu toggling an overlay nav (`script.js`).

- **Sections**
  - Problem, Solution, Features, Benefits, Customers, Competitors, Financials, Contact as currently structured in `index.html`.
  - Tabs in Benefits section:
    - Three tabs: Functional, Emotional, Social & Macro.
    - Clicking a tab switches the visible panel and active state.

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
  - Demo form submissions (and eventual conversion).
- Initial MVP may launch **without** actual analytics; this is an explicit future enhancement.

### 9. Launch and hosting

- **Hosting**: GitHub Pages.
  - Repository: public repo with these static files.
  - Pages source: `main` branch, `/root`.
  - Primary URL: `https://<github-username>.github.io/<repo-name>/index.html`.
  - Demo URL: `https://<github-username>.github.io/<repo-name>/mvp.html`.

### 10. Open questions / future extensions

- Replace `mailto:` flow with a backend or form service for reliable lead capture.
- Add simple CRM / spreadsheet integration for demo requests.
- Add more realistic configuration view (e.g., how agencies configure campaigns).
- Build a “live” code demo or interactive inspector showing how style extraction works on arbitrary pages.

