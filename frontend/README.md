# Event Ticketing Mobile App

A React Native mobile application for browsing events and purchasing tickets.

## Features

- Browse available events
- View event details
- Purchase tickets
- Real-time ticket availability
- Order confirmation
- Pull-to-refresh updates

## Tech Stack

- React Native
- TypeScript
- Apollo Client (GraphQL)
- React Navigation
- Jest & React Native Testing Library

## Project Structure

```
frontend/
├── src/
│   ├── apollo/              # Apollo Client setup
│   │   └── client.ts
│   ├── components/          # Reusable components
│   │   ├── EventCard.tsx
│   │   └── __tests__/      # Component tests
│   ├── screens/            # Screen components
│   │   ├── EventListScreen.tsx
│   │   ├── EventDetailsScreen.tsx
│   │   ├── OrderConfirmationScreen.tsx
│   │   └── __tests__/     # Screen tests
│   ├── types/             # TypeScript definitions
│   │   ├── index.ts
│   │   └── navigation.ts
│   └── navigation/        # Navigation configuration
│       └── AppNavigator.tsx
├── App.tsx
└── index.js
```

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- React Native development environment
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install

# For iOS
cd ios && pod install && cd ..
```

3. Update the backend URL:
Edit `src/apollo/client.ts` and update the URI to point to your backend server:
```typescript
const httpLink = createHttpLink({
  uri: 'http://YOUR_IP_ADDRESS:3000/graphql',
});
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Testing

```bash
# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Navigation Structure

```
Events List (Main Screen)
└── Event Details
    └── Order Confirmation
```

## Available Scripts

- `npm start`: Start the Metro bundler
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS simulator
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run test:coverage`: Generate test coverage report

## Development

### Adding a New Screen

1. Create screen component in `src/screens`
2. Add screen to navigation in `src/navigation/AppNavigator.tsx`
3. Add types to `src/types/navigation.ts`
4. Create tests in `src/screens/__tests__`

### Adding a New Component

1. Create component in `src/components`
2. Create tests in `src/components/__tests__`
3. Add TypeScript interfaces/types in `src/types`

## Error Handling

The app includes comprehensive error handling for:
- Network errors
- GraphQL errors
- Invalid inputs
- Server errors

Each error type has appropriate user feedback and retry mechanisms.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
