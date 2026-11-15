import { expect, type Page, test } from "@playwright/test";

// These tests use the real public Rentak API (NEXT_PUBLIC_APP_API_URL),
// so they also fail if the API is down.

async function firstUnitPath(page: Page) {
  await page.goto("/units");
  const link = page.locator('a[href^="/units/"]').first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  expect(href).toMatch(/^\/units\/.+-\d+$/);
  return href as string;
}

test("home page loads", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("link", { name: "Login/Signup" })).toBeVisible();
});

test("Arabic home page loads right-to-left", async ({ page }) => {
  const res = await page.goto("/ar");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("units list shows listings and their pictures load", async ({ page }) => {
  await page.goto("/units");
  await expect(page.getByText(/Listings? found/i)).toBeVisible();
  const cards = page.locator('a[href^="/units/"]');
  await expect(cards.first()).toBeVisible();

  // Scroll through the list so lazy images start loading.
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(300);
  }

  const cardImages = page.locator('a[href^="/units/"] img');
  expect(await cardImages.count()).toBeGreaterThan(0);
  // Every card picture must decode: a broken or empty image has naturalWidth 0.
  await expect
    .poll(
      () =>
        cardImages.evaluateAll(
          (imgs) =>
            (imgs as Array<HTMLImageElement>).filter(
              (img) => !img.complete || img.naturalWidth === 0,
            ).length,
        ),
      { timeout: 60_000 },
    )
    .toBe(0);
});

test("unit details page opens", async ({ page }) => {
  const path = await firstUnitPath(page);
  const res = await page.goto(path);
  expect(res?.status()).toBe(200);
  // The page has no <h1> today, so check the unit title and breadcrumb.
  await expect(page).toHaveTitle(/^Rent in .+\| Rentak$/);
  await expect(page.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
});

test("Arabic unit details page opens", async ({ page }) => {
  const path = await firstUnitPath(page);
  const res = await page.goto(`/ar${path}`);
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
});

// Known bugs, recorded on the "Rentak WebFront Code Review" Confluence page.
// Switch each one from test.fixme to test when its fix lands.

test.fixme(
  "Arabic unit link with an outdated name redirects to the right page",
  async ({ page }) => {
    // Fails while [locale]/layout.tsx exports `dynamicParams = false`: Arabic
    // unit and blog pages not built at deploy time return 404.
    const path = await firstUnitPath(page);
    const id = path.split("-").pop();
    await page.goto(`/ar/units/old-name-${id}`);
    await expect(page).toHaveURL(new RegExp(`/ar${path}$`));
  },
);

test.fixme("a malformed unit link returns 404, not 500", async ({ page }) => {
  const res = await page.goto("/units/not-a-unit");
  expect(res?.status()).toBe(404);
});

test.fixme(
  "Arabic dashboard sends logged-out visitors to the Arabic login page",
  async ({ page }) => {
    await page.goto("/ar/dashboard");
    await expect(page).toHaveURL(/\/ar\/login-register$/);
  },
);
