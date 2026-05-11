# Power Platform — 10-Minute Topic Guide

---

## 1. Plugin Infinite Loop

### What is it?
A **Dataverse Plugin** is C# code that runs automatically when something happens in Dataverse (e.g., a record is created or updated). An infinite loop happens when your plugin triggers itself repeatedly.

### How does it happen?
Imagine a plugin fires on `Update` of the Account entity and inside it, you update the same Account record. That update fires the plugin again → which updates again → and so on. Dataverse will eventually kill it, but it can cause failures and timeouts.

### How to fix it?
Check the **execution depth** at the start of your plugin:

```csharp
if (context.Depth > 1) return;
```

`Depth` tells you how many times the pipeline has been called in the same chain. If it's greater than 1, your plugin was triggered by another plugin (or itself), so you exit early.

### Other prevention strategies
- Use a flag field (e.g., `new_issyncrunning`) and skip if already set
- Use `PreOperation` stage instead of `PostOperation` where you don't need to re-trigger
- Be mindful when updating the same entity the plugin is registered on

---

## 2. Power Automate Types & Azure Function Triggers

### Power Automate Flow Types

| Type | Triggered By | Example Use Case |
|---|---|---|
| **Automated** | An event (new email, new row) | Send email when a lead is created |
| **Instant** | Manual button click | Run a report on demand |
| **Scheduled** | Time/recurrence | Daily data sync at midnight |
| **Desktop Flow** | Automate UI actions (RPA) | Fill a legacy web form automatically |

### When to use Flow vs Azure Function?

- **Power Automate**: Best for low-code orchestration, connecting apps, approvals, notifications — no coding needed
- **Azure Function**: Best for heavy computation, custom APIs, complex transformations, or when you need full control over code and infrastructure

A common pattern: **Power Automate calls an Azure Function via HTTP trigger** to offload complex logic.

### Common Azure Function Triggers
- **HTTP** — triggered by an API call (most common with Power Platform)
- **Timer** — runs on a CRON schedule
- **Service Bus / Queue** — processes messages asynchronously
- **Blob Storage** — fires when a file is added/modified
- **Event Grid** — reacts to Azure events

---

## 3. Script Files in Model-Driven Apps (MDA)

### What are they?
JavaScript files (web resources) that add custom behavior to MDA forms. You upload the `.js` file as a web resource, then register it on form events.

### The 3 main events

| Event | When it fires | Common use |
|---|---|---|
| `OnLoad` | Form opens | Pre-fill fields, hide/show fields based on role |
| `OnChange` | A field value changes | Update another field, validate input |
| `OnSave` | User saves the form | Block save if validation fails |

### The right way to write scripts

Always use `formContext`, not `Xrm.Page` (deprecated):

```javascript
function onLoad(executionContext) {
    const formContext = executionContext.getFormContext();
    const field = formContext.getAttribute("new_name");
    field.setValue("Hello");
}
```

### Registering scripts
1. Upload JS file as a **Web Resource**
2. Open the form in **Form Editor**
3. Go to **Form Properties → Event Handlers**
4. Add the web resource and specify the function name

### Key things to know
- Always pass `executionContext` as the first parameter and enable "Pass execution context as first parameter"
- Scripts run client-side — don't put sensitive logic here
- Use `formContext.ui.setFormNotification()` to show inline messages to users

---

## 4. Canvas Apps

### What are they?
Fully customizable apps you build by dragging and dropping controls. You control the layout pixel-by-pixel, unlike Model-Driven Apps which follow a fixed structure.

### Key concepts to know

**Galleries** — display a list of records (like a repeating row). Bind to a data source and use `ThisItem` to reference each record.

**Delegation** — Power Apps processes some formulas locally (on the device) and some on the server. If a formula can't be delegated (server can't handle it), it only processes the first 500–2000 records. Always check the blue delegation warning.

**Collections** — in-memory tables you create in the app. Use `ClearCollect(MyCol, DataSource)` to load data locally and work with it offline or for performance.

**Power Fx** — the formula language (similar to Excel). Everything in Canvas Apps is driven by formulas, e.g.:
```
If(Dropdown1.Selected.Value = "Active", Green, Red)
```

**Offline capability** — Canvas Apps can work offline using `LoadData` / `SaveData` functions with local collections.

**Embedding** — Canvas Apps can be embedded inside MDA forms, Teams tabs, or SharePoint pages.

### Canvas App vs Model-Driven App

| | Canvas App | Model-Driven App |
|---|---|---|
| UI Control | Full control | Fixed, data-driven layout |
| Data source | Any (SharePoint, SQL, APIs) | Dataverse only |
| Best for | Custom UX, mobile, non-Dataverse data | Business process, CRM-style apps |

---

## 5. QnA — Common Power Platform Interview Questions

### Must-know topics to prepare answers for:

**Power Apps**
- Difference between Canvas and Model-Driven Apps
- What is delegation and how do you handle it?
- How do you optimize Canvas App performance?

**Power Automate**
- How do you handle errors in flows? (Configure run after → has failed)
- Difference between parallel branch and sequential actions
- How do you call a child flow?

**Dataverse**
- Difference between choices, lookups, and polymorphic lookups
- What are alternate keys and when would you use them?
- How does row-level security work? (Business Units + Security Roles + Teams)

**Plugins**
- Pre-validation vs Pre-operation vs Post-operation — when to use each
- Synchronous vs Asynchronous plugins
- How do you debug a plugin? (Plugin Profiler / Attach to Process)

**PCF Controls**
- Lifecycle: `init`, `updateView`, `getOutputs`, `destroy`
- How does a PCF get/set field values?
- Virtual vs Standard dataset PCF

**Power Pages**
- How does table permissions work? (Global, Contact, Account, Self, Parent-child)
- How do you authenticate users? (Local, Azure AD, external identity providers)

---

## 6. Licensing (The Basics)

### Power Apps
- **Per-user**: $20/user/month — unlimited apps and flows
- **Per-app**: $5/user/app/month — access to one specific app
- **Seeded**: Included with Dynamics 365 licenses for use within D365 context

### Power Automate
- **Per-user**: $15/user/month — standard connectors
- **Per-user with RPA**: $40/user/month — includes desktop flows
- **Per-flow**: $500/month for 5 flows — good for shared flows used by many users

### Copilot Studio
- **Per-session**: ~$200 for 2000 sessions/month
- Messages-based billing (2026 model): pay per message consumed

### Premium vs Standard Connectors
- **Standard**: SharePoint, Outlook, Teams — included in most licenses
- **Premium**: Dataverse, SQL, HTTP, custom connectors — require a paid Power Apps/Automate license

### Key rule of thumb
If a user only uses **Dataverse** (not full D365), they need a **Power Apps license**. If they use a **D365 app**, their license covers Power Apps usage within that app's context.
