import { healingCategories, services } from "../js/data.js";

export function render({ selectedCategory = "" } = {}) {
  const visibleServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;
  const heading = selectedCategory ? `${selectedCategory} services` : "Find services by healing mode.";

  return `
    <section class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div class="rounded-lg border border-gold/20 bg-panel p-5 md:p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Marketplace Service</p>
        <h2 class="mt-3 text-4xl font-semibold text-white">${heading}</h2>
        ${selectedCategory ? `<p class="mt-3 max-w-2xl text-sm leading-6 text-mist/60">${categoryDescription(selectedCategory)} Showing ${visibleServices.length} matching service${visibleServices.length === 1 ? "" : "s"}.</p>` : ""}
        <div class="mt-6 grid gap-3 md:grid-cols-4">
          <input class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-mist/35 focus:border-gold" placeholder="Search service or healer" />
          <select data-service-category-select class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold">
            <option value="">All categories</option>
            ${healingCategories.map((category) => `<option value="${category.name}" ${category.name === selectedCategory ? "selected" : ""}>${category.name}</option>`).join("")}
          </select>
          <select class="rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold"><option>Bali area</option><option>Ubud</option><option>Canggu</option><option>Seminyak</option><option>Nusa Dua</option></select>
          <button data-category-filter="" class="rounded-lg bg-gold px-5 py-3 text-sm font-bold text-black">Show All Services</button>
        </div>
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        ${visibleServices.map((service) => `
          <article class="overflow-hidden rounded-lg border border-gold/15 bg-panel">
            <img src="${service.image}" alt="${service.name}" class="h-56 w-full object-cover opacity-85" />
            <div class="p-5">
              <div class="flex items-center justify-between text-xs">
                <span class="rounded-full bg-gold/15 px-3 py-1 font-semibold text-goldSoft">${service.mode}</span>
                <span class="text-mist/55">${service.area}</span>
              </div>
              <h3 class="mt-4 text-xl font-semibold text-white">${service.name}</h3>
              <p class="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-goldSoft/80">${service.category}</p>
              <p class="mt-2 text-sm text-mist/60">${service.vendor}</p>
              <p class="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-mist/40">${service.providerType}</p>
              <div class="mt-5 flex items-center justify-between">
                <p data-price-idr="${service.price}" class="font-semibold text-goldSoft">${service.price}</p>
                <button class="rounded-lg border border-gold/35 px-4 py-2 text-sm font-bold text-goldSoft">Booking</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function categoryDescription(categoryName) {
  return healingCategories.find((category) => category.name === categoryName)?.description || "";
}
