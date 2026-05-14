import { vendors } from "../js/data.js";

export function render() {
  return `
    <section class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Healer / Partner</p>
          <h2 class="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">Build your healing storefront on BALI HEALER.</h2>
          <p class="mt-5 leading-8 text-mist/65">Profiles can be registered as healers or partners managing wellness studios, retreats, and service packages.</p>
          <button class="mt-7 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-black">Apply for Verification</button>
        </div>
        <div class="rounded-lg border border-gold/20 bg-panel p-5">
          <h3 class="text-xl font-semibold text-white">Healer / partner onboarding form</h3>
          <div class="mt-5 grid gap-4">
            <input class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none" placeholder="Healer / partner name" />
            <select class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none"><option>Healer</option><option>Partner</option></select>
            <input class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none" placeholder="Service specialization" />
            <textarea class="min-h-28 rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none" placeholder="Share your experience and certifications"></textarea>
          </div>
        </div>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        ${vendors.map((vendor) => `
          <article class="rounded-lg border border-gold/15 bg-panel p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-goldSoft">${vendor.verified}</p>
            <h3 class="mt-3 text-xl font-semibold text-white">${vendor.name}</h3>
            <p class="mt-2 text-sm text-mist/55">${vendor.type}</p>
            <p class="mt-4 text-sm leading-6 text-mist/65">${vendor.focus}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
