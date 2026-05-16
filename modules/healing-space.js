import { services } from "../js/data.js";
import { availabilityDays as sharedAvailabilityDays, bookingModal as sharedBookingModal, initBookingModal, packageItems as sharedPackageItems } from "./booking-system.js";
import { serviceModeBadge, serviceProfile } from "./home.js";

const galleryImages = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
];

const certifications = [
  "Verified Bali Healer marketplace profile",
  "Client intake and session safety training",
  "Traditional practice lineage or practitioner credential review",
  "Aftercare and guest communication standards"
];

const reviews = [
  {
    name: "Amelia Hart",
    text: "The session felt grounded, respectful, and deeply personal. I left with clear aftercare and a calmer body."
  },
  {
    name: "Maya Putri",
    text: "Beautiful guidance from start to finish. The healer explained the ritual without making it feel rushed."
  },
  {
    name: "Daniel Carter",
    text: "Easy booking, gentle energy, and thoughtful follow up. The online session still felt warm and present."
  }
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Website", href: "https://balihealer.com/" }
];

function findService(selectedService) {
  const decodedService = decodeURIComponent(selectedService || "");
  return services.find((service) => service.name === decodedService) || services[0];
}

function methodItems(service) {
  return [
    `${service.category} intention setting`,
    `${service.mode} preparation and guest intake`,
    "Breath, presence, and energetic grounding",
    "Integration notes for the days after session"
  ];
}

function packageItems(service) {
  const basePrice = Number(String(service.price).replace(/[^\d]/g, "")) || 500000;
  const premiumPrice = basePrice + 350000;
  const format = (value) => `Rp${value.toLocaleString("id-ID")}`;

  return [
    {
      name: "Essential Session",
      price: service.price,
      detail: `${service.duration} ${service.mode.toLowerCase()} session with guided preparation and aftercare.`
    },
    {
      name: "Deep Healing Session",
      price: format(premiumPrice),
      detail: "Extended intention setting, deeper practice time, and personal integration guidance."
    },
    {
      name: "Private Group Request",
      price: "Custom",
      detail: "For couples, retreats, teams, villas, or ceremonial group sessions."
    }
  ];
}

function availabilityDays() {
  const today = new Date();
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index + 1);
    const available = ![0, 6].includes(date.getDay()) || index % 4 === 0;
    return {
      iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      index,
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      label: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      available
    };
  });
}

function timeSlots(dayIndex) {
  return [
    { time: "09:00", available: dayIndex % 3 !== 1 },
    { time: "10:30", available: dayIndex % 4 !== 2 },
    { time: "13:00", available: true },
    { time: "15:30", available: dayIndex % 5 !== 0 },
    { time: "17:00", available: dayIndex % 2 === 0 }
  ];
}

function bookingModal(service, profile, packages, days) {
  return `
    <div data-healing-booking-modal class="fixed inset-0 z-[90] hidden items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <section class="grid h-[min(92vh,720px)] w-full max-w-6xl overflow-hidden rounded-xl border border-gold/20 bg-[#f4f6fb] text-[#2b3038] shadow-[0_28px_100px_rgba(0,0,0,0.55)] md:grid-cols-[230px_minmax(0,1fr)]">
        <aside class="hidden border-r border-black/10 bg-[#262c32] p-8 text-white md:block">
          <div class="space-y-8" data-booking-steps>
            ${["Service", "Date & Time", "Information", "Confirmation"].map((label, index) => `
              <div data-booking-step-indicator="${index}" class="flex items-center gap-3 text-sm font-semibold">
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/18 text-xs">${index + 1}</span>
                <span>${label}</span>
              </div>
            `).join("")}
          </div>
        </aside>

        <div class="flex min-h-0 flex-col">
          <header class="flex items-center justify-between border-b border-black/10 bg-white px-6 py-5">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#6871f1]">Healing booking</p>
              <h2 data-booking-title class="mt-1 text-xl font-bold text-[#2b3038]">Select service</h2>
            </div>
            <button type="button" data-close-healing-booking class="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-[#59616d] transition hover:bg-black/5" aria-label="Close booking">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </header>

          <div class="min-h-0 flex-1 overflow-y-auto bg-[#f4f6fb] px-6 py-7">
            <section data-booking-panel="0">
              <h3 class="text-base font-bold text-[#6871f1]">${service.category}</h3>
              <div class="mt-5 space-y-3">
                ${packages.map((item, index) => `
                  <button type="button" data-package-option="${index}" class="grid w-full grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-4 rounded-sm border border-transparent bg-white p-5 text-left shadow-sm transition hover:border-[#6871f1]/35">
                    <img src="${index === 0 ? profile.image : service.image}" alt="" class="h-12 w-12 rounded-full object-cover" />
                    <span class="min-w-0">
                      <span class="block text-base font-bold text-[#2b3038]">${item.name}</span>
                      <span class="mt-1 inline-flex rounded-full bg-[#ffd66e] px-3 py-1 text-xs font-bold text-[#7b5a00]">${service.duration}</span>
                      <span class="mt-2 block text-xs leading-5 text-[#747d89]">${item.detail}</span>
                    </span>
                    <span class="text-2xl font-light text-[#46cf67]">${item.price}</span>
                  </button>
                `).join("")}
              </div>
            </section>

            <section data-booking-panel="1" class="hidden">
              <h3 class="text-base font-bold text-[#6871f1]">Available dates</h3>
              <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                ${days.map((day) => `
                  <button type="button" data-booking-date="${day.iso}" data-date-label="${day.label}" data-day-index="${day.index}" class="rounded-lg border p-4 text-center transition ${day.available ? "border-[#6871f1]/20 bg-white text-[#2b3038] hover:border-[#6871f1] hover:shadow-sm" : "cursor-not-allowed border-black/5 bg-[#e3e7ed] text-[#9aa2ad] opacity-60"}" ${day.available ? "" : "disabled"}>
                    <span class="block text-xs font-bold uppercase">${day.day}</span>
                    <span class="mt-2 block text-2xl font-black">${day.date}</span>
                    <span class="mt-1 block text-xs">${day.month}</span>
                    <span class="mt-3 block rounded-full ${day.available ? "bg-[#46cf67]/12 text-[#28a64a]" : "bg-black/5 text-[#8b929b]"} px-2 py-1 text-[11px] font-bold">${day.available ? "Available" : "Full booked"}</span>
                  </button>
                `).join("")}
              </div>

              <h3 class="mt-8 text-base font-bold text-[#6871f1]">Available times</h3>
              <div data-booking-times class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"></div>
            </section>

            <section data-booking-panel="2" class="hidden">
              <h3 class="text-base font-bold text-[#6871f1]">Guest information</h3>
              <div class="mt-5 grid gap-4 md:grid-cols-2">
                <label class="block text-sm font-semibold text-[#4d5561]">
                  Full name
                  <input data-guest-name class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required />
                </label>
                <label class="block text-sm font-semibold text-[#4d5561]">
                  WhatsApp / phone
                  <input data-guest-phone class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required />
                </label>
                <label class="block text-sm font-semibold text-[#4d5561]">
                  Email
                  <input data-guest-email type="email" class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required />
                </label>
                <label class="block text-sm font-semibold text-[#4d5561]">
                  Guests
                  <input data-guest-count type="number" min="1" value="1" class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required />
                </label>
                <label class="block text-sm font-semibold text-[#4d5561] md:col-span-2">
                  Session notes
                  <textarea data-guest-notes class="mt-2 min-h-28 w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#6871f1]" placeholder="Share your intention, location, language preference, or special condition."></textarea>
                </label>
              </div>
            </section>

            <section data-booking-panel="3" class="hidden">
              <h3 class="text-base font-bold text-[#6871f1]">Confirm request</h3>
              <div class="mt-5 rounded-lg bg-white p-5 shadow-sm">
                <dl class="grid gap-4 text-sm md:grid-cols-2">
                  <div><dt class="text-[#858e9b]">Service</dt><dd data-summary-service class="mt-1 font-bold text-[#2b3038]"></dd></div>
                  <div><dt class="text-[#858e9b]">Healer</dt><dd class="mt-1 font-bold text-[#2b3038]">${profile.name}</dd></div>
                  <div><dt class="text-[#858e9b]">Date</dt><dd data-summary-date class="mt-1 font-bold text-[#2b3038]"></dd></div>
                  <div><dt class="text-[#858e9b]">Time</dt><dd data-summary-time class="mt-1 font-bold text-[#2b3038]"></dd></div>
                  <div><dt class="text-[#858e9b]">Guest</dt><dd data-summary-guest class="mt-1 font-bold text-[#2b3038]"></dd></div>
                  <div><dt class="text-[#858e9b]">Price</dt><dd data-summary-price class="mt-1 font-bold text-[#46cf67]"></dd></div>
                </dl>
                <p class="mt-6 rounded-lg bg-[#6871f1]/10 p-4 text-sm leading-6 text-[#4d5561]">Your request will be sent to the Bali Healer booking queue. Payment confirmation can continue after the schedule is approved.</p>
              </div>
            </section>
          </div>

          <footer class="flex items-center justify-between border-t border-black/10 bg-white px-6 py-4">
            <button type="button" data-booking-back class="hidden rounded-lg border border-black/10 px-5 py-3 text-sm font-bold text-[#59616d] transition hover:bg-black/5">Back</button>
            <button type="button" data-booking-next class="ml-auto rounded-sm bg-[#6871f1] px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-[#5962df] disabled:cursor-not-allowed disabled:bg-[#b4b9d6]">Next Step</button>
          </footer>
        </div>
      </section>
    </div>
  `;
}

export function render({ selectedService } = {}) {
  const service = findService(selectedService);
  const profile = serviceProfile(service);
  const badge = serviceModeBadge(service.mode);
  const methods = methodItems(service);
  const packages = sharedPackageItems(service);
  const days = sharedAvailabilityDays();

  return `
    <article class="bg-night text-mist">
      <section class="relative min-h-[76vh] overflow-hidden border-b border-gold/15">
        <img src="${service.image}" alt="${service.name}" class="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35"></div>
        <div class="absolute inset-0 bg-[linear-gradient(rgba(214,170,67,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(214,170,67,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

        <div class="relative mx-auto grid min-h-[76vh] max-w-7xl items-end gap-10 px-4 pb-12 pt-28 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <a href="#services" data-page="services" class="page-link inline-flex items-center gap-2 text-sm font-bold text-goldSoft transition hover:text-gold">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
              Back to services
            </a>
            <div class="mt-8 flex flex-wrap gap-2">
              <span class="rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}">${badge.label}</span>
              <span class="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-goldSoft">${service.providerType}</span>
              <span class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">${profile.location}</span>
            </div>
            <p class="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Healing Space</p>
            <h1 class="font-cinzel mt-3 max-w-4xl text-4xl font-black uppercase leading-tight tracking-normal text-gold md:text-6xl">${profile.name}</h1>
            <p class="mt-4 max-w-2xl text-xl font-semibold text-white">${profile.title}</p>
            <p class="mt-5 max-w-3xl text-base leading-8 text-mist/72">${profile.description}</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" data-open-healing-booking class="inline-flex h-12 items-center justify-center rounded-lg bg-gold px-6 text-sm font-black uppercase tracking-normal text-black transition hover:bg-goldSoft">Book Session</button>
            </div>
          </div>

          <aside class="rounded-xl border border-gold/20 bg-black/65 p-5 shadow-gold backdrop-blur">
            <img src="${profile.image}" alt="${profile.name}" class="h-64 w-full rounded-lg object-cover" />
            <div class="mt-5 grid grid-cols-3 gap-3 text-center">
              <div class="rounded-lg border border-gold/10 bg-white/5 p-3">
                <p class="text-xs text-mist/45">Experience</p>
                <p class="mt-1 font-bold text-white">${profile.experience}</p>
              </div>
              <div class="rounded-lg border border-gold/10 bg-white/5 p-3">
                <p class="text-xs text-mist/45">Sessions</p>
                <p class="mt-1 font-bold text-white">${profile.sessions}</p>
              </div>
              <div class="rounded-lg border border-gold/10 bg-white/5 p-3">
                <p class="text-xs text-mist/45">Reviews</p>
                <p class="mt-1 font-bold text-white">${profile.reviews}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div class="overflow-hidden rounded-xl border border-gold/15 bg-black">
          <video src="./assets/videos/hero-bali-healer.mp4" poster="${service.image}" class="aspect-video w-full object-cover" controls muted playsinline></video>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Intro Video</p>
          <h2 class="mt-3 text-3xl font-semibold text-white">Meet the presence behind the practice</h2>
          <p class="mt-4 text-sm leading-7 text-mist/65">A short introduction to the healing space, session flow, and the energy guests can expect before arriving online or in Bali.</p>
        </div>
      </section>

      <section class="border-y border-gold/15 bg-black/45 px-4 py-14 lg:px-8">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">About The Healer</p>
            <h2 class="mt-3 text-3xl font-semibold text-white">${service.name}</h2>
            <p class="mt-4 text-sm leading-7 text-mist/65">${profile.name} holds space through ${service.category.toLowerCase()} with a calm, guest-centered approach. Each session begins with clear intention, respectful preparation, and practical aftercare so the experience can continue beyond the appointment.</p>
          </div>
          <div class="rounded-xl border border-gold/15 bg-panel p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-goldSoft">Energy Vibe / Philosophy</p>
            <p class="mt-4 text-lg leading-8 text-white">Healing is treated as a relationship between presence, place, breath, and honest intention. The space is warm, grounded, and gentle, with enough structure for guests to feel held without feeling pushed.</p>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-2 lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Healing Methods</p>
          <div class="mt-6 grid gap-3">
            ${methods.map((method) => `
              <div class="rounded-lg border border-gold/15 bg-black/35 p-4 text-sm font-semibold text-mist/75">${method}</div>
            `).join("")}
          </div>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Session / Packages</p>
          <div class="mt-6 grid gap-3">
            ${packages.map((item) => `
              <article class="rounded-lg border border-gold/15 bg-panel p-5">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-lg font-semibold text-white">${item.name}</h3>
                  <p ${item.price.startsWith("Rp") ? `data-price-idr="${item.price}"` : ""} class="shrink-0 text-sm font-extrabold text-goldSoft">${item.price}</p>
                </div>
                <p class="mt-3 text-sm leading-6 text-mist/60">${item.detail}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="border-y border-gold/15 bg-black/45 px-4 py-14 lg:px-8">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Availability Calendar</p>
            <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              ${days.map((day) => `
                <button class="rounded-lg border ${day.available ? "border-gold/35 bg-gold/10 text-goldSoft" : "border-white/10 bg-white/5 text-mist/35"} p-4 text-center transition ${day.available ? "hover:bg-gold hover:text-black" : "cursor-not-allowed"}" ${day.available ? "" : "disabled"}>
                  <span class="block text-xs font-semibold uppercase">${day.day}</span>
                  <span class="mt-2 block text-2xl font-black">${day.date}</span>
                  <span class="mt-1 block text-xs">${day.month}</span>
                </button>
              `).join("")}
            </div>
          </div>
          <div class="rounded-xl border border-gold/15 bg-panel p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Certifications</p>
            <ul class="mt-5 space-y-3 text-sm leading-6 text-mist/65">
              ${certifications.map((item) => `<li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span><span>${item}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Reviews / Testimonials</p>
            <h2 class="mt-3 text-3xl font-semibold text-white">Guest reflections</h2>
          </div>
          <div class="text-sm font-semibold text-goldSoft">${service.rating} rating from ${profile.reviews} reviews</div>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          ${reviews.map((review) => `
            <article class="rounded-lg border border-gold/15 bg-panel p-5">
              <p class="text-sm leading-7 text-mist/70">${review.text}</p>
              <p class="mt-5 text-sm font-bold text-white">${review.name}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="border-y border-gold/15 bg-black/45 px-4 py-14 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Gallery</p>
          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            ${galleryImages.map((image, index) => `
              <img src="${index === 0 ? service.image : image}" alt="${service.category} gallery ${index + 1}" class="h-64 w-full rounded-lg border border-gold/15 object-cover" />
            `).join("")}
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Social Links</p>
          <div class="mt-6 flex flex-wrap gap-3">
            ${socialLinks.map((link) => `
              <a href="${link.href}" target="_blank" rel="noreferrer" class="rounded-lg border border-gold/20 bg-black/35 px-4 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold hover:text-black">${link.label}</a>
            `).join("")}
          </div>
        </div>
        <div class="rounded-xl border border-gold/20 bg-gold/10 p-6">
          <h2 class="text-2xl font-semibold text-white">Ready to enter this healing space?</h2>
          <p class="mt-3 text-sm leading-7 text-mist/65">Send a booking request with your preferred date, session mode, and any notes about your intention or location.</p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" data-open-healing-booking class="inline-flex h-12 items-center justify-center rounded-lg bg-gold px-6 text-sm font-black uppercase tracking-normal text-black transition hover:bg-goldSoft">Book Session</button>
          </div>
        </div>
      </section>
      ${sharedBookingModal(service, profile, packages, days)}
    </article>
  `;
}

export function init() {
  return initBookingModal(document);
}

function initLegacyBookingModal() {
  const modal = document.querySelector("[data-healing-booking-modal]");
  const openButtons = [...document.querySelectorAll("[data-open-healing-booking]")];
  const closeButtons = [...document.querySelectorAll("[data-close-healing-booking]")];
  const panels = [...document.querySelectorAll("[data-booking-panel]")];
  const indicators = [...document.querySelectorAll("[data-booking-step-indicator]")];
  const title = document.querySelector("[data-booking-title]");
  const nextButton = document.querySelector("[data-booking-next]");
  const backButton = document.querySelector("[data-booking-back]");
  const packageButtons = [...document.querySelectorAll("[data-package-option]")];
  const dateButtons = [...document.querySelectorAll("[data-booking-date]")];
  const timesContainer = document.querySelector("[data-booking-times]");
  const guestName = document.querySelector("[data-guest-name]");
  const guestPhone = document.querySelector("[data-guest-phone]");
  const guestEmail = document.querySelector("[data-guest-email]");
  const guestCount = document.querySelector("[data-guest-count]");
  const guestNotes = document.querySelector("[data-guest-notes]");
  const summaries = {
    service: document.querySelector("[data-summary-service]"),
    date: document.querySelector("[data-summary-date]"),
    time: document.querySelector("[data-summary-time]"),
    guest: document.querySelector("[data-summary-guest]"),
    price: document.querySelector("[data-summary-price]")
  };

  if (!modal || !nextButton || !backButton || !timesContainer) return undefined;

  const stepTitles = ["Select service", "Select date & time", "Your information", "Confirm booking"];
  const state = {
    step: 0,
    packageIndex: packageButtons.length ? 0 : -1,
    packageName: packageButtons[0]?.querySelector(".block")?.textContent?.trim() || "",
    packagePrice: packageButtons[0]?.querySelector(".text-2xl")?.textContent?.trim() || "",
    date: "",
    dateLabel: "",
    dayIndex: 0,
    time: ""
  };

  const setActivePackage = (button) => {
    packageButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("border-[#6871f1]", active);
      item.classList.toggle("ring-2", active);
      item.classList.toggle("ring-[#6871f1]/20", active);
    });
  };

  const setActiveDate = (button) => {
    dateButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("border-[#6871f1]", active);
      item.classList.toggle("bg-[#6871f1]/10", active);
      item.classList.toggle("ring-2", active);
      item.classList.toggle("ring-[#6871f1]/20", active);
    });
  };

  const renderTimes = () => {
    const slots = timeSlots(state.dayIndex);
    timesContainer.innerHTML = slots.map((slot) => `
      <button type="button" data-booking-time="${slot.time}" class="rounded-lg border p-4 text-center text-sm font-bold transition ${slot.available ? "border-[#6871f1]/20 bg-white text-[#2b3038] hover:border-[#6871f1] hover:shadow-sm" : "cursor-not-allowed border-black/5 bg-[#e3e7ed] text-[#9aa2ad] opacity-60"}" ${slot.available ? "" : "disabled"}>
        <span>${slot.time}</span>
        <span class="mt-2 block rounded-full ${slot.available ? "bg-[#46cf67]/12 text-[#28a64a]" : "bg-black/5 text-[#8b929b]"} px-2 py-1 text-[11px]">${slot.available ? "Available" : "Full booked"}</span>
      </button>
    `).join("");
  };

  const setActiveTime = (button) => {
    timesContainer.querySelectorAll("[data-booking-time]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("border-[#6871f1]", active);
      item.classList.toggle("bg-[#6871f1]/10", active);
      item.classList.toggle("ring-2", active);
      item.classList.toggle("ring-[#6871f1]/20", active);
    });
  };

  const infoComplete = () => (
    guestName?.value.trim() &&
    guestPhone?.value.trim() &&
    guestEmail?.checkValidity() &&
    guestCount?.value
  );

  const canContinue = () => {
    if (state.step === 0) return state.packageIndex >= 0;
    if (state.step === 1) return Boolean(state.date && state.time);
    if (state.step === 2) return Boolean(infoComplete());
    return true;
  };

  const updateSummary = () => {
    if (summaries.service) summaries.service.textContent = state.packageName;
    if (summaries.date) summaries.date.textContent = state.dateLabel;
    if (summaries.time) summaries.time.textContent = state.time;
    if (summaries.guest) summaries.guest.textContent = `${guestName?.value.trim() || "-"} - ${guestCount?.value || 1} guest(s)`;
    if (summaries.price) summaries.price.textContent = state.packagePrice;
  };

  const setStep = (step) => {
    state.step = Math.max(0, Math.min(step, panels.length - 1));
    panels.forEach((panel, index) => panel.classList.toggle("hidden", index !== state.step));
    indicators.forEach((indicator, index) => {
      const active = index === state.step;
      const completed = index < state.step;
      indicator.classList.toggle("text-white", active || completed);
      indicator.classList.toggle("text-white/35", !active && !completed);
      const circle = indicator.querySelector("span");
      circle?.classList.toggle("bg-[#46cf67]", active || completed);
      circle?.classList.toggle("bg-white/18", !active && !completed);
    });
    if (title) title.textContent = stepTitles[state.step];
    backButton.classList.toggle("hidden", state.step === 0);
    nextButton.textContent = state.step === panels.length - 1 ? "Complete Request" : "Next Step";
    if (state.step === 3) updateSummary();
    nextButton.disabled = !canContinue();
  };

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    setStep(0);
    if (packageButtons[0]) setActivePackage(packageButtons[0]);
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  };

  const chooseFirstAvailableDate = () => {
    const firstAvailable = dateButtons.find((button) => !button.disabled);
    if (!firstAvailable) return;
    state.date = firstAvailable.dataset.bookingDate;
    state.dateLabel = firstAvailable.dataset.dateLabel;
    state.dayIndex = Number(firstAvailable.dataset.dayIndex || 0);
    state.time = "";
    setActiveDate(firstAvailable);
    renderTimes();
  };

  const handleNext = () => {
    if (!canContinue()) {
      if (state.step === 2) {
        guestName?.reportValidity();
        guestPhone?.reportValidity();
        guestEmail?.reportValidity();
        guestCount?.reportValidity();
      }
      return;
    }

    if (state.step === 0 && !state.date) chooseFirstAvailableDate();
    if (state.step < panels.length - 1) {
      setStep(state.step + 1);
      return;
    }

    nextButton.textContent = "Request Sent";
    nextButton.disabled = true;
    window.setTimeout(closeModal, 900);
  };

  const handleBack = () => setStep(state.step - 1);

  const handlePackageClick = (event) => {
    const button = event.currentTarget;
    state.packageIndex = Number(button.dataset.packageOption);
    state.packageName = button.querySelector(".block")?.textContent?.trim() || "";
    state.packagePrice = button.querySelector(".text-2xl")?.textContent?.trim() || "";
    setActivePackage(button);
    nextButton.disabled = !canContinue();
  };

  const handleDateClick = (event) => {
    const button = event.currentTarget;
    state.date = button.dataset.bookingDate;
    state.dateLabel = button.dataset.dateLabel;
    state.dayIndex = Number(button.dataset.dayIndex || 0);
    state.time = "";
    setActiveDate(button);
    renderTimes();
    nextButton.disabled = !canContinue();
  };

  const handleTimeClick = (event) => {
    const button = event.target.closest("[data-booking-time]");
    if (!button || button.disabled) return;
    state.time = button.dataset.bookingTime;
    setActiveTime(button);
    nextButton.disabled = !canContinue();
  };

  const handleInfoInput = () => {
    if (state.step === 2) nextButton.disabled = !canContinue();
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") closeModal();
  };

  openButtons.forEach((button) => button.addEventListener("click", openModal));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  packageButtons.forEach((button) => button.addEventListener("click", handlePackageClick));
  dateButtons.forEach((button) => button.addEventListener("click", handleDateClick));
  timesContainer.addEventListener("click", handleTimeClick);
  nextButton.addEventListener("click", handleNext);
  backButton.addEventListener("click", handleBack);
  [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.addEventListener("input", handleInfoInput));
  document.addEventListener("keydown", handleEscape);
  if (packageButtons[0]) setActivePackage(packageButtons[0]);

  return () => {
    openButtons.forEach((button) => button.removeEventListener("click", openModal));
    closeButtons.forEach((button) => button.removeEventListener("click", closeModal));
    packageButtons.forEach((button) => button.removeEventListener("click", handlePackageClick));
    dateButtons.forEach((button) => button.removeEventListener("click", handleDateClick));
    timesContainer.removeEventListener("click", handleTimeClick);
    nextButton.removeEventListener("click", handleNext);
    backButton.removeEventListener("click", handleBack);
    [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.removeEventListener("input", handleInfoInput));
    document.removeEventListener("keydown", handleEscape);
    document.body.classList.remove("overflow-hidden");
  };
}
