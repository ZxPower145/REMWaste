# WeWantWaste Skip Selection Redesign

## 🚀 Project Overview

WeWantWaste is a waste‑management service focused on helping users choose the right skip for their needs. This repository contains a redesigned **Skip Selection** flow, improving usability while preserving core functionality:

* **Select waste types** (e.g., plasterboard, heavy waste)
* **Specify quantities** and special requirements
* **Filter, compare, and choose** from available skips

## 🎨 Live Demo

Try out the redesign in your browser:

[View Live Demo →](https://8yxltq-5173.csb.app/)

## 🛠 Technologies

* **React** (v18+) & **TypeScript**
* **Vite** for fast bundling and HMR
* **Tailwind CSS** with PostCSS & Autoprefixer
* **Framer Motion** for animations
* **React Icons** library
* **ESLint** for code quality

## 📥 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/ZxPower145/REMWaste.git
   cd REMWaste
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├─ app.css                    # Tailwind + custom styles
├─ main.tsx                   # React entry point
├─ App.tsx                    # Root component
├─ global.d.ts                # Global type declarations
├─ vite-env.d.ts              # Vite environment types
├─ components/
│  ├─ CustomSlider.tsx        # Range slider for weights
│  ├─ modal/                  # Waste‐detail modal subcomponents
│  │  ├─ ModalHeader.tsx
│  │  ├─ WarningBanner.tsx
│  │  ├─ TabNavigation.tsx
│  │  ├─ TypesTab.tsx
│  │  ├─ PercentageTab.tsx
│  │  ├─ PlasterboardTab.tsx
│  │  └─ ModalFooter.tsx
│  ├─ skip/                   # Skip‐selection UI
│  │  ├─ SkipFilterBar.tsx
│  │  ├─ SkipCard.tsx
│  │  └─ SkipComparisonModal.tsx
│  └─ waste/                  # Waste‐selection UI
│     ├─ WasteCard.tsx
│     └─ WasteModal.tsx
├─ hooks/
│  └─ useMediaQuery.ts        # Responsive hook
├─ pages/
│  ├─ WasteTypeSelection.tsx  # Initial waste‐type screen
│  └─ SkipSelectPage.tsx      # Skip selection with filters
├─ providers/
│  └─ WasteSelectorProvider.tsx  # Context for waste state
└─ types/
   └─ Waste.ts                # Waste & skip interfaces
```

## 🧩 Design Decisions

### Modular Components

* **Modal** broken into Header, Tabs, WarningBanner, Footer → easier to maintain and test.
* **Skip UI** separated into FilterBar, SkipCard, ComparisonModal.

### Responsive & Accessible

* Mobile‑first with `useMediaQuery` hook.
* Semantic HTML, ARIA labels, keyboard navigation.
* High‑contrast, WCAG‑compliant colors.

### Animations & Interactions

* Smooth transitions via Framer Motion.
* Micro‑interactions for hover and selection.
* Modals animate into view, maintaining context.

## ✅ Key Features

1. **Dynamic Filtering**

   * Road placement, size, price, heavy‑waste support
   * Real‑time updates on user input
2. **Skip Comparison**

   * Select up to 3 skips side‑by‑side
   * Compare prices (pre‑VAT, VAT, total), periods, and specs
3. **Skip Size Guide**

   * 4–6 yd³ small skips for minor jobs
   * 8–10 yd³ medium for renovations
   * 12–16 yd³ large for big projects
   * 20–40 yd³ roll‑on/roll‑off for industrial use

## 🔮 Future Improvements

* Persist selections in localStorage
* Add unit & integration tests
* Full accessibility audit
* i18n support
* Skip‑placement calendar picker
* 3D skip size visualizations
* Smart recommendation engine

## 🔌 API Integration

Skip data is fetched dynamically:

```ts
fetch(
  `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
)
  .then((res) => res.json())
  .then((data: Skip[]) => setSkips(data));
```

## ✉️ Contact

Questions or feedback? 📧 [costinbogdan245@gmail.com](mailto:costinbogdan245@gmail.com)
