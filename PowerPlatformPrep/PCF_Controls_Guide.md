# PCF Controls — Complete Interview Guide
> Shadmaan Hussain | Simple & Fast | Interview Tomorrow

---

## What is PCF? (Say this in 30 seconds)

**PCF = PowerApps Component Framework**

It lets you build **custom UI components** using standard web technologies (TypeScript, React, HTML, CSS) and plug them directly into:
- Model-Driven Apps (forms and views)
- Canvas Apps
- Power Pages

**Why it matters:** When the out-of-the-box controls (dropdowns, text fields, grids) are not enough, you build a PCF control. It runs inside the Power Platform sandbox but you write it like a regular web component.

---

## Two Types of PCF Controls

| Type | What it does | Where it goes |
|---|---|---|
| **Field PCF** | Replaces a single field on a form | Bound to one column value |
| **Dataset PCF** | Replaces a view/grid | Bound to a full dataset (rows + columns) |
| **Virtual PCF** | React-based, no direct DOM | Better performance in Canvas Apps |

**The quick rule:**
- Replacing a text box or date picker → **Field PCF**
- Replacing a grid or list → **Dataset PCF**
- Building for Canvas App with React → **Virtual PCF**

---

## The 4 Lifecycle Methods — The Most Important Part

Think of these like **4 stages of a component's life**: born → updated → asked for value → dies.

---

### 1. `init()` — Birth

```
When: Fires ONCE when the control loads for the first time
```

**What you do here:**
- Set up the DOM (create your HTML elements)
- Instantiate MSAL / any auth client
- Subscribe to external events
- Do your heavy setup work

**Think of it as:** The constructor. Do all your expensive one-time setup here.

```typescript
public init(
  context: ComponentFramework.Context<IInputs>,
  notifyOutputChanged: () => void,
  state: ComponentFramework.Dictionary,
  container: HTMLDivElement
): void {
  // Create your UI
  this._container = container;
  this._button = document.createElement("button");
  container.appendChild(this._button);
}
```

---

### 2. `updateView()` — Every Update

```
When: Fires every time a bound property changes
```

**What you do here:**
- Re-render your UI with the new data
- Update labels, values, styles
- DO NOT do heavy setup here (that's init's job)

**Think of it as:** React's `render()`. It gets called repeatedly — keep it light.

```typescript
public updateView(context: ComponentFramework.Context<IInputs>): void {
  // Get the new value from the bound property
  const newValue = context.parameters.myField.raw;
  this._button.innerText = newValue ?? "Click me";
}
```

---

### 3. `getOutputs()` — Give Back the Value

```
When: Called by the framework when it wants your OUTPUT values
```

**What you do here:**
- Return the current values of your output properties
- This is how your PCF control sends data BACK to the form/app

**Think of it as:** The return statement. The framework asks "what's your value?" — you answer here.

```typescript
public getOutputs(): IOutputs {
  return {
    myField: this._currentValue
  };
}
```

**When does it get called?**
You call `notifyOutputChanged()` (from `init`) → framework calls `getOutputs()` → your value flows back to the bound column.

**The flow:**
```
User types something
    ↓
You call notifyOutputChanged()
    ↓
Framework calls getOutputs()
    ↓
Value saved to the form/Dataverse column
```

---

### 4. `destroy()` — Death / Cleanup

```
When: Fires when the control is removed from the page
```

**What you do here:**
- Clear intervals (`clearInterval`)
- Detach event listeners
- Cancel pending API calls
- Prevent memory leaks

**Think of it as:** The destructor. Clean up everything you set up in `init`.

```typescript
public destroy(): void {
  // Remove event listeners
  this._button.removeEventListener("click", this._clickHandler);
}
```

---

## Lifecycle Summary Table — Memorise This

| Method | When it fires | Your job | Common mistake |
|---|---|---|---|
| `init()` | Once, on load | Setup DOM, auth, events | Doing setup in updateView |
| `updateView()` | Every property change | Re-render with new data | Heavy work here = slow control |
| `getOutputs()` | When framework asks | Return output values | Forgetting to call notifyOutputChanged |
| `destroy()` | On removal | Clear intervals, listeners | Skipping this = memory leaks |

---

## How Data Flows — The Full Picture

```
Dataverse Column
      ↓
  updateView()     ← framework pushes value IN
      ↓
  [Your UI]
      ↓
  notifyOutputChanged()   ← you tell framework "I changed"
      ↓
  getOutputs()     ← framework pulls value OUT
      ↓
Dataverse Column
```

---

## PCF Project Structure

When you run `pac pcf init`, you get:

```
MyControl/
  index.ts          ← Your control class (4 lifecycle methods live here)
  ControlManifest.Input.xml   ← Declares properties, types, bound columns
  generated/
    ManifestTypes.d.ts  ← Auto-generated TypeScript interfaces
```

**The Manifest is important** — it declares:
- What inputs your control takes (bound properties)
- What outputs it returns
- The display name and description

---

## The Manifest — Quick Example

```xml
<property name="myField"
  display-name-key="My Field"
  of-type="SingleLine.Text"
  usage="bound"          ← "bound" = two-way, "input" = read-only
  required="true" />
```

**`usage` values:**
- `bound` → two-way binding (control reads AND writes to the column)
- `input` → read-only (control reads only)

---

## Build & Deploy Commands

```bash
# Initialise a new PCF project
pac pcf init --namespace MyNamespace --name MyControl --template field

# Install dependencies
npm install

# Start local test harness (hot reload)
npm start watch

# Build for production
npm run build

# Create a solution to deploy
pac solution init --publisher-name MyPublisher --publisher-prefix mypfx
pac solution add-reference --path ../MyControl
msbuild /t:restore
msbuild

# Deploy to environment
pac auth create --url https://yourorg.crm.dynamics.com
pac pcf push   ← pushes directly to environment (dev only)
```

---

## Your Copilot Studio PCF — The MSAL Auth Story

This is your biggest differentiator. Tell this story if asked about PCF.

**The flow:**
```
init()
  ↓
Instantiate PublicClientApplication (MSAL) with client config
  ↓
acquireTokenSilent()   ← checks token cache first (no popup)
  ↓
Cache miss → acquireTokenPopup() / loginRedirect()
  ↓
Token returned → attach as Bearer header
  ↓
DirectLine / Bot Framework channel initialised
  ↓
Copilot Studio conversation starts
  ↓
Token expiry → catch InteractionRequiredAuthError → re-trigger popup
```

**Why MSAL instead of built-in Copilot auth?**
> "The built-in auth modes didn't support the custom app integration we needed. MSAL gave full control over token acquisition and allowed passing the user's identity to knowledge sources."

---

## Your 5 Shipped PCF Controls — Know Each in One Line

| Control | What it does |
|---|---|
| **Carousel** | Showcased on Power Pages community hub (community.microsoftbusinessapps.com) |
| **Text-to-Speech** | Reads field content aloud using browser TTS API |
| **RTO Calendar** | Custom calendar view for Return-to-Office scheduling |
| **PDF Viewer** | Renders PDF blobs inline on a form — no download needed |
| **Copilot Studio Agent** | MSAL + Copilot Client SDK embedded in Canvas App |

---

## PCF vs. Other Customisation Options — When to Use What

| Need | Use |
|---|---|
| Custom field UI (colour picker, rating stars) | **Field PCF** |
| Custom grid / list with complex interactions | **Dataset PCF** |
| Embed third-party widget (chart, map, chatbot) | **PCF** |
| Simple business logic, no UI | **Plugin or Business Rule** |
| Reusable UI across Canvas Apps | **PCF Virtual** |
| Simple form layout changes | **Power Apps form editor** |

---

## Interview Questions You Will Likely Get

**Q: What are the 4 lifecycle methods?**
> "init fires once on load — that's where I set up the DOM and auth. updateView fires on every property change — I re-render there. getOutputs is called by the framework when it wants my output values — I return the current state. destroy fires when the control is removed — I clean up intervals and listeners to prevent memory leaks."

---

**Q: How does two-way binding work in PCF?**
> "The framework pushes the bound column value into my control via updateView. When the user changes something in my control, I call notifyOutputChanged — that signals the framework to call getOutputs, which is where I return my updated value. That value then flows back to the Dataverse column."

---

**Q: What's the difference between a Field PCF and a Dataset PCF?**
> "A Field PCF is bound to a single column — it replaces the standard field on a form. A Dataset PCF is bound to a view or dataset — it replaces a grid. The manifest and context object look different. Dataset controls also get paging APIs like loadNextPage."

---

**Q: Why do you need destroy()?**
> "If you set up event listeners or intervals in init and never clean them up, they keep running even after the control is removed. That causes memory leaks. Destroy is the guaranteed cleanup hook — everything set up in init should be torn down in destroy."

---

**Q: What is the test harness?**
> "npm start watch launches a local test harness in the browser. You can see your control render, change input values, and see how it responds — without deploying to an environment. It's the fastest way to develop PCF controls."

---

## Quick-Fire Facts for the Interview

- PCF controls run in an **iframe sandbox** — no direct DOM access outside the control container
- You can use **React, Angular, or plain TypeScript** — the framework doesn't care
- **Virtual controls** are React-based and the framework manages rendering — you don't touch the DOM directly
- PCF controls are **packaged inside a Solution** for deployment
- You can use **npm packages** inside PCF — webpack bundles everything
- The **context object** in every method gives you: bound values, formatting utilities, navigation API, device API, web API

---

## The One-Liner Definition

> "PCF is the framework that lets you replace any field or grid in Power Platform with a custom TypeScript component. You implement 4 lifecycle methods — init, updateView, getOutputs, destroy — and the framework handles when to call them."

---

*Last updated: May 8, 2026 — Shadmaan Hussain — Interview tomorrow*
