# Dataverse Plugins — Complete Interview Guide
> Shadmaan Hussain | Simple & Fast | Interview Tomorrow

---

## What is a Plugin? (Say this in 30 seconds)

> A plugin is a **custom .NET class** that hooks into Dataverse events and runs your business logic **server-side**, automatically, whenever something happens (create, update, delete, etc.).

**Think of it like:** A database trigger, but in C#, and much more powerful.

**Why plugins over client-side JS?**
- Runs on the server — users can't bypass it
- Fires even when records are created via API, Power Automate, imports — not just the UI
- Full access to Dataverse SDK and .NET libraries

---

## The Plugin Pipeline — How It Works

When a user saves a record, Dataverse runs a pipeline with checkpoints. Your plugin hooks into one of these checkpoints:

```
User clicks Save
      ↓
┌─────────────────────────────────────────┐
│  Stage 10: Pre-Validation               │  ← No transaction yet
│  (your plugin can abort early here)     │
└─────────────────────────────────────────┘
      ↓
  [Dataverse validation runs]
      ↓
┌─────────────────────────────────────────┐
│  Stage 20: Pre-Operation                │  ← Transaction OPENS here
│  (your plugin can modify the data)      │
└─────────────────────────────────────────┘
      ↓
  [Database write happens]
      ↓
┌─────────────────────────────────────────┐
│  Stage 40: Post-Operation (Sync)        │  ← Transaction still open
│  (follow-up in same transaction)        │
└─────────────────────────────────────────┘
      ↓
  [Transaction COMMITS]
      ↓
┌─────────────────────────────────────────┐
│  Stage 40: Post-Operation (Async)       │  ← After commit, background
│  (emails, external APIs, notifications) │
└─────────────────────────────────────────┘
      ↓
Response returned to user
```

---

## The 3 Stages — Memorise This Table

| Stage | Transaction? | Can modify data? | Throw = rollback? | Use for |
|---|---|---|---|---|
| **Pre-Validation** | No | Yes (InputParameters) | No (just stops) | Early validation, abort before anything starts |
| **Pre-Operation** | Yes | Yes (InputParameters) | Yes | Modify data before it's saved |
| **Post-Operation Sync** | Yes | No (data already written) | Yes | Follow-up records in same transaction |
| **Post-Operation Async** | No | No | No (doesn't rollback parent) | Emails, external API calls, notifications |

### The one-liner for each:

- **Pre-Validation** → "Should this operation even happen?"
- **Pre-Operation** → "What should the data look like when it's saved?"
- **Post-Op Sync** → "What else needs to happen atomically?"
- **Post-Op Async** → "What should happen after, in the background?"

---

## Sync vs Async — The Key Difference

| | Sync | Async |
|---|---|---|
| **When** | Runs in the same request as the user's action | Runs in background after the transaction commits |
| **User waits?** | Yes — user is blocked until it finishes | No — user gets response immediately |
| **Can rollback?** | Yes — throw an exception to rollback | No — transaction already committed |
| **Use for** | Validation, data modification, atomic follow-ups | Emails, external API calls, heavy processing |
| **Timeout** | 2 minutes max | No time limit (within reason) |

**Rule of thumb:** If the user needs to know the result → Sync. If it can happen silently in the background → Async.

---

## Plugin Types

### 1. Standard Plugin (most common)
Hooks into a **Dataverse message** on a **table**. The message can be:
- `Create` — a record is being created
- `Update` — a record is being updated
- `Delete` — a record is being deleted
- `Retrieve` / `RetrieveMultiple` — data is being queried
- `Associate` / `Disassociate` — a relationship is being linked/unlinked
- Any other Dataverse message

### 2. Custom API Plugin
Runs when a **Custom API** is called. You define your own message name (e.g. `new_CalculateDiscount`). Used to create reusable server-side actions callable from flows, Canvas Apps, etc.

### 3. Custom Workflow Activity (deprecated in modern PP)
Extends Power Automate / classic workflows with custom .NET code. Largely replaced by Custom APIs.

---

## The Code Structure — Every Plugin Looks Like This

```csharp
using Microsoft.Xrm.Sdk;
using System;

public class MyPlugin : IPlugin  // must implement IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        // Step 1: Get the execution context
        var context = (IPluginExecutionContext)serviceProvider
            .GetService(typeof(IPluginExecutionContext));

        // Step 2: Get the org service (to make Dataverse calls)
        var serviceFactory = (IOrganizationServiceFactory)serviceProvider
            .GetService(typeof(IOrganizationServiceFactory));
        var service = serviceFactory.CreateOrganizationService(context.UserId);

        // Step 3: Get the tracing service (for debugging)
        var tracingService = (ITracingService)serviceProvider
            .GetService(typeof(ITracingService));

        // Step 4: Your logic goes here
        tracingService.Trace("Plugin started");

        // Get the record being created/updated
        if (context.InputParameters.Contains("Target") 
            && context.InputParameters["Target"] is Entity entity)
        {
            // do something with entity
        }
    }
}
```

**The 3 services you always get:**
| Service | What it's for |
|---|---|
| `IPluginExecutionContext` | Info about the current operation (what table, what message, what data) |
| `IOrganizationService` | Make Dataverse API calls (create, update, delete, query) |
| `ITracingService` | Write debug logs — shows in the error message when plugin throws |

---

## The Context Object — What's Inside

```csharp
context.MessageName        // "Create", "Update", "Delete", etc.
context.PrimaryEntityName  // "contact", "account", etc.
context.PrimaryEntityId    // GUID of the record
context.Stage              // 10=PreValidation, 20=PreOperation, 40=PostOperation
context.Depth              // 1 = triggered by user, 2+ = triggered by another plugin
context.UserId             // who triggered this operation
context.InitiatingUserId   // the original user (same as UserId unless impersonating)

context.InputParameters    // data going INTO the operation
context.OutputParameters   // data coming OUT of the operation
context.SharedVariables    // pass data between pre and post plugins
context.PreEntityImages    // snapshot of the record BEFORE the change
context.PostEntityImages   // snapshot of the record AFTER the change
```

---

## Pre/Post Entity Images — Important Concept

By default, `Target` in `InputParameters` only contains the **fields that changed**, not the full record.

To get the full record before or after:
- **PreEntityImage** — the record as it was **before** the update
- **PostEntityImage** — the record as it is **after** the update

You must **register** these in the Plugin Registration Tool — they don't come automatically.

```csharp
// Example: get the old email before it was changed
if (context.PreEntityImages.Contains("PreImage"))
{
    var preImage = context.PreEntityImages["PreImage"];
    var oldEmail = preImage.GetAttributeValue<string>("emailaddress1");
}
```

**Why this matters:** If a user only updates the phone number, `Target` only has the phone field. If you need the email in the same plugin, you must use a PreEntityImage.

---

## Use Cases & Examples

---

### Use Case 1 — Validation (Pre-Validation)

**Scenario:** Prevent a Contact from being created without an email address.

```csharp
// Stage: Pre-Validation | Message: Create | Table: contact

if (context.InputParameters["Target"] is Entity entity)
{
    // Check if email is missing
    if (!entity.Contains("emailaddress1") || 
        string.IsNullOrWhiteSpace(entity.GetAttributeValue<string>("emailaddress1")))
    {
        throw new InvalidPluginExecutionException(
            "Email address is required to create a Contact.");
    }
}
```

**What happens:** User sees an error message. No record is created. No transaction was open so nothing to roll back.

---

### Use Case 2 — Auto-Populate a Field (Pre-Operation)

**Scenario:** Automatically set a "Full Name" field combining first + last name in a custom format.

```csharp
// Stage: Pre-Operation | Message: Create, Update | Table: new_employee

if (context.InputParameters["Target"] is Entity entity)
{
    var firstName = entity.GetAttributeValue<string>("new_firstname") ?? "";
    var lastName = entity.GetAttributeValue<string>("new_lastname") ?? "";
    
    if (!string.IsNullOrEmpty(firstName) || !string.IsNullOrEmpty(lastName))
    {
        // Modify the Target — this change gets saved to DB
        entity["new_fullname"] = $"{lastName}, {firstName}".Trim(',', ' ');
    }
}
```

**Why Pre-Operation:** We're modifying `Target` before it's written. If we did this in Post-Operation, we'd need a separate `service.Update()` call.

---

### Use Case 3 — Create a Child Record (Post-Operation Sync)

**Scenario:** When an Order is created, automatically create a default Order Line.

```csharp
// Stage: Post-Operation (Sync) | Message: Create | Table: salesorder

if (context.InputParameters["Target"] is Entity order)
{
    var orderLine = new Entity("salesorderdetail");
    orderLine["salesorderid"] = new EntityReference("salesorder", order.Id);
    orderLine["productdescription"] = "Default line item";
    orderLine["quantity"] = new decimal(1);
    
    service.Create(orderLine);
    // If this throws, BOTH the Order AND this Order Line are rolled back
}
```

**Why Post-Op Sync (not async):** We want atomicity — if the Order Line creation fails, the whole Order should be rolled back too. They live or die together.

---

### Use Case 4 — Send an Email Notification (Post-Operation Async)

**Scenario:** When a Case is resolved, send a satisfaction survey email to the customer.

```csharp
// Stage: Post-Operation (Async) | Message: Update | Table: incident

// Check if the status just changed to Resolved
if (context.InputParameters["Target"] is Entity target &&
    target.GetAttributeValue<OptionSetValue>("statuscode")?.Value == 5) // 5 = Problem Solved
{
    // Get full record from PostEntityImage
    var postImage = context.PostEntityImages["PostImage"];
    var customerId = postImage.GetAttributeValue<EntityReference>("customerid");
    
    // Send email via Dataverse email activity
    var email = new Entity("email");
    // ... configure email ...
    service.Create(email);
    
    // Call SendEmail message
    var sendEmailRequest = new OrganizationRequest("SendEmail");
    sendEmailRequest["EmailId"] = emailId;
    service.Execute(sendEmailRequest);
}
```

**Why Async:** Sending email doesn't need to block the user. If it fails, the Case resolution shouldn't roll back.

---

### Use Case 5 — Prevent Infinite Loop (Depth Check)

**Scenario:** Plugin updates a field on save. That update triggers the same plugin again. Infinite loop.

```csharp
public void Execute(IServiceProvider serviceProvider)
{
    var context = (IPluginExecutionContext)serviceProvider
        .GetService(typeof(IPluginExecutionContext));

    // ALWAYS add this at the top of recursive-risk plugins
    if (context.Depth > 1)
    {
        return; // stop here — we were triggered by ourselves
    }
    
    // ... rest of your logic
}
```

**Rule:** `Depth == 1` means a user triggered this directly. `Depth == 2+` means another plugin or operation triggered it. Return early at Depth > 1.

---

### Use Case 6 — Query Related Data (using IOrganizationService)

**Scenario:** When updating an Opportunity, check if the Account it belongs to is on credit hold.

```csharp
// Stage: Pre-Operation | Message: Update | Table: opportunity

var target = (Entity)context.InputParameters["Target"];
var preImage = context.PreEntityImages["PreImage"];

// Get the Account ID from the pre-image
var accountRef = preImage.GetAttributeValue<EntityReference>("accountid");

if (accountRef != null)
{
    // Query the Account
    var account = service.Retrieve("account", accountRef.Id, 
        new ColumnSet("creditonhold"));
    
    bool onCreditHold = account.GetAttributeValue<bool>("creditonhold");
    
    if (onCreditHold)
    {
        throw new InvalidPluginExecutionException(
            "Cannot update Opportunity — Account is on credit hold.");
    }
}
```

---

## Plugin Registration — How to Deploy

Plugins are registered using the **Plugin Registration Tool** (part of the Power Platform CLI / XrmToolBox).

**The steps:**
```
1. Build your plugin DLL (class library targeting .NET Framework 4.6.2)
2. Open Plugin Registration Tool
3. Connect to your environment
4. Register Assembly → upload your DLL
5. Register Step → configure:
   - Message: Create / Update / Delete / etc.
   - Primary Entity: contact / account / etc.
   - Stage: PreValidation / PreOperation / PostOperation
   - Execution Mode: Synchronous / Asynchronous
   - Filter Attributes (for Update): only fire when THESE columns change
6. Register Images (if needed): PreImage / PostImage
```

**Filter Attributes for Update** — critical for performance:
- Without filters: plugin fires on EVERY update to the table, even if the field you care about didn't change
- With filters: plugin only fires when the specified columns are in the update payload
- Always set filter attributes on Update steps

---

## Secure Configuration vs Unsecure Configuration

When registering a step, you can pass config strings to your plugin:

| | Unsecure Config | Secure Config |
|---|---|---|
| **Visible to** | Anyone who can read the step | System Admins only |
| **Use for** | Non-sensitive settings (table names, feature flags) | API keys, connection strings |
| **Access in code** | Constructor parameter | Constructor parameter |

```csharp
public class MyPlugin : IPlugin
{
    private readonly string _unsecureConfig;
    private readonly string _secureConfig;
    
    // Constructor receives config when registered with config
    public MyPlugin(string unsecureConfig, string secureConfig)
    {
        _unsecureConfig = unsecureConfig;
        _secureConfig = secureConfig; // e.g. API key stored here
    }
    
    public void Execute(IServiceProvider serviceProvider) { ... }
}
```

---

## Common Mistakes to Avoid

| Mistake | Why it's bad | Fix |
|---|---|---|
| No Depth check | Infinite loop crashes the environment | Check `context.Depth > 1` at the top |
| Heavy logic in sync plugin | User waits, timeout at 2 min | Move to async or Azure Function |
| Calling `service.Update()` in Pre-Operation to update Target | Unnecessary extra DB write | Just modify `Target` directly — it's passed by reference |
| No try/catch in async plugin | Unhandled exception is silent, hard to debug | Wrap in try/catch, use tracingService |
| Not setting filter attributes on Update | Plugin fires on every field change | Always set filter attributes |
| Throwing in Post-Op Async | Won't roll back anything, confusing | Use it only to log, don't throw unless necessary |

---

## Interview Questions You Will Likely Get

---

**Q: What is the difference between Pre-Validation, Pre-Operation, and Post-Operation?**

> "Think of three checkpoints around the database write. Pre-Validation fires first — no transaction open yet. I use it for early abort logic — if validation fails, throw here and nothing has started. Pre-Operation fires after Dataverse validation but before the write — the transaction is now open. I can still modify InputParameters Target to change what gets saved. Post-Operation sync fires after the write but the transaction is still open — throwing here rolls everything back. Post-Operation async fires after the transaction commits, in the background — I use it for emails and external API calls that don't need to be atomic with the main operation."

---

**Q: How do you prevent an infinite loop in a plugin?**

> "Check `context.Depth` at the very top and return early if it's greater than 1. Depth is 1 when a user triggers the operation directly. If my plugin then calls service.Update on the same table and that fires the same plugin again, Depth becomes 2. Returning at that point breaks the loop."

---

**Q: What's the difference between sync and async plugins?**

> "Sync plugins run in the same request — the user waits for them to finish. They can throw to roll back the transaction. Async plugins run in the background after the transaction commits — the user gets their response immediately. Async can't roll back the parent operation. I use sync for validation and atomic data changes, async for emails and external API calls."

---

**Q: What are Pre and Post Entity Images?**

> "Entity images are snapshots of the record. A Pre-Image captures what the record looked like before the operation — useful in Update plugins where Target only contains changed fields. A Post-Image captures what the record looks like after the save. You register them in the Plugin Registration Tool and access them via context.PreEntityImages and PostEntityImages. Without them, if a user only updates the phone number, you can't see the email field from Target alone."

---

**Q: When would you use a plugin vs Power Automate?**

> "I use plugins when I need guaranteed server-side execution that can't be bypassed, when I need to modify data before it's written — which flows can't do, when I need the logic to be atomic with the database write, or when I need complex .NET logic. I use Power Automate when the logic can run after the fact, when non-developers need to maintain it, or when I need to integrate with external connectors. Plugins are code-first and more powerful; flows are low-code and easier to maintain."

---

**Q: What is a Custom API plugin?**

> "A Custom API lets you define your own Dataverse message — like a custom action. You build the plugin the same way, but instead of hooking into Create/Update/Delete, it fires when your custom message is called. It's callable from Canvas Apps, Power Automate, or other plugins. I'd use it to wrap complex business logic into a reusable server-side function — for example, a `CalculateDiscount` action that takes a product ID and quantity and returns a price."

---

## Quick Cheat Sheet — Sticky Note

```
PLUGIN STAGES
  Pre-Validation  = no transaction, early abort
  Pre-Operation   = transaction open, modify Target
  Post-Op Sync    = after write, same transaction (throws = rollback)
  Post-Op Async   = after commit, background (no rollback)

ALWAYS DO THESE
  if (context.Depth > 1) return;   ← stop infinite loops
  tracingService.Trace(...)        ← logs show in error details
  try { } catch { throw new InvalidPluginExecutionException(...) }

CONTEXT OBJECTS
  InputParameters["Target"]  = the record being changed
  PreEntityImages["PreImage"] = record BEFORE
  PostEntityImages["PostImage"] = record AFTER

SYNC vs ASYNC
  Sync  = user waits, can rollback
  Async = background, cannot rollback
```

---

*Last updated: May 8, 2026 — Shadmaan Hussain — Interview tomorrow*
