# Sauce Demo Test Framework

This is a Playwright-based test automation framework for testing the Sauce Demo website.

## Project Structure

```
├── tests/
│   ├── fixtures/
│   │   └── users.json       # Test data
│   ├── pages/
│   │   ├── login.page.js    # Login page object
│   │   └── inventory.page.js # Inventory page object
│   ├── login.spec.js        # Login tests
│   └── inventory.spec.js    # Inventory tests
└── playwright.config.js     # Playwright configuration
```

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in headed mode
npm run test:headed

# Run tests in UI mode
npm run test:ui

# View test report
npm run report
```

## Test Coverage

1. Login Functionality
   - Successful login with valid credentials
   - Error handling for locked out user
   - Error handling for invalid credentials

2. Inventory Page
   - Adding items to cart
   - Product sorting
   - Product count verification

## Important Notes

- The framework uses Page Object Model (POM) design pattern
- Test data is maintained in JSON fixtures
- Cross-browser testing is configured but limited to Chromium in this setup
- Screenshots and videos are captured only on test failures