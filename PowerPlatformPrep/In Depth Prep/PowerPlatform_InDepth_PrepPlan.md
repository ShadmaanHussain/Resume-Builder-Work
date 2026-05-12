# Power Platform In-Depth Interview Preparation Plan
### Target: 3–4 Years of Experience Roles

---

## How to Use This Guide

This plan covers **every topic** that can be asked in Power Platform developer/consultant/architect interviews for mid-level roles (3–4 YOE). Topics are organized by **priority tier** — work through them in order for maximum return on preparation time.

---

## Relevant Certifications (Recommended Order)

| Priority | Certification | Role Relevance |
|----------|--------------|----------------|
| ⭐⭐⭐⭐⭐ | **PL-400** – Power Platform Developer | Core for developer roles |
| ⭐⭐⭐⭐⭐ | **PL-200** – Power Platform Functional Consultant | Core for consultant/functional roles |
| ⭐⭐⭐⭐ | **PL-300** – Power BI Data Analyst | Essential if BI is in scope |
| ⭐⭐⭐⭐ | **PL-500** – Power Automate RPA Developer | High value for automation-heavy roles |
| ⭐⭐⭐ | **PL-600** – Power Platform Solution Architect | Senior/architect-track roles |
| ⭐⭐⭐ | **AZ-900** – Azure Fundamentals | Shows integration knowledge |
| ⭐⭐ | **PL-100** – Power Platform App Maker | Entry-level, still useful for gaps |
| ⭐⭐ | **MB-910** – Dynamics 365 Fundamentals (CRM) | Relevant if Dynamics 365 Sales/Service used |
| ⭐⭐ | **MB-920** – Dynamics 365 Fundamentals (ERP) | Relevant if Finance/SCM scope |
| ⭐ | **MS-900** – Microsoft 365 Fundamentals | Background knowledge |

> **Recommended certification path for developer roles:** AZ-900 → PL-400 → PL-200 → PL-600  
> **Recommended path for consultant roles:** PL-200 → PL-400 → PL-300 → PL-600

---

## Priority Tiers Overview

| Tier | Focus | Why |
|------|-------|-----|
| 🔴 **Tier 1 – Critical** | Dataverse, Canvas Apps, Model-Driven Apps, Power Automate, Security | Asked in almost every interview |
| 🟠 **Tier 2 – High** | ALM/DevOps, Plugins, PCF Controls, Power Pages | Differentiates mid-level candidates |
| 🟡 **Tier 3 – Medium** | Power BI, Copilot Studio, Custom Connectors, RPA | Role-dependent but commonly expected |
| 🟢 **Tier 4 – Supporting** | Azure Integrations, SharePoint, Dynamics 365, M365 | Broadens your profile significantly |

---

---

# 🔴 TIER 1 — CRITICAL (Prepare First)

---

## 1. Dataverse (Microsoft Dataverse / formerly CDS)

### Tables & Columns
- Standard vs. Custom vs. Activity vs. Virtual tables
- Column types: Text, Whole Number, Decimal, Currency, Lookup, Choice (global vs. local), Calculated, Rollup, File, Image, Polymorphic Lookup
- Alternate keys — why, when, how to use
- Auto-numbering columns
- Relationships: One-to-Many, Many-to-Many (native vs. manual intersection), Self-referential
- Cascade behaviors: Assign, Delete, Merge, Reparent, Share, Unshare
- Table ownership: User/Team-owned vs. Organization-owned — impact on security
- Status vs. Status Reason — lifecycle management
- Auditing — enabling, querying audit logs

### Querying & Performance
- FetchXML — structure, aggregate queries, linked entities, pagination (paging cookie)
- OData queries — `$filter`, `$expand`, `$select`, `$orderby`, `$top`, `$count`
- Dataverse Web API — CRUD operations, batch requests, async operations
- Query delegation limitations — what happens when queries exceed thresholds
- Indexes — when Dataverse creates them, query performance best practices
- Retrieve vs. RetrieveMultiple — when to use each
- QueryExpression vs. FetchXML vs. LINQ — trade-offs

### Business Rules
- Scope levels: Entity vs. Form
- Capabilities: Show/Hide, Enable/Disable, Set field value, Set required/optional/recommended, Validate data
- Limitations of business rules vs. Plugins

### Calculated & Rollup Fields
- Calculated field formula limitations
- Rollup field recalculation — async job, manual trigger, 12-hour limit
- When to use Power Automate vs. Plugin vs. Calculated field

### Dataverse for Teams
- Differences from full Dataverse
- When to recommend it vs. full environment

### Common Interview Questions
- Explain the difference between a lookup and a polymorphic lookup.
- When would you use a Many-to-Many (N:N) relationship vs. a manual intersect table?
- What is a cascade behavior and when does it matter?
- Explain how rollup fields work and their limitations.
- What is FetchXML paging and why is it needed?
- How do alternate keys differ from primary keys in Dataverse?

---

## 2. Power Apps — Canvas Apps

### Core Concepts
- App lifecycle: OnStart, OnVisible, OnHidden, OnTimerStart, OnTimerEnd
- Data sources: connectors, collections, variables (global vs. context)
- Delegation: what it is, delegation warnings, non-delegable functions, workarounds
- Gallery, Form, DataTable controls — binding, item, selected, mode
- Patch, Collect, ClearCollect, Remove, RemoveIf, UpdateIf
- Concurrent() — parallel data loads
- Navigation: Navigate(), Back(), param()

### Formulas & Functions
- If vs. Switch vs. IIf
- Filter, Search, LookUp, SortByColumns
- ForAll, AddColumns, ShowColumns, DropColumns, RenameColumns
- Coalesce, IsBlank, IsEmpty, IsError
- JSON(), ParseJSON() — parsing JSON in canvas apps (newer features)
- With() scope function
- Text formatting functions, Date/Time functions

### Offline Capability
- SaveData / LoadData — local storage
- Connection signal — detecting offline
- Designing offline-first apps

### Responsive Design
- Flexible height containers
- Auto-layout containers (horizontal/vertical)
- LayoutMode, AlignInContainer
- Screen size and orientation handling

### Performance Best Practices
- Minimize data calls using ClearCollect on app start
- Avoid nesting galleries
- Explicit column selection
- Monitor tool — analyzing app performance

### Component Libraries
- Canvas components vs. component libraries
- Input/Output properties
- Behavior properties and custom functions
- Sharing component libraries across apps

### Custom Pages (in Model-Driven Apps)
- Embedding canvas apps as custom pages
- xrmUtility and model-driven context

### Common Interview Questions
- What is delegation and how do you handle non-delegable operations?
- Explain the difference between a global variable and a context variable.
- How do you optimize a canvas app that loads slowly?
- How does Concurrent() improve app performance?
- What are canvas components and how do they differ from libraries?
- How would you build an offline-capable Power App?

---

## 3. Power Apps — Model-Driven Apps

### App Structure
- Site map — areas, groups, subareas
- Entities/tables included — app module metadata
- Views: public, personal, quick find, lookup, associated
- Forms: main, quick create, quick view, card
- Dashboards: system, personal, interactive

### Forms
- Form types and when to use each
- Form components: sections, tabs, sub-grids, quick view forms, web resources, PCF controls
- Form scripting (JavaScript) — event model: OnLoad, OnSave, OnChange, field events
- Form context API: `formContext.data`, `formContext.ui`, `formContext.getAttribute()`
- Business rules vs. JavaScript on forms — when to use which
- Form-level security vs. field-level security

### Views
- Creating/customizing public views
- View filters and columns
- Quick find view — what columns are searched
- Lookup views — customizing what appears in lookup dialogs

### Business Process Flows (BPF)
- Stages and steps
- BPF entities (process instance table)
- Multiple BPFs on one table
- BPF branching
- Programmatically controlling BPF stages (JavaScript API)
- Security for BPFs

### Ribbon/Command Bar Customization
- Classic ribbon editor vs. modern command bar
- Enable rules, display rules, actions
- Power Fx commands (modern)

### Dashboards & Charts
- System vs. personal dashboards
- Chart types and configuration
- Real-time dashboards

### Common Interview Questions
- What is the difference between a quick view form and a quick create form?
- How do you control field behavior based on another field's value in a model-driven app?
- Explain the Business Process Flow entity and how you'd query BPF stage data.
- How does form scripting interact with business rules — which takes precedence?
- What is a ribbon enable rule and when would you use it?

---

## 4. Power Automate — Cloud Flows

### Flow Types
- Automated (trigger-based), Instant (manual/button), Scheduled (recurrence), Desktop (RPA), Business Process
- V2 triggers vs. classic triggers
- HTTP trigger — securing with API keys, Entra ID (AAD)

### Triggers
- Dataverse triggers: When a row is added/modified/deleted — filter expressions, scope (user, business unit, organization)
- SharePoint triggers — limitations and throttling
- Outlook/Teams triggers
- HTTP Request trigger — schema, response action
- Recurrence — advanced options (specific hours/days)

### Actions & Control
- Condition, Switch, Apply to Each, Do Until, Scope
- Variables: Initialize, Set, Append, Increment
- Parallel branches — concurrency control, throttling
- Run After settings — error handling patterns
- Try/Catch pattern using Scopes
- Terminate action

### Expressions & Functions
- String: concat, substring, replace, split, trim, startsWith, endsWith, indexOf
- Date: utcNow, addDays, addHours, formatDateTime, convertTimeZone, ticks
- Array: first, last, length, union, intersection, skip, take, range, contains
- Object: json(), string(), int(), float(), bool(), coalesce, if()
- triggerBody(), triggerOutputs(), outputs(), body(), items()
- workflow(), environment() — getting metadata

### HTTP & API Calls
- HTTP action — method, URI, headers, body, authentication types
- HTTP + Swagger — importing OpenAPI definitions
- Parsing JSON — dynamic content vs. schema
- Pagination — `@odata.nextLink` handling

### Connectors
- Standard vs. Premium vs. Custom
- Connector throttling and retry policies
- Service accounts and connection ownership

### Error Handling
- Run After — is successful / has failed / is skipped / has timed out
- Scope-based try/catch/finally pattern
- Filter array action for error detection
- Sending failure notifications

### Approvals
- Start and wait for an approval (sequential and parallel)
- Adaptive cards for Teams approvals
- Custom approval responses
- Approval history and audit

### Child Flows
- When to use child flows
- Passing inputs/outputs
- Error propagation

### Performance & Limits
- Action limits per flow run
- Concurrency and looping limits
- Flow run history retention
- 30-day run history limit

### Common Interview Questions
- What is the difference between Run After settings and a Scope-based try/catch?
- How would you handle paginated API responses in Power Automate?
- Explain how you would implement a parallel approval with timeout.
- How do you secure an HTTP trigger endpoint?
- When would you use a child flow vs. keeping everything in one flow?
- What are the action limits and how do you work around them for large datasets?

---

## 5. Security & Governance

### Environment Strategy
- Default environment — risks, restrictions
- Sandbox vs. Production vs. Developer environments
- Environment groups (preview feature)
- When to create multiple environments for one solution

### Security Roles
- Privilege levels: None, User, Business Unit, Parent: Child BU, Organization
- Access levels: Create, Read, Write, Delete, Append, Append To, Assign, Share
- Predefined roles vs. custom roles
- System Administrator vs. System Customizer
- Combining roles — most permissive wins

### Row-Level Security
- Owner-based security (user/team ownership)
- Access Teams — auto-created teams, access team templates
- Owner Teams
- Sharing records — manual vs. programmatic
- Hierarchy security — Manager vs. Position hierarchy

### Column (Field) Level Security
- Field security profiles
- Which column types can be secured
- Impact on forms, views, API access

### DLP (Data Loss Prevention) Policies
- Connector classification: Business, Non-Business, Blocked
- Tenant-level vs. Environment-level policies
- Policy conflicts — most restrictive wins
- HTTP connector and custom connector classification
- DLP policy impact on existing flows

### Azure Entra ID (AAD) Integration
- App registrations — client credentials, delegated permissions
- Service principal connections
- Conditional Access policies affecting Power Platform
- Guest users — access to environments

### Power Platform Admin Center
- Tenant-level settings
- Environment management (create, backup, restore, copy, delete)
- Capacity management (storage: database, file, log)
- Analytics — service health, audit logs

### Managed Environments
- Weekly digests
- Maker welcome content
- Solution checker enforcement
- Sharing limits
- Usage insights

### Common Interview Questions
- How does Append vs. Append To privilege work?
- A user can see records that should be restricted — how do you troubleshoot?
- Explain the difference between an Owner Team and an Access Team.
- What happens when two DLP policies conflict?
- How would you design security for a multi-BU organization in Dataverse?
- What is field-level security and when would you use it over form-only hiding?

---

---

# 🟠 TIER 2 — HIGH PRIORITY

---

## 6. ALM — Application Lifecycle Management

### Solutions
- Unmanaged vs. Managed solutions
- Solution layering — base layer, patch, upgrade
- Solution patches — when and when NOT to use
- Upgrade vs. Update — differences and risks
- Solution publisher — prefix importance
- Environment variables — why over hardcoded values
- Connection references — linking connections in solutions
- Solution checker — rules, violations, suppressing false positives

### DevOps & CI/CD
- Power Platform CLI (`pac` commands) — auth, solution export/import, pack/unpack
- Source control strategies — solution unpacking to JSON/XML
- GitHub Actions for Power Platform
- Azure DevOps pipelines — build, test, deploy stages
- Deployment pipelines (in-product feature) — managed environment requirement
- Service principal for CI/CD — permissions needed

### Configuration Migration Tool
- Reference data migration between environments
- Difference from solution import

### Portals/Pages ALM
- Website record and site settings migration

### Common Interview Questions
- What is the difference between solution upgrade and solution update?
- Why use environment variables instead of hardcoding values?
- How do you manage connection references in a CI/CD pipeline?
- Explain how you'd set up a GitHub Actions pipeline for Power Platform deployment.
- What does unpacking a solution mean and why is it useful for source control?

---

## 7. Plugins & Custom APIs

### Plugin Fundamentals
- Plugin pipeline: Pre-Validation, Pre-Operation, Post-Operation
- Synchronous vs. Asynchronous plugins
- IPluginExecutionContext — depth, initiating user, calling user, primary entity, message
- IOrganizationService — CRUD operations from plugin context
- ITracingService — logging inside plugins
- InputParameters, OutputParameters, SharedVariables, PreEntityImages, PostEntityImages
- Entity images — registration requirement, use cases

### Plugin Registration
- Plugin Registration Tool (PRT)
- Steps: message, entity, stage, execution mode, rank, secure/unsecure config
- Filtering attributes — only fire when specific columns change
- Pre/Post entity images — what they capture

### Plugin Best Practices
- Avoid infinite loops (check depth, initiating user)
- No long-running operations in sync plugins (2-minute timeout)
- Use IOrganizationServiceFactory for impersonation
- Thread safety — no static mutable state
- Secure configuration — connection strings, secrets

### Custom APIs
- Custom API vs. Custom Action (deprecated) vs. Workflow Activity
- Request/Response parameters
- Binding type: Global, Entity, Entity Collection
- Executing via Web API, canvas apps, Power Automate
- Plugin backing for Custom APIs

### Custom Workflow Activities (Legacy but still asked)
- CodeActivity base class
- Input/Output arguments
- Registering in solutions

### Common Interview Questions
- What is the difference between Pre-Validation and Pre-Operation stage?
- When would you use a plugin vs. Power Automate flow?
- How do you prevent a plugin from firing recursively?
- What are entity images and why do you need to register them?
- Explain the difference between Custom API and Custom Action.
- How do you implement impersonation in a plugin?

---

## 8. PCF Controls (Power Apps Component Framework)

### Architecture
- Control lifecycle: `init`, `updateView`, `getOutputs`, `destroy`
- Context object: `webAPI`, `parameters`, `userSettings`, `client`, `navigation`, `factory`, `resources`
- Manifest file — control type (standard vs. virtual vs. React virtual), properties, resources
- Property types: SingleLine.Text, TwoOptions, Whole.Number, Enum, Dataset, etc.
- Dataset controls vs. field controls

### React-Based PCF (Virtual Controls)
- React + Fluent UI components
- No shadow DOM for virtual controls — shared React instance with platform
- Bundle size implications

### PCF with Web API
- webAPI.retrieveMultipleRecords, createRecord, updateRecord, deleteRecord
- Using within PCF context (no separate auth needed)

### Events & Outputs
- notifyOutputChanged() — triggering re-render cycle
- Two-way binding — reading and writing property values

### Build & Deployment
- `pac pcf init`, `pac pcf push` for testing
- Bundling with webpack
- Packaging in solutions — managed vs. unmanaged

### Limitations
- Cannot use PCF in canvas app offline
- Dataset controls in canvas apps — limited support
- Size/resource limits

### Common Interview Questions
- Explain the PCF control lifecycle.
- What is the difference between a standard and a virtual PCF control?
- How does `notifyOutputChanged` work?
- How would you make a PCF control that reads and writes Dataverse data?
- How do you test a PCF control locally?

---

## 9. Power Pages (Portals)

### Core Concepts
- Website record, Page, Web Template, Web File, Web Link Set
- Liquid templating language — tags, objects, filters
- Entity forms, Basic Forms (legacy), Multistep Forms (Advanced Forms)
- Web roles and table permissions
- Authenticated vs. Anonymous access

### Security
- Table permissions — global, contact, account, self, parent-child scope
- Column permissions (new feature)
- Web roles — assigning to contacts
- Securing pages vs. securing data
- Authentication providers — Azure AD B2C, local sign-in, social providers

### Liquid Templates
- `entityview`, `entitylist`, `fetchxml` Liquid tags
- `include` — reusing templates
- `request.params`, `user` object
- Conditional rendering based on user/web role

### Custom JavaScript & Web Resources
- Injecting custom JS in page header/footer
- Using portal JS API
- Client-side validations on forms

### Power Pages Studio (New Designer)
- Pages, Components, Data workspace
- Difference from legacy portal management app

### APIs & Integration
- Portals Web API — Dataverse CRUD via portal authenticated session
- CORS and allowed origins

### Common Interview Questions
- Explain table permissions and the different scope types.
- How does authentication work in Power Pages?
- What is Liquid and how do you use it to display Dataverse data?
- How do you restrict a page to specific web roles?
- What is the difference between a Basic Form and a Multistep Form?
- How would you expose a Dataverse table securely through Power Pages?

---

---

# 🟡 TIER 3 — MEDIUM PRIORITY

---

## 10. Power Automate Desktop (RPA)

### Core Concepts
- Attended vs. Unattended automation
- Machine and machine group registration
- Desktop flow actions — UI automation, web automation, Excel, file/folder, database
- Input and output variables — passing data from cloud to desktop flow
- Error handling in desktop flows — on error handling, retry logic

### UI Automation
- UI element repository
- Capturing controls — CSS selectors, XPath, UI Automation tree
- Web automation — browser launch/attach, click, fill form, extract data
- Image-based automation — fallback for non-standard UIs

### Integration with Cloud Flows
- "Run a desktop flow" action in cloud flow — attended/unattended mode
- Connection to machine
- Returning outputs to cloud flow

### AI Builder with Desktop Flows
- Document processing, form processing integration

### Common Interview Questions
- What is the difference between attended and unattended desktop flows?
- How do you pass parameters between a cloud flow and a desktop flow?
- How do you handle exceptions in Power Automate Desktop?
- When would you recommend RPA over a direct API integration?

---

## 11. Power BI

### Data Modeling
- Star schema design — fact and dimension tables
- Relationships — single direction vs. bi-directional (when to avoid bi-directional)
- Cardinality — one-to-one, one-to-many, many-to-many
- Active vs. inactive relationships — USERELATIONSHIP()
- Role-playing dimensions

### DAX Fundamentals
- Calculated columns vs. Measures — when to use each (storage vs. compute)
- CALCULATE, FILTER, ALL, ALLEXCEPT, ALLSELECTED
- SUMX, AVERAGEX, COUNTX — iterator functions
- Time intelligence: DATEADD, DATESYTD, PREVIOUSMONTH, SAMEPERIODLASTYEAR
- Context: Row context vs. Filter context
- Variables in DAX — improving readability and performance

### Row-Level Security (RLS)
- Static RLS — hardcoded user filters
- Dynamic RLS — USERPRINCIPALNAME(), USERNAME()
- Testing RLS in Power BI Desktop
- Object-level security (OLS)

### Power BI Service
- Workspaces — V2 workspaces
- Apps — publishing, audience configuration
- Datasets vs. semantic models
- Scheduled refresh — gateway requirement for on-prem
- On-premises data gateway — personal vs. enterprise mode

### Embedding
- Embed for your customers (app owns data) — service principal
- Embed for your organization (user owns data) — Azure AD token
- Power BI embedded in Power Apps — premium per user vs. capacity

### Power BI + Dataverse
- Dataverse connector in Power BI — TDS endpoint
- DirectQuery vs. Import mode for Dataverse
- Performance considerations

### Common Interview Questions
- What is the difference between a calculated column and a measure?
- Explain filter context vs. row context in DAX.
- How do you implement dynamic row-level security?
- What is the difference between DirectQuery and Import mode?
- When would you use bi-directional relationships and what are the risks?

---

## 12. Copilot Studio (Power Virtual Agents)

### Core Concepts
- Topics — trigger phrases, conversation nodes
- System topics — Greeting, Escalate, End of Conversation, Fallback
- Entities — prebuilt vs. custom, slot filling
- Variables — topic scope vs. global scope
- Conditions, branching logic
- Question node — validation, retry prompts

### Integration
- Calling Power Automate flows from topics — passing inputs, receiving outputs
- HTTP requests from Copilot Studio (preview)
- Knowledge sources — SharePoint, websites, Dataverse

### Generative AI Features
- Generative answers — grounding on documents/URLs
- Generative orchestration — dynamic topic routing
- Prompt actions, AI Builder integration

### Authentication
- No authentication — anonymous
- Azure AD authentication — SSO in Teams
- OAuth providers

### Deployment
- Publishing channels — Teams, websites, Facebook, etc.
- Embedding in Power Pages, SharePoint
- Analytics — session outcomes, escalation rate, resolution rate

### Common Interview Questions
- What is the difference between a topic scope variable and a global variable in Copilot Studio?
- How do you call a Power Automate flow from a chatbot?
- What are generative answers and how do you ground them?
- How would you implement SSO for a bot deployed in Teams?

---

## 13. Custom Connectors

### Building Custom Connectors
- OpenAPI / Swagger definition — paths, operations, parameters, responses
- Authentication types: No auth, API key, OAuth 2.0, Basic, Windows
- Dynamic values — `x-ms-dynamic-values`, `x-ms-dynamic-schema`
- Triggers in custom connectors — polling vs. webhook
- Policy templates — set header, set URL, convert message

### Testing & Deployment
- Connection testing in connector UI
- Packaging connectors in solutions
- ISV connector certification process

### Common Interview Questions
- How do you create a polling trigger in a custom connector?
- What is `x-ms-dynamic-values` and when would you use it?
- How do you secure a custom connector with OAuth 2.0?

---

---

# 🟢 TIER 4 — SUPPORTING KNOWLEDGE

---

## 14. Azure Integration

### Azure Functions
- Calling Azure Functions from Power Automate / custom connectors
- HTTP-triggered functions — securing with function keys or Entra ID
- Durable Functions — long-running orchestration pattern

### Azure Service Bus
- Queue vs. Topic/Subscription
- Dataverse Azure Service Bus integration — plugin step with Azure-aware service endpoint
- One-way, two-way, REST endpoints
- Use cases: async processing, cross-system events

### Azure API Management (APIM)
- Using APIM as a facade for Power Automate HTTP calls
- Subscription keys, rate limiting, policies
- Exposing APIM as a custom connector

### Azure Logic Apps vs. Power Automate
- Differences: hosting, pricing, connectors, ISE, single tenant vs. multi-tenant
- When to choose Logic Apps over Power Automate

### Azure Key Vault
- Storing secrets for Power Platform integrations
- Accessing Key Vault from Azure Functions used by Power Automate

### Entra ID App Registrations
- Creating app registrations for Dataverse access
- Client credentials flow vs. authorization code flow
- API permissions: Dynamics CRM — user_impersonation
- Service principals in Power Platform

### Common Interview Questions
- When would you use Azure Service Bus with Dataverse instead of a plugin?
- What is the difference between Power Automate and Azure Logic Apps?
- How do you connect to Dataverse using a service principal?
- How do you secure secrets used in Power Platform integrations?

---

## 15. SharePoint Integration

### Power Apps + SharePoint
- SharePoint lists as a data source — delegation limitations
- Using SharePoint document libraries
- Patching to SharePoint — list item IDs, multi-value columns (lookup, choice)
- Known limitations: column types, 500 item delegation limit for some functions

### Power Automate + SharePoint
- Common triggers: item created/modified, file created/modified
- Site pages, document library flows
- SharePoint HTTP action — direct REST API calls
- Managed metadata columns in flows

### SharePoint Embedded (Advanced)
- SharePoint containers in custom apps

### Common Interview Questions
- What are the delegation limitations when using SharePoint with Power Apps?
- How do you update a multi-select choice column in a SharePoint list via Power Automate?
- How do you call SharePoint REST API directly from Power Automate?

---

## 16. Dynamics 365 Integration

### Relevant Modules
- Sales — Opportunity, Lead, Contact, Account
- Customer Service — Case, Queue, Entitlement, SLA, Routing rules
- Field Service — Work Order, Booking, Resource scheduling
- Marketing / Customer Insights – Journeys

### Integration Points
- Dataverse is the backbone — D365 apps sit on top
- Using plugins and flows for D365 business logic extension
- D365 APIs — same as Dataverse Web API
- Dataverse virtual tables pointing to D365 data

### Common Interview Questions
- How does a Dynamics 365 Customer Service Case lifecycle work?
- How do you customize SLA behavior programmatically?
- What is the relationship between Dynamics 365 and Dataverse?

---

## 17. Microsoft 365 Integration

### Teams Integration
- Power Apps tab in Teams
- Power Automate approvals in Teams adaptive cards
- Copilot Studio bots in Teams
- Dataverse for Teams

### Outlook Integration
- Power Automate email triggers and actions
- Actionable messages (adaptive cards in email)
- Power Apps for Outlook add-in

### OneDrive & SharePoint
- File operations in flows
- Power Apps file upload patterns

---

---

# Interview Scenario Bank

## Architecture & Design Questions
- Design a multi-environment strategy for a large enterprise Power Platform deployment.
- How would you architect a solution that needs to process 100,000 records nightly?
- A customer needs a portal for external users to submit and track service requests. How would you build it?
- How would you migrate a legacy Access database to Power Platform?
- Design a Power Platform governance framework for a 5,000-person organization.

## Troubleshooting Questions
- A Power Automate flow is failing intermittently — how do you debug it?
- Users report a canvas app is slow — what is your troubleshooting approach?
- A plugin is firing recursively — how do you detect and fix this?
- A managed solution import fails in production — what are the common causes?
- Power Pages users can see records they shouldn't — how do you investigate?

## Trade-off Questions
- Plugin vs. Power Automate — when do you choose each?
- Canvas App vs. Model-Driven App — how do you decide?
- Dataverse vs. SharePoint as a data store — when to use which?
- Custom PCF control vs. native control with JavaScript?
- Power Automate vs. Azure Logic Apps — which do you recommend and why?

---

# Study Resources

| Resource | Type | Best For |
|----------|------|----------|
| Microsoft Learn | Free courses | All certifications, structured learning |
| learn.microsoft.com/power-platform | Docs | Deep technical reference |
| Power Platform Community | Forum | Real-world scenarios, gotchas |
| PCF Gallery | Examples | PCF control patterns |
| GitHub: microsoft/PowerApps-Samples | Code | Plugins, Web API, PCF samples |
| YouTube: Shane Young, April Dunnam | Video | Canvas/Flow tutorials |
| XrmToolBox | Tool | Dataverse admin, FetchXML builder |
| Power Platform CLI docs | CLI reference | ALM, DevOps workflows |

---

# Weekly Study Schedule (Recommended 6-Week Plan)

| Week | Focus |
|------|-------|
| Week 1 | Dataverse (tables, security, FetchXML, Web API) + Canvas Apps basics |
| Week 2 | Canvas Apps advanced (delegation, offline, components) + Model-Driven Apps |
| Week 3 | Power Automate (triggers, expressions, error handling, approvals) + Security & DLP |
| Week 4 | ALM/DevOps + Plugins + PCF Controls |
| Week 5 | Power Pages + Power BI + Copilot Studio |
| Week 6 | Azure integration + Practice interview questions + Scenario walkthroughs |

> For a 3-week intensive plan: compress Weeks 1–2 into Week 1, 3–4 into Week 2, 5–6 into Week 3 — but prioritize Tier 1 topics ruthlessly.
