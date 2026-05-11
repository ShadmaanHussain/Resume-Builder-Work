# Dataverse & Security Model — Simple, Clear, Interview-Ready
> Written for one-day prep. Plain language. Real analogies. Quick exercises. No fluff.

---

## Table of Contents

1. [What is Dataverse? (Plain English)](#1-what-is-dataverse-plain-english)
2. [Dataverse vs. Everything Else](#2-dataverse-vs-everything-else)
3. [Table Types — Which One to Use When](#3-table-types--which-one-to-use-when)
4. [Table Ownership — The Key to Security](#4-table-ownership--the-key-to-security)
5. [Columns — The Types That Come Up in Interviews](#5-columns--the-types-that-come-up-in-interviews)
6. [Relationships — 1:N and N:N Made Simple](#6-relationships--1n-and-nn-made-simple)
7. [Querying — FetchXML vs. OData, Simply Explained](#7-querying--fetchxml-vs-odata-simply-explained)
8. [The Security Model — Think of It as a Building with Locked Floors](#8-the-security-model--think-of-it-as-a-building-with-locked-floors)
9. [Business Units — The Org Chart of Security](#9-business-units--the-org-chart-of-security)
10. [Security Roles — The Permission Tickets](#10-security-roles--the-permission-tickets)
11. [Teams — Group Passes](#11-teams--group-passes)
12. [Column-Level Security — Hiding Specific Fields](#12-column-level-security--hiding-specific-fields)
13. [Record Sharing — The One-Off Pass](#13-record-sharing--the-one-off-pass)
14. [How It All Stacks Together — One Clear Example](#14-how-it-all-stacks-together--one-clear-example)
15. [Auditing, Search, Elastic Tables — Quick Summaries](#15-auditing-search-elastic-tables--quick-summaries)
16. [Interview Q&A — With Simple, Speakable Answers](#16-interview-qa--with-simple-speakable-answers)
17. [One-Day Study Plan + Exercises](#17-one-day-study-plan--exercises)
18. [Quick-Reference Cheat Sheet](#18-quick-reference-cheat-sheet)

---

## 1. What is Dataverse? (Plain English)

**Simple answer:** Dataverse is Microsoft's managed database for Power Platform. Think of it as a **smart database** — it doesn't just store data, it comes with security, business logic, and APIs already built in.

**The one-liner for interviews:**
> "Dataverse is a cloud-hosted relational data platform that powers all the Microsoft business apps — D365, Power Apps, Power Pages, Copilot Studio. It bundles storage, row/column-level security, server-side plugins, and a REST API out of the box."

**Why is it more than just a database?**

| What you'd build yourself in SQL | What Dataverse gives you for free |
|---|---|
| User access control | Built-in role-based security (rows + columns) |
| REST API layer | OData Web API ready to use |
| Audit logging | Turn on with a checkbox |
| Business logic triggers | Plugins (C# code that fires on data events) |
| Deployment pipeline | Solutions (managed/unmanaged packages) |

**Real-world analogy:** SQL Server is like buying land and building a house yourself. Dataverse is like buying a furnished apartment — all the plumbing, wiring, and furniture is already done. You just move in and customise.

---

## 2. Dataverse vs. Everything Else

**Interview tip:** They will ask this. Just memorise the "when to choose" row for each.

### Dataverse vs. SQL Server

| | Dataverse | SQL Server |
|---|---|---|
| Security | Built in — RBAC, row/column level | You build it yourself in app code |
| API | OData REST ready to go | You write the API |
| Business logic | Plugins, Business Rules, Rollups | Stored procedures + triggers |
| Maintenance | Microsoft manages it | You patch, backup, scale |
| **Choose when** | Building Power Platform apps | Complex reporting, OLAP, non-PP systems |

### Dataverse vs. SharePoint Lists

The simplest way to think about it: **SharePoint lists are for documents and simple team data. Dataverse is for actual business applications.**

| | Dataverse | SharePoint |
|---|---|---|
| Security | Row-level, column-level | Site/list/item-level only (coarse) |
| Row limits | Millions | 5,000-item threshold breaks queries |
| Code/logic | Plugins, calculated columns | Only Power Automate flows |
| **Choose when** | App with real security needs | Document storage, simple team tracker |

### Your real example to give in interviews:
> "In the Neptune licensing platform, I used Dataverse for the rate-card tables because I needed RBAC and Power Automate integration. For the analytics/reporting layer, we used a SQL Data Warehouse because it needed complex aggregations and joins beyond what Dataverse supports natively."

---

## 3. Table Types — Which One to Use When

There are 4 types. Most of the time you use Standard. The others come up in interviews.

### Standard Tables ← you use these 95% of the time
Normal relational tables. Rows, columns, relationships. Examples: `Account`, `Contact`, your custom `cr123_RateCard`.

### Activity Tables ← know this one
A special kind of Standard table. Built for things like Emails, Phone Calls, Tasks.
- Every Activity has a **"Regarding"** field — you attach it to any record (Account, Contact, Case…)
- Activities show up automatically in the **Timeline** control on MDA forms
- You can build **custom activity tables** — e.g., a "Support Chat" activity that appears in the timeline

### Virtual Tables ← classic interview question
**The data does NOT live in Dataverse.** Virtual tables are a facade — a "window" into an external system (Azure SQL, a REST API, SharePoint). You write a plugin called a Virtual Table Data Provider that fetches the data when someone queries it.

**Limitations:** No plugins on writes, no auditing, no relationships, no offline.

**Simple analogy:** A virtual table is like a TV screen showing a live feed from another room. You can see what's happening, but the room itself isn't inside your house.

**When to use:** You want to show external data inside a Model-Driven App or Canvas App without migrating it to Dataverse.

### Elastic Tables ← comes up for senior roles
Backed by **Azure Cosmos DB** (NoSQL). Use for huge write volumes and time-expiring data.
- Has a **partition key** — all queries must include it for speed
- Has **TTL (time-to-live)** — rows delete themselves after X seconds automatically
- **No** relationships, rollups, auditing, or full FetchXML support

**When to use:** IoT sensor data, telemetry logs, session tokens, anything write-heavy that you don't need forever.

```
Quick decision:
Normal business data?                 → Standard
Timeline/email/task functionality?   → Activity
Data lives outside, show it in MDA?  → Virtual
Millions of writes, needs to expire? → Elastic
```

---

## 4. Table Ownership — The Key to Security

This is **critical** and easy to miss. Every table has an ownership type set when it's created — you **cannot change it later**.

### User/Team Owned ← use this for all business data
Every row has an `ownerid` field. That field says "this row belongs to this user or this team."

**Why it matters:** Security Roles use this to scope access. You can say:
- "This user can only see rows they own"
- "This user can see rows owned by anyone in their department"
- "This user can see everything"

### Organization Owned ← use this for reference/lookup data
No `ownerid` on rows. All rows are "owned" by the whole organisation.

**Why it matters:** You can only grant or deny access to the whole table. You **cannot** say "show this user only some rows." Either they see all rows or none.

**Use for:** Currencies, system configs, product catalogs, anything that everyone should be able to read.

### The interview gotcha
> "I have a reference table and I want admins to see all rows but regular users to see only some rows."
> → If the table is Organization-owned, **you can't do this with security roles alone**. You'd need to make it User/Team owned, or filter in the app layer.

### Quick check
```
Does this data belong to a specific person or team? → User/Team Owned
Is it shared reference data everyone should see?   → Organization Owned
```

---

## 5. Columns — The Types That Come Up in Interviews

You don't need to memorise all column types. Focus on these groups:

### The "know the difference" trio: Calculated vs. Rollup vs. Formula

This is a **guaranteed interview question**.

| | Calculated | Rollup | Formula |
|---|---|---|---|
| **Simple explanation** | Computes a value from fields on the SAME row | Adds up / counts values from RELATED rows | Power Fx expression, computed live on read |
| **Example** | Full Name = First Name + " " + Last Name | Total Opportunities = SUM of all Opportunities linked to this Account | Age = Today - BirthDate |
| **Stored in DB?** | Yes | Yes (recalculated hourly) | No — calculated fresh every time you read |
| **Real-time?** | Updated when the row saves | Updated by a system job every ~1 hour | Always real-time |
| **Cross-table?** | No — only current row | Yes — aggregates child rows | No — only current row |

**Interview question:** *"I need to show the total value of all open Opportunities on an Account."*
→ Answer: **Rollup column** on the Account table, summing `estimatedvalue` from related Opportunities filtered to `statecode = Open`.

**Interview question:** *"I need real-time totals and can't wait an hour."*
→ Answer: Use a **Post-Operation async plugin** that recalculates a regular column whenever a child row changes, OR use a **Formula column** if the data is on the same row.

---

### The "gotcha" column types

**Multi-select Choice (Choices):**
- Stored as a comma-separated string of integers internally.
- You **cannot** filter with a normal `eq` operator. You must use `contains-values` in FetchXML.
- Easy to mess up in queries — know this.

**Currency columns:**
- Always creates TWO columns: `cr123_amount` (in transaction currency) and `cr123_amount_base` (in org base currency).
- The base column is auto-calculated. Don't write to it directly.

**Date and Time — Time Zone modes:**
- **User Local:** Stored in UTC, displayed in user's time zone. For appointments, meetings.
- **Date Only:** No time component. For birthdays, due dates.
- **Time Zone Independent:** Stored and displayed exactly as entered. For things like "contract expiry date" where timezone shifting would cause errors.

---

## 6. Relationships — 1:N and N:N Made Simple

### 1:N (One-to-Many) — the most common

**Simple analogy:** One parent, many children. One Account can have many Contacts.

- The **lookup column lives on the child** (many side). Contact has a lookup to Account.
- When you delete the parent, you can configure **cascade behaviors** — what happens to the children:
  - `Cascade All` — delete parent, delete all children
  - `Restrict` — can't delete parent if children exist (safe default)
  - `No Cascade` — delete parent, children are orphaned (lose the lookup value)

### N:N (Many-to-Many) — two flavours

**Native N:N:** Dataverse creates a hidden junction table. Simple, but you can't add extra columns to it.
→ Use when the relationship is just "these two things are linked."

**Manual N:N (custom intersect table):** You create your own junction table with two lookups and add whatever columns you need.
→ Use when the **relationship itself** has data. Example: A Contact is enrolled in a Course with a `StartDate` and `Grade` — those extra fields need to live somewhere.

### Append vs. Append To — always comes up in interviews

When you link a Contact to an Account:
- The **Contact** needs the **Append** privilege on the Contact table *(it's being attached to something)*
- The **Account** needs the **Append To** privilege on the Account table *(it's receiving the attachment)*

**Memory trick:** Think "stapling." The thing being stapled needs `Append`. The thing receiving the staple needs `Append To`.

---

## 7. Querying — FetchXML vs. OData, Simply Explained

### OData / Web API — the simple one

It's just a **REST URL** with filter parameters. Like calling any normal API.

```
GET /api/data/v9.2/accounts?$select=name&$filter=statecode eq 0&$top=10
```

Use it for: Canvas Apps, PCF `context.webAPI`, Power Automate, anything simple.

**Can't do:** GROUP BY / aggregation, multi-select OptionSet filters, hierarchy queries.

### FetchXML — the powerful XML query language

More powerful. Used when OData can't do what you need.

```xml
<fetch aggregate="true">
  <entity name="opportunity">
    <attribute name="estimatedvalue" aggregate="sum" alias="total_value" />
    <attribute name="parentaccountid" groupby="true" alias="account" />
    <filter>
      <condition attribute="statecode" operator="eq" value="0" />
    </filter>
  </entity>
</fetch>
```

Use it for:
- **Aggregation** (SUM, COUNT, AVG, GROUP BY)
- **Multi-select OptionSet** filtering (`contains-values`)
- **Hierarchy** queries (`under`, `above`)
- **Liquid templates** in Power Pages (the `fetchxml` filter)
- **Plugins** (QueryExpression or FetchExpression)

### Decision in 5 seconds

```
Need to SUM / COUNT / GROUP BY?      → FetchXML
Multi-select OptionSet filter?       → FetchXML
Hierarchy query (parent/child tree)? → FetchXML
Everything else?                     → OData
```

---

## 8. The Security Model — Think of It as a Building with Locked Floors

Imagine a building (your Dataverse environment). Here's how access works:

```
BUILDING ENTRANCE: Do you have an environment license? → No = can't enter
    │
    ▼
FLOOR ASSIGNMENT: Which Business Unit (floor) are you on?
    │
    ▼
ROOM KEY (Security Role): What tables/rows can you access on your floor?
    │
    ▼
SPECIAL ACCESS (Teams): Does your team give you access to other rooms?
    │
    ▼
CABINET LOCK (Field Security Profile): Can you open specific drawers (columns)?
    │
    ▼
GUEST PASS (Record Sharing): Were you handed a one-off key to one specific room?
```

**The golden rule:** Access is **granted if ANY path says yes**. There is no "deny" — only the absence of a "yes."

**Column access is a SEPARATE check** — even if you can open the room, you might not be able to open a specific locked cabinet inside it.

---

## 9. Business Units — The Org Chart of Security

### Plain English explanation

A Business Unit (BU) is like a **department** in your company. Every user belongs to exactly one department. Every row they create "belongs to" their department too.

```
Company (Root BU)
├── Sales Department (Sales BU)
│   ├── North Team (North Sales BU)
│   └── South Team (South Sales BU)
├── Finance Department (Finance BU)
└── HR Department (HR BU)
```

### Why it matters: the 4 access scopes

When you give someone a security role, you also say HOW MUCH of the data they can see:

| Scope | What They Can See | Think of it as... |
|---|---|---|
| **User** | Only rows THEY own | My desk only |
| **Business Unit** | Rows owned by anyone in THEIR department | My whole department's desks |
| **Parent: Child Business Units** | Their dept + all sub-departments | My dept + all teams under me |
| **Organization** | Everything in the whole company | All floors, all desks |

### Key things to remember
- A user is in exactly **one** BU.
- Moving a user to a new BU does NOT move their existing records — records stay in the old BU.
- System Administrators are always at the root BU and can see everything regardless of scopes.

### Your real work example
> "On the Release Planner RBAC project, I set up BU-scoped roles so Engineering and PM teams could only see their own team's release items. Managers had Parent:Child BU scope to see across sub-teams without giving them full Org-level access."

---

## 10. Security Roles — The Permission Tickets

### Plain English

A Security Role is a **ticket** that says: "You can do X to Y table, but only up to scope Z."

### The 8 Privileges — What Each Does

| Privilege | What it means | Simple example |
|---|---|---|
| **Create** | Add new rows | Create a new Contact |
| **Read** | View/retrieve rows | See a Contact's details |
| **Write** | Edit existing rows | Update a Contact's phone number |
| **Delete** | Remove rows | Delete a Contact record |
| **Append** | Link THIS record to another (child role) | Attach a Contact to an Account |
| **Append To** | Let others link TO this record (parent role) | Allow Contacts to be linked to an Account |
| **Assign** | Change the owner of a row | Reassign a Case from User A to User B |
| **Share** | Give another user/team access to a specific row | Share one Opportunity with a colleague |

### The Append vs. Append To explanation (interviewers love this)

When you link Record A to Record B:
- Record A (the child) needs **Append** — *"I am being attached to something"*
- Record B (the parent) needs **Append To** — *"Something is being attached to me"*

**Real example:** Linking a Note to a Contact.
- Note needs `Append` on the Note table
- Contact needs `Append To` on the Contact table

If either is missing, the link fails with a "privilege" error.

---

### Multiple roles — how they combine

A user can have multiple security roles. They always **ADD together (union)**. There is no "deny."

```
Role A gives Read on Accounts at User scope.
Role B gives Read on Accounts at Org scope.
→ User gets Org scope (the broader one wins).

Role A gives Create on Contacts.
Role C does NOT mention Contacts at all.
→ User can still Create Contacts (Role A is enough).
```

**You CANNOT use one role to take away a privilege granted by another role.** The only way to restrict is to make sure no role grants it.

---

## 11. Teams — Group Passes

Three types. Know the difference.

### Owner Teams — the team owns records
A group that can OWN rows (just like a user can own rows). Members of the team can act on those rows.

**Use case:** A support queue where 5 agents share ownership of Cases. No single agent "owns" a Case — the Support Team does.

### Access Teams — the one-off collaboration pass
Cannot own records. Instead, you add a user to a record-specific access team to give them temporary access to that ONE record.

**Use case:** A deal team. The owner of an Opportunity adds a colleague to the Access Team for that specific Opportunity. The colleague can edit that one Opportunity but not others.

**How it's set up:** Access Team Templates are configured per table. Dataverse auto-creates a team instance per record.

### Entra ID Group Teams — the enterprise way
Backed by an **Azure AD / Entra ID security group**. When a user joins the Azure group, they automatically get the team's Dataverse roles. You don't manage membership in Dataverse — you manage it in Entra ID.

**Use case:** Large org where IT manages all user groups in Entra. New hires get the right Dataverse access automatically when added to the Entra group.

---

## 12. Column-Level Security — Hiding Specific Fields

### The problem it solves

By default: if you can see a row, you can see ALL columns on that row (even via the API). Column-Level Security (CLS) locks down individual fields at the API level.

### How it works — 3 steps

1. **Enable field security** on the column (there's a toggle in the column definition)
2. **Create a Field Security Profile** — a named set of permissions (can Read, can Update, can Create)
3. **Assign users/teams** to the profile

### What happens

```
Column security OFF                        → Everyone with row access can see the field
Column security ON, no profile assigned    → NOBODY can read it (except System Admin)
Column security ON, user has profile       → User can read/write based on profile settings
```

### Security Roles vs. Field Security Profiles — not the same thing

- **Security Role** = controls whether you can see the ROW
- **Field Security Profile** = controls whether you can see the COLUMN within that row

Both checks happen. You need to pass both.

**Common use case:** Salary column on Employee table. Everyone can see the Employee row, but only HR can see the Salary column.

---

## 13. Record Sharing — The One-Off Pass

### What it is

The normal security model is based on ownership and BUs. Record Sharing is for the exception case: "I need this specific user to see this specific row, just this once."

```
Normal:  User B's role says "User scope only" → can only see their own records.
Sharing: User A shares Record X with User B   → User B can now see Record X.
         User B still can't see any of User A's other records.
```

### When to use
- Approvals: share a record with an approver while it's under review
- Cross-department collaboration on one specific record
- A manager needs to see one record from another team temporarily

### When NOT to use
- If you're sharing dozens/hundreds of records → your security role design is wrong, fix that instead
- At massive scale → kills performance

### The POA table — know this term
Every sharing grant creates a row in the **PrincipalObjectAccess (POA)** table. On every query, Dataverse also checks POA. If POA has millions of rows, queries slow down. Microsoft introduced Access Teams as a lighter alternative to sharing.

---

## 14. How It All Stacks Together — One Clear Example

Let's use a story: **"Can Arjun (Sales Rep) read the Salary field on Priya's (Finance) Account record?"**

```
Step 1 — Environment access
Arjun has a valid Power Apps license and is in this environment? ✅

Step 2 — Security Role check
Arjun's role gives Read on Account at "User" scope.
Priya owns this Account record. Arjun ≠ Priya. ❌ Role doesn't cover it.

Step 3 — Record Sharing check
Has anyone shared this specific Account record with Arjun? ❌ No.

Step 4 — Hierarchy Security check
Is Arjun Priya's manager in the reporting chain? ❌ No.

→ Result: Arjun CANNOT see this Account record at all.
   The Salary column question is irrelevant — he can't even open the row.
```

Now change the scenario: Arjun's role is upgraded to **Organisation scope** on Accounts.

```
Step 2 — Security Role check
Arjun's role gives Read on Account at "Org" scope. ✅ He can see all Accounts.

Step 5 — Column-level check on Salary field
Is column-level security enabled on Salary? ✅ Yes.
Does Arjun have a Field Security Profile that grants Read on Salary? ❌ No.

→ Result: Arjun CAN open the Account record.
   But the Salary field appears blank/locked. He cannot see it.
```

**This is the answer to "explain Dataverse security" in an interview. Walk through exactly this logic.**

---

## 15. Auditing, Search, Elastic Tables — Quick Summaries

### Auditing (30-second version)
- You turn it on at three levels: Organisation → Table → Column
- Once on, every Create/Update/Delete is logged
- View it on a record's "Audit History" tab or via the API
- Logs live in the `audit` table — purge old ones regularly, they get huge
- **Your context:** Fabric docs review MDA — you can mention auditing was relevant for tracking document state changes

### Dataverse Search (30-second version)
Three options:
1. **Quick Find** — old, slow, one table at a time. Avoid.
2. **Dataverse Search** — powered by Azure Cognitive Search. Full-text, multi-table, ranked by relevance. **This is what you recommend for production apps.**
3. **Categorized Search** — legacy multi-entity search. Being deprecated.

**Interview answer:** *"For any production app with significant data, I'd enable Dataverse Search. Quick Find runs a LIKE query which doesn't scale — Dataverse Search uses Azure Cognitive Search for full-text with relevance ranking."*

### Elastic Tables (30-second version)
Cosmos DB under the hood. For high-volume, time-expiring data.
- Has a **partition key** — queries without it are slow
- Has **TTL** — rows auto-delete after X seconds
- No relationships, no rollups, no audit
- **Use for:** Telemetry, logs, session data, IoT data

### Dataverse for Teams vs. Full Dataverse (30-second version)
Dataverse for Teams = lite version, free with M365.
- No Business Units, no Plugins, no PCF, no Power Pages, no Auditing
- Good for simple internal team apps only

Full Dataverse = everything. That's what you've been working with.

---

## 16. Interview Q&A — With Simple, Speakable Answers

These are written the way you should actually SAY them out loud.

---

**Q: What is the difference between Pre-Validation, Pre-Operation, and Post-Operation plugin stages?**

> "Think of it as three doors before and after the database:
>
> Pre-Validation fires first — before the platform even validates the data. No database transaction has started yet. I use this for early checks that should abort everything cleanly, like 'this combination of fields doesn't make sense, stop here.'
>
> Pre-Operation fires after validation but BEFORE the write happens. The transaction is open. This is where I modify data — if I want to stamp a default value or transform a field before it gets saved, I do it here by changing `InputParameters['Target']`.
>
> Post-Operation fires after the write completes. If it's synchronous, it's still inside the transaction — so throwing an exception rolls back everything. If it's asynchronous, the transaction is already committed — use it for things like sending emails or calling external APIs that don't need to be atomic."

---

**Q: How does Append vs. Append To work?**

> "When you link two records, both tables need permissions for the link to work. The record being attached — let's say a Contact being linked to an Account — needs the Append privilege on its own table. The record receiving the attachment — the Account — needs Append To on its table. Both have to be granted, or the operation fails. A common mistake is putting Append on both tables or forgetting one side."

---

**Q: A user can read a row but can't see a specific field. What's wrong?**

> "Column-level security is enabled on that field. In Dataverse, field security is a separate layer from row-level security roles. Even if a user can read the row, individual fields can be locked behind a Field Security Profile. The fix is to assign that user — or a team they're in — to a Field Security Profile that grants Read on that column."

---

**Q: How do you prevent an infinite plugin loop?**

> "Check `context.Depth` at the very start of the plugin and return early if it's greater than 1. Depth is 1 when a user action triggers the plugin directly. If the plugin then triggers another operation that fires the same plugin again, Depth becomes 2. Returning early at Depth > 1 breaks the cycle."

---

**Q: What is the PrincipalObjectAccess (POA) table?**

> "It's the system table that stores all record-sharing grants. Every time you share a record with a user or team, a row goes into POA. The problem is that on every query, Dataverse checks POA alongside security roles — so if POA has millions of rows, queries get slower. That's why record sharing should be used sparingly, and Microsoft introduced Access Teams as a lighter-weight alternative."

---

**Q: How does Business Unit hierarchy affect security scopes?**

> "Security roles have four scope levels. User scope means I can only see my own records. Business Unit scope means I can see records owned by anyone in my BU. Parent: Child Business Units scope extends that to my BU and all BUs below mine in the tree. Organisation scope means I see everything. So I don't need Org scope just because a manager needs to see their sub-team's records — Parent: Child BU scope is the right, more restrictive choice."

---

**Q: User/Team Owned table vs. Organisation Owned — what's the difference?**

> "User/Team Owned tables have an ownerid column on every row — they track who owns each record. This is what makes row-level security scoping possible. Organisation Owned tables have no owner — all rows belong to the whole org. Security roles can only grant or deny access to the whole table, not individual rows. So Organisation Owned is fine for reference data like currencies or product categories, but you should never use it for sensitive data that needs row-level access control."

---

## 17. One-Day Study Plan + Exercises

You have one day. Here's how to use it.

### Morning — Read and understand (2 hours)
Go through this file section by section. Don't just read — for each section, **close the file and try to explain it out loud** to yourself (or to a wall). If you can't explain it, re-read it.

Priority order:
1. Section 8 — Security Model big picture
2. Section 9 — Security Roles + Append vs. Append To
3. Section 10 — Business Units + scopes
4. Section 16 — Plugin stages Q&A
5. Sections 3, 4 — Table types, Column types

---

### Afternoon — Exercises (2–3 hours)

#### Exercise 1 — Security Model on Paper (20 min)
Draw this scenario on paper without looking at the file:

> Your company has two departments: Sales and Finance.
> - Sales users can only see Accounts they own.
> - Finance users can see ALL Accounts.
> - HR users cannot see any Accounts.
> - The "Salary" column on Contact should only be visible to Finance and HR.

Answer these questions:
1. What ownership type should the Account table be?
2. What scope level does the Sales role need on Account?
3. What scope level does the Finance role need on Account?
4. How do you restrict the Salary column?
5. What table type and profile do you create for Salary?

**Answers:**
1. User/Team Owned (needs row-level scoping)
2. User scope
3. Organisation scope
4. Enable field security on the column, create a Field Security Profile
5. Standard column — create a "Finance and HR" Field Security Profile, assign Finance and HR users/teams to it

---

#### Exercise 2 — Append vs. Append To (10 min)

For each scenario, say which table needs Append and which needs Append To:

1. Linking an Opportunity to an Account
2. Linking a Task (activity) to a Contact
3. Linking a custom `cr123_Invoice` record to a `cr123_Project` record

**Answers:**
1. Opportunity needs Append, Account needs Append To
2. Task needs Append, Contact needs Append To
3. Invoice needs Append, Project needs Append To
*(Pattern: the thing being linked FROM needs Append, the thing being linked TO needs Append To)*

---

#### Exercise 3 — Plugin Stage Decision (10 min)

For each scenario, say which stage you'd use and why:

1. Validate that an Order's `TotalAmount` is not negative before saving
2. Auto-fill a `cr123_confirmationcode` field with a generated GUID before the record saves
3. Send a confirmation email to the customer after an Order is created
4. Create a related `cr123_AuditLog` record every time a Case is updated, and if it fails, the Case update should also fail

**Answers:**
1. Pre-Validation sync — reject early, before the transaction opens
2. Pre-Operation sync — modify InputParameters before the write
3. Post-Operation async — email doesn't need to be part of the transaction
4. Post-Operation sync — must be atomic (if the audit log creation fails, roll back the Case update too)

---

#### Exercise 4 — FetchXML vs. OData (5 min)

For each, say OData or FetchXML:

1. Get top 10 active Accounts by name in a Canvas App
2. Count how many Contacts are in each Account
3. Filter Contacts where the "Skills" multi-select choice includes "React"
4. Call Dataverse from a PCF control's `context.webAPI`
5. Retrieve all child records under a specific record in a hierarchy

**Answers:**
1. OData
2. FetchXML (aggregate/group by)
3. FetchXML (`contains-values`)
4. OData
5. FetchXML (`under` operator)

---

#### Exercise 5 — Speak It Out Loud (30 min) ← most important
Pick any 5 questions from Section 16. For each, close the file and **say the answer out loud** as if you're in the interview room. Time yourself — aim for 60–90 seconds per answer. If you stumble, look at the answer, then try again without looking.

---

### Evening — Final 30-min review
1. Read the cheat sheet (Section 18) top to bottom
2. Pick the 3 questions you stumbled on most — say those answers one more time
3. Write down on a sticky note: Append vs. Append To, the 4 BU scope levels, and the 3 plugin stages. Keep it visible for tomorrow morning.

---

## 18. Quick-Reference Cheat Sheet

### The 4 Security Layers in One Line Each
1. **Security Role** — what tables/rows can you touch, at what scope
2. **Business Unit scope** — User / BU / Parent:Child BU / Org
3. **Field Security Profile** — which specific columns can you read/write
4. **Record Sharing** — one-off grant for one specific row

### BU Scopes
| Scope | Sees |
|---|---|
| User | My rows only |
| Business Unit | My whole BU's rows |
| Parent: Child BU | My BU + all child BUs |
| Organization | Everything |

### 8 Privileges
Create · Read · Write · Delete · Append · Append To · Assign · Share

**Append = child (being attached). Append To = parent (receiving attachment).**

### Plugin Stages
| Stage | Mode | Use for |
|---|---|---|
| Pre-Validation | Sync | Early abort, no transaction yet |
| Pre-Operation | Sync | Modify data before write |
| Post-Operation | Sync | Atomic follow-up writes |
| Post-Operation | Async | Emails, external APIs |
| Check `Depth > 1` | Any | Prevent infinite loops |

### Table Types
| Type | Data lives in Dataverse? | Use for |
|---|---|---|
| Standard | Yes | All normal business data |
| Activity | Yes | Emails, calls, tasks, timeline |
| Virtual | No (external) | Show external data in MDA |
| Elastic | Yes (Cosmos DB) | High-volume writes, TTL expiry |

### FetchXML vs. OData
| Need | Use |
|---|---|
| SUM / COUNT / GROUP BY | FetchXML |
| Multi-select OptionSet filter | FetchXML (`contains-values`) |
| Hierarchy query | FetchXML (`under`/`above`) |
| Everything else | OData |

### Calculated vs. Rollup vs. Formula
| | Calculated | Rollup | Formula |
|---|---|---|---|
| Same row only? | Yes | No (aggregates children) | Yes |
| Real-time? | Yes (on save) | No (hourly job) | Always |
| Aggregation? | No | Yes | No |

---

*Last updated: May 8, 2026 — Simplified for Shadmaan Hussain's one-day interview prep*
