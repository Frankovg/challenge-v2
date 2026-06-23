# E2E — end-to-end test script (Playwright CLI + agent)

> **Reproducible** script of the packing flow, designed to run with an AI agent driving Playwright (CLI / MCP browser). It's not a Jest suite: it covers the **full happy path** and the edge cases that a util unit test doesn't reach on its own (state orchestration + real UI).
>
> The unit/integration pyramid lives in `apps/frontend/src/**/*.test.*` (business logic, reducer, context). This is the layer on top: **does the whole flow work against the real DOM?**

---

## Setup

```bash
# from the repo root — starts API (:4000) and frontend (:3000) together
yarn install
yarn dev
```

- **App**: `http://localhost:3000`
- **GraphQL API** (mock): `http://localhost:4000/graphql`
- Wait until both respond before starting. The frontend does a server-side fetch of the inventory on load; if the API isn't up, the home page returns `notFound()`.
- Run in `NODE_ENV=development` (the default for `yarn dev`) so the **RESET DEMO** button shows up, which lets you repeat the flow without reloading.

## Inventory data (fixed mock)

| id | sku | location | quantity |
| --- | --- | --- | --- |
| 1 | `green-ball` | `a1` | 5 |
| 2 | `red-ball` | `a2` | 6 |
| 3 | `umbrella` | `a3` | 3 |
| 99 | `green-ball` | `a4` | 2 |

> **Watch out for `green-ball`**: it lives in **two locations** (`a1` and `a4`, 7 units total). It's the multi-location case — the barcode scan resolves which bin to use with `pickAvailableLocation`. Useful for the barcode scenario below.

Total: **4 lines / 16 units**.

---

## Selection convention (important for the agent)

The UI **has no `data-testid`**. Select by role and accessible text (it's robust and tests what the user actually sees):

| Element | How to locate it |
| --- | --- |
| Left column | heading **"Unpacked products"** + subtitle "N product(s) remaining" |
| Right column | heading **"Packed Products"** + subtitle "N package(s) created" |
| Pack 1 unit of a line | **`+1`** button inside that line's card |
| Pack the whole line | **`All`** button inside the card |
| Barcode input | placeholder **"Scan barcode or enter SKU"** (or `#barcode`) |
| Search SKU | **"Search"** button |
| Add package | button with `aria-label="Add package"` |
| Delete package | button with `aria-label="Delete package"` |
| Ship | **"Ship Package(s)"** button (green; starts **disabled**) |
| Ship modal | title **"Ship All Package(s)"**, confirm with **"Ship package(s)"**, cancel with **"Cancel"** |
| Delete modal | title **"Delete Package with Items?"**, confirm with **"Delete Package"** |
| Empty package | text **"Package is Empty"** |
| Reset (dev only) | **"RESET DEMO"** button |

**Toasts** auto-dismiss — assert on them as soon as they appear, not after a long wait.

---

## Scenario 1 — Full happy path (the main one) ✅

**Goal**: pack the entire inventory and ship it; verify the state is cleared.

1. **Load** `http://localhost:3000`.
   - ✅ Left shows **"4 product(s) remaining"** with the 4 cards (`green-ball` ×2, `red-ball`, `umbrella`).
   - ✅ Right shows **"1 package(s) created"** and the **"Package is Empty"** state.
   - ✅ The **"Ship Package(s)"** button is **disabled** (there's unpacked stock).

2. **Pack the first whole line**: click **`All`** on `green-ball` (a1, qty 5).
   - ✅ Toast **"Product packed"** ("5 product(s) packed successfully.").
   - ✅ That card disappears from the left; the subtitle drops to **"3 product(s) remaining"**.
   - ✅ The line shows up in the package on the right.

3. **Pack the three remaining lines** with **`All`** (`red-ball`, `umbrella`, and the second `green-ball` from a4).
   - ✅ After each one, the "remaining" counter drops.
   - ✅ When the last one is packed, the left shows **"0 product(s) remaining"** (empty list).

4. **Verify shipping got enabled**.
   - ✅ The **"Ship Package(s)"** button is now **enabled** (no loose stock left and the package has items).

5. Click **"Ship Package(s)"**.
   - ✅ The modal opens with title **"Ship All Package(s)"** and the text "All items have been packed…".

6. Click **"Ship package(s)"** (confirm inside the modal).
   - ✅ The loading spinner appears on the button while the mutation resolves.
   - ✅ Toast **"Shipment created successfully"** ("N package(s) ready to ship.").
   - ✅ The modal closes.
   - ✅ The package returns to **"Package is Empty"** (the packages were cleared → `CLEAR_PACKAGES`).

7. ✅ **No console errors** throughout the run.

> This scenario is the one **no** unit test covers: it exercises the `readyForShipping` guard → Apollo mutation → toast → reducer reset, all against the UI.

---

## Scenario 2 — Guard: can't ship with pending stock

1. Load the app (or **RESET DEMO**).
2. Pack **only one** line (e.g. `umbrella` with `All`).
   - ✅ Lines remain on the left ("remaining" > 0).
   - ✅ **"Ship Package(s)"** stays **disabled**.
3. (Variant) Create a second package with **"Add package"** and leave it empty.
   - ✅ Even if the inventory is at 0, **"Ship Package(s)"** stays disabled while there's an empty package (the "no empty package" invariant).

---

## Scenario 3 — Unpacking restores the stock

1. With at least one line packed, in the packed item's card (right) lower the quantity to **0**.
   - ✅ Toast **"Product unpacked"**.
   - ✅ The line shows up again in the left column with its quantity restored.
   - ✅ The "remaining" counter goes up.

---

## Scenario 4 — Deleting a package with items asks for confirmation and restores

1. Pack something into the active package.
2. Click **"Delete package"** (`aria-label`).
   - ✅ The **"Delete Package with Items?"** modal opens.
3. Confirm with **"Delete Package"**.
   - ✅ The package's items go back to the unpacked list.
   - ✅ If it was the only package, it doesn't end at zero: it resets to an empty package (the "always ≥1 package" invariant).

---

## Scenario 5 — Barcode scan (server-side lookup)

| Case | Input | Expected result |
| --- | --- | --- |
| Valid SKU with stock | `green-ball` + "Search" | packs 1 unit; toast **"Product packed"**; input clears. If a1 runs out, the next units come from a4 (multi-location). |
| Nonexistent SKU | `blue-ball` + "Search" | toast **"Product not found"** (the lookup returns empty). |
| Invalid format | `red ball!` (space/symbol) | inline error **"Invalid barcode format"** under the input; the lookup is not triggered. |
| Out of stock | scan `green-ball` more than 7 times | toast **"Out of stock"** ("No units of green-ball available to pack."). |
| Double submit | press "Search"/Enter twice very fast | it must **not** over-pack (the `pending` flag blocks the second submit — race condition already covered). |

---

## Notes for the agent

- If a text selector fails, try by role (`getByRole('button', { name: '...' })`) before falling back to CSS.
- Between scenarios, use **RESET DEMO** to go back to the initial state without reloading (faster and doesn't re-fetch).
- The backend is a **no-op mock**: `pack_items` echoes the input back as the response, it doesn't persist. Don't expect the inventory to "drop" on the server side between shipments — the client owns the state after the initial fetch.
- Assert **0 console errors** as a cross-cutting criterion for the whole run.
