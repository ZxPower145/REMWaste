# WeWantWaste Skip Selection Redesign

## Project Overview

This project is a redesign of the skip selection page for **WeWantWaste**, a waste management service. The goal was to improve the user interface and experience while maintaining the existing functionality. The application allows users to select waste types, specify heavy waste details, and proceed to skip selection.

## Live Demo

[View the live demo](https://codesandbox.io/p/devbox/8yxltq)

## Technologies Used

* **React 19** – For building the user interface
* **TypeScript** – Static typing for improved developer experience
* **Vite** – Fast bundler and development server
* **Tailwind CSS** – Utility-first CSS framework for styling
* **Framer Motion** – Declarative animations and transitions
* **React Icons** – Icon library for React
* **ESLint** – Linting and code quality enforcement
* **PostCSS + Autoprefixer** – CSS processing pipeline for vendor prefixes

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ZxPower145/REMWaste.git
   cd REMWaste
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```bash
src/
├── components/           
│   ├── modal/            # Modular modal components
│   │   ├── ModalFooter.tsx
│   │   ├── ModalHeader.tsx
│   │   ├── PercentageTab.tsx
│   │   ├── PlasterboardTab.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── TypesTab.tsx
│   │   └── WarningBanner.tsx
│   ├── WasteCard.tsx     # Card component for waste types
│   ├── WasteModal.tsx    # Main modal wrapper for heavy waste details
│   └── CustomSlider.tsx  # Custom slider component
├── hooks/
│   └── useMediaQuery.tsx # Hook for responsive design
├── pages/
│   └── WasteTypeSelection.tsx # Main waste type selection page
├── providers/
│   └── WasteSelectorProvider.tsx # Context for waste state management
├── types/
│   └── Waste.ts          # Types for waste and skips
├── app.css               # Global Tailwind + custom CSS
├── App.tsx               # Root app component
├── global.d.ts           # Global type declarations
├── main.tsx              # Entry point for React + Vite
└── vite-env.d.ts         # Vite environment types
```

## Design Decisions

### Modular Architecture

The `WasteModal` component has been split into smaller, manageable pieces:

* **ModalHeader** – Title and close button
* **WarningBanner** – Consistent warning messages
* **TabNavigation** – Switch between modal tabs
* **TypesTab**, **PercentageTab**, **PlasterboardTab** – Tab contents
* **ModalFooter** – Footer navigation and actions

This modular design improves maintainability, readability, and testability.

### Responsive Design

* Uses `useMediaQuery` to adapt layout based on screen size
* Mobile-first design with conditional layouts
* Fixed footer behavior on mobile for enhanced usability

### Accessibility Improvements

* Semantic HTML and ARIA attributes
* Focus management and keyboard navigation
* High contrast and WCAG-compliant color usage

### Animation and Interaction

* Smooth layout transitions using **Framer Motion**
* Micro-interactions (hover, selection feedback)
* Modal animations that visually connect with content

## Challenges and Solutions

### 1. Complex Modal State Management

**Solution**: Context + modular components helped simplify the state logic.

### 2. Responsive Layout with Fixed Footer

**Solution**: `ResizeObserver` dynamically adjusts padding based on footer height.

### 3. Performance with Animations

**Solution**: Leveraged `Framer Motion` layout animations and optimized component re-renders using `React.memo`.

## Future Improvements

1. Persist waste selection state in localStorage
2. Add unit and integration tests
3. Improve accessibility audit coverage
4. Further optimize animation performance
5. Support multiple languages (i18n)

## API Integration

The app dynamically loads skip data from the WeWantWaste API:

```typescript
fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`)
  .then((r) => r.json())
  .then((data: Skip[]) => setSkips(data));
```

This data is used to populate the skip options based on the user's location and waste type selections.

## Contact

Have questions or feedback?
📧 [costinbogdan245@gmail.com](mailto:costinbogdan245@gmail.com)
