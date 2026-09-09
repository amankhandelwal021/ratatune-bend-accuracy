import { test, expect } from "@playwright/test";

test("mobile preserves three sections and reachable, clearly labelled microphone proof", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("main > section")).toHaveCount(3);
  await expect(page.locator("h1")).toHaveText(
    "Finally hear whether your bends are actually in tune.",
  );
  const mic = await page.locator("#mic-button").boundingBox();
  expect(mic.y + mic.height).toBeLessThan(844);
  expect(
    await page
      .locator(".prototype-badge")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(11);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("#demo-settings summary").click();
  await page.locator("#harp-key").selectOption("-3");
  await expect(page.locator("#target-note")).toHaveText("F♯4");
  await page.locator("#bend-target").selectOption("1");
  await expect(page.locator("#target-note")).toHaveText("G4");
  await expect(page.locator("#cents-value")).toHaveText("—");
});

test("every CTA opens the React form; validation, reset, Escape and focus restore work", async ({
  page,
}) => {
  await page.goto("/");
  const actions = page.locator("[data-access]");
  for (let i = 0; i < (await actions.count()); i++) {
    await actions.nth(i).click();
    await expect(page.locator("#email")).toBeFocused();
    await page.locator("#access-form button").click();
    await expect(page.locator("#email-error")).toContainText(
      "Enter a valid email",
    );
    await page.locator("#email").fill("player@example.com");
    await page.locator("#usual-key").selectOption("C");
    await page.locator("#access-form button").click();
    await expect(page.locator("#success-view")).toBeVisible();
    await expect(page.locator("#done-button")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("#access-dialog")).not.toBeVisible();
    await expect(actions.nth(i)).toBeFocused();
  }
  await actions.first().click();
  await expect(page.locator("#email")).toHaveValue("");
  await expect(page.locator("#usual-key")).toHaveValue("");
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
});

test("React capture handles live cents, stop, form opening and late permission cancellation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = (window.testAudio = {
      frequency: 440,
      silent: false,
      tracks: [],
      contexts: [],
      pending: [],
      delay: false,
    });
    window.AudioContext = class {
      state = "running";
      sampleRate = 48000;
      constructor() {
        state.contexts.push(this);
      }
      async close() {
        this.state = "closed";
      }
      createMediaStreamSource() {
        return { connect() {}, disconnect() {} };
      }
      createAnalyser() {
        return {
          disconnect() {},
          getFloatTimeDomainData(data) {
            for (let i = 0; i < data.length; i++)
              data[i] = state.silent
                ? 0
                : 0.35 * Math.sin((2 * Math.PI * state.frequency * i) / 48000);
          },
        };
      }
    };
    Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
      configurable: true,
      value: () => {
        const track = {
          stopped: false,
          stop() {
            this.stopped = true;
          },
        };
        state.tracks.push(track);
        const stream = {
          getTracks: () => [track],
          getAudioTracks: () => [track],
        };
        return state.delay
          ? new Promise((resolve) => state.pending.push(() => resolve(stream)))
          : Promise.resolve(stream);
      },
    });
  });
  await page.goto("/");
  await page.locator("#mic-button").click();
  for (const [cents, expected] of [
    [-28, "−28"],
    [28, "+28"],
    [0, "0"],
  ]) {
    await page.evaluate((cents) => {
      window.testAudio.frequency = 440 * 2 ** (cents / 1200);
    }, cents);
    await expect(page.locator("#cents-value")).toHaveText(expected);
  }
  await page.evaluate(() => {
    window.testAudio.silent = true;
  });
  await expect(page.locator("#cents-value")).toHaveText("—");
  await page.locator("#mic-button").click();
  expect(
    await page.evaluate(() => window.testAudio.tracks.every((t) => t.stopped)),
  ).toBe(true);
  await page.locator("#mic-button").click();
  await page.locator("[data-access]").first().click();
  expect(
    await page.evaluate(() => window.testAudio.tracks.every((t) => t.stopped)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await page.evaluate(() => {
    window.testAudio.delay = true;
  });
  await page.locator("#mic-button").click();
  await expect(page.locator("#mic-label")).toHaveText("Cancel mic request");
  await page.locator("#mic-button").click();
  await page.evaluate(() => window.testAudio.pending.shift()());
  await expect
    .poll(() =>
      page.evaluate(() => window.testAudio.tracks.every((t) => t.stopped)),
    )
    .toBe(true);
  expect(
    await page.evaluate(() =>
      window.testAudio.contexts.every((c) => c.state === "closed"),
    ),
  ).toBe(true);
});

test("scroll reverses the same instrument and reduced motion supports keyboard inspection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 844 });
  await page.goto("/");
  const pose = () => page.locator("#harmonica-stage").getAttribute("style");
  await page.waitForTimeout(450);
  const start = await pose();
  await page.evaluate(() =>
    scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  );
  await expect(page.locator("#harmonica-stage")).toHaveAttribute(
    "data-story",
    "return",
  );
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(pose).toBe(start);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => scrollTo({ top: 850, behavior: "instant" }));
  const touch = page.locator("#harmonica-touch");
  await expect(touch).toHaveAttribute("tabindex", "0");
  await touch.focus();
  await page.keyboard.press("Enter");
  await expect(touch).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(touch).toHaveAttribute("aria-pressed", "false");
  expect(
    await page
      .locator(".harmonica-object")
      .evaluate((el) => el.style.getPropertyValue("--harp-camera-scale")),
  ).toBe("1.0000");
});
