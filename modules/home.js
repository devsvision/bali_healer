import { promotions, services } from "../js/data.js";
import { availabilityDays as bookingAvailabilityDays, bookingModal as bookingSystemModal, initBookingModal, packageItems as bookingPackageItems } from "./booking-system.js";

const heroLocations = [
  "All locations",
  ...new Set(services.map((service) => service.area))
];

const heroCategories = [
  "All categories",
  "Energy Healing",
  "Chakra Balancing",
  "Sound Bath",
  "Melukat Ritual",
  "Breathwork",
  "Yoga Therapy",
  "Meditation",
  "Intuitive Reading",
  "Massage Healing",
  "Couple Healing",
  "Retreat Package",
  "Astrology",
  "Tarot Reading",
  "Reiki",
  "Life Coaching",
  "Corporate Wellness"
];

const datePickerMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const datePickerDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const promoBadges = [
  { icon: "&#127919;", text: "Exclusive Deals" },
  { icon: "&#9889;", text: "Limited Time Only" },
  { icon: "&#128737;", text: "Verified Vendors" },
  { icon: "&#11088;", text: "Top Rated" }
];

const promoThemes = [
  {
    name: "sun",
    accent: "#f5cf42",
    accentSoft: "rgba(245, 207, 66, 0.16)",
    accentLine: "rgba(245, 207, 66, 0.7)",
    text: "#ffd84d"
  },
  {
    name: "lavender",
    accent: "#c47aff",
    accentSoft: "rgba(196, 122, 255, 0.17)",
    accentLine: "rgba(196, 122, 255, 0.76)",
    text: "#d7a0ff"
  },
  {
    name: "mint",
    accent: "#35e4b1",
    accentSoft: "rgba(53, 228, 177, 0.16)",
    accentLine: "rgba(53, 228, 177, 0.74)",
    text: "#56f1c4"
  },
  {
    name: "coral",
    accent: "#ffad8a",
    accentSoft: "rgba(255, 173, 138, 0.16)",
    accentLine: "rgba(255, 173, 138, 0.74)",
    text: "#ffc0a7"
  },
  {
    name: "sky",
    accent: "#7dc8ff",
    accentSoft: "rgba(125, 200, 255, 0.16)",
    accentLine: "rgba(125, 200, 255, 0.74)",
    text: "#a9dcff"
  },
  {
    name: "rose",
    accent: "#ff93c7",
    accentSoft: "rgba(255, 147, 199, 0.16)",
    accentLine: "rgba(255, 147, 199, 0.74)",
    text: "#ffb4d8"
  }
];

const testimonials = [
  {
    name: "Amelia Hart",
    city: "Sydney",
    country: "Australia",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    service: "Balinese Energy Healing",
    rating: "5.0",
    quote: "The session felt deeply grounding. My healer explained every step clearly, and the follow-up notes helped me keep the calm long after I left Ubud."
  },
  {
    name: "Daniel Carter",
    city: "New York",
    country: "USA",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    service: "Online Chakra Balancing",
    rating: "4.9",
    quote: "I booked from overseas and still felt fully held. The video session was smooth, practical, and surprisingly personal."
  },
  {
    name: "Maya Putri",
    city: "Jakarta",
    country: "Indonesia",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    service: "Sound Bath Meditation",
    rating: "5.0",
    quote: "The sound bath was beautifully arranged. I liked seeing the studio details, mode, price, and reviews before booking."
  },
  {
    name: "Thomas Reed",
    city: "London",
    country: "United Kingdom",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    service: "Corporate Wellness Day",
    rating: "4.8",
    quote: "Our team retreat needed something calm but organized. The facilitator team handled the schedule, location, and session flow very professionally."
  },
  {
    name: "Clara Nguyen",
    city: "Singapore",
    country: "Singapore",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    service: "Melukat Purification Ritual",
    rating: "5.0",
    quote: "The guide was respectful, warm, and patient with temple etiquette. It felt authentic without being overwhelming."
  },
  {
    name: "Jonas Weber",
    city: "Berlin",
    country: "Germany",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    service: "Sunset Breathwork Journey",
    rating: "4.9",
    quote: "The hybrid option was perfect. I joined in person, then received online follow-up guidance after returning home."
  },
  {
    name: "Sofia Martinez",
    city: "Madrid",
    country: "Spain",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    service: "Private Yoga Therapy",
    rating: "4.8",
    quote: "The practitioner adapted everything to my body and energy level. It felt therapeutic, not like a generic class."
  },
  {
    name: "Ethan Brooks",
    city: "Melbourne",
    country: "Australia",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    service: "Guided Meditation Session",
    rating: "4.9",
    quote: "Simple booking, clear communication, and a peaceful online session. I would use the platform again for remote healing."
  }
];

export function render() {
  return `
    <section data-home-hero class="relative -mt-[1px] min-h-[calc(100vh-72px)] overflow-hidden">
      <video class="absolute inset-0 h-full w-full object-cover opacity-75" autoplay muted loop playsinline>
        <source src="./assets/videos/hero-bali-healer.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/55"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(214,170,67,0.24),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.78))]"></div>
      <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent"></div>

      <div class="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-4 pb-12 pt-16 text-center sm:pb-16 sm:pt-20">
        <h1 class="font-cinzel max-w-5xl text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl md:text-7xl">
          Discover Your <span class="text-gold">Healing</span> Journey<br class="hidden md:block" /> in Bali
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-xl md:mt-7 md:text-2xl md:leading-8">
          Connect with Bali's most authentic healers and discover ancient rituals for your body, mind, and soul.
        </p>

        <div class="mt-8 w-full max-w-4xl rounded-3xl border border-gold/20 bg-[#15110d]/95 p-3 shadow-gold backdrop-blur md:mt-10 md:rounded-full">
          <div class="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
            <label class="flex items-center gap-4 rounded-2xl border border-gold/10 bg-black/35 px-4 py-3 text-left md:rounded-full md:border-0 md:bg-transparent md:px-5">
              <span class="text-gold">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-extrabold uppercase text-white">Location</span>
                <select aria-label="Choose location" class="mt-1 w-full cursor-pointer bg-transparent text-sm text-mist/65 outline-none">
                  <option value="" selected disabled>Where are you going?</option>
                  ${heroLocations.map((location) => `<option class="bg-night text-mist" value="${location}">${location}</option>`).join("")}
                </select>
              </span>
            </label>

            <label class="flex items-center gap-4 rounded-2xl border border-gold/10 bg-black/35 px-4 py-3 text-left md:rounded-none md:border-y-0 md:border-r-0 md:border-gold/15 md:bg-transparent md:px-5 md:border-l">
              <span class="text-gold">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-extrabold uppercase text-white">Category</span>
                <select aria-label="Choose category" class="mt-1 w-full cursor-pointer bg-transparent text-sm text-mist/65 outline-none">
                  <option value="" selected disabled>What are you seeking?</option>
                  ${heroCategories.map((category) => `<option class="bg-night text-mist" value="${category}">${category}</option>`).join("")}
                </select>
              </span>
            </label>

            <label data-date-picker-container class="flex items-center gap-4 rounded-2xl border border-gold/10 bg-black/35 px-4 py-3 text-left md:rounded-none md:border-y-0 md:border-r-0 md:border-gold/15 md:bg-transparent md:px-5 md:border-l">
              <span class="text-gold">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-extrabold uppercase text-white">Dates</span>
                <input type="text" data-date-picker aria-label="Choose date" placeholder="Select date" readonly class="mt-1 w-full cursor-pointer bg-transparent text-sm text-mist/65 outline-none placeholder:text-mist/55" />
              </span>
            </label>

            <button data-page="services" class="page-link flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 text-sm font-extrabold text-black transition hover:bg-goldSoft md:ml-1 md:w-14 md:rounded-full md:px-0">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
              <span class="md:hidden">Search services</span>
            </button>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/85 sm:mt-6 sm:gap-x-8 sm:text-sm">
          ${["Best price, guaranteed", "FREE cancellation available", "No booking fees"].map((item) => `
            <span class="flex items-center gap-2">
              <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-xs text-gold">✓</span>
              ${item}
            </span>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="border-t border-gold/15 bg-black pt-10">
      <div class="mx-auto max-w-7xl px-4 pb-7 lg:px-8">
        <div class="flex items-center justify-center gap-4">
          <span class="hidden h-px w-44 bg-gradient-to-r from-transparent to-gold/40 sm:block"></span>
          <span class="flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-6 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-goldSoft shadow-[0_0_30px_rgba(214,170,67,0.14)]">
            <span aria-hidden="true">✣</span>
            <span>Featured Promotions</span>
            <span aria-hidden="true">✣</span>
          </span>
          <span class="hidden h-px w-44 bg-gradient-to-l from-transparent to-gold/40 sm:block"></span>
        </div>

        <div class="mt-6 flex flex-wrap justify-center gap-3 text-xs text-mist/70">
          ${promoBadges.map((item) => `
            <span class="flex items-center gap-2 rounded-full border border-white/70 bg-black/35 px-4 py-2 shadow-[inset_0_0_18px_rgba(255,255,255,0.04)]">
              <span aria-hidden="true">${item.icon}</span>
              <span>${item.text}</span>
            </span>
          `).join("")}
        </div>
      </div>

      <div id="promo-carousel" class="relative overflow-hidden border-y border-gold/15">
        <div id="promo-track" class="flex transition-transform duration-700 ease-out">
          ${promotions.map((promo, index) => promoSlide(promo, index)).join("")}
        </div>

        <button data-promo-prev class="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/45 text-goldSoft backdrop-blur transition hover:bg-gold hover:text-black">
          <span class="sr-only">Previous promo</span>
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button data-promo-next class="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/45 bg-black/45 text-goldSoft backdrop-blur transition hover:bg-gold hover:text-black">
          <span class="sr-only">Next promo</span>
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <div class="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          ${promotions.map((_, index) => `<button data-promo-dot="${index}" data-accent="${promoThemes[index % promoThemes.length].accent}" class="h-2 rounded-full bg-white/40 transition-all"></button>`).join("")}
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Services</p>
          <h3 class="mt-2 text-3xl font-semibold text-white">Healing services for every need</h3>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-mist/55">Services can be offered by healers or registered wellness partners, with online, offline, or hybrid session options.</p>
        </div>
      </div>
      <div data-service-grid class="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
        ${services.map((service, index) => serviceCard(service, index >= 8)).join("")}
      </div>
      <div class="mt-8 flex justify-center">
        <button data-show-all-services class="w-full max-w-xl border border-gold/20 bg-black/35 px-6 py-4 text-sm font-semibold text-mist/80 transition hover:border-gold/45 hover:bg-gold/10 hover:text-goldSoft">View More</button>
      </div>
      <div data-service-pagination class="mt-8 hidden items-center justify-center gap-8">
        <button type="button" data-service-prev class="flex h-10 w-10 items-center justify-center text-mist/45 transition hover:text-goldSoft disabled:cursor-not-allowed disabled:text-mist/20" aria-label="Previous services page">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div data-service-pages class="flex items-center justify-center gap-5 text-sm font-medium text-mist/55"></div>
        <button type="button" data-service-next class="flex h-10 w-10 items-center justify-center text-mist/45 transition hover:text-goldSoft disabled:cursor-not-allowed disabled:text-mist/20" aria-label="Next services page">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>

    <section class="border-y border-gold/15 bg-black/55 px-4 py-14 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-goldSoft">Testimonials</p>
            <h3 class="mt-2 text-3xl font-semibold text-white">What guests say after their sessions</h3>
          </div>
          <p class="max-w-lg text-sm leading-6 text-mist/55">Realistic marketplace stories from guests booking online, offline, and hybrid healing experiences across Bali.</p>
        </div>

        <div class="relative mt-8 overflow-hidden">
          <div data-testimonial-track class="flex transition-transform duration-700 ease-out">
            ${testimonialGroups().map((group) => testimonialSlide(group)).join("")}
          </div>

          <button data-testimonial-prev class="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 bg-black/70 text-goldSoft backdrop-blur transition hover:bg-gold hover:text-black">
            <span class="sr-only">Previous testimonial</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button data-testimonial-next class="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 bg-black/70 text-goldSoft backdrop-blur transition hover:bg-gold hover:text-black">
            <span class="sr-only">Next testimonial</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div class="mt-5 flex justify-center gap-2">
          ${testimonialGroups().map((_, index) => `<button data-testimonial-dot="${index}" class="h-2.5 rounded-full bg-white/35 transition-all"></button>`).join("")}
        </div>
      </div>
    </section>

    <section class="border-b border-gold/15 bg-black px-4 py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <h3 class="text-3xl font-extrabold text-white md:text-4xl">Why Choose <span class="text-gold">Bali Healer</span>?</h3>
          <p class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-mist/60">We provide a reliable platform for both healing service providers and guests seeking trusted wellness experiences.</p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          ${[
            {
              title: "Verified Professionals",
              description: "Every professional on our platform goes through a careful verification process to support authenticity, expertise, and trustworthiness.",
              iconClass: "bg-amber-500/25 text-goldSoft",
              icon: `<path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/>`,
              meta: ["Background Checked", "Certified"]
            },
            {
              title: "Fast Response",
              description: "Get connected with expert healers quickly. Book your preferred session and receive confirmation without unnecessary waiting.",
              iconClass: "bg-sky-500/20 text-sky-200",
              icon: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>`,
              meta: ["Avg. 2 Hour Reply", "Instant Booking"]
            },
            {
              title: "Best Quality",
              description: "Ratings, reviews, and service standards help keep every healing experience professional, consistent, and meaningful.",
              iconClass: "bg-emerald-500/20 text-emerald-200",
              icon: `<path d="m13 2-9 13h7l-1 7 9-13h-7l1-7Z"/>`,
              meta: ["4.9 Avg Rating", "1000+ Reviews"]
            }
          ].map((item) => `
            <article class="rounded-xl border border-gold/15 bg-[#0d0c0a] p-7 transition hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_24px_60px_rgba(214,170,67,0.12)]">
              <div class="flex h-14 w-14 items-center justify-center rounded-xl ${item.iconClass}">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
              </div>
              <h4 class="mt-6 text-xl font-semibold text-white">${item.title}</h4>
              <p class="mt-4 min-h-[96px] text-sm leading-7 text-mist/65">${item.description}</p>
              <div class="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t border-gold/10 pt-5 text-xs text-mist/45">
                ${item.meta.map((meta) => `
                  <span class="flex items-center gap-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
                    ${meta}
                  </span>
                `).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="border-b border-gold/15 bg-black px-4 py-16 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="relative overflow-hidden rounded-2xl border border-gold/15 bg-[linear-gradient(90deg,#050505_0%,#101010_34%,#777_72%,#f3f3f3_100%)] px-8 py-12 shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:px-14 md:py-16">
          <div class="pointer-events-none absolute inset-0 opacity-30">
            <div class="absolute left-1/3 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-black/40"></div>
            <div class="absolute left-[45%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-black/30"></div>
            <div class="absolute inset-y-0 left-[52%] w-px bg-black/25"></div>
            <div class="absolute inset-x-0 top-1/2 h-px bg-black/25"></div>
            <div class="absolute left-[28%] top-0 h-full w-px rotate-45 bg-black/20"></div>
            <div class="absolute left-[42%] top-0 h-full w-px -rotate-45 bg-black/20"></div>
          </div>
          <div class="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/85 to-transparent"></div>

          <div class="relative max-w-xl">
            <h3 class="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Traditional <span class="text-gold">Balinese</span><br />Healing Wisdom
            </h3>
            <p class="mt-6 max-w-lg text-base leading-7 text-white/78">
              Experience sacred traditions passed down through generations. Our master healers guide you through rituals that have supported the Balinese people for centuries.
            </p>
            <button data-book-service="${services[0].name}" class="mt-8 rounded-full bg-gold px-7 py-3 text-sm font-extrabold text-black shadow-gold transition hover:bg-goldSoft">
              Book Your Experience
            </button>
          </div>
        </div>
      </div>
    </section>

    <div data-profile-modal class="fixed inset-0 z-50 hidden items-center justify-center px-4 py-8">
      <button data-close-profile class="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Close profile"></button>
      <section class="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-gold/25 bg-[#0d0c0b] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div class="sticky top-0 z-10 flex items-center justify-between border-b border-gold/15 bg-[#0d0c0b]/95 px-5 py-4 backdrop-blur">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-goldSoft">Vendor Profile</p>
            <h3 data-profile-category class="mt-1 text-xl font-semibold text-white"></h3>
          </div>
          <button data-close-profile class="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-mist/70 transition hover:border-gold hover:text-goldSoft">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="grid gap-0 lg:grid-cols-[0.9fr_1.25fr]">
          <aside class="border-b border-gold/15 bg-black/30 p-5 lg:border-b-0 lg:border-r">
            <div class="overflow-hidden rounded-xl border border-gold/15 bg-black">
              <img data-profile-image src="" alt="" class="h-72 w-full object-cover opacity-90" />
            </div>
            <div class="mt-5 flex flex-wrap gap-2">
              <span data-profile-mode class="rounded-full border px-3 py-1 text-xs font-semibold"></span>
              <span data-profile-provider class="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-goldSoft"></span>
            </div>
            <h4 data-profile-healer class="mt-4 text-2xl font-semibold text-white"></h4>
            <p data-profile-title class="mt-2 text-sm font-semibold text-gold"></p>
            <p data-profile-location class="mt-4 flex items-center gap-2 text-sm text-mist/65">
              <svg class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span></span>
            </p>
          </aside>

          <div class="p-5">
            <p data-profile-description class="text-sm leading-7 text-mist/70"></p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div class="rounded-lg border border-gold/10 bg-black/35 p-3">
                <p class="text-xs text-mist/45">Experience</p>
                <p data-profile-experience class="mt-1 font-semibold text-white"></p>
              </div>
              <div class="rounded-lg border border-gold/10 bg-black/35 p-3">
                <p class="text-xs text-mist/45">Sessions</p>
                <p data-profile-sessions class="mt-1 font-semibold text-white"></p>
              </div>
              <div class="rounded-lg border border-gold/10 bg-black/35 p-3">
                <p class="text-xs text-mist/45">Rating</p>
                <p data-profile-rating class="mt-1 font-semibold text-white"></p>
              </div>
              <div class="rounded-lg border border-gold/10 bg-black/35 p-3">
                <p class="text-xs text-mist/45">Starting price</p>
                <p data-profile-price data-price-idr="" class="mt-1 font-semibold text-goldSoft"></p>
              </div>
            </div>

            <div class="mt-6 grid gap-5 md:grid-cols-2">
              <section>
                <h5 class="text-sm font-bold uppercase tracking-[0.18em] text-goldSoft">Service Includes</h5>
                <ul data-profile-includes class="mt-3 space-y-2 text-sm leading-6 text-mist/65"></ul>
              </section>
              <section>
                <h5 class="text-sm font-bold uppercase tracking-[0.18em] text-goldSoft">Vendor Details</h5>
                <ul data-profile-details class="mt-3 space-y-2 text-sm leading-6 text-mist/65"></ul>
              </section>
            </div>

            <div class="mt-6 rounded-xl border border-gold/15 bg-gold/10 p-4 text-sm leading-6 text-mist/70">
              Verified marketplace profile with session information, provider type, service mode, availability request, and guest aftercare guidance.
            </div>

            <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button data-close-profile class="rounded-lg border border-gold/25 px-5 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold/10">Close</button>
              <button data-profile-book-service class="rounded-lg bg-gold px-6 py-3 text-sm font-extrabold text-black shadow-gold transition hover:bg-goldSoft">Book This Service</button>
            </div>
          </div>
        </div>
      </section>
    </div>

  `;
}

function bejiPromoSlide(promo, theme) {
  const promoService = promoServiceName(promo);

  return `
    <article data-promo-slide class="relative min-h-[430px] w-full shrink-0 overflow-hidden bg-black md:min-h-[520px]" style="--promo-accent: ${theme.accent}; --promo-soft: ${theme.accentSoft}; --promo-line: ${theme.accentLine}; --promo-text: ${theme.text};">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(245,207,66,0.12),transparent_32%),radial-gradient(circle_at_50%_18%,rgba(28,130,73,0.16),transparent_24%)]"></div>
      <div class="absolute inset-x-0 bottom-0 h-px bg-[var(--promo-line)]"></div>

      <div class="relative mx-auto flex min-h-[430px] max-w-6xl flex-col items-center justify-center px-6 py-14 text-center md:min-h-[520px]">
        <div class="mb-7 flex flex-col items-center">
          <div class="relative flex h-24 w-28 items-end justify-center md:h-28 md:w-32">
            <span class="absolute bottom-5 left-5 h-12 w-8 rotate-[-34deg] rounded-[80%_20%_80%_20%] border border-gold/80 bg-gradient-to-br from-[#69b84f] via-[#143d23] to-black shadow-[0_0_18px_rgba(245,207,66,0.28)]"></span>
            <span class="absolute bottom-5 right-5 h-12 w-8 rotate-[34deg] rounded-[20%_80%_20%_80%] border border-gold/80 bg-gradient-to-bl from-[#69b84f] via-[#143d23] to-black shadow-[0_0_18px_rgba(245,207,66,0.28)]"></span>
            <span class="absolute bottom-7 h-16 w-11 rounded-[80%_80%_45%_45%] border border-gold bg-gradient-to-b from-[#6fd6ff] via-[#0d78a8] to-[#07131d] shadow-[0_0_22px_rgba(245,207,66,0.34)]"></span>
            <span class="absolute bottom-2 h-9 w-24 rounded-[0_0_80px_80px] border-b-2 border-gold bg-gradient-to-t from-[#244817] to-transparent"></span>
            <span class="absolute bottom-12 h-3 w-3 rounded-full bg-black ring-2 ring-gold"></span>
          </div>
          <p class="mt-2 text-2xl font-extrabold uppercase tracking-wide text-goldSoft md:text-3xl">Beji Healing</p>
          <p class="mt-1 text-sm font-extrabold uppercase tracking-[0.18em] text-gold">${promo.offer}</p>
        </div>

        <h3 class="max-w-5xl text-4xl font-extrabold leading-tight text-white md:text-6xl">${promo.title}</h3>
        <p class="mt-6 max-w-3xl text-base leading-7 text-white/82 md:text-lg">${promo.description}</p>

        <div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button data-book-service="${promoService}" class="rounded-lg border border-gold bg-black/70 px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-gold shadow-[0_0_24px_rgba(245,207,66,0.34)] transition hover:bg-gold hover:text-black">
            ${promo.cta}
          </button>
          <button data-page="services" class="page-link rounded-lg border border-gold/80 bg-black/70 px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-gold shadow-[0_0_24px_rgba(245,207,66,0.24)] transition hover:bg-gold hover:text-black">
            ${promo.secondaryCta || "Explore Services"}
          </button>
        </div>

        <div class="absolute right-6 top-6 hidden rounded-full border border-gold/25 bg-black/65 px-4 py-2 text-xs font-medium text-goldSoft backdrop-blur md:block">
          Sponsored - ${promo.vendor}
        </div>
      </div>
    </article>
  `;
}

export function init() {
  const track = document.querySelector("#promo-track");
  const slides = [...document.querySelectorAll("[data-promo-slide]")];
  const dots = [...document.querySelectorAll("[data-promo-dot]")];
  const prev = document.querySelector("[data-promo-prev]");
  const next = document.querySelector("[data-promo-next]");
  const testimonialTrack = document.querySelector("[data-testimonial-track]");
  const testimonialSlides = [...document.querySelectorAll("[data-testimonial-slide]")];
  const testimonialDots = [...document.querySelectorAll("[data-testimonial-dot]")];
  const testimonialPrev = document.querySelector("[data-testimonial-prev]");
  const testimonialNext = document.querySelector("[data-testimonial-next]");
  const showAllServices = document.querySelector("[data-show-all-services]");
  const servicePagination = document.querySelector("[data-service-pagination]");
  const servicePrev = document.querySelector("[data-service-prev]");
  const serviceNext = document.querySelector("[data-service-next]");
  const servicePages = document.querySelector("[data-service-pages]");
  const serviceCards = [...document.querySelectorAll("[data-service-card]")];
  const profileModal = document.querySelector("[data-profile-modal]");
  const closeProfileButtons = [...document.querySelectorAll("[data-close-profile]")];
  const profileBookButton = document.querySelector("[data-profile-book-service]");
  const dateInputs = [...document.querySelectorAll("[data-date-picker]")];
  const datePickerContainers = [...document.querySelectorAll("[data-date-picker-container]")];
  if (!track || slides.length === 0) return;

  let active = 0;
  let activeTestimonial = 0;
  let serviceExpanded = false;
  let servicePage = 0;
  let timer;
  let testimonialTimer;
  let activeDateInput;
  let calendarDate = new Date();
  let ignoreOutsideClickUntil = 0;
  let activeBookingCleanup;
  const calendar = document.createElement("div");
  calendar.dataset.dateCalendar = "true";
  calendar.className = "fixed z-[80] hidden w-[320px] max-w-[calc(100vw-24px)] rounded-2xl border border-gold/20 bg-[#0d0c0b] p-4 text-sm text-mist shadow-[0_24px_80px_rgba(0,0,0,0.62)]";
  document.body.appendChild(calendar);

  const render = () => {
    track.style.transform = `translateX(-${active * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("w-8", index === active);
      dot.classList.toggle("w-2", index !== active);
      dot.classList.toggle("bg-white/40", index !== active);
      dot.style.backgroundColor = index === active ? dot.dataset.accent : "";
    });
  };

  const goTo = (index) => {
    active = (index + slides.length) % slides.length;
    render();
  };

  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => goTo(active + 1), 5200);
  };

  const renderTestimonials = () => {
    if (!testimonialTrack) return;
    testimonialTrack.style.transform = `translateX(-${activeTestimonial * 100}%)`;
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("w-8", index === activeTestimonial);
      dot.classList.toggle("w-2.5", index !== activeTestimonial);
      dot.classList.toggle("bg-gold", index === activeTestimonial);
      dot.classList.toggle("bg-white/35", index !== activeTestimonial);
    });
  };

  const goToTestimonial = (index) => {
    activeTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
    renderTestimonials();
  };

  const restartTestimonials = () => {
    window.clearInterval(testimonialTimer);
    testimonialTimer = window.setInterval(() => goToTestimonial(activeTestimonial + 1), 6200);
  };

  prev?.addEventListener("click", () => {
    goTo(active - 1);
    restart();
  });

  next?.addEventListener("click", () => {
    goTo(active + 1);
    restart();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.promoDot));
      restart();
    });
  });

  testimonialPrev?.addEventListener("click", () => {
    goToTestimonial(activeTestimonial - 1);
    restartTestimonials();
  });

  testimonialNext?.addEventListener("click", () => {
    goToTestimonial(activeTestimonial + 1);
    restartTestimonials();
  });

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToTestimonial(Number(dot.dataset.testimonialDot));
      restartTestimonials();
    });
  });

  const renderServiceCards = () => {
    const initialLimit = 8;
    const pageSize = 8;
    const totalPages = Math.max(1, Math.ceil(serviceCards.length / pageSize));

    if (!serviceExpanded) {
      serviceCards.forEach((card, index) => card.classList.toggle("hidden", index >= initialLimit));
      showAllServices?.classList.toggle("hidden", serviceCards.length <= initialLimit);
      servicePagination?.classList.add("hidden");
      servicePagination?.classList.remove("flex");
      return;
    }

    servicePage = Math.min(Math.max(0, servicePage), totalPages - 1);
    const start = servicePage * pageSize;
    const end = start + pageSize;
    serviceCards.forEach((card, index) => card.classList.toggle("hidden", index < start || index >= end));
    showAllServices?.classList.add("hidden");
    servicePagination?.classList.toggle("hidden", totalPages <= 1);
    servicePagination?.classList.toggle("flex", totalPages > 1);
    if (servicePages) {
      servicePages.innerHTML = servicePageItems(totalPages, servicePage)
        .map((item) => item === "..."
          ? `<span class="px-2 text-mist/45">...</span>`
          : `<button type="button" data-service-page="${item}" class="${item === servicePage ? "bg-gold text-black" : "text-mist/55 hover:text-goldSoft"} flex h-10 min-w-10 items-center justify-center rounded-sm px-3 transition">${item + 1}</button>`)
        .join("");
    }
    if (servicePrev) servicePrev.disabled = servicePage === 0;
    if (serviceNext) serviceNext.disabled = servicePage === totalPages - 1;
  };

  const revealServices = () => {
    serviceExpanded = true;
    servicePage = 0;
    renderServiceCards();
  };

  const goToServicesPage = (direction) => {
    if (!serviceExpanded) return;
    servicePage += direction;
    renderServiceCards();
  };

  const goToPreviousServicesPage = () => goToServicesPage(-1);
  const goToNextServicesPage = () => goToServicesPage(1);
  const chooseServicesPage = (event) => {
    const button = event.target.closest("[data-service-page]");
    if (!button) return;
    servicePage = Number(button.dataset.servicePage);
    renderServiceCards();
  };

  showAllServices?.addEventListener("click", revealServices);
  servicePrev?.addEventListener("click", goToPreviousServicesPage);
  serviceNext?.addEventListener("click", goToNextServicesPage);
  servicePages?.addEventListener("click", chooseServicesPage);

  const handleServiceCardGlow = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  };

  const serviceDetails = (service, profile) => ({
    includes: [
      `${service.category} session with ${profile.name}`,
      `${service.mode} service option`,
      "Pre-session intake and intention setting",
      "Aftercare notes after the session"
    ],
    details: [
      `Provider: ${service.providerType}`,
      `Area: ${service.area}`,
      `Vendor: ${service.vendor}`,
      "Marketplace verification: Verified"
    ]
  });

  const openBooking = (service) => {
    activeBookingCleanup?.();
    document.querySelector("[data-dynamic-booking-root]")?.remove();

    const profile = serviceProfile(service);
    const bookingRoot = document.createElement("div");
    bookingRoot.dataset.dynamicBookingRoot = "true";
    bookingRoot.innerHTML = bookingSystemModal(
      service,
      profile,
      bookingPackageItems(service),
      bookingAvailabilityDays()
    );
    document.body.appendChild(bookingRoot);
    activeBookingCleanup = initBookingModal(bookingRoot, {
      autoOpen: true,
      onClose: () => {
        activeBookingCleanup?.();
        activeBookingCleanup = undefined;
        bookingRoot.remove();
      }
    });
    document.dispatchEvent(new CustomEvent("prices:refresh"));
  };

  const openProfile = (service) => {
    if (!profileModal) return;
    const profile = serviceProfile(service);
    const badge = serviceModeBadge(service.mode);
    const details = serviceDetails(service, profile);

    profileModal.querySelector("[data-profile-image]").src = profile.image;
    profileModal.querySelector("[data-profile-image]").alt = profile.name;
    profileModal.querySelector("[data-profile-category]").textContent = service.category;
    profileModal.querySelector("[data-profile-healer]").textContent = profile.name;
    profileModal.querySelector("[data-profile-title]").textContent = profile.title;
    profileModal.querySelector("[data-profile-description]").textContent = profile.description;
    profileModal.querySelector("[data-profile-location] span").textContent = profile.location;
    profileModal.querySelector("[data-profile-provider]").textContent = service.providerType;
    profileModal.querySelector("[data-profile-experience]").textContent = `${profile.experience} exp`;
    profileModal.querySelector("[data-profile-sessions]").textContent = `${profile.sessions} sessions`;
    profileModal.querySelector("[data-profile-rating]").textContent = `${service.rating} (${profile.reviews} reviews)`;
    profileModal.querySelector("[data-profile-price]").textContent = service.price;
    profileModal.querySelector("[data-profile-price]").dataset.priceIdr = service.price;
    if (profileBookButton) profileBookButton.dataset.profileBookService = service.name;

    const modeBadge = profileModal.querySelector("[data-profile-mode]");
    modeBadge.textContent = badge.label;
    modeBadge.className = `rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`;

    profileModal.querySelector("[data-profile-includes]").innerHTML = details.includes.map((item) => `
      <li class="flex gap-2"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span><span>${item}</span></li>
    `).join("");
    profileModal.querySelector("[data-profile-details]").innerHTML = details.details.map((item) => `
      <li class="flex gap-2"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span><span>${item}</span></li>
    `).join("");

    profileModal.classList.remove("hidden");
    profileModal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    document.dispatchEvent(new CustomEvent("prices:refresh"));
  };

  const closeProfile = () => {
    profileModal?.classList.add("hidden");
    profileModal?.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  };

  const handleBookingClick = (event) => {
    const button = event.target.closest("[data-book-service]");
    if (!button) return;
    const service = services.find((item) => item.name === button.dataset.bookService);
    if (service) openBooking(service);
  };

  const handleProfileClick = (event) => {
    const button = event.target.closest("[data-view-profile]");
    if (!button) return;
    const service = services.find((item) => item.name === button.dataset.viewProfile);
    if (service) openProfile(service);
  };

  const handleProfileBook = () => {
    const service = services.find((item) => item.name === profileBookButton?.dataset.profileBookService);
    if (!service) return;
    closeProfile();
    openBooking(service);
  };

  const handleEscape = (event) => {
    if (event.key !== "Escape") return;
    closeProfile();
  };

  const formatDate = (date) => `${datePickerMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const sameDate = (firstDate, secondDate) => (
    firstDate &&
    secondDate &&
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );

  const selectedDate = () => {
    if (!activeDateInput?.dataset.isoDate) return null;
    const [year, month, day] = activeDateInput.dataset.isoDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const positionCalendar = () => {
    if (!activeDateInput || calendar.classList.contains("hidden")) return;
    const rect = activeDateInput.getBoundingClientRect();
    const gap = 8;
    const calendarWidth = 320;
    const calendarHeight = 340;
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - calendarWidth - 12);
    const hasBottomSpace = rect.bottom + gap + calendarHeight <= window.innerHeight;
    const top = hasBottomSpace ? rect.bottom + gap : Math.max(12, rect.top - calendarHeight - gap);

    calendar.style.left = `${left}px`;
    calendar.style.top = `${top}px`;
  };

  const renderCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const today = new Date();
    const selected = selectedDate();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const cells = [];

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      cells.push({ day: previousMonthDays - index, offset: -1 });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ day, offset: 0 });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ day: cells.length - firstDay - daysInMonth + 1, offset: 1 });
    }

    calendar.innerHTML = `
      <div class="mb-5 grid grid-cols-[34px_minmax(0,1fr)_34px] items-center gap-2">
        <button type="button" data-calendar-prev class="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/10 bg-black/35 text-mist/60 transition hover:border-gold/35 hover:bg-gold hover:text-black" aria-label="Previous month">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <p class="text-center text-sm font-semibold text-mist/80">${datePickerMonths[month]} ${year}</p>
        <button type="button" data-calendar-next class="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/10 bg-black/35 text-mist/60 transition hover:border-gold/35 hover:bg-gold hover:text-black" aria-label="Next month">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-mist/45">
        ${datePickerDays.map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="mt-3 grid grid-cols-7 gap-2">
        ${cells.map((cell) => {
          const cellDate = new Date(year, month + cell.offset, cell.day);
          const isSelected = sameDate(cellDate, selected);
          const isToday = sameDate(cellDate, today);
          const dateValue = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, "0")}-${String(cellDate.getDate()).padStart(2, "0")}`;
          const stateClass = isSelected
            ? "border-gold bg-gold text-black shadow-[0_10px_24px_rgba(214,170,67,0.24)]"
            : isToday
              ? "border-gold/45 bg-gold/10 text-goldSoft"
              : "border-transparent text-mist/70 hover:border-gold/25 hover:bg-gold/10 hover:text-goldSoft";
          const mutedClass = cell.offset === 0 ? "" : "text-mist/25 hover:text-mist/45";

          return `
            <button type="button" data-calendar-day="${dateValue}" class="flex h-9 items-center justify-center rounded-lg border text-sm font-medium transition ${stateClass} ${mutedClass}">
              ${cellDate.getDate()}
            </button>
          `;
        }).join("")}
      </div>
    `;
  };

  const openDatePickerForInput = (input) => {
    ignoreOutsideClickUntil = Date.now() + 180;
    activeDateInput = input;
    const selected = selectedDate();
    calendarDate = selected || new Date();
    renderCalendar();
    calendar.classList.remove("hidden");
    positionCalendar();
  };

  const openDatePicker = (event) => {
    event.stopPropagation();
    openDatePickerForInput(event.currentTarget);
  };

  const openDatePickerFromContainer = (event) => {
    event.stopPropagation();
    const input = event.currentTarget.querySelector("[data-date-picker]");
    if (input) openDatePickerForInput(input);
  };

  const closeDatePicker = () => {
    calendar.classList.add("hidden");
    activeDateInput = undefined;
  };

  const chooseDate = (date) => {
    if (!activeDateInput) return;
    activeDateInput.dataset.isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    activeDateInput.value = formatDate(date);
    activeDateInput.dispatchEvent(new Event("change", { bubbles: true }));
    closeDatePicker();
  };

  const handleCalendarClick = (event) => {
    event.stopPropagation();
    const dayButton = event.target.closest("[data-calendar-day]");
    if (dayButton) {
      const [year, month, day] = dayButton.dataset.calendarDay.split("-").map(Number);
      chooseDate(new Date(year, month - 1, day));
      return;
    }

    if (event.target.closest("[data-calendar-prev]")) {
      calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
      renderCalendar();
      positionCalendar();
      return;
    }

    if (event.target.closest("[data-calendar-next]")) {
      calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
      renderCalendar();
      positionCalendar();
      return;
    }

    if (event.target.closest("[data-calendar-today]")) {
      chooseDate(new Date());
      return;
    }

    if (event.target.closest("[data-calendar-clear]")) {
      if (activeDateInput) {
        activeDateInput.value = "";
        delete activeDateInput.dataset.isoDate;
        activeDateInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
      closeDatePicker();
    }
  };

  const handleCalendarChange = (event) => {
    event.stopPropagation();

    if (event.target.closest("[data-calendar-month]")) {
      calendarDate = new Date(calendarDate.getFullYear(), Number(event.target.value), 1);
      renderCalendar();
      positionCalendar();
      return;
    }

    if (event.target.closest("[data-calendar-year]")) {
      calendarDate = new Date(Number(event.target.value), calendarDate.getMonth(), 1);
      renderCalendar();
      positionCalendar();
    }
  };

  const handleDatePickerOutsideClick = (event) => {
    if (calendar.classList.contains("hidden")) return;
    if (Date.now() < ignoreOutsideClickUntil) return;
    if (
      event.target.closest("[data-date-calendar]") ||
      event.target.closest("[data-date-picker-container]")
    ) return;
    closeDatePicker();
  };

  const handleDatePickerEscape = (event) => {
    if (event.key === "Escape") closeDatePicker();
  };

  document.addEventListener("click", handleBookingClick);
  document.addEventListener("click", handleProfileClick);
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleDatePickerOutsideClick);
  document.addEventListener("keydown", handleDatePickerEscape);
  window.addEventListener("resize", positionCalendar);
  window.addEventListener("scroll", positionCalendar, true);
  calendar.addEventListener("click", handleCalendarClick);
  calendar.addEventListener("change", handleCalendarChange);
  closeProfileButtons.forEach((button) => button.addEventListener("click", closeProfile));
  profileBookButton?.addEventListener("click", handleProfileBook);
  serviceCards.forEach((card) => card.addEventListener("pointermove", handleServiceCardGlow));
  dateInputs.forEach((input) => {
    input.addEventListener("pointerdown", openDatePicker);
    input.addEventListener("click", openDatePicker);
  });
  datePickerContainers.forEach((container) => container.addEventListener("click", openDatePickerFromContainer));

  render();
  renderTestimonials();
  renderServiceCards();
  restart();
  restartTestimonials();

  return () => {
    window.clearInterval(timer);
    window.clearInterval(testimonialTimer);
    activeBookingCleanup?.();
    document.querySelector("[data-dynamic-booking-root]")?.remove();
    showAllServices?.removeEventListener("click", revealServices);
    servicePrev?.removeEventListener("click", goToPreviousServicesPage);
    serviceNext?.removeEventListener("click", goToNextServicesPage);
    servicePages?.removeEventListener("click", chooseServicesPage);
    document.removeEventListener("click", handleBookingClick);
    document.removeEventListener("click", handleProfileClick);
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("click", handleDatePickerOutsideClick);
    document.removeEventListener("keydown", handleDatePickerEscape);
    window.removeEventListener("resize", positionCalendar);
    window.removeEventListener("scroll", positionCalendar, true);
    calendar.removeEventListener("click", handleCalendarClick);
    calendar.removeEventListener("change", handleCalendarChange);
    closeProfileButtons.forEach((button) => button.removeEventListener("click", closeProfile));
    profileBookButton?.removeEventListener("click", handleProfileBook);
    serviceCards.forEach((card) => card.removeEventListener("pointermove", handleServiceCardGlow));
    dateInputs.forEach((input) => {
      input.removeEventListener("pointerdown", openDatePicker);
      input.removeEventListener("click", openDatePicker);
    });
    datePickerContainers.forEach((container) => container.removeEventListener("click", openDatePickerFromContainer));
    calendar.remove();
    document.body.classList.remove("overflow-hidden");
  };
}

function serviceCard(service, isHidden = false) {
  const badge = serviceModeBadge(service.mode);
  const profile = serviceProfile(service);
  const providerLabel = service.providerType === "Partner" ? "Partner" : "Healer";
  const providerBadgeClass = service.providerType === "Partner"
    ? "bg-cyan-200 text-cyan-950"
    : "bg-rose-200 text-rose-950";
  return `
    <article data-service-card class="${isHidden ? "hidden" : ""} service-glow-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-[#10100f] transition hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_24px_60px_rgba(214,170,67,0.13)]">
      <div class="relative aspect-[4/3] overflow-hidden bg-black">
        <img src="${profile.image}" alt="${profile.name}" class="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#10100f] to-transparent"></div>
        <span class="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${providerBadgeClass}">
          <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="3"/><path d="M6 21a6 6 0 0 1 12 0"/></svg>
          ${providerLabel}
        </span>
        <button class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-black/55 text-gold backdrop-blur transition hover:bg-gold hover:text-black">
          <span class="sr-only">Save service</span>
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>
        </button>
      </div>

      <div class="flex flex-1 flex-col p-5">
        <div class="flex items-center justify-between gap-3 text-sm font-medium">
          <span class="flex min-w-0 items-center gap-2 text-gold">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="truncate">${profile.location}</span>
          </span>
          <span class="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}">${badge.label}</span>
        </div>

        <div class="mt-3 flex min-h-[76px] items-start justify-between gap-3">
          <div class="min-w-0">
            <h4 class="text-xl font-semibold text-white">${service.category}</h4>
            <p class="mt-1 text-sm leading-5 text-mist/65">${profile.name}</p>
          </div>
        </div>

        <p class="mt-3 min-h-[48px] line-clamp-2 text-sm leading-6 text-mist/55">${profile.description}</p>

        <div class="mt-auto pt-4">
          <div class="grid min-h-[88px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-gold/10 pt-4 text-xs text-mist/55">
            <span class="flex min-w-0 items-center gap-2">
              <svg class="h-3.5 w-3.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <span class="truncate">${profile.experience} exp</span>
            </span>
            <span class="flex min-w-0 items-center justify-end gap-2 text-right">
              <svg class="h-3.5 w-3.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span class="truncate">${profile.sessions} sessions</span>
            </span>
            <span class="flex min-w-0 items-center gap-2">
              <svg class="h-3.5 w-3.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.4-6.1 3.4 1.4-6.8-5.1-4.7 6.9-.8L12 2Z"/></svg>
              <span class="truncate">${service.rating} (${profile.reviews} reviews)</span>
            </span>
            <span class="flex min-w-0 items-center justify-end gap-2 text-right">
              <svg class="h-3.5 w-3.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M12 6v6h4"/></svg>
              <span class="truncate">${service.duration}</span>
            </span>
          </div>
          <p data-price-idr="${service.price}" class="border-b border-gold/10 py-4 text-center text-sm font-extrabold leading-none text-goldSoft">${service.price}</p>

          <div class="flex min-h-[48px] items-end justify-between gap-3 pt-4">
            <a href="#healing-space?service=${encodeURIComponent(service.name)}" class="min-w-0 rounded-md px-1 py-2 text-left text-sm font-extrabold text-gold transition duration-200 hover:text-goldSoft hover:[text-shadow:0_0_16px_rgba(244,217,135,0.45)]">Enter Healing Space</a>
            <button data-book-service="${service.name}" class="shrink-0 rounded-lg bg-gold px-4 py-2 text-sm font-extrabold text-black transition hover:bg-goldSoft">Book</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function serviceProfile(service) {
  const profiles = {
    "Balinese Energy Healing": {
      name: "I Wayan Suardana",
      title: "Traditional Energy Healer",
      description: "Blends Balinese cleansing, grounding, and energy reading for a calm personal session.",
      location: "Ubud, Bali",
      experience: "25y",
      sessions: "156",
      reviews: "42",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
    },
    "Online Chakra Balancing": {
      name: "Ni Made Kerti",
      title: "Chakra & Meditation Guide",
      description: "Guides remote chakra alignment with meditation, breath cues, and aftercare notes.",
      location: "Online",
      experience: "12y",
      sessions: "89",
      reviews: "28",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
    },
    "Sound Bath Meditation": {
      name: "Canggu Healing Co.",
      title: "Sound Healing Studio",
      description: "A registered studio with bowl, gong, and vibrational therapy practitioners for small groups.",
      location: "Canggu, Bali",
      experience: "8y",
      sessions: "67",
      reviews: "15",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
    },
    "Corporate Wellness Day": {
      name: "Bali Wellness Agent",
      title: "Corporate Wellness Organizer",
      description: "A facilitator team for workplace wellness, retreats, and onsite or hybrid programs.",
      location: "Seminyak, Bali",
      experience: "10y",
      sessions: "132",
      reviews: "36",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80"
    },
    "Melukat Purification Ritual": {
      name: "Jero Mangku Sari",
      title: "Melukat Ritual Guide",
      description: "A sacred water ritual guide with temple etiquette, prayers, and respectful preparation.",
      location: "Tampaksiring, Bali",
      experience: "18y",
      sessions: "120",
      reviews: "31",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
    },
    "Sunset Breathwork Journey": {
      name: "Canggu Breath Studio",
      title: "Breathwork & Nervous System Studio",
      description: "Breath regulation sessions for release, clarity, and body reset with online follow-up options.",
      location: "Canggu, Bali",
      experience: "7y",
      sessions: "98",
      reviews: "24",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80"
    },
    "Private Yoga Therapy": {
      name: "Kadek Surya",
      title: "Yoga Therapy Practitioner",
      description: "Mindful movement sessions for mobility, recovery, and personalized body restoration.",
      location: "Uluwatu, Bali",
      experience: "9y",
      sessions: "74",
      reviews: "19",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
    },
    "Guided Meditation Session": {
      name: "Still Mind Bali",
      title: "Online Meditation Collective",
      description: "Online meditation classes for focus, sleep, and emotional calm with flexible scheduling.",
      location: "Online",
      experience: "6y",
      sessions: "110",
      reviews: "33",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80"
    },
    "Tarot Reflection Reading": {
      name: "Luna Tarot Bali",
      title: "Tarot & Intuitive Reading Guide",
      description: "Reflective tarot reading for emotional clarity, relationship questions, and grounded next steps.",
      location: "Ubud, Bali",
      experience: "8y",
      sessions: "86",
      reviews: "27",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80"
    }
  };

  return profiles[service.name] || {
    name: service.vendor,
    title: service.name,
    description: `${service.providerType} for ${service.name.toLowerCase()} sessions with a personal approach and aftercare.`,
    location: service.area === "Online" ? "Online" : `${service.area}, Bali`,
    experience: "5y",
    sessions: "60",
    reviews: "18",
    image: service.image
  };
}

function servicePageItems(totalPages, currentPage) {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = new Set([0, totalPages - 1, currentPage]);
  if (currentPage > 0) pages.add(currentPage - 1);
  if (currentPage < totalPages - 1) pages.add(currentPage + 1);

  const orderedPages = [...pages].sort((first, second) => first - second);
  return orderedPages.flatMap((page, index) => {
    if (index === 0) return [page];
    const previous = orderedPages[index - 1];
    return page - previous > 1 ? ["...", page] : [page];
  });
}

export function serviceModeBadge(mode) {
  const badges = {
    Online: {
      label: "Online",
      className: "border-sky-300/25 bg-sky-400/10 text-sky-200"
    },
    Offline: {
      label: "Offline",
      className: "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
    },
    Hybrid: {
      label: "Hybrid",
      className: "border-gold/35 bg-gold/15 text-goldSoft"
    }
  };

  return badges[mode] || badges.Hybrid;
}

function testimonialGroups() {
  const groups = [];
  for (let index = 0; index < testimonials.length; index += 4) {
    groups.push(testimonials.slice(index, index + 4));
  }
  return groups;
}

function testimonialSlide(group) {
  return `
    <article data-testimonial-slide class="w-full shrink-0 px-1 md:px-2">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        ${group.map((item) => `
          <div class="min-h-[260px] rounded-xl border border-gold/15 bg-panel p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <img src="${item.photo}" alt="${item.name}" class="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-gold/35" />
                <div class="min-w-0">
                  <p class="truncate font-semibold text-white">${item.name}</p>
                  <p class="mt-1 text-xs text-mist/45">${item.city}</p>
                  <p class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-goldSoft">${item.country}</p>
                </div>
              </div>
              <span class="flex items-center gap-1 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-bold text-goldSoft">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.4-6.1 3.4 1.4-6.8-5.1-4.7 6.9-.8L12 2Z"/></svg>
                ${item.rating}
              </span>
            </div>
            <p class="mt-5 text-sm leading-7 text-mist/70">"${item.quote}"</p>
            <div class="mt-5 border-t border-gold/10 pt-4">
              <p class="text-xs uppercase tracking-[0.16em] text-mist/35">Booked service</p>
              <p class="mt-1 text-sm font-semibold text-goldSoft">${item.service}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function promoSlide(promo, index) {
  const theme = promoThemes[index % promoThemes.length];
  const promoService = promoServiceName(promo);

  if (promo.layout === "beji") {
    return bejiPromoSlide(promo, theme);
  }

  return `
    <article data-promo-slide class="relative min-h-[380px] w-full shrink-0 overflow-hidden bg-black md:min-h-[430px]" style="--promo-accent: ${theme.accent}; --promo-soft: ${theme.accentSoft}; --promo-line: ${theme.accentLine}; --promo-text: ${theme.text};">
      <img src="${promo.image}" alt="${promo.title}" class="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_26%_48%,var(--promo-soft),transparent_34%)]"></div>
      <div class="absolute inset-x-0 bottom-0 h-px bg-[var(--promo-line)]"></div>

      <div class="relative mx-auto flex min-h-[380px] max-w-6xl items-center px-8 py-14 md:min-h-[430px] lg:px-10">
        <div class="max-w-2xl">
          <div class="flex flex-wrap items-center gap-3">
            <span class="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold" style="border-color: color-mix(in srgb, var(--promo-accent) 45%, transparent); background: var(--promo-soft); color: var(--promo-text);">
              <span aria-hidden="true">✣</span>
              <span>${promo.tag}</span>
            </span>
            <span class="rounded-md px-4 py-2 text-xs font-extrabold text-black" style="background: var(--promo-accent);">${promo.offer}</span>
          </div>
          <h3 class="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">${promo.title}</h3>
          <p class="mt-3 text-sm font-bold" style="color: var(--promo-text);">${promo.vendor} - ${promo.area}</p>
          <p class="mt-3 max-w-xl text-base leading-7 text-white/75">${promo.description}</p>
          <button data-book-service="${promoService}" class="mt-7 rounded-full px-7 py-3 text-sm font-extrabold text-black shadow-[0_18px_55px_rgba(0,0,0,0.32)] transition hover:brightness-110" style="background: var(--promo-accent);">
            ${promo.cta}
          </button>
        </div>

        <div class="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-medium text-mist/70 backdrop-blur md:block">
          <span aria-hidden="true">☞</span> Sponsored - ${promo.vendor}
        </div>

        <div class="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[11px] font-medium text-mist/60 backdrop-blur md:block">
          <span aria-hidden="true">☞</span> Advertise your partner service here - Contact Admin
        </div>
      </div>
    </article>
  `;
}

function promoServiceName(promo) {
  return services.find((service) => service.vendor === promo.vendor)?.name
    || services.find((service) => service.area === promo.area)?.name
    || services[0].name;
}
