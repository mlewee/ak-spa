# ASPA - Arknights Stronghold Protocol Alliance

A modern, responsive website for documenting Alliances, Attributes, and Items from the game mode Stronghold Protocol of the game Arknights.

## Features

- **Field-archive design**: Copper-on-ink dossier layout, not a clone of the original SPA Database UI
- **Mobile-First**: Fully responsive design for all screen sizes
- **Multi-Season Support**: View data from Season 1, Season 2, and Season 2.1
- **Interactive Filtering**: Filter operators by alliance and tier
- **Detailed Tooltips**: View operator attributes on hover/click

## Pages

- **Home**: Welcome page with project information and links
- **Attributes**: Browse and filter operators by their attributes
- **Alliances**: View alliance bonds and their effects
- **Strategies**: See battle strategies and their effects
- **Items**: Browse shop items and equipment combinations

## Data Sources

All data is sourced from the original Arknights Stronghold Protocol Alliance community documentation:
- Operators: Skills, attributes, tiers, and alliances
- Alliances: Bond effects and activation requirements
- Items: Shop items with costs and effects
- Strategies: Battle strategies with HP and effects

## Technology Stack

- **Framework**: React 19 with Vite 6
- **Styling**: TailwindCSS 4 via the Vite plugin (`src/index.css` theme tokens)
- **State Management**: React hooks
- **Routing**: React Router DOM 7
- **UI Components**: Custom built with TailwindCSS
- **Floating Tooltips**: @floating-ui/react
- **Icons**: React Icons
- **Build Tool**: Vite
- **TypeScript**: For type safety

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
ak-spa/
├── public/                 # Static assets (images, icons)
│   ├── attributeicons/     # Attribute type icons
│   ├── bondicons/          # Alliance bond icons
│   ├── operatoricons/      # Operator portraits
│   ├── bandicons/          # Strategy/band icons
│   ├── shopitemicons/      # Shop item icons
│   └── ...                 # Root images (kelsey.png, fund.png, etc.)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── HeaderDesktop.tsx
│   │   ├── HeaderMobile.tsx
│   │   ├── OperatorCard.tsx
│   │   ├── AllianceButton.tsx
│   │   ├── Select.tsx
│   │   ├── TierButton.tsx
│   │   └── OperatorAttributeTooltip.tsx
│   ├── data/               # Game data organized by season
│   │   └── alliance/
│   │       ├── season1/
│   │       ├── season2/
│   │       └── season2.1/
│   ├── dtos/               # Data Transfer Objects
│   │   ├── operator.dto.ts
│   │   └── alliance.dto.ts
│   ├── features/           # Page components
│   │   ├── Home.tsx
│   │   ├── AttributeList.tsx
│   │   ├── AllianceList.tsx
│   │   ├── StrategyList.tsx
│   │   └── ShopItemList.tsx
│   ├── utils/              # Utility functions
│   │   ├── getDataBySeason.ts
│   │   └── getImageLink.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── ...                 # Config files
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Design System

Copper field-archive on ink: Big Shoulders Display for titles, Source Sans 3 for body, IBM Plex Mono for stamps and values. Theme tokens live in `src/index.css`.

### Components

All components follow a consistent design pattern:
- Hover states with subtle animations
- Focus accessibility
- Mobile-friendly touch targets
- Visual hierarchy with color and spacing

## Data Structure

### Operators

Each operator has:
- `id`: Unique identifier
- `name`: Operator name
- `tier`: Rarity level (1-6)
- `attributeType`: Combat, Prep, One-time, or Can stack
- `attribute`: Description of special ability (HTML formatted)
- `alliances`: Array of alliance bond IDs the operator belongs to

### Alliances

Each alliance has:
- `bondId`: Unique identifier (used for image lookup)
- `name`: Alliance name
- `desc`: Description of alliance effects (HTML formatted)
- `activeCount`: Number of different operators needed to activate
- `core`: Whether it's a core alliance (affects filtering)
- `noFilter`: Whether to exclude from alliance filters (internal use)

### Items

Each shop item has:
- `iconLink`: Identifier for the item image
- `itemName`: Name of the item
- `effectDesc`: Description of item effects (HTML formatted)
- `cost`: Cost in funds (null for special items)
- `tier`: Rarity level (1-6, null for special items)

### Strategies/Bands

Each strategy has:
- `name`: Strategy name
- `iconLink`: Identifier for the strategy/band image
- `initialHp`: Starting HP when deployed
- `effectName`: Name of the special effect
- `effectDesc`: Description of the effect (HTML formatted)

## Mobile Responsiveness

The application uses a mobile-first approach:
- Header collapses into a hamburger menu on mobile
- Grid layouts adapt from 1 column (mobile) to 3 columns (desktop)
- Touch targets are sized for finger interaction
- Text remains readable at all sizes
- Interactive elements provide tactile feedback

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Chrome/Safari

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## License

This project is community-driven and follows the same usage guidelines as the original [Arknights Stronghold Protocol Alliance](https://github.com/anhnt20112003/stronghold-protocol-alliance-database) data.

## Acknowledgments

- Original data from [Arknights Stronghold Protocol Alliance](https://github.com/anhnt20112003/stronghold-protocol-alliance-database)
- PRTS and AK Terra Wiki for reference materials
- TailwindCSS team for the utility-first CSS framework
- Vite and React teams for the modern development experience

## Contact

For issues, suggestions, or contributions, please visit the project repository.
