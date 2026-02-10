# Display Mint

A mobile NFT discovery and minting app built with React Native and Expo. Swipe through NFT collections on Base, explore trending mints, and mint directly from your phone.

## Features

- **Swipe to discover** - Tinder-style card swiping to browse NFTs
- **Explore collections** - Browse trending and top NFT collections on Base
- **Mint in-app** - Mint NFTs directly with Coinbase Wallet or embedded wallet via Privy
- **Wallet integration** - Connect with Coinbase Wallet, MetaMask, or use a Privy embedded wallet
- **Collection pages** - View collection details, floor price, activity, and individual tokens
- **Bug reporting** - Built-in report system with screenshot attachments

## Tech Stack

- **Framework**: [Expo](https://expo.dev) + React Native
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based)
- **Wallet**: [Privy](https://www.privy.io/) embedded wallets + [Coinbase Wallet SDK](https://github.com/coinbase/wallet-mobile-sdk)
- **Blockchain**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/) on Base (L2)
- **NFT Data**: [Reservoir SDK](https://docs.reservoir.tools/)
- **Animations**: React Native Reanimated + Gesture Handler
- **Storage**: MMKV for local encrypted storage
- **Error Tracking**: Sentry

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Xcode (for iOS development)
- [EAS CLI](https://docs.expo.dev/build/introduction/) for builds

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anmst21/display-mint.git
   cd display-mint
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Copy the environment template and fill in your keys:
   ```bash
   cp .env.example .env
   ```

4. Install iOS pods:
   ```bash
   cd ios && pod install && cd ..
   ```

5. Start the development server:
   ```bash
   yarn start
   ```

### Environment Variables

See [`.env.example`](.env.example) for all required environment variables. You will need:

- A [Privy](https://www.privy.io/) account for wallet authentication
- A [Sentry](https://sentry.io/) project for error tracking (optional)
- A Telegram bot token for the report feature (optional)

## Project Structure

```
app/                  # Expo Router screens
  (app)/(main)/       # Main app tabs (swipe, explore, wallet)
  collection/         # Collection detail pages
  login/              # Login & OTP screens
components/           # Reusable UI components
  swipable-card/      # NFT swipe card
  collection/         # Collection page components
  explore/            # Explore tab components
  modal/              # Bottom sheet modals (mint, buy, etc.)
  navigation/         # Tab bar & navigation
  settings/           # Settings & report modal
context/              # React context providers & API client
hooks/                # Custom hooks
utils/                # Utility functions
assets/               # Fonts & images
```

## Building

This project uses [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --profile production --platform ios
```

## License

This project is proprietary. All rights reserved.
