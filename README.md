# Velixo End-to-End Test Automation

This repository contains an end-to-end automated test using **Playwright** and **TypeScript** to validate that the **Excel Online `=TODAY()`** formula returns the expected date value.  

The test covers login, workbook creation, formula entry, UI interactions, and clipboard validation.

---

##  Table of Contents
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

##  Project Overview

This project automates testing Excel Online through Microsoft 365, specifically verifying the `=TODAY()` function result.  

The test:
- Logs into Microsoft 365 using credentials from a configurable `.env` file.
- Opens the Excel tab and creates a new workbook.
- Enters the `=TODAY()` formula in cell **A1**.
- Handles Excel UI popups gracefully.
- Auto-fits the first column via Excel’s right-click context menu.
- Copies the cell content via clipboard and validates the date returned matches today’s actual date in the **DD/MM/YYYY** format.

---

##  Features

- Externalized configuration: Login URL, username, and password stored securely in `.env`.  
- Playwright test framework: Using Playwright Test runner with page object pattern.  
- Video recording: Tests run in headed Chromium mode with videos recorded for diagnostics.  
- Cross-platform clipboard handling: Supports macOS and Windows key modifiers.  
- Specific date format validation: Expects clipboard date string in **DD/MM/YYYY** format exactly.  
- UI robustness: Waits and retries to ensure Excel’s clipboard data is ready.  

---

##  Prerequisites

- Node.js (version 18 or later recommended)  
- npm (Node package manager)  
- Microsoft 365 account with Excel Online access  
- Access to the browser environment (headful Chrome used by default)  

---

##  Configuration

1. Create a `.env` file in your project root with the following entries:

```
EXCEL_URL=https://office.com
EXCEL_USERNAME=your-email@example.com
EXCEL_PASSWORD=your-password
```

2. The project uses dotenv to load these securely into the test runtime.

---

##  Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/velixo-end-to-end-task.git
cd velixo-end-to-end-task
```

2. Install dependencies:

```
npm install
```

3. Ensure your `.env` file is correctly configured.

---

##  Running Tests

Execute tests with:

```
npx playwright test
```

- Runs in headed Chrome with video capture enabled.  
- Videos saved automatically in test-results folder.  
- To run headless (without UI), update `playwright.config.ts` (set `headless: true`).  

---

##  Test Structure

- Page Objects:  
  - `LoginPage.ts` — handles sign-in to Microsoft 365 using `.env` credentials.  
  - `ExcelPage.ts` — manages Excel tab, workbook, formula entry, popup handling, context menu, and clipboard logic.  

- Test Script:  
  - `excel-today.spec.ts` — verifies `=TODAY()` result matches system current date in **DD/MM/YYYY** format.  

- Config & Setup:  
  - `playwright.config.ts` — Playwright runner config including browser and clipboard permissions.  
  - `.env` — sensitive credentials externalized.  
  - `tsconfig.json` — TypeScript compiler configuration.  

---

##  Known Limitations and Workarounds

- Clipboard timing issues: Excel Online may delay clipboard availability; solved with retries and waits in `ExcelPage.getCellValueViaClipboard`.  
- Locale date format: This project **specifically expects DD/MM/YYYY** from clipboard and validates only this format (adjustment needed for other locales).  
- Popup UI variations: Generic popup close method covers common cases; may require updates if Excel UI changes.  
- Browser permissions: Clipboard access requires explicit enablement in Playwright config.  
- Browser selection: Currently Chromium with Chrome channel; configurable in `playwright.config.ts`.  
- Known bottlenecks: Microsoft UI changes may break selectors. Login may require extra steps (2FA).  

---

##  Alternative Approaches

- Use API-based Excel manipulation libraries like **ExcelJS** for faster, UI-independent testing.  
- Use **Microsoft Graph API** for backend Excel automation if preferred.  

---

##  Demo Recording and FAQ

### How to run the test?

- Configure `.env` with valid credentials.  
- Run `npx playwright test` from your shell.  
- Test performs login, Excel automation, formula entry, and validation automatically.  
- Videos recorded and saved under `test-results` directory.  

### Known bottlenecks?

- Clipboard readiness delays require retry logic.  
- UI selectors might need update with Microsoft UI changes.  
- Microsoft UI changes may break selectors. Login may require extra steps (2FA).  

### Workarounds?

- Adjust retry timeouts in `ExcelPage` as needed.  
- Update selectors for popups and menu options upon UI updates.  

### Alternative solutions?

- Consider non-UI Excel libraries or APIs for backend automation.  

---

## Summary

This setup provides an end-to-end Playwright test validating **Excel Online `=TODAY()`** with:  
- Specific **DD/MM/YYYY** format support  
- External configuration  
- Robust retry logic  
- Video capture for debugging  

---
