# RBAC in Power Pages vs Dataverse — Interview Guide
> Shadmaan Hussain | Simple & Fast | Interview Tomorrow

---

## The One-Line Summary

> **Dataverse RBAC** controls what internal users (staff, admins) can do inside the platform.  
> **Power Pages RBAC** controls what external users (customers, portal visitors) can see and do on the website.

They are **completely separate systems** that run in parallel. A user passing Power Pages security still hits Dataverse security on the backend.

---

## Part 1 — Dataverse RBAC (Internal Users)

This is for your colleagues inside the org — people who log into Model-Driven Apps, D365, etc.

### How it works — the stack (say this in order):

```
1. Environment Access (do you have a license to be here?)
2. Business Unit (which department are you in?)
3. Security Role (what tables can you touch, at what scope?)
4. Teams (group-level access)
5. Field Security Profile (column-level lock)
6. Record Sharing (one-off row grant)
```

### Security Role — the core piece

A Security Role is a collection of **privileges** on **tables**.

Each privilege has a **scope** that controls HOW MUCH of the table you can see:

| Scope | What you see |
|---|---|
| User | Only rows you own |
| Business Unit | Rows owned by anyone in your BU |
| Parent: Child BU | Your BU + all sub-BUs |
| Organization | All rows in the entire org |

### The 8 Privileges

> Create · Read · Write · Delete · Append · Append To · Assign · Share

You set each privilege independently per table. For example:
- Sales team: Read (Org) on Products, Create/Write/Delete (User) on Opportunities
- Support team: Read/Write (BU) on Cases

### Key facts about Dataverse RBAC:
- Managed in **Power Platform Admin Center** or **Settings → Security**
- Security Roles are assigned to **users or teams**
- A user can have **multiple roles** — permissions are additive (most permissive wins)
- System Administrator role bypasses everything
- Works for people **inside** the org with a Microsoft/AAD identity

---

## Part 2 — Power Pages RBAC (External Users)

This is for portal visitors — customers, partners, external registrants. They log in via a portal authentication provider (AAD, SAML, local login), NOT a Microsoft 365 account.

Power Pages has its own security system built on top of Dataverse, with two components:

### Component 1 — Web Roles

A **Web Role** is the Power Pages equivalent of a Security Role. It's a label you assign to an authenticated portal user.

```
Examples:
  - "Authenticated Users" (default — anyone logged in)
  - "Premium Members"
  - "Event Organizers"
  - "Administrators"
```

Web Roles are stored as Dataverse records in the `Web Role` table. You assign them to a **Contact record** (each portal user = a Contact in Dataverse).

**Important:** Web Roles by themselves do nothing. They only matter when combined with Table Permissions.

---

### Component 2 — Table Permissions

Table Permissions define **what data** a Web Role can access in Dataverse. This is where the actual access control lives.

**Each Table Permission has:**
1. **Table** — which Dataverse table you're granting access to
2. **Scope** — how much of the table (see below)
3. **Privileges** — Create, Read, Write, Delete, Append, Append To
4. **Web Role** — which Web Role gets this permission

### The 4 Table Permission Scopes

| Scope | What it means | Use case |
|---|---|---|
| **Global** | Access ALL rows in the table | Public data — everyone can read product catalogue |
| **Contact** | Access only rows linked to the user's own Contact record | User can see only their own orders |
| **Account** | Access rows linked to the user's Account (company) | Company employee sees all their company's cases |
| **Parent** | Inherits access from a parent Table Permission | Child records — user who can see an Order can also see its Order Lines |

### How Web Roles + Table Permissions work together

```
Portal user logs in
      ↓
Power Pages looks up their Contact record in Dataverse
      ↓
Checks which Web Roles are assigned to that Contact
      ↓
Finds all Table Permissions linked to those Web Roles
      ↓
Grants the combined access from all matching permissions
```

**If no Table Permission exists for a table → the external user sees NOTHING from that table.**  
This is the default-deny principle. External users have zero access unless you explicitly grant it.

---

## Part 3 — Side-by-Side Comparison

| | Dataverse RBAC | Power Pages RBAC |
|---|---|---|
| **For whom** | Internal users (staff, admins) | External users (customers, partners) |
| **Identity** | Azure AD / Microsoft account | Portal auth provider (AAD, SAML, local) |
| **Role object** | Security Role | Web Role |
| **Data access object** | Privilege + Scope on Security Role | Table Permission |
| **Scope options** | User / BU / Parent:Child BU / Org | Global / Contact / Account / Parent |
| **Column-level security** | Field Security Profile | Not available in Power Pages natively |
| **Default access** | Depends on role assigned | Zero access (default deny) |
| **Where managed** | PPAC / D365 Settings | Power Pages Management App / Maker Studio |
| **User record** | SystemUser table | Contact table |
| **Works independently?** | Yes | No — sits on top of Dataverse security |

---

## Part 4 — The Critical Point: They Stack

When an external user submits a form on Power Pages, TWO security checks happen:

```
External user submits a form
          ↓
Check 1: Power Pages — does user's Web Role have a Table Permission 
         granting Write on this table with the right scope?
          ↓  (passes)
Check 2: Dataverse — does the service account / app user running 
         the portal have the Dataverse Security Role privilege to write?
          ↓  (passes)
Row is written to Dataverse
```

**If either check fails, the operation is blocked.**

In practice: Power Pages uses a Dataverse **application user** (the portal's service identity) which has broad Dataverse permissions. The real filtering for external users comes from Table Permissions. But you should know both layers exist.

---

## Part 5 — Page-Level Security (Web Page Access Control)

Beyond data, Power Pages also controls **which pages** a user can visit.

```
Web Page → Page Access Control Rule → Web Role
```

- You can mark a page as restricted to specific Web Roles
- Unauthenticated users trying to visit that page get redirected to the login page
- This is separate from Table Permissions — it's about URL access, not data access

**Example:**
```
/my-account page → requires "Authenticated Users" Web Role
/admin page      → requires "Portal Administrators" Web Role
/products page   → public (no Web Role restriction)
```

---

## Part 6 — Entity Lists & Entity Forms (How Data Gets Exposed)

Power Pages doesn't expose Dataverse tables directly — they go through:

- **Entity List (now: List)** — renders a view of a table as a grid on the page
- **Basic Form (now: Form)** — renders a single-record create/edit/view form
- **Multistep Form** — wizard-style multi-page form

Each of these has its own settings for which Web Role can access them, on top of the Table Permissions.

---

## Interview Questions You Will Likely Get

---

**Q: How is Power Pages security different from Dataverse security?**

> "They're separate systems. Dataverse security is for internal users with Azure AD identities — it uses Security Roles with privileges and scopes. Power Pages security is for external portal users — it uses Web Roles and Table Permissions. The key difference is the user identity: internal users are SystemUser records, external users are Contact records. Also, Power Pages is default-deny — external users see nothing until you explicitly create a Table Permission granting access."

---

**Q: What is a Web Role?**

> "A Web Role is the Power Pages equivalent of a Dataverse Security Role. It's a label assigned to a Contact record — the external user. By itself it does nothing. It only controls access when you attach Table Permissions to it. Common Web Roles are Authenticated Users for any logged-in user, and then more specific ones like Premium Members or Event Organizers."

---

**Q: What is a Table Permission and what are its scopes?**

> "A Table Permission grants a Web Role access to a Dataverse table on the portal. It has four scopes: Global means anyone with that Web Role sees all rows — used for public reference data. Contact scope means the user only sees rows linked to their own Contact record — used for personal data like their own orders. Account scope means they see rows linked to their company. Parent scope chains access from a parent table down to a child table — so if you can see an Order, you can also see its Order Lines through a parent Table Permission."

---

**Q: A logged-in portal user can't see their data. What do you check?**

> "First, check if they have the correct Web Role assigned on their Contact record. Second, check if there's a Table Permission for that table linked to that Web Role. Third, check the scope — if it's Contact scope, verify the data rows are actually linked to their Contact record via a lookup. If any of these are missing, they'll see nothing — Power Pages is default-deny."

---

**Q: Can you restrict which pages a user can access?**

> "Yes, through Page Access Control Rules. You link a Web Page to a Web Role — only users with that Web Role can visit that page. Users without it get redirected to login. This is separate from Table Permissions — page rules control URL access, Table Permissions control data access."

---

## Quick Cheat Sheet — Stick This on a Note

```
POWER PAGES RBAC
  Portal user = Contact record (not SystemUser)
  Web Role = label on the Contact
  Table Permission = grants data access for that Web Role
  
TABLE PERMISSION SCOPES
  Global  = all rows (public data)
  Contact = only my rows (personal data)
  Account = my company's rows
  Parent  = inherit from parent table

DEFAULT RULE
  No Table Permission = no data visible (default deny)

BOTH CHECKS RUN
  Power Pages Table Permission check
  +
  Dataverse Security Role check
  Both must pass
```

---

*Last updated: May 8, 2026 — Shadmaan Hussain — Interview tomorrow*
