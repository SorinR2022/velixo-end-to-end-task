# Velixo End-to-End Test Automation

This repository contains an end-to-end automated test using Playwright and TypeScript to validate that the Excel Online `=TODAY()` formula returns the expected date value.  

The test covers login, workbook creation, formula entry, UI interactions, and clipboard validation.

---
## Project Structure

The repository has the following structure:

```
VELIXO-END-TO-END-TASK/
│
├─ config/
│  └─ credentials.ts        # Stores login credentials imported from .env
│
├─ pages/
│  ├─ ExcelPage.ts          # Handles Excel page actions and clipboard interactions
│  └─ LoginPage.ts          # Handles Microsoft 365 login
│
├─ tests/
│  └─ excel-today.spec.ts   # End-to-end test verifying =TODAY() in Excel
│
├─ test-results/            # Playwright test outputs, videos, and screenshots
│
├─ .env                     # Environment variables file (not committed)
├─ .gitignore               # Git ignore rules
├─ package.json             # Project dependencies and scripts
├─ package-lock.json        # Auto-generated lock file
├─ playwright.config.ts     # Playwright configuration file
├─ README.md                # This README file
└─ tsconfig.json            # TypeScript configuration
```

> **Important:** You must create a `.env` file in the project root with your credentials:

```
EXCEL_URL=https://office.com
EXCEL_USERNAME=your-email@example.com
EXCEL_PASSWORD=your-password
```

This `.env` file is required for the tests to run correctly.



## Table of Contents
- Project Overview
- Features
- Prerequisites
- Configuration
- Installation
- Running Tests
- Test Structure
- Known Limitations and Workarounds
- Alternative Approaches
- Demo Recording and FAQ

---

## Project Overview

This project automates testing Excel Online through Microsoft 365, specifically verifying the `=TODAY()` function result.  

The test performs the following steps:

1. Logs into Microsoft 365 using credentials from a `.env` file.  
2. Opens the Excel tab and creates a new workbook.  
3. Enters the `=TODAY()` formula in cell A1.  
4. Handles Excel UI popups gracefully.  
5. Auto-fits the first column via Excel’s context menu.  
6. Copies the cell content via clipboard and validates the date matches today's system date in DD/MM/YYYY format.

---

## Features

- Externalized configuration: Login URL, username, and password stored securely in `.env`.  
- Page Object Model: `LoginPage` and `ExcelPage` separate UI interactions from test logic.  
- Playwright Test framework: End-to-end automation with assertions and waiting mechanisms.  
- Video recording: Tests can be configured to record video for diagnostics.  
- Clipboard validation: Reads cell value via clipboard, with retry logic for robustness.  
- Date format verification: Ensures DD/MM/YYYY format exactly.  

---

## Prerequisites

- Node.js 18 or later  
- npm (Node package manager)  
- Microsoft 365 account with Excel Online access  
- Access to Chrome browser (headful mode recommended for debugging)  

---

## Configuration

1. Create a `.env` file in the project root:

```
EXCEL_URL=https://office.com
EXCEL_USERNAME=your-email@example.com
EXCEL_PASSWORD=your-password
```

2. Credentials are imported into the tests via `config/credentials.ts`.  

---

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/velixo-end-to-end-task.git
cd velixo-end-to-end-task
```

2. Install dependencies:

```
npm install
```

3. Ensure `.env` is correctly configured.  

---

## Running Tests

Execute tests with:

```
npx playwright test
```

Optional commands:

- Run tests in headed mode:

```
npx playwright test --headed
```

- View test report:

```
npx playwright show-report
```

Tests run in Chrome by default. Video recording can be enabled via `playwright.config.ts`.

---

## Test Structure

- Page Objects:
  - `LoginPage.ts` — handles Microsoft 365 login.  
  - `ExcelPage.ts` — handles Excel tab, workbook creation, formula entry, popup handling, context menu actions, and clipboard retrieval.

- Test Script:
  - `excel-today.spec.ts` — verifies that `=TODAY()` in cell A1 matches the system date.

- Config & Setup:
  - `config/credentials.ts` — externalized login credentials.  
  - `tsconfig.json` — TypeScript compiler options.  
  - `package.json` — dependencies and scripts.  

---

## Known Limitations and Workarounds

- Clipboard timing: Excel Online may delay copying → handled with retry logic in `ExcelPage.getCellValueViaClipboard`.  
- Locale: This test assumes DD/MM/YYYY format; other locales may require adjustment.  
- Popups: Only common Excel popups are handled; UI changes may require selector updates.  
- Hard-coded positions: Auto-fit column uses fixed canvas coordinates, which may fail on different resolutions.  
- 2FA / Login: If your Microsoft 365 account has 2FA, manual intervention may be required.  

---

## Alternative Approaches

- Use ExcelJS or Microsoft Graph API for non-UI, backend Excel automation.  
- API-based testing can be faster and less brittle than UI automation.  

---

## Demo Recording and FAQ

### How to run the test?

- Configure `.env` with valid credentials.  
- Run `npx playwright test`.  
- Test performs login, Excel automation, formula entry, and validation automatically.  
- Recorded videos (if enabled) are saved in the `test-results` directory.

### Known bottlenecks

- Clipboard readiness may require retries.  
- UI selectors may break if Microsoft changes Excel Online interface.  
- Login may require extra steps (2FA).  

### Workarounds

- Adjust retry logic in `ExcelPage`.  
- Update selectors if UI changes.  
- Use backend automation for more reliable, faster tests.

---

## Summary

This project provides an end-to-end Playwright test for Excel Online `=TODAY()`, including:

- Login via Microsoft 365  
- Workbook creation and formula entry  
- Clipboard-based date validation (DD/MM/YYYY)  
- Robust retry logic and error handling  
- Video recording for debugging  

Implemented in TypeScript, following the Page Object Model, and using a configuration file for credentials. Fully meets project requirements.
