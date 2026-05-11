# One-Day Interview Prep Roadmap — Power Platform
> Shadmaan Hussain | Interview: Tomorrow | Built around your resume

---

## At a Glance

| Block | Time | Focus |
|---|---|---|
| Morning | 3–4 hours | Core technical concepts — the things they will definitely ask |
| Afternoon | 2–3 hours | STAR stories — turning your resume bullets into spoken answers |
| Evening | 1–2 hours | Technical Q&A drill — say answers out loud, not just read them |
| Tonight | 30 minutes | Final review — cheat sheet + sticky note |

---

## Morning — Core Concepts Blitz (3–4 hours)

Work through these in order. For each topic, read it, then close the file and explain it out loud. If you stumble, re-read and try again.

---

### 1. Dataverse & Security Model (45 min) ← start here

This comes up in almost every D365/PP interview. Be crisp on:

**The security layer stack — say this in order:**
1. Environment access (license)
2. Business Unit hierarchy (which department are you in)
3. Security Role (what tables/rows can you touch, at what scope)
4. Teams (group-level access)
5. Field Security Profile (column-level lock)
6. Record Sharing (one-off row grant → writes to POA table)

**The 4 BU scopes — memorise these:**
| Scope | Sees |
|---|---|
| User | Only my own rows |
| Business Unit | Everyone in my department |
| Parent: Child BU | My dept + all sub-departments |
| Organization | Everything |

**The 8 privileges — know them cold:**
> Create · Read · Write · Delete · **Append · Append To** · Assign · Share

**Append vs. Append To — will definitely come up:**
- Linking Contact → Account: Contact needs **Append**, Account needs **Append To**
- Memory trick: the thing being stapled = Append. The thing receiving the staple = Append To.

**Table Ownership — the gotcha:**
- **User/Team Owned** → every row has an `ownerid`. Row-level scoping works. Use for all business data.
- **Organization Owned** → no owner. All rows or none. Can't filter by user/BU. Use for reference data only (currencies, country lists).
- You cannot change ownership type after creation.

**Column-Level Security:**
- Enable field security toggle on the column → field is now hidden from everyone (except Sys Admin)
- Create a Field Security Profile → assign users/teams → they can read/write the column
- Security Role controls the ROW. Field Security Profile controls the COLUMN. Both checks must pass.

---

### 2. PCF Controls — Your Biggest Differentiator (45 min)

This is where you stand out. Go deep here.

**The 4 lifecycle methods — know exactly what happens in each:**

| Method | When it fires | What you do here |
|---|---|---|
| `init()` | Once, when control loads | Set up DOM, instantiate MSAL, subscribe to events |
| `updateView()` | Every time a bound property changes | Re-render with new data, do NOT do heavy setup here |
| `getOutputs()` | When framework wants your output values | Return the current values of your output properties |
| `destroy()` | When control is removed | Clear intervals, detach event listeners, prevent memory leaks |

**Your Copilot Studio PCF + MSAL auth flow — prep this story:**
1. Control loads → `init()` → instantiate `PublicClientApplication` with client config
2. Call `acquireTokenSilent()` → checks token cache first
3. Cache miss → call `acquireTokenPopup()` or `loginRedirect()`
4. Token returned → attach as Bearer header to DirectLine / Bot Framework channel
5. Token expiry → silent refresh cycle kicks in automatically

**PCF types:**
- **Field PCF** — bound to a single column value on a form. Two-way binding via `getOutputs()`.
- **Dataset PCF** — bound to a view/dataset. Paging via `loadNextPage()`, open records via `context.navigation.openForm()`.
- **Virtual PCF** — React-based, no direct DOM rendering. Better performance in Canvas Apps.

**Your 5 shipped controls — be ready to talk about any of them:**
- Carousel (Power Pages community hub)
- Text-to-Speech
- RTO Calendar
- PDF Viewer
- Copilot Studio agent control (MSAL + Copilot Client SDK)

---

### 3. Power Pages Architecture (30 min)

Your strongest area. Expect deep questions.

**The key layers:**
- **Front-end:** Liquid templates, Web Templates, Web Pages, Content Snippets
- **Back-end:** Dataverse tables exposed via Entity Lists, Basic Forms, Multistep Forms
- **Security:** Web Roles → Table Permissions (these are Power Pages specific, separate from Dataverse security roles)

**Table Permissions — the 4 scope types:**
| Scope | What it means |
|---|---|
| Global | Anyone with the web role can access all rows |
| Contact | User can only access rows linked to their Contact record |
| Account | User can access rows linked to their Account (company) |
| Parent | Access inherited from a parent table permission (chained) |

**Authentication providers you've worked with:**
- **MSAL / Entra External ID** — AAD-based, token flow, claims mapping to Contact fields
- **Ping Identity** — SAML 2.0, SP-initiated SSO, attribute mapping
- **Local** — username/password stored in Dataverse (avoid in production)

**Bootstrap 3 → 5 migration — the key breaking changes:**
- `col-xs-*` → `col-*`
- `panel` → `card`
- `btn-default` → `btn-secondary`
- `glyphicon-*` → FontAwesome or Bootstrap Icons
- `$('.modal').modal('show')` → `new bootstrap.Modal(el).show()`

**Power Pages Web API:**
- Calls Dataverse directly from the browser — `/_api/` endpoint
- Protected by Table Permissions + `__RequestVerificationToken` header
- Used when you need real-time Dataverse reads/writes without a server component

---

### 4. Power Automate & Azure Functions (20 min)

**Trigger types — know the 4:**
- **Automated** — fires on a Dataverse event, email received, etc.
- **Instant** — triggered manually by a user or button
- **Scheduled** — runs on a recurrence (daily, hourly)
- **HTTP** — called via a REST request (used in your GitHub API Azure Function)

**Error handling in flows — the try/catch pattern:**
```
Scope: "Try"
  → your actions here

Scope: "Catch"
  → Configure Run After: Failed, Skipped, Timed Out
  → result('Try') gives you the error details
  → send email / log to App Insights
```

**Your Azure Function + GitHub API bridge:**
- HTTP trigger → receives payload from MDA Release Planner
- Calls GitHub REST API with PAT/token in Authorization header
- Constructs Markdown PR body → calls `POST /repos/{owner}/{repo}/pulls`
- Returns PR URL back to MDA

**Power Automate expressions you use constantly:**
```
formatDateTime(utcNow(), 'yyyy-MM-dd')
coalesce(triggerBody()?['field'], 'default')
body('Parse_JSON')?['results']?[0]?['name']
```

---

## Afternoon — STAR Stories (2–3 hours)

Every bullet on your resume is a potential interview question. Convert your top 5 into 90-second spoken stories. Use this structure:

> **S**ituation — what was the context  
> **T**ask — what you were responsible for  
> **A**ction — what YOU specifically did (not "we")  
> **R**esult — the measurable outcome

---

### Story 1 — PPAC Licensing UI ($1M+ revenue leakage) ← lead with this

| | Notes |
|---|---|
| **Situation** | Microsoft's Power Platform Admin Center had no real-time visibility into license consumption across tenants |
| **Task** | Revamp the Power Apps licensing screen as part of the Microsoft Engineering team |
| **Action** | Built the real-time license consumption UI surfacing usage data, added a 12-month CSV export feature, integrated recommendation panels |
| **Result** | Prevented $1M+ revenue leakage; gave tenant admins actionable data for the first time |

**Likely follow-up:** "What was technically hard about this?" → The real-time data aggregation across license types and the CSV generation at scale across 12 months of data.

---

### Story 2 — Event Registration Template (official Microsoft template)

| | Notes |
|---|---|
| **Situation** | D365 Marketing Event Portal needed a reusable, production-grade registration flow |
| **Task** | Build V1 from scratch, then lead V1→V2 migration and Bootstrap 3→5 upgrade |
| **Action** | Designed the Liquid + Dataverse schema, managed the Bootstrap migration with a component-by-component checklist, handled breaking JS changes |
| **Result** | Template shipped as an official Microsoft Power Pages template — publicly available |

**Likely follow-up:** "What was the hardest part of the Bootstrap migration?" → jQuery modal API changes and replacing glyphicons across dozens of templates consistently.

---

### Story 3 — Copilot Studio PCF with MSAL Auth (the auth challenge)

| | Notes |
|---|---|
| **Situation** | Customer needed a Copilot Studio agent embedded inside a Canvas App with secure, identity-aware auth |
| **Task** | Build a PCF control that wraps the Copilot Client SDK with MSAL authentication |
| **Action** | Researched auth modes (no-auth, AAD, custom), chose MSAL Authorization Code + PKCE for the browser context, handled token silent refresh and DirectLine integration, extended with TTS capability |
| **Result** | Control embedded in Canvas App, used in a Microsoft FTE-delivered customer demo for a supply chain client |

**Likely follow-up:** "Why MSAL over the built-in auth?" → The built-in Copilot Studio auth modes didn't support the custom app integration we needed. MSAL gave us full control over token acquisition and allowed us to pass the user's identity to knowledge sources.

---

### Story 4 — Azure Function + GitHub API (release turnaround)

| | Notes |
|---|---|
| **Situation** | MDA Release Planner required manual PR creation in GitHub for every release item — slow and error-prone |
| **Task** | Automate the PR generation pipeline |
| **Action** | Built an Azure Function (HTTP trigger) that receives Release Planner data from MDA, constructs a Markdown PR body with all release details, calls GitHub REST API to auto-create the PR |
| **Result** | Significantly cut release turnaround time; eliminated manual copy-paste errors |

**Likely follow-up:** "Why an Azure Function instead of Power Automate?" → The GitHub API calls required complex JSON construction and conditional logic that would have been unwieldy in flow expressions. The Function gave us proper code, unit-testable logic, and better error handling.

---

### Story 5 — Power Pages Community Hub (Microsoft showcase)

| | Notes |
|---|---|
| **Situation** | Microsoft needed a central hub for the Power Platform community |
| **Task** | Launch community.microsoftbusinessapps.com including a custom PCF Carousel |
| **Action** | Built the PCF Carousel control, integrated it into the Power Pages site, configured the Dataverse schema for community content |
| **Result** | Site launched, Carousel PCF showcased by Microsoft in a winning customer demo |

---

## Evening — Technical Q&A Drill (1–2 hours)

Say these answers OUT LOUD. Not in your head — actually say them. Aim for 60–90 seconds per answer.

---

**Q: What is the difference between Pre-Validation, Pre-Operation, and Post-Operation?**

> "Think of it as three checkpoints around the database write. Pre-Validation fires first — before validation even starts, no transaction open yet. I use it for early abort logic. Pre-Operation fires after validation but before the write — transaction is open, I can modify `InputParameters['Target']` to change what gets saved. Post-Operation sync fires after the write, still inside the transaction — throwing here rolls everything back. Post-Operation async fires after the transaction commits — use it for emails and external API calls that don't need to be atomic."

---

**Q: How does Append vs. Append To work?**

> "When you link two records, both sides need permission. The record being attached — say a Contact being linked to an Account — needs Append on the Contact table. The Account receiving the Contact needs Append To. Both must be granted or the link operation fails with a privilege error. I think of it as stapling — the thing being stapled needs Append, the thing receiving the staple needs Append To."

---

**Q: How do you prevent an infinite loop in a plugin?**

> "Check `context.Depth` at the very top of the plugin and return early if it's greater than 1. Depth is 1 when a user action triggers it directly. If my plugin then triggers another operation that fires the same plugin, Depth becomes 2. Returning early at that point breaks the cycle."

---

**Q: A user can read a row but a specific field is blank. What's wrong?**

> "Column-level security is enabled on that field and the user doesn't have a Field Security Profile granting them Read access. Security roles control row access, Field Security Profiles control column access — they're completely separate checks. The fix is assigning the user or their team to the appropriate Field Security Profile."

---

**Q: What is the POA table and why does it matter for performance?**

> "PrincipalObjectAccess stores every record-sharing grant. Each time you share a record, a row is inserted into POA. The problem is Dataverse checks POA on every single query alongside security roles — so at scale, a bloated POA table slows down all queries across the environment. That's why you don't use record sharing at volume. Microsoft built Access Teams as a lighter alternative that avoids POA entirely."

---

**Q: Walk me through how your Copilot Studio PCF handled auth.**

> "The control uses MSAL's `PublicClientApplication`. On init, it first tries `acquireTokenSilent` — if there's a cached token it uses that. If the cache misses, it calls `acquireTokenPopup` to prompt the user. Once I have the token, I attach it as a Bearer header to the DirectLine API call that initialises the Copilot Studio conversation. I also handle token expiry mid-session by catching the `InteractionRequiredAuthError` and re-triggering the popup flow."

---

## Tonight — Final 30-Minute Review

### Step 1 — Read this sticky note and keep it visible tomorrow morning

```
APPEND vs APPEND TO
  Being linked → Append
  Receiving the link → Append To

PLUGIN STAGES
  Pre-Validation  = early abort, no transaction
  Pre-Operation   = modify data before write
  Post-Op sync    = atomic follow-up
  Post-Op async   = emails, external APIs

BU SCOPES
  User → my rows
  BU → my department
  Parent:Child BU → my dept + sub-depts
  Org → everything
```

### Step 2 — Scan the cheat sheet in Dataverse_SecurityModel.md (Section 18)

One pass, top to bottom. Don't re-read everything — just the tables.

### Step 3 — Pick the 2 stories you're least confident about

Say each one out loud, start to finish, without notes. If you stumble on a number or result, that's fine — the structure matters more than exact figures.

---

## Priority Order If You Run Short on Time

### Must do first — drop everything else if needed:
1. STAR story for **PPAC Licensing UI** — your single strongest achievement
2. STAR story for **Copilot Studio PCF + MSAL** — your most technical differentiator
3. Plugin stages (Pre-Validation / Pre-Operation / Post-Operation) spoken out loud
4. Append vs. Append To with the stapling analogy
5. Security model building analogy (the 5 layers)

### Skip if crunched:
- Hands-on exercises from Dataverse_SecurityModel.md (those are for longer prep)
- Deep Elastic Tables / Virtual Tables theory
- Categorized Search vs. Dataverse Search nuances
- Durable Functions vs. standard Azure Functions

---

## 3 Questions to Ask the Interviewer

Asking good questions at the end signals seniority. Pick 2–3:

1. *"What does the Power Platform stack look like at your org today — mainly low-code Canvas Apps, or are you doing full ALM with Dataverse, plugins, and custom code?"*
2. *"How does the team handle environment strategy and ALM — Power Platform Pipelines, Azure DevOps, or a mix?"*
3. *"Are there existing PCF controls or portal customisations I'd be inheriting, or is this greenfield?"*
4. *"What's the biggest technical challenge on the Power Platform side right now?"*

---

*Last updated: May 8, 2026 — Shadmaan Hussain — Interview tomorrow*
