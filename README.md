# RemoteSync – End-to-End Test Automation Suite

## 📖 Overview
This repository contains a comprehensive **end-to-end (E2E) test automation suite** for the **RemoteSync** web application.  
It is implemented using **Playwright** and **TypeScript**, following best practices for maintainability, scalability, and reliability.  

This project was created to fulfill the requirements of the **QA Tester Pre-Interview Technical Assessment** for Hahn Software.  
It demonstrates a complete QA lifecycle approach: **test planning, automation architecture, execution, and defect documentation**.

---

## 🎯 Why RemoteSync?
The **RemoteSync** application was deliberately chosen as the application under test (AUT) because it provides realistic QA challenges:

- **Full-Stack Coverage:** Spring Boot backend + Angular frontend → enables true E2E validation (UI ↔ API ↔ DB).  
- **Complex Business Logic:** Includes scheduling conflicts, RBAC enforcement, and approval workflows.  
- **Multiple User Roles:** Supports distinct flows for *Collaborators* and *RC Managers*.  
- **Interactive UI:** Forms, tables, calendars, and notifications — components where bugs often occur.  
- **Practical Setup:** Can run locally with minimal dependencies, ensuring reproducible test runs.  

**Application Source Code:** [https://github.com/JdaidiHamza/RemoteSync](https://github.com/JdaidiHamza/RemoteSync)

---

## 🛠️ Tech Stack

| Area       | Technology / Tool                              |
|------------|-----------------------------------------------|
| Framework  | [Playwright](https://playwright.dev/)          |
| Language   | TypeScript                                     |
| Runtime    | Node.js (v16+)                                 |
| CI/CD      | Headless execution mode (CI-ready)             |

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js v16+**  
- **Git**  
- **RemoteSync AUT** running locally:
  - Backend → `http://localhost:8080`
  - Frontend → `http://localhost:4200`

### 2. Installation Steps
```bash
# Clone this repository
git clone https://github.com/MaryamALAOUI1/remotesync-automation.git
cd remotesync-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running the Tests

- **Headless Execution (CI/CD mode)**  
```bash
npx playwright test
```

- **Interactive Debug Mode (UI Mode)**  
```bash
npx playwright test --ui
```

- **View Test Reports**  
```bash
npx playwright show-report
```

---

## 🏗️ Test Architecture & Best Practices

- **Page Object Model (POM):**  
  - `pages/` → encapsulates locators & reusable actions.  
  - `tests/` → defines test scenarios focusing on user journeys.  

- **Test Data Management:**  
  - Hardcoded for assessment simplicity.  
  - In production → externalize to fixtures/env vars for flexibility across environments.  

- **Coverage Focus:**  
  - Authentication: login (positive/negative), disabled accounts, password recovery.  
  - Collaborator flows: calendar viewing, report submission.  
  - RC Manager flows: rotation planning, approvals/rejections.  
  - Core functionality: profile management, language switching.  

---

## 🐞 Bug Documentation

Several issues were discovered during testing. Full details (steps, severity, evidence, and suggested fixes) are included in the **bug tracking document** (`RemoteSync_BugReports.xlsx`).  

**Summary of Defects:**  
- **RSYNC-BUG-001 (Critical):** *Forgot Password* feature fails with 500 Internal Server Error.  
- **RSYNC-BUG-002 (High):** Dashboard *Work Schedule* widget is static and shows incorrect data.  
- **RSY-BUG-003 (High):** Application allows creation of duplicate/conflicting rotations.  

---

## 📦 Scope & Assumptions
- The AUT is assumed to be running locally with seeded test data.  
- Focus is exclusively on **E2E browser automation** (not API/unit tests).  
- Main execution is on **Chromium**, though Playwright supports cross-browser runs.  

---

## 📚 References
- **Application Repo:** [https://github.com/JdaidiHamza/RemoteSync](https://github.com/JdaidiHamza/RemoteSync)  
- **Automation Repo:** [https://github.com/MaryamALAOUI1/remotesync-automation](https://github.com/MaryamALAOUI1/remotesync-automation)  
- **Playwright Docs:** [https://playwright.dev](https://playwright.dev)  

---

## ✨ Author
👩‍💻 **Maryam Alaoui Ismaili**  
QA Engineer – Automation & Quality Assurance  
