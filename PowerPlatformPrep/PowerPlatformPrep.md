# Power Platform Interview Preparation Guide
> **Tailored for Shadmaan Hussain** — Dynamics 365 & Power Platform Developer (2+ yrs)
> Current Date: May 4, 2026

---

## How to Use This Guide

This is a step-by-step, phased preparation plan. Work through it sequentially — each phase builds on the last.

| Phase | Focus | Days |
|---|---|---|
| **Phase 1** | Foundation & Concepts | Days 1–2 |
| **Phase 2** | Power Pages & PCF Deep Dive | Days 3–5 |
| **Phase 3** | Dataverse, Plugins & MDA | Days 6–8 |
| **Phase 4** | Copilot Studio & Power Automate | Days 9–10 |
| **Phase 5** | Azure, Security & Auth | Days 11–12 |
| **Phase 6** | Behavioral & Scenario Questions | Days 13–14 |
| **Phase 7** | Mock Interview & Final Review | Days 15–17 |

> **Tip:** Each section has **Concepts to Master**, **Likely Interview Questions**, and **Hands-On Exercises**. Do the exercises — interviewers at this level will ask you to whiteboard or walk through real solutions.

---

## Phase 1: Power Platform Foundation & Architecture

### 1.1 Concepts to Master

- **Power Platform pillars**: Power Apps (Canvas + MDA), Power Automate, Power Pages, Power BI, Copilot Studio — understand how they interact.
- **Dataverse as the backbone**: how it differs from SharePoint lists, SQL, and legacy Common Data Service.
- **Licensing tiers**: Per-user, Per-app, Pay-as-you-go — know the difference between Power Apps Premium vs. Standard connectors and why it matters to a business.
- **Environments**: Sandbox, Production, Developer, Trial — their purpose, security model, and ALM role.
- **Solutions**: Managed vs. Unmanaged, layers, publisher prefix, solution segmentation. Know how components are moved through environments.
- **ALM (Application Lifecycle Management)**: Source control with Power Platform CLI (`pac`), pipelines (Power Platform Pipelines, Azure DevOps + build tools, GitHub Actions).
- **Connectors**: Standard vs. Premium vs. Custom. When to build a custom connector vs. call an Azure Function.
- **Microsoft Dataverse security model**: Business Units, Security Roles, Teams, Column-level security, Row-level security (Record Sharing).

### 1.2 Likely Interview Questions

1. What is the difference between a managed and unmanaged solution? When would you choose each?
2. How does Dataverse differ from SharePoint as a data store? When would you use each?
3. Walk me through how you promote a change from dev → test → production in Power Platform.
4. What are the licensing implications of using a Premium connector in a Canvas App?
5. How does environment-level security work in Power Platform Admin Center?
6. What is the role of the publisher prefix in solutions, and why should you never use the default publisher?

### 1.3 Exercises

**Exercise 1A — Solution ALM Walkthrough:**
- Create a new solution with a custom publisher prefix.
- Add a Dataverse table, a Canvas App, and a Cloud Flow to it.
- Export as unmanaged, then export as managed.
- Import the managed solution into a different environment and observe the difference in editability.
- Answer for yourself: *What happens if you try to delete a component from a managed solution layer?*

**Exercise 1B — Licensing Audit:**
- Review the connectors in one of your existing flows.
- Identify which are Standard and which are Premium.
- Write down which license tier (per-user / per-app) would be needed to run that flow for 50 users. This mirrors the licensing UI work you did at Microsoft.

**Exercise 1C — PAC CLI Drill:**
```bash
# Practice these commands until they are second nature
pac auth create --url https://yourorg.crm.dynamics.com
pac solution export --name YourSolution --path ./solutions --managed false
pac solution import --path ./solutions/YourSolution_1_0_0_0.zip
pac solution publish
pac env list
```

---

## Phase 2: Power Pages Deep Dive

*This is your strongest area — expect deep questions here.*

### 2.1 Concepts to Master

- **Power Pages architecture**: front-end (Liquid + web templates), back-end (Dataverse tables exposed as Entity Lists / Entity Forms / Basic Forms / Multistep Forms).
- **Liquid templating**: `fetchxml` filters in Liquid, `entities` tag, `tablepermissions`, object model (`page`, `user`, `request`, `website`, `settings`).
- **Web Roles & Table Permissions**: Anonymous vs. Authenticated, Contact-scoped vs. Account-scoped, privilege levels (Read/Write/Create/Delete/Append/AppendTo), parent-child chaining.
- **Site Settings**: key/value configuration at runtime.
- **Power Pages templates**: how the Event Registration template you built becomes reusable.
- **Bootstrap 3 → 5 migration**: CSS class renames (`col-md-*` → `col-*`), dropped components (panels, wells, glyphicons), JS plugins change (jQuery plugins → vanilla/Popper).
- **CORS, CSP headers** in Power Pages (custom headers via web template).
- **Authentication providers**: Local, Azure AD (Entra), SAML 2.0 (Ping Identity), OAuth 2.0 (MSAL).
- **Progressive Web App (PWA) support** in Power Pages.
- **Web API (portals/$api)**: calling Dataverse from the browser-side without a server component, security implications, and when to prefer it over a custom connector.
- **Performance**: CDN, lazy-load, liquid caching (`{% cacheby %}`), web page hierarchy and inherited permissions.

### 2.2 Likely Interview Questions

1. How does Table Permission chaining work in Power Pages? Walk me through a real example.
2. What is the difference between a Basic Form and a Multistep Form? When would you use each?
3. How did you handle Bootstrap 3 → 5 migration for legacy portals? What were the biggest breaking changes?
4. How do you restrict a Dataverse table so anonymous users can only read records they created?
5. How do you embed custom JavaScript in a Power Pages site securely (CSP considerations)?
6. Explain the Power Pages Web API — what are its security implications and how do you protect it?
7. How would you debug a Liquid rendering error on a production portal?
8. What is the `fetchxml` filter in Liquid and how does it differ from using an Entity List?

### 2.3 Exercises

**Exercise 2A — Table Permission Chain:**
Build a scenario:
- `Account` table → Contact-scoped Read
- `Project` table (related to Account via lookup) → Read/Write via parent chain
- Verify an authenticated user can read Projects for their Account but not others.
- Document the exact table permission records you created.

**Exercise 2B — Web API Security Audit:**
```javascript
// Test in browser console on a Power Pages site
fetch('/_api/accounts?$select=name,emailaddress1&$top=5', {
  headers: { '__RequestVerificationToken': document.querySelector('[name=__RequestVerificationToken]').value }
})
.then(r => r.json()).then(console.log);
```
- Note what data is returned vs. what you expected based on the table permissions set.
- Then deliberately break a permission and re-test.

**Exercise 2C — Liquid Mastery:**
Write a Liquid snippet that:
1. Fetches all `cr123_project` records where `cr123_ownerid` equals the current portal user's Contact ID.
2. Displays them in a Bootstrap 5 card grid.
3. Shows a "No projects found" message if the result is empty.

**Exercise 2D — Bootstrap 5 Migration Checklist:**
Pull up an old portal page that uses Bootstrap 3 and create your own migration checklist. Key items to tick off:
- [ ] `col-xs-*` → `col-*`
- [ ] `panel` → `card`
- [ ] `btn-default` → `btn-secondary`
- [ ] `glyphicon-*` → Bootstrap Icons or FontAwesome
- [ ] jQuery `.modal('show')` → `new bootstrap.Modal(el).show()`

---

## Phase 3: PCF (PowerApps Component Framework)

*You have shipped 5+ PCF controls — you will be asked to go deep here.*

### 3.1 Concepts to Master

- **PCF lifecycle**: `init()`, `updateView()`, `getOutputs()`, `destroy()` — what happens in each, when they are called.
- **Standard vs. Virtual components**: DOM rendering differences, Canvas vs. MDA support.
- **Context object**: `context.parameters`, `context.webAPI`, `context.navigation`, `context.utils`, `context.factory`, `context.mode` (full-screen, form factor).
- **Dataset PCF**: `context.parameters.dataset`, paging, sorting, filtering, `loadNextPage()`, `openDatasetItem()`.
- **Property types**: `SingleLine.Text`, `Lookup.Simple`, `Whole.Number`, `TwoOptions`, `OptionSet`, `DateAndTime`, `Multiple` — which ones support two-way binding.
- **PCF + React**: using `ReactDOM.render` vs. virtual component approach, avoiding DOM leaks in `destroy()`.
- **Copilot Client SDK + PCF**: how you embedded the Copilot Studio agent — authentication flow with MSAL, token acquisition, DirectLine integration.
- **Testing PCF**: `pac pcf init`, test harness, Jest + React Testing Library for component logic.
- **Deploying PCF**: push to environment, import via solution, version bumping.
- **Performance**: avoid expensive work in `updateView()`, debouncing property changes.

### 3.2 Likely Interview Questions

1. Explain the full PCF lifecycle. When is `updateView()` called vs. `init()`?
2. What is the difference between a Field component and a Dataset component?
3. How did you integrate the Copilot Client SDK with MSAL inside a PCF? Walk through the auth flow.
4. How do you handle two-way data binding in a PCF control?
5. What would cause a PCF control to re-render unexpectedly, and how do you prevent it?
6. How do you call Dataverse `webAPI` from inside a PCF? What are the permissions requirements?
7. How do you test a PCF component before deploying it?
8. You're building a PDF Viewer PCF. What property types would you define, and how would you render the PDF?

### 3.3 Exercises

**Exercise 3A — Lifecycle Logging:**
Add `console.log` statements to each lifecycle method (`init`, `updateView`, `getOutputs`, `destroy`) of an existing PCF. Then:
- Open the control on a form.
- Edit and save the record.
- Navigate away and back.
- Document exactly which lifecycle methods fired and in what order. This is a popular interview question.

**Exercise 3B — Dataset PCF From Scratch:**
Build a minimal dataset PCF that:
1. Reads a dataset of contacts.
2. Displays Name and Email as a custom HTML table.
3. Supports clicking a row to open the record (`context.navigation.openForm`).
4. Handles empty dataset gracefully.

**Exercise 3C — MSAL Auth Inside PCF (Revise Your Copilot Control):**
Write down — step by step — how your Copilot Studio agent PCF acquires a token:
1. Where is the MSAL `PublicClientApplication` instantiated?
2. Which MSAL flow is used (`loginPopup` / `loginRedirect` / `acquireTokenSilent`)?
3. How do you pass the token to the DirectLine/Bot Framework channel?
4. What happens when the token expires mid-session?

This exercise forces you to articulate your own implementation clearly for an interview.

**Exercise 3D — webAPI call:**
```typescript
// In updateView(), call Dataverse to get top 5 accounts
context.webAPI.retrieveMultipleRecords("account", "?$select=name&$top=5")
  .then(result => {
    result.entities.forEach(e => console.log(e.name));
  });
```
Extend this to catch errors and show them in the control's UI.

---

## Phase 4: Dataverse, Plugins & Model-Driven Apps

### 4.1 Concepts to Master

**Dataverse:**
- **Table types**: Standard, Activity, Virtual, Elastic — use cases and limitations.
- **Relationships**: 1:N, N:N (native vs. manual intersect), polymorphic lookups.
- **Columns**: all column types, calculated vs. rollup, formula columns (Power Fx).
- **FetchXML vs. OData**: when to use each, limitations of each (FetchXML for aggregates, OData for simple REST).
- **Dataverse search**: relevance search, full-text, quick-find.
- **Auditing**: enabling column/table audit, viewing audit history.
- **Dataverse for Teams** vs. full Dataverse — key limitations.
- **Large datasets**: pagination tokens, async FetchXML, Elastic tables for high-volume.

**Plugins:**
- **Execution pipeline**: Pre-Validation → Pre-Operation → Post-Operation (sync) → Post-Operation (async).
- **IPluginExecutionContext**: `InputParameters`, `OutputParameters`, `PreEntityImages`, `PostEntityImages`, `Depth`, `UserId`, `InitiatingUserId`.
- **Service Provider**: `IOrganizationService` (impersonation), `ITracingService`, `IOrganizationServiceFactory`.
- **Registration**: step registration (message, entity, stage, mode), filtering attributes.
- **Entity Images**: why and when to register pre/post images, performance impact.
- **Sandbox**: plugin isolation, no file I/O, no direct network calls from sandbox.
- **Custom API vs. Action**: when to use Custom API (strongly typed, no deprecated Actions).
- **Error handling**: `InvalidPluginExecutionException` to surface user-friendly errors.
- **Infinite loop prevention**: check `context.Depth`.

**Model-Driven Apps:**
- **Views**, **Forms** (main, quick create, quick view), **Dashboards**, **Charts**.
- **Business Rules**: when to use vs. JavaScript vs. Plugins.
- **Command Bar customization**: Ribbon Workbench vs. modern command designer.
- **RBAC in MDA**: how you implemented it for the Release Planner.
- **Form scripting**: `Xrm.Page` (deprecated) vs. `formContext`, `executionContext`.
- **Business Process Flows (BPF)**: stages, steps, branching.

### 4.2 Likely Interview Questions

1. What is the difference between Pre-Validation, Pre-Operation, and Post-Operation plugin stages?
2. When would you use a Pre-Image vs. a Post-Image?
3. I have a plugin that goes into infinite loop. How do you diagnose and fix it?
4. What is a Custom API and how is it different from a Workflow Action?
5. How do you implement row-level security in Dataverse without sharing individual records?
6. What are the limitations of running plugins in sandbox isolation mode?
7. How would you design the Dataverse schema for a multi-tenant licensing application?
8. What is the difference between a calculated column and a rollup column?
9. How does the plugin execution context `Depth` property work, and why do you check it?
10. When should you use Business Rules vs. JavaScript vs. Plugins for field validation?

### 4.3 Exercises

**Exercise 4A — Plugin with Pre-Image:**
Write a plugin that fires on the `Update` message of any table, Pre-Operation stage, and logs (using `ITracingService`) the old value and new value of a specific column using a Pre-Image. Register it with Plugin Registration Tool and test by updating a record.

**Exercise 4B — Custom API:**
Create a Custom API called `cr123_CalculateDiscount` that:
- Takes `Quantity` (integer) and `UnitPrice` (decimal) as input parameters.
- Returns `DiscountedTotal` (decimal) as an output parameter.
- Has a plugin bound to it that performs the calculation.
- Call it from Power Automate using the "Perform an unbound action" step.

**Exercise 4C — FetchXML Advanced Query:**
Write a FetchXML query that:
1. Retrieves all Accounts created in the last 30 days.
2. Joins their related Contacts (1:N).
3. Groups by Account and counts contacts per account.
4. Filters accounts that have more than 2 contacts.

Test it in the XrmToolBox FetchXML Builder or Postman against your org.

**Exercise 4D — Business Unit & Security Role Design:**
Design (on paper or in a test org) a security model for a fictional scenario:
- Company has 3 departments: Sales, Finance, HR.
- Sales can read all Accounts; Finance can only read Accounts they own; HR has no access to Accounts.
- How do you configure Business Units, Security Roles, and Teams to achieve this?

---

## Phase 5: Copilot Studio

### 5.1 Concepts to Master

- **Topics**: trigger phrases, conversation nodes (message, question, condition, action, redirect), topic variables (`Topic.`, `Global.`, `System.`).
- **Entities**: prebuilt vs. custom, synonyms, slot filling.
- **Actions / Power Automate integration**: calling flows from Copilot Studio, passing input/output variables.
- **Plugins**: HTTP actions, calling external APIs, OpenAPI plugin.
- **Knowledge sources**: Dataverse knowledge, SharePoint, public website, file upload — how retrieval-augmented generation (RAG) works in Copilot Studio.
- **Authentication**: no auth, Azure AD (Entra), Custom (Client ID/Secret) — which you implemented.
- **RBAC in Copilot Studio**: restricting topics by user role, using system variables (`System.User.IsLoggedIn`, `System.User.PrincipalName`).
- **Channels**: Web widget, Teams, Power Pages embedded, mobile.
- **Testing & Debugging**: test pane, conversation transcript analysis, error handling nodes.
- **Copilot Client SDK**: DirectLine integration, how a PCF or web page embeds an agent.
- **Generative Answers vs. authored topics**: when each is triggered, confidence score thresholds.
- **Content moderation plugin**: how you built it — runtime invocation, relevance scoring.

### 5.2 Likely Interview Questions

1. Explain the difference between a Trigger phrase-based topic and a Generative Answers fallback.
2. How did you implement RBAC in Copilot Studio? Walk through the logic.
3. You need to call a secure REST API from Copilot Studio that requires OAuth. How do you set it up?
4. How do you pass data from Power Automate back into a Copilot Studio conversation?
5. What is the Copilot Client SDK and when would you use it instead of the native web widget?
6. How does the knowledge source retrieval work in Copilot Studio? What are its limitations?
7. Your agent keeps triggering the wrong topic. How do you debug it?
8. How did you build the content moderation plugin? How does it invoke Copilot at runtime?

### 5.3 Exercises

**Exercise 5A — Sales Insight Agent Rebuild:**
Recreate (or review) your Sales Insight agent:
- Map out all topics as a flowchart on paper or in draw.io.
- Identify where Dataverse knowledge is queried.
- Document the RBAC logic: what system variable is checked, what condition redirects to an "access denied" topic.
- Write down the auth flow for the Custom Client ID/Secret setup.

**Exercise 5B — Generative Answers Tuning:**
- Create a topic with very broad trigger phrases.
- Upload a PDF document as a knowledge source.
- Ask questions both inside and outside the document scope.
- Observe confidence thresholds — when does it fall back to Generative Answers?
- Experiment with the "Generative Answers" node and a custom system prompt.

**Exercise 5C — End-to-End Action Flow:**
Build a Copilot Studio action that:
1. Asks the user for a Contact name.
2. Calls a Power Automate flow that queries Dataverse for that Contact.
3. Returns the Contact's email and phone back to the conversation.
4. Handles the case where no Contact is found.

---

## Phase 6: Power Automate

### 6.1 Concepts to Master

- **Trigger types**: instant, automated, scheduled, when an HTTP request is received.
- **Connector actions**: Standard vs. Premium, concurrency, pagination, retry policies.
- **Expressions**: `string()`, `int()`, `json()`, `body()`, `triggerOutputs()`, `items('For_each')`, `variables()`, `coalesce()`, `if()`, `xpath()`, `formatDateTime()`.
- **Error handling**: `Configure run after` (failed, skipped, timed out), scopes with try/catch pattern, `terminateWithError`.
- **Dataverse connector**: vs. older CDS connector — use "Microsoft Dataverse" connector (latest), `List rows`, `Get a row by ID`, `Perform a bound/unbound action`.
- **Apply to Each vs. Select vs. Filter Array**: performance implications — avoid `Apply to Each` where possible.
- **Child flows**: when to extract logic into a child flow, input/output parameters.
- **HTTP action**: calling external APIs, parsing JSON response, handling auth headers.
- **Approval workflows**: `Start and wait for an approval`, parallel approvals, adaptive card responses in Teams.
- **Rate limits and throttling**: what to do when hitting Dataverse API limits (429s) in flows.
- **Environment variables in flows**: referencing solution-aware variables instead of hardcoded values.
- **Your ADO ↔ Dataverse sync flow**: explain the architecture — trigger, mapping, rate-card table update.

### 6.2 Likely Interview Questions

1. How does `Configure run after` work? Show me a try/catch pattern in Power Automate.
2. What is the difference between `Apply to Each` and `Select`? When would you use `Select`?
3. How do you avoid hardcoding environment-specific values in a Cloud Flow?
4. How did your ADO ↔ Dataverse sync flow work? What was the trigger, and how did you handle conflicts?
5. How do you call a Custom API from Power Automate?
6. What happens when a flow hits Dataverse throttling? How do you handle it?
7. How do you pass data between a parent flow and a child flow?

### 6.3 Exercises

**Exercise 6A — Try/Catch Pattern:**
Build a flow that:
1. Calls an HTTP endpoint (use httpbin.org for testing).
2. Wraps it in a Scope named "Try".
3. Has a second Scope named "Catch" configured to run on failure of "Try".
4. The "Catch" scope sends an email with the error details from `result('Try')`.

**Exercise 6B — ADO Sync (Revise Your Own Work):**
Draw a detailed flowchart of your ADO ↔ Dataverse sync flow:
- What is the trigger?
- How do you map ADO fields to Dataverse columns?
- How do you handle "item already exists" (upsert pattern)?
- How do you handle ADO API rate limits?

Be ready to draw this on a whiteboard in an interview.

**Exercise 6C — Expression Mastery:**
Practice writing these expressions without looking them up:
```
// Get current UTC time formatted as "yyyy-MM-dd"
formatDateTime(utcNow(), 'yyyy-MM-dd')

// Coalesce a nullable field
coalesce(triggerBody()?['fieldName'], 'default value')

// Parse JSON and get a nested value
body('Parse_JSON')?['results']?[0]?['name']

// Filter an array to items where status equals 'Active'
filter(variables('myArray'), item()?['status'] == 'Active')
```

---

## Phase 7: Azure Integration & Security

### 7.1 Concepts to Master

**Azure Functions:**
- **Trigger types**: HTTP, Timer, Service Bus, Blob, Dataverse (via Event Grid).
- **Bindings**: input/output bindings vs. SDK clients — tradeoffs.
- **Durable Functions**: orchestration pattern (your GitHub API PR generation could be Durable).
- **Deployment**: Consumption vs. Premium vs. Dedicated plan — cold start implications.
- **Security**: function keys, Managed Identity, CORS.
- **Your GitHub API bridge**: HTTP trigger → GitHub REST API call → return Markdown. Explain the architecture, error handling, and how it was called from MDA.

**Authentication & Identity:**
- **MSAL flows**: Authorization Code (PKCE for SPAs/PCF), Client Credentials (server-to-server), On-behalf-of.
- **Entra External ID**: what it is, how you used it for portal auth — tenant configuration, user flow, claims mapping.
- **Graph API**: most common endpoints: `/me`, `/users`, `/groups`, `/servicePrincipals`. Delegated vs. Application permissions.
- **Ping Identity (SAML 2.0)**: SP-initiated vs. IdP-initiated SSO, claim mapping to Dataverse Contact fields.
- **Custom connectors**: OpenAPI spec, OAuth 2.0 setup, connector policies (rate limiting, transformations).
- **Azure AI Services**: which service did you use? (Likely Azure OpenAI or Cognitive Services) — API key vs. Managed Identity auth, responsible AI considerations.

### 7.2 Likely Interview Questions

1. What MSAL flow did you use for the PCF Copilot control, and why?
2. How does Entra External ID differ from regular Azure AD B2C?
3. Walk me through how you set up Ping Identity SSO for a Power Pages portal.
4. How did your Azure Function bridge the MDA Release Planner with GitHub? What was the trigger?
5. When would you use a Managed Identity instead of a Client ID/Secret?
6. What are the security implications of storing a Client Secret in a Power Automate connection vs. Azure Key Vault?
7. How do you call the Graph API from a Power Automate flow with Delegated permissions?

### 7.3 Exercises

**Exercise 7A — MSAL Flow Diagram:**
Draw the complete MSAL Authorization Code + PKCE flow:
1. User visits PCF control page.
2. PCF calls `msalInstance.acquireTokenSilent()` — token cache hit? → use token.
3. Cache miss? → `acquireTokenPopup()` or `loginRedirect()`.
4. Token returned → attach to DirectLine/Bot Framework API call.
5. Token expires → silent refresh cycle.

Label each step with the MSAL method name. This is a guaranteed deep-dive question given your PCF work.

**Exercise 7B — Azure Key Vault Integration:**
Identify in your codebase where you currently store Client ID/Secrets (e.g., environment variables, hardcoded). Then sketch out how you would refactor to use:
- Azure Key Vault + Managed Identity for Azure Functions.
- Azure Key Vault referenced environment variables for Power Automate.

**Exercise 7C — Graph API Call from Power Automate:**
Build a flow that:
1. Uses the "HTTP with Azure AD" action (or Office 365 connector).
2. Calls `https://graph.microsoft.com/v1.0/me/memberOf` to get the current user's group memberships.
3. Parses the response and returns the group display names.
4. Use this to simulate a group-based RBAC check.

---

## Phase 8: Behavioral & Scenario Questions

*These are as important as technical questions at Senior/Mid-Senior level.*

### 8.1 Your Key Stories (STAR Format)

Prepare 2-minute STAR (Situation, Task, Action, Result) answers for each:

**Story 1 — Licensing UI ($1M+ revenue leakage fix):**
- Situation: Microsoft needed real-time license consumption visibility.
- Task: Build/revamp the Power Apps licensing UI in the Admin Center.
- Action: What exactly did you build? What was hard?
- Result: $1M+ revenue leakage prevented, 12-month CSV export shipped.

**Story 2 — Event Registration Template (shipped as official Microsoft template):**
- Situation: D365 Marketing Event Portal needed a reusable registration template.
- Task: Build V1, then lead V1→V2 and Bootstrap 3→5 migrations.
- Action: Design decisions, obstacles, migration approach.
- Result: Shipped as official Microsoft Power Pages template.

**Story 3 — Community Hub + PCF Carousel:**
- Situation: Power Platform community needed a central hub.
- Task: Launch community.microsoftbusinessapps.com.
- Action: PCF Carousel design, Power Pages setup, performance choices.
- Result: Showcased by Microsoft in a winning customer demo.

**Story 4 — Copilot Studio Agent (Sales Insight):**
- Situation: Need for an intelligent agent with Dataverse knowledge and RBAC.
- Task: Design and ship the agent.
- Action: Topics, knowledge integration, custom auth, content moderation plugin.
- Result: Delivered to customer with runtime Copilot invocation.

**Story 5 — GitHub API Bridge (Azure Function):**
- Situation: MDA Release Planner needed to auto-generate GitHub PRs.
- Task: Bridge MDA and GitHub API.
- Action: Azure Function, Markdown PR generation, trigger mechanism.
- Result: Significantly cut release turnaround time.

### 8.2 Common Behavioral Questions

1. Tell me about a time you had to push back on a requirement. How did you handle it?
2. Describe the most technically complex thing you've built on Power Platform.
3. How do you keep up with the rapid release cycle of Power Platform (3 release waves per year)?
4. Tell me about a time you improved a process or automated something that saved significant time.
5. How do you handle a situation where a customer wants a quick-and-dirty solution that creates long-term technical debt?
6. Describe a time you had to learn something quickly under a deadline.
7. How did you mentor or share knowledge with your team?

### 8.3 Questions to Ask the Interviewer

Asking good questions signals seniority. Prepare 3–5 from:

- What does the Power Platform maturity look like at your organization today — mainly Canvas/MDA apps, or full ALM with Dataverse and custom code?
- How does the team approach ALM and environment strategy — do you use Power Platform Pipelines, Azure DevOps, or a mix?
- Are there existing PCF controls or portal customizations I'd be inheriting, or is this greenfield?
- What is the biggest technical challenge on the Power Platform side right now?
- How much collaboration is there between the Power Platform team and the Azure/backend teams?

---

## Phase 9: Mock Interview Simulation

### Whiteboard Problems

Practice these on paper or a whiteboard with no IDE:

**Problem 1 — Plugin Architecture:**
> A customer needs: whenever an Order is created with a total > $10,000, automatically create an Approval task record assigned to the Finance Manager. If the Order is deleted before the Approval is resolved, the Approval should be cancelled.
>
> Design the complete plugin solution: stages, messages, logic, error handling.

**Problem 2 — Flow Design:**
> You receive a webhook from an external ERP system whenever an Invoice is paid. You need to: find the matching Dataverse Order record (by invoice number), update its status to "Paid", send a confirmation email to the Account's primary contact, and log the event to Azure Application Insights.
>
> Design the complete Power Automate flow including error handling.

**Problem 3 — PCF Design:**
> Design a PCF control for a Model-Driven App form that shows a real-time countdown timer to a deadline stored as a DateTime column on the record. The timer should turn red when < 24 hours remain.
>
> What property types do you declare? What happens in `init()` vs. `updateView()`? How do you handle the interval and memory cleanup?

**Problem 4 — Security Model:**
> A healthcare portal (Power Pages) has: Patients (can see only their own records), Doctors (can see records for patients assigned to them), Admins (can see everything). No patient should ever see another patient's data — even if they guess a record GUID and call the Web API directly.
>
> Design the complete Power Pages + Dataverse security model.

---

## Quick Reference Cheat Sheet

### Plugin Stage Decision Table

| Scenario | Stage | Mode |
|---|---|---|
| Validate input before write | Pre-Validation | Sync |
| Modify data before write | Pre-Operation | Sync |
| Send email after record created | Post-Operation | Async |
| Cascade delete child records | Post-Operation | Sync |
| Prevent creation with custom error | Pre-Validation | Sync |

### Power Pages Permission Levels

| Privilege | Meaning |
|---|---|
| Read | List and retrieve records |
| Write | Update existing records |
| Create | Insert new records |
| Delete | Remove records |
| Append | Associate to another record (child side) |
| Append To | Receive association (parent side) |

### MSAL Flow Selection

| Scenario | MSAL Flow |
|---|---|
| SPA / PCF (browser) | Auth Code + PKCE |
| Server-to-server (no user) | Client Credentials |
| API calling downstream API as user | On-behalf-of (OBO) |
| Native desktop app | Auth Code + PKCE or Device Code |

### Power Automate Expression Quick Reference

| Task | Expression |
|---|---|
| Current UTC date string | `formatDateTime(utcNow(), 'yyyy-MM-dd')` |
| Null-safe property access | `coalesce(body()?['field'], 'default')` |
| Convert string to int | `int(variables('myString'))` |
| Array length | `length(variables('myArray'))` |
| First item in array | `first(variables('myArray'))` |
| Filter array | `filter(variables('arr'), item()?['active'])` |

---

## Certifications Roadmap (Post-Hire)

Given your current AZ-900, the natural next steps for Power Platform roles:

| Certification | Value | Estimated Prep |
|---|---|---|
| PL-200 (Power Platform Functional Consultant) | Good for breadth | 2–3 weeks |
| PL-400 (Power Platform Developer) ⭐ | **Most relevant to you** | 3–4 weeks |
| PL-600 (Power Platform Solution Architect) | Senior/Lead path | 4–6 weeks |
| AZ-204 (Azure Developer) | Complements your Azure Function work | 4–5 weeks |

> **Recommendation:** Target PL-400 first — it directly validates PCF, Plugins, Power Automate, and Dataverse skills you already have from production work.

---

*Last updated: May 4, 2026*
