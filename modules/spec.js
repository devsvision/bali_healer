import { featureGroups } from "../js/data.js";

export function render() {
  return `
    <section class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Application Overview</p>
      <h2 class="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">Core features for a multi-vendor healing service marketplace.</h2>

      <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        ${featureGroups.map((group) => `
          <article class="rounded-lg border border-gold/15 bg-panel p-5">
            <h3 class="text-xl font-semibold text-white">${group.title}</h3>
            <ul class="mt-4 space-y-3 text-sm text-mist/65">
              ${group.items.map((item) => `<li class="flex gap-3"><span class="mt-1 h-2 w-2 rounded-full bg-gold"></span><span>${item}</span></li>`).join("")}
            </ul>
          </article>
        `).join("")}
      </div>

      <div class="mt-8 rounded-lg border border-gold/20 bg-black/45 p-6">
        <h3 class="text-2xl font-semibold text-white">Main booking flow</h3>
        <div class="mt-5 grid gap-3 md:grid-cols-4">
          ${["Choose a service and mode", "Fill schedule and intake form", "Pay and confirm", "Complete the session and review"].map((step, index) => `
            <article class="rounded-lg bg-panel p-4">
              <p class="text-2xl font-semibold text-goldSoft">0${index + 1}</p>
              <p class="mt-2 text-sm text-mist/70">${step}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
