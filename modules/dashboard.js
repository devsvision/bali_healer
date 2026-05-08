import { bookings, services } from "../js/data.js";

export function render() {
  return `
    <section class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Role Dashboard Preview</p>
        <h2 class="mt-3 text-4xl font-semibold text-white">Dashboard preview for admins, vendors, and users.</h2>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-4">
        ${[
          ["GMV", "Rp128.4M"],
          ["Active vendors", "74"],
          ["Booking", "318"],
          ["Rating", "4.8"]
        ].map(([label, value]) => `
          <article class="rounded-lg border border-gold/15 bg-panel p-5">
            <p class="text-sm text-mist/55">${label}</p>
            <p class="mt-3 text-3xl font-semibold text-goldSoft">${value}</p>
          </article>
        `).join("")}
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="rounded-lg border border-gold/15 bg-panel p-5">
          <h3 class="text-xl font-semibold text-white">Latest bookings</h3>
          <div class="mt-4 overflow-x-auto">
            <table class="w-full min-w-[680px] text-left text-sm">
              <thead class="border-b border-gold/15 text-xs uppercase tracking-wide text-goldSoft">
                <tr><th class="py-3">Code</th><th>Service</th><th>Client</th><th>Channel</th><th>Status</th></tr>
              </thead>
              <tbody class="divide-y divide-gold/10 text-mist/70">
                ${bookings.map((booking) => `
                  <tr><td class="py-4 text-white">${booking.code}</td><td>${booking.service}</td><td>${booking.client}</td><td>${booking.channel}</td><td class="text-goldSoft">${booking.status}</td></tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-lg border border-gold/15 bg-panel p-5">
          <h3 class="text-xl font-semibold text-white">Services to manage</h3>
          <div class="mt-4 space-y-3">
            ${services.slice(0, 3).map((service) => `
              <article class="rounded-lg border border-gold/10 bg-black/35 p-4">
                <p class="font-semibold text-white">${service.name}</p>
                <p class="mt-1 text-sm text-mist/55">${service.mode} - ${service.vendor}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}
