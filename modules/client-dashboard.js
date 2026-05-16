import { bookings, services } from "../js/data.js";

let activeSection = "Dashboard";

const menuItems = [
  ["Dashboard", "grid"],
  ["Bookings", "calendar"],
  ["Chat", "chat"],
  ["Leads", "users"],
  ["Transaction", "card"],
  ["Wallet", "wallet"],
  ["Notification", "bell"],
  ["Wishlists", "heart"],
  ["Tickets", "ticket"],
  ["Settings", "settings"],
  ["Logout", "logout"]
];

const transactions = [
  { service: "Balinese Energy Healing", date: "May 16, 2026", time: "08:28 PM", amount: "$216.00", image: services[0]?.image },
  { service: "Online Chakra Balancing", date: "May 18, 2026", time: "03:13 PM", amount: "$108.00", image: services[1]?.image },
  { service: "Sound Bath Meditation", date: "May 21, 2026", time: "09:41 PM", amount: "$108.00", image: services[2]?.image },
  { service: "Melukat Purification Ritual", date: "Jun 4, 2026", time: "09:44 PM", amount: "$216.00", image: services[3]?.image },
  { service: "Breathwork Journey", date: "Jun 8, 2026", time: "09:41 PM", amount: "$108.00", image: services[4]?.image }
];

const recentBookings = [
  { service: "Balinese Energy Healing", date: "May 16, 2026", healer: "Ubud Sacred Hands", email: "healer@balihealer.com", image: services[0]?.image },
  { service: "Online Chakra Balancing", date: "May 18, 2026", healer: "Lotus Breath Studio", email: "studio@balihealer.com", image: services[1]?.image },
  { service: "Sound Bath Meditation", date: "May 21, 2026", healer: "Canggu Sound Temple", email: "sound@balihealer.com", image: services[2]?.image },
  { service: "Melukat Purification Ritual", date: "Jun 4, 2026", healer: "Tirta Aura Healer", email: "tirta@balihealer.com", image: services[3]?.image },
  { service: "Breathwork Journey", date: "Jun 8, 2026", healer: "Bali Wellness Agent", email: "wellness@balihealer.com", image: services[4]?.image }
];

function icon(name, className = "h-4 w-4") {
  const paths = {
    grid: `<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
    chat: `<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>`,
    users: `<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>`,
    card: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>`,
    wallet: `<path d="M4 7h16v12H4z"/><path d="M16 12h4v4h-4z"/><path d="M4 7l3-4h12v4"/>`,
    bell: `<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>`,
    heart: `<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>`,
    ticket: `<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/>`,
    settings: `<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3-.2-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V22h-3.4v-.3a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.2.1-2-3 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-3.4h.3a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3 .2.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V2h3.4v.3a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.2-.1 2 3-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.3v3.4h-.3a1.7 1.7 0 0 0-1.5 1Z"/>`,
    logout: `<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/>`,
    home: `<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>`
  };
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.grid}</svg>`;
}

function navButton([label, iconName]) {
  const active = activeSection === label;
  return `
    <button data-client-dashboard-menu="${label}" class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${active ? "bg-gold/15 text-goldSoft" : "text-mist/65 hover:bg-gold/10 hover:text-goldSoft"}">
      ${icon(iconName, "h-4 w-4 shrink-0")}
      <span class="flex-1">${label}</span>
      ${label === "Chat" ? `<span class="rounded bg-red-600 px-2 py-0.5 text-[11px] font-extrabold text-white">2</span>` : ""}
      ${label === "Settings" ? `<span class="text-mist/35">›</span>` : ""}
    </button>
  `;
}

function sidebar() {
  return `
    <aside class="rounded-lg border border-gold/15 bg-[#0f0d0a] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] lg:sticky lg:top-28">
      <div class="rounded-lg border border-gold/10 bg-black/35 p-5 text-center">
        <img src="../assets/images/logo-bali-healer.png" alt="Demo user" class="mx-auto h-20 w-20 rounded-full border border-gold/45 bg-black object-contain p-1" />
        <h2 class="mt-4 text-base font-extrabold text-white">Demo Client</h2>
        <p class="mt-2 text-xs text-mist/50">Member since Dec 2024</p>
      </div>
      <nav class="mt-5 space-y-1">
        ${menuItems.map(navButton).join("")}
      </nav>
    </aside>
  `;
}

function statCard(label, value, iconName) {
  return `
    <article class="flex items-center gap-4 rounded-lg border border-gold/15 bg-[#0f0d0a] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
      <span class="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-goldSoft">${icon(iconName)}</span>
      <div>
        <p class="text-xs text-mist/55">${label}</p>
        <p class="mt-1 text-lg font-extrabold text-white">${value}</p>
      </div>
    </article>
  `;
}

function transactionRow(item) {
  return `
    <article class="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 border-b border-gold/10 px-3 py-3 last:border-b-0">
      <img src="${item.image || "../assets/images/logo-bali-healer.png"}" alt="" class="h-10 w-10 rounded-full object-cover" />
      <div class="min-w-0">
        <p class="truncate text-sm font-extrabold text-white">${item.service}</p>
        <p class="mt-1 text-xs text-mist/45">${item.date} · ${item.time}</p>
      </div>
      <p class="font-extrabold text-goldSoft">${item.amount}</p>
    </article>
  `;
}

function bookingRow(item) {
  return `
    <article class="grid grid-cols-[48px_minmax(0,1fr)_minmax(150px,0.8fr)] items-center gap-3 border-b border-gold/10 px-3 py-3 last:border-b-0">
      <img src="${item.image || "../assets/images/logo-bali-healer.png"}" alt="" class="h-10 w-10 rounded-md object-cover" />
      <div class="min-w-0">
        <p class="truncate text-sm font-extrabold text-white">${item.service}</p>
        <p class="mt-1 text-xs text-mist/45">${item.date}</p>
      </div>
      <div class="min-w-0">
        <p class="truncate text-sm font-bold text-goldSoft">${item.healer}</p>
        <p class="truncate text-xs text-mist/45">${item.email}</p>
      </div>
    </article>
  `;
}

function listPanel(title, body) {
  return `
    <section class="rounded-lg border border-gold/15 bg-[#0f0d0a] p-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-extrabold text-white">${title}</h3>
      </div>
      <div class="mt-3 overflow-hidden rounded-lg border border-gold/10 bg-black/25">${body}</div>
      <button class="mt-4 w-full rounded-md border border-gold/20 px-4 py-2 text-sm font-extrabold text-goldSoft transition hover:bg-gold hover:text-black">View All</button>
    </section>
  `;
}

function dashboardSection() {
  return `
    <div>
      <h2 class="text-xl font-extrabold text-white">Dashboard</h2>
      <div class="mt-4 grid gap-5 md:grid-cols-2">
        ${statCard("Total Orders", "9", "calendar")}
        ${statCard("Total Spend", "$1155.60", "card")}
      </div>
      <div class="mt-6 grid gap-5 xl:grid-cols-2">
        ${listPanel("Recent Transaction", transactions.map(transactionRow).join(""))}
        ${listPanel("Recent Booking", recentBookings.map(bookingRow).join(""))}
      </div>
    </div>
  `;
}

function genericSection() {
  const content = {
    Bookings: recentBookings.map(bookingRow).join(""),
    Transaction: transactions.map(transactionRow).join(""),
    Wishlists: services.slice(0, 5).map((service) => transactionRow({ service: service.name, date: service.area, time: service.mode, amount: service.price, image: service.image })).join(""),
    Chat: ["Support: Your booking has been confirmed.", "Healer: Please arrive 10 minutes early.", "Admin: Payment receipt received."].map((text) => `<p class="border-b border-gold/10 px-4 py-4 text-sm text-mist/75 last:border-b-0">${text}</p>`).join(""),
    Leads: ["Retreat follow-up", "Couple healing inquiry", "Airport-area mobile service"].map((text) => `<p class="border-b border-gold/10 px-4 py-4 text-sm text-mist/75 last:border-b-0">${text}</p>`).join(""),
    Wallet: transactions.map(transactionRow).join(""),
    Notification: ["Booking reminder for tomorrow", "New message from healer", "Wishlist service price changed"].map((text) => `<p class="border-b border-gold/10 px-4 py-4 text-sm text-mist/75 last:border-b-0">${text}</p>`).join(""),
    Tickets: ["TCK-1028 · Refund question · Open", "TCK-1029 · Schedule change · Closed"].map((text) => `<p class="border-b border-gold/10 px-4 py-4 text-sm text-mist/75 last:border-b-0">${text}</p>`).join(""),
    Settings: ["Profile information", "Password and security", "Notification preference"].map((text) => `<p class="border-b border-gold/10 px-4 py-4 text-sm text-mist/75 last:border-b-0">${text}</p>`).join("")
  };

  return `
    <div>
      <h2 class="text-xl font-extrabold text-white">${activeSection}</h2>
      <p class="mt-2 text-sm text-mist/55">Manage your ${activeSection.toLowerCase()} from your Bali Healer client account.</p>
      <div class="mt-5 rounded-lg border border-gold/15 bg-[#0f0d0a]">
        ${content[activeSection] || ""}
      </div>
    </div>
  `;
}

function pageContent() {
  return activeSection === "Dashboard" ? dashboardSection() : genericSection();
}

export function render() {
  return `
    <section class="bg-[#070604] px-4 py-10 text-mist lg:px-8">
      <div class="mx-auto max-w-6xl">
        <header class="rounded-lg border border-gold/15 bg-[#0f0d0a] px-6 py-8 text-center">
          <h1 class="text-3xl font-extrabold text-white">Dashboard</h1>
          <div class="mt-3 flex items-center justify-center gap-2 text-sm text-mist/55">
            ${icon("home", "h-4 w-4 text-goldSoft")}
            <span>Client</span>
            <span>›</span>
            <span class="text-goldSoft">${activeSection}</span>
          </div>
        </header>
        <div class="mt-8 grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">
          ${sidebar()}
          <main data-client-dashboard-content>${pageContent()}</main>
        </div>
      </div>
    </section>
  `;
}

export function init() {
  const handleClick = (event) => {
    const button = event.target.closest("[data-client-dashboard-menu]");
    if (!button) return;
    const section = button.dataset.clientDashboardMenu;
    if (section === "Logout") {
      document.querySelector("[data-client-logout]")?.click();
      return;
    }
    activeSection = section;
    const root = document.querySelector("#app");
    if (root) root.innerHTML = render();
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}
