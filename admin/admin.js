import { services, bookings, vendors, healingCategories, promotions } from "../js/data.js";

const app = document.querySelector("#admin-app");
const AUTH_KEY = "baliHealerAdminSession";
const SETTINGS_KEY = "baliHealerAdminSettings";
const GATEWAYS_KEY = "baliHealerPaymentGateways";
const LANGUAGE_KEY = "baliHealerAdminLanguage";

const credentials = {
  username: "superadmin",
  password: "BaliHealer@2026"
};

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const defaultSettings = {
  logo: "../assets/images/logo-bali-healer.png",
  heroVideo: "../assets/videos/hero-bali-healer.mp4",
  siteName: "Bali Healer",
  heroTitle: "Discover Your Healing Journey in Bali",
  heroSubtitle: "Connect with Bali's most authentic healers and discover ancient rituals for your body, mind, and soul.",
  supportEmail: "hello@balihealer.com",
  phone: "+62 361 123 4567",
  commission: "12%",
  cancellationWindow: "24 hours",
  maintenance: false
};

const defaultGateways = [
  { id: createId(), name: "Midtrans", provider: "Card, VA, QRIS", mode: "Production", status: "Active", currency: "IDR", fee: "2.9%", settlement: "T+2", apiKey: "mid-server-key-prod", clientKey: "mid-client-key-prod", webhookUrl: "https://balihealer.com/api/payments/midtrans/webhook", successUrl: "https://balihealer.com/payment/success", failureUrl: "https://balihealer.com/payment/failed", fraudRule: "Manual review above Rp5,000,000", maintenance: false },
  { id: createId(), name: "HitPay", provider: "Wallet, PayNow", mode: "Sandbox", status: "Testing", currency: "IDR", fee: "2.7%", settlement: "T+3", apiKey: "hitpay-api-key-sandbox", clientKey: "hitpay-salt", webhookUrl: "https://balihealer.com/api/payments/hitpay/webhook", successUrl: "https://balihealer.com/payment/success", failureUrl: "https://balihealer.com/payment/failed", fraudRule: "3DS required for cards", maintenance: false },
  { id: createId(), name: "Stripe", provider: "Card, Apple Pay", mode: "Sandbox", status: "Disabled", currency: "USD", fee: "3.4%", settlement: "T+7", apiKey: "sk_test_xxx", clientKey: "pk_test_xxx", webhookUrl: "https://balihealer.com/api/payments/stripe/webhook", successUrl: "https://balihealer.com/payment/success", failureUrl: "https://balihealer.com/payment/failed", fraudRule: "Stripe Radar default", maintenance: true }
];

let activeSection = "command";
let settings = readJson(SETTINGS_KEY, defaultSettings);
let gateways = readJson(GATEWAYS_KEY, defaultGateways);
let selectedLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";

const translations = {
  en: {
    adminConsole: "Super Admin Console",
    signedInAs: "Signed in as",
    fullAccess: "Full marketplace access",
    resetSession: "Reset Session",
    marketplaceBackOffice: "Marketplace Back Office",
    language: "Language",
    gateway: "Gateway",
    orders: "Orders",
    vendors: "Vendors",
    services: "Services",
    active: "Active",
    open: "Open",
    managed: "Managed",
    live: "Live",
    executive: "Executive",
    operations: "Operations",
    finance: "Finance",
    growth: "Growth",
    administration: "Administration",
    command: "Command Center",
    commandHelp: "Executive overview",
    ordersMenu: "Orders & Bookings",
    ordersHelp: "Approvals, schedule, refunds",
    vendorsMenu: "Vendors & Healers",
    vendorsHelp: "Verification and payouts",
    catalog: "Service Catalog",
    catalogHelp: "Listings, categories, pricing",
    customers: "Customers",
    customersHelp: "Profiles, CRM, segments",
    financeMenu: "Finance",
    financeHelp: "Payouts, fees, disputes",
    payments: "Payment Gateway",
    paymentsHelp: "Gateway CRUD and rules",
    marketing: "Marketing",
    marketingHelp: "Campaigns and promotions",
    analytics: "Analytics",
    analyticsHelp: "Revenue and behavior",
    content: "Website CMS",
    contentHelp: "Logo, hero, menus, SEO",
    roles: "Users & Roles",
    rolesHelp: "Staff permission matrix",
    system: "System",
    systemHelp: "Audit, security, health",
    action: "Action"
  },
  id: {
    adminConsole: "Konsol Super Admin",
    signedInAs: "Masuk sebagai",
    fullAccess: "Akses marketplace penuh",
    resetSession: "Reset Sesi",
    marketplaceBackOffice: "Back Office Marketplace",
    language: "Bahasa",
    gateway: "Gateway",
    orders: "Pesanan",
    vendors: "Vendor",
    services: "Layanan",
    active: "Aktif",
    open: "Terbuka",
    managed: "Dikelola",
    live: "Live",
    executive: "Eksekutif",
    operations: "Operasional",
    finance: "Keuangan",
    growth: "Pertumbuhan",
    administration: "Administrasi",
    command: "Pusat Kendali",
    commandHelp: "Ringkasan eksekutif",
    ordersMenu: "Pesanan & Booking",
    ordersHelp: "Approval, jadwal, refund",
    vendorsMenu: "Vendor & Healer",
    vendorsHelp: "Verifikasi dan payout",
    catalog: "Katalog Layanan",
    catalogHelp: "Listing, kategori, harga",
    customers: "Pelanggan",
    customersHelp: "Profil, CRM, segmentasi",
    financeMenu: "Keuangan",
    financeHelp: "Payout, biaya, sengketa",
    payments: "Payment Gateway",
    paymentsHelp: "CRUD gateway dan aturan",
    marketing: "Marketing",
    marketingHelp: "Campaign dan promosi",
    analytics: "Analitik",
    analyticsHelp: "Revenue dan perilaku",
    content: "CMS Website",
    contentHelp: "Logo, hero, menu, SEO",
    roles: "User & Role",
    rolesHelp: "Matriks izin staff",
    system: "Sistem",
    systemHelp: "Audit, keamanan, kesehatan",
    action: "Aksi"
  }
};

const sectionCopy = {
  en: {
    command: ["Super Admin Command Center", "A high-level control room for GMV, bookings, risk, vendor health, payment readiness, and operational alerts."],
    orders: ["Orders, Bookings & Fulfillment", "Review marketplace booking flow from request to payment, confirmation, fulfillment, refund, and dispute escalation."],
    vendors: ["Vendor and Healer Operations", "Manage healer profiles, verification, compliance status, service quality, payout readiness, and account health."],
    catalog: ["Service Catalog Management", "Control all services, categories, pricing rules, availability, moderation state, and ranking visibility."],
    customers: ["Customer Management", "Understand guests, segments, spending, support status, lifetime value, and CRM follow-up needs."],
    finance: ["Finance, Payouts & Disputes", "Monitor commissions, settlements, vendor payouts, refunds, disputes, invoices, and payment reconciliation."],
    content: ["Website CMS and Global Settings", "Update logo, hero copy, SEO settings, contact info, marketplace policy copy, and website-wide configuration."],
    payments: ["Payment Gateway Configuration", "Create, enable, disable, and monitor payment providers, currencies, fee rules, settlement policy, and gateway status."],
    marketing: ["Marketing and Growth", "Plan promotions, coupons, banners, SEO campaigns, newsletters, and partner growth initiatives."],
    roles: ["Users, Roles and Access Control", "Define staff access for Super Admin, Admin, Manager, Marketing, support, finance, and vendor operators."],
    analytics: ["Analytics and Marketplace Intelligence", "Track marketplace performance, conversion, take rate, retention, service demand, and vendor contribution."],
    system: ["Security, Audit and System Health", "Review admin actions, security posture, integrations, queue health, storage, backups, and release readiness."]
  },
  id: {
    command: ["Pusat Kendali Super Admin", "Ruang kontrol utama untuk GMV, booking, risiko, kesehatan vendor, kesiapan payment, dan alert operasional."],
    orders: ["Pesanan, Booking & Fulfillment", "Tinjau alur booking marketplace dari request, pembayaran, konfirmasi, fulfillment, refund, sampai eskalasi sengketa."],
    vendors: ["Operasional Vendor dan Healer", "Kelola profil healer, verifikasi, status compliance, kualitas layanan, kesiapan payout, dan kesehatan akun."],
    catalog: ["Manajemen Katalog Layanan", "Kontrol semua layanan, kategori, aturan harga, availability, status moderasi, dan ranking listing."],
    customers: ["Manajemen Pelanggan", "Pahami guest, segmentasi, spending, status support, lifetime value, dan kebutuhan follow-up CRM."],
    finance: ["Keuangan, Payout & Sengketa", "Monitor komisi, settlement, payout vendor, refund, sengketa, invoice, dan rekonsiliasi payment."],
    content: ["CMS Website dan Setting Global", "Update logo, teks hero, SEO, kontak, policy marketplace, dan konfigurasi website."],
    payments: ["Konfigurasi Payment Gateway", "Buat, aktifkan, nonaktifkan, dan monitor provider payment, mata uang, fee, settlement, dan status gateway."],
    marketing: ["Marketing dan Pertumbuhan", "Rencanakan promosi, kupon, banner, campaign SEO, newsletter, dan inisiatif partner growth."],
    roles: ["User, Role dan Kontrol Akses", "Atur akses staff untuk Super Admin, Admin, Manager, Marketing, support, finance, dan operator vendor."],
    analytics: ["Analitik dan Intelijen Marketplace", "Pantau performa marketplace, conversion, take rate, retention, demand layanan, dan kontribusi vendor."],
    system: ["Keamanan, Audit dan Kesehatan Sistem", "Tinjau aktivitas admin, postur keamanan, integrasi, queue, storage, backup, dan kesiapan rilis."]
  }
};

const navGroups = [
  {
    labelKey: "executive",
    items: [
      ["command", "command", "commandHelp"],
      ["analytics", "analytics", "analyticsHelp"]
    ]
  },
  {
    labelKey: "operations",
    items: [
      ["orders", "ordersMenu", "ordersHelp"],
      ["vendors", "vendorsMenu", "vendorsHelp"],
      ["catalog", "catalog", "catalogHelp"],
      ["customers", "customers", "customersHelp"]
    ]
  },
  {
    labelKey: "finance",
    items: [
      ["finance", "financeMenu", "financeHelp"],
      ["payments", "payments", "paymentsHelp"]
    ]
  },
  {
    labelKey: "growth",
    items: [
      ["marketing", "marketing", "marketingHelp"],
      ["content", "content", "contentHelp"]
    ]
  },
  {
    labelKey: "administration",
    items: [
      ["roles", "roles", "rolesHelp"],
      ["system", "system", "systemHelp"]
    ]
  }
];

function t(key) {
  return translations[selectedLanguage]?.[key] || translations.en[key] || key;
}

const roleMatrix = [
  {
    role: "Super Admin",
    scope: "All system, billing, payment, content, role, security, finance, and destructive controls.",
    permissions: ["Full CRUD", "Role policy", "Payment keys", "System health", "Audit logs", "Revenue"]
  },
  {
    role: "Admin",
    scope: "Daily marketplace operations, customer support, booking moderation, vendor support.",
    permissions: ["Booking ops", "Vendor review", "Customer support", "Refund review", "Service edits"]
  },
  {
    role: "Manager",
    scope: "Business performance, quality control, escalation approval, team workload.",
    permissions: ["Reports", "Approvals", "SLA monitoring", "Dispute escalation", "Team KPI"]
  },
  {
    role: "Marketing",
    scope: "Campaigns, promotions, SEO content, homepage copy, partner communications.",
    permissions: ["Promotions", "SEO", "Campaigns", "Newsletter", "Hero content"]
  }
];

const adminUsers = [
  { name: "Root Owner", username: "superadmin", role: "Super Admin", status: "Protected", mfa: "Enabled", lastLogin: "Current session" },
  { name: "Ayu Permata", username: "admin.ayu", role: "Admin", status: "Active", mfa: "Enabled", lastLogin: "Today, 09:12" },
  { name: "Made Wirya", username: "manager.made", role: "Manager", status: "Active", mfa: "Pending", lastLogin: "Yesterday, 16:40" },
  { name: "Clara Dewi", username: "marketing.clara", role: "Marketing", status: "Invited", mfa: "Not set", lastLogin: "Not yet" }
];

const orderPipeline = [
  { code: "BH-2041", guest: "Amelia Hart", service: "Melukat Purification Ritual", vendor: "Melukat Temple Guide", amount: 725000, status: "Needs confirmation", payment: "Authorized", risk: "Low" },
  { code: "BH-2042", guest: "Daniel Carter", service: "Online Chakra Balancing", vendor: "Lotus Breath Studio", amount: 450000, status: "Paid", payment: "Captured", risk: "Low" },
  { code: "BH-2043", guest: "Maya Putri", service: "Sound Bath Meditation", vendor: "Canggu Healing Co.", amount: 650000, status: "Reschedule requested", payment: "Captured", risk: "Medium" },
  { code: "BH-2044", guest: "Thomas Reed", service: "Corporate Wellness Day", vendor: "Bali Wellness Agent", amount: 4500000, status: "Vendor review", payment: "Pending", risk: "High" },
  ...bookings.map((booking, index) => ({
    code: booking.code,
    guest: booking.client,
    service: booking.service,
    vendor: services[index]?.vendor || "Marketplace vendor",
    amount: Number((services[index]?.price || "Rp500,000").replace(/[^\d]/g, "")),
    status: booking.status,
    payment: booking.status === "Paid" ? "Captured" : "Pending",
    risk: "Low"
  }))
];

const vendorRows = [
  ...vendors.map((vendor, index) => ({
    name: vendor.name,
    type: vendor.type,
    status: vendor.verified,
    services: services.filter((service) => service.vendor === vendor.name).length || index + 2,
    rating: (4.6 + index / 10).toFixed(1),
    payout: 8500000 + index * 2500000
  })),
  { name: "Canggu Healing Co.", type: "Wellness Company", status: "Verified", services: 4, rating: "4.7", payout: 12400000 },
  { name: "Luna Tarot Bali", type: "Individual Healer", status: "Verified", services: 1, rating: "4.8", payout: 2800000 },
  { name: "North Bali Retreats", type: "Agent / Organizer", status: "Review", services: 3, rating: "4.9", payout: 18900000 }
];

const customerRows = [
  { name: "Amelia Hart", email: "amelia@example.com", segment: "VIP", orders: 6, spent: 8250000, status: "Active" },
  { name: "Daniel Carter", email: "daniel@example.com", segment: "Remote guest", orders: 3, spent: 1450000, status: "Active" },
  { name: "Maya Putri", email: "maya@example.com", segment: "Local", orders: 4, spent: 2600000, status: "Active" },
  { name: "Thomas Reed", email: "thomas@example.com", segment: "Corporate", orders: 2, spent: 9000000, status: "Escalation" }
];

const payouts = [
  { vendor: "Bali Wellness Agent", period: "May 2026", gross: 24500000, commission: 2940000, payout: 21560000, status: "Ready" },
  { vendor: "Canggu Healing Co.", period: "May 2026", gross: 12400000, commission: 1488000, payout: 10912000, status: "Pending invoice" },
  { vendor: "Luna Tarot Bali", period: "May 2026", gross: 2800000, commission: 336000, payout: 2464000, status: "Ready" }
];

const disputes = [
  { code: "DSP-118", order: "BH-2043", guest: "Maya Putri", issue: "Reschedule request outside policy", priority: "Medium", owner: "Manager" },
  { code: "DSP-119", order: "BH-2044", guest: "Thomas Reed", issue: "Corporate invoice pending", priority: "High", owner: "Super Admin" },
  { code: "DSP-120", order: "BH-2038", guest: "Sofia Martinez", issue: "Refund evidence review", priority: "Low", owner: "Admin" }
];

const auditLogs = [
  { time: "12 May 2026, 13:10", actor: "superadmin", action: "Updated payment gateway Stripe status", module: "Payment" },
  { time: "12 May 2026, 12:56", actor: "admin.ayu", action: "Approved service edit for Luna Tarot Bali", module: "Catalog" },
  { time: "12 May 2026, 11:44", actor: "manager.made", action: "Escalated corporate wellness booking", module: "Booking" },
  { time: "12 May 2026, 10:30", actor: "marketing.clara", action: "Drafted Ubud Healing Week campaign", module: "Marketing" }
];

const campaigns = [
  { name: "Ubud Healing Week", channel: "Homepage banner", budget: 8500000, status: "Scheduled", conversion: "8.4%" },
  { name: "Online Chakra Promo", channel: "Email", budget: 2200000, status: "Draft", conversion: "5.1%" },
  { name: "Retreat Partner Push", channel: "Social", budget: 5000000, status: "Running", conversion: "6.8%" }
];

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatIdr(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function parsePrice(price) {
  return Number(String(price).replace(/[^\d]/g, ""));
}

function statusPill(text) {
  const tone = /active|paid|ready|verified|captured|protected/i.test(text)
    ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
    : /pending|review|testing|scheduled|invited|medium/i.test(text)
      ? "border-amber-300/20 bg-amber-400/10 text-amber-200"
      : /disabled|high|escalation/i.test(text)
        ? "border-red-300/20 bg-red-400/10 text-red-200"
        : "border-gold/20 bg-gold/10 text-goldSoft";
  return `<span class="inline-flex rounded-full border px-3 py-1 text-xs font-bold ${tone}">${text}</span>`;
}

function navButton(id, label, helper = "") {
  const active = activeSection === id;
  return `
    <button data-section="${id}" class="group w-full rounded-lg px-4 py-3 text-left transition ${active ? "bg-gold text-black" : "text-mist/65 hover:bg-gold/10 hover:text-goldSoft"}">
      <span class="block text-sm font-bold">${label}</span>
      ${helper ? `<span class="mt-1 block text-[11px] ${active ? "text-black/65" : "text-mist/35"}">${helper}</span>` : ""}
    </button>
  `;
}

function navGroup(group) {
  return `
    <div class="border-t border-gold/10 pt-4 first:border-t-0 first:pt-0">
      <p class="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mist/35">${t(group.labelKey)}</p>
      <div class="grid gap-1.5">
        ${group.items.map(([id, labelKey, helperKey]) => navButton(id, t(labelKey), t(helperKey))).join("")}
      </div>
    </div>
  `;
}

function renderDashboard() {
  app.innerHTML = `
    <div class="min-h-screen lg:grid lg:grid-cols-[292px_minmax(0,1fr)]">
      <aside class="border-b border-gold/15 bg-black/75 p-4 backdrop-blur lg:sticky lg:top-0 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div class="flex items-center gap-3">
          <img src="${settings.logo}" alt="Bali Healer logo" class="h-12 w-12 rounded-full border border-gold/55 bg-black object-contain" />
          <div class="min-w-0">
            <p class="font-cinzel truncate font-extrabold uppercase tracking-normal text-gold">${settings.siteName}</p>
            <p class="text-xs text-mist/45">${t("adminConsole")}</p>
          </div>
        </div>
        <div class="mt-5 rounded-lg border border-gold/15 bg-panel p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-mist/35">${t("signedInAs")}</p>
          <p class="mt-2 font-semibold text-white">superadmin</p>
          <p class="mt-1 text-xs text-goldSoft">${t("fullAccess")}</p>
        </div>
        <nav class="mt-5 grid gap-4">
          ${navGroups.map((group) => navGroup(group)).join("")}
        </nav>
        <button data-logout class="mt-6 w-full rounded-lg border border-gold/25 px-4 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold/10">${t("resetSession")}</button>
      </aside>

      <section class="px-4 py-6 lg:px-8">
        <header class="flex flex-col gap-4 border-b border-gold/15 pb-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-goldSoft">${t("marketplaceBackOffice")}</p>
            <h1 class="mt-2 text-3xl font-semibold text-white">${sectionTitle()}</h1>
            <p class="mt-2 max-w-3xl text-sm leading-6 text-mist/55">${sectionDescription()}</p>
          </div>
          <div class="grid gap-3 xl:min-w-[680px]">
            <label class="ml-auto flex w-full max-w-52 items-center gap-2 rounded-lg border border-gold/15 bg-panel px-3 py-2 text-sm text-mist/65">
              <span class="text-xs font-bold uppercase tracking-[0.16em] text-mist/35">${t("language")}</span>
              <select data-admin-language class="min-w-0 flex-1 cursor-pointer bg-transparent text-sm font-semibold text-white outline-none">
                <option class="bg-night text-mist" value="en" ${selectedLanguage === "en" ? "selected" : ""}>English</option>
                <option class="bg-night text-mist" value="id" ${selectedLanguage === "id" ? "selected" : ""}>Indonesia</option>
              </select>
            </label>
            <div class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              ${quickStatus(t("gateway"), `${gateways.filter((gateway) => gateway.status === "Active").length}/${gateways.length}`, t("active"))}
              ${quickStatus(t("orders"), orderPipeline.length, t("open"))}
              ${quickStatus(t("vendors"), vendorRows.length, t("managed"))}
              ${quickStatus(t("services"), services.length, t("live"))}
            </div>
          </div>
        </header>
        <div class="mt-6">${sectionContent()}</div>
      </section>
    </div>
  `;
}

function quickStatus(label, value, hint) {
  return `
    <article class="rounded-lg border border-gold/15 bg-panel px-4 py-3">
      <p class="text-xs text-mist/45">${label}</p>
      <p class="mt-1 text-xl font-semibold text-goldSoft">${value}</p>
      <p class="mt-1 text-[11px] uppercase tracking-[0.14em] text-mist/35">${hint}</p>
    </article>
  `;
}

function sectionTitle() {
  return sectionCopy[selectedLanguage]?.[activeSection]?.[0] || sectionCopy.en[activeSection]?.[0] || sectionCopy.en.command[0];
}

function sectionDescription() {
  return sectionCopy[selectedLanguage]?.[activeSection]?.[1] || sectionCopy.en[activeSection]?.[1] || "";
}

function sectionContent() {
  if (activeSection === "orders") return ordersSection();
  if (activeSection === "vendors") return vendorsSection();
  if (activeSection === "catalog") return catalogSection();
  if (activeSection === "customers") return customersSection();
  if (activeSection === "finance") return financeSection();
  if (activeSection === "content") return contentSection();
  if (activeSection === "payments") return paymentSection();
  if (activeSection === "marketing") return marketingSection();
  if (activeSection === "roles") return rolesSection();
  if (activeSection === "analytics") return analyticsSection();
  if (activeSection === "system") return systemSection();
  return commandSection();
}

function metricCards() {
  const monthlyGmv = orderPipeline.reduce((sum, order) => sum + order.amount, 0) + 128400000;
  const catalogValue = services.reduce((sum, service) => sum + parsePrice(service.price), 0);
  const metrics = [
    ["GMV this month", formatIdr(monthlyGmv), "+18.4% vs last month"],
    ["Net commission", formatIdr(Math.round(monthlyGmv * 0.12)), `${settings.commission} take rate`],
    ["Active listings", services.length, `${healingCategories.length} categories`],
    ["Avg service value", formatIdr(Math.round(catalogValue / services.length)), "catalog benchmark"],
    ["Bookings open", orderPipeline.length, "requests and paid orders"],
    ["Vendor payout due", formatIdr(payouts.reduce((sum, item) => sum + item.payout, 0)), "ready this cycle"],
    ["Dispute queue", disputes.length, "needs review"],
    ["Payment health", `${gateways.filter((item) => item.status === "Active").length}/${gateways.length}`, "providers active"]
  ];
  return metrics.map(([label, value, hint]) => card(label, value, hint)).join("");
}

function card(label, value, hint) {
  return `
    <article class="rounded-lg border border-gold/15 bg-panel p-5">
      <p class="text-sm text-mist/55">${label}</p>
      <p class="mt-3 text-2xl font-semibold text-goldSoft">${value}</p>
      <p class="mt-2 text-xs uppercase tracking-[0.16em] text-mist/35">${hint}</p>
    </article>
  `;
}

function panel(title, body, extraClass = "") {
  return `
    <section class="rounded-lg border border-gold/15 bg-panel p-5 ${extraClass}">
      <h2 class="text-xl font-semibold text-white">${title}</h2>
      <div class="mt-4">${body}</div>
    </section>
  `;
}

function commandSection() {
  return `
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">${metricCards()}</div>
    <div class="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      ${panel("Operational alerts", `
        <div class="grid gap-3">
          ${[
            ["High", "Corporate Wellness Day needs vendor approval before payment capture."],
            ["Medium", "3 payout batches are ready for final release."],
            ["Medium", "Stripe is disabled. Checkout fallback remains Midtrans."],
            ["Low", "5 services have no updated availability this week."]
          ].map(([level, text]) => `
            <article class="flex gap-4 rounded-lg border border-gold/10 bg-black/35 p-4">
              ${statusPill(level)}
              <p class="text-sm leading-6 text-mist/70">${text}</p>
            </article>
          `).join("")}
        </div>
      `)}
      ${panel("Marketplace funnel", `
        <div class="space-y-4">
          ${[
            ["Visitors", "24,830", "100%"],
            ["Searches", "8,940", "36%"],
            ["Service views", "4,128", "16.6%"],
            ["Checkout started", "812", "3.2%"],
            ["Paid bookings", "426", "1.7%"]
          ].map(([label, value, percent]) => `
            <div>
              <div class="flex justify-between text-sm"><span class="text-mist/60">${label}</span><span class="font-semibold text-white">${value}</span></div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-black"><div class="h-full rounded-full bg-gold" style="width:${percent}"></div></div>
            </div>
          `).join("")}
        </div>
      `)}
    </div>
    <div class="mt-6 grid gap-6 xl:grid-cols-3">
      ${panel("Latest bookings", table(["Code", "Guest", "Service", "Status"], orderPipeline.slice(0, 5).map((order) => [order.code, order.guest, order.service, statusPill(order.status)])))}
      ${panel("Vendor health", table(["Vendor", "Status", "Rating"], vendorRows.slice(0, 5).map((vendor) => [vendor.name, statusPill(vendor.status), vendor.rating])))}
      ${panel("Audit trail", auditLogs.slice(0, 4).map((log) => `
        <article class="border-b border-gold/10 py-3 last:border-b-0">
          <p class="text-sm text-white">${log.action}</p>
          <p class="mt-1 text-xs text-mist/40">${log.time} - ${log.actor} - ${log.module}</p>
        </article>
      `).join(""))}
    </div>
  `;
}

function ordersSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Needs confirmation", orderPipeline.filter((order) => /confirmation|review/i.test(order.status)).length, "admin queue")}
      ${card("Paid", orderPipeline.filter((order) => /paid/i.test(order.status)).length, "captured")}
      ${card("Reschedules", orderPipeline.filter((order) => /reschedule/i.test(order.status)).length, "policy review")}
      ${card("High risk", orderPipeline.filter((order) => order.risk === "High").length, "manual review")}
    </div>
    <div class="mt-6">
      ${panel("Booking command table", table(
        ["Code", "Guest", "Service", "Vendor", "Amount", "Payment", "Risk", "Action"],
        orderPipeline.map((order) => [
          order.code,
          order.guest,
          order.service,
          order.vendor,
          formatIdr(order.amount),
          statusPill(order.payment),
          statusPill(order.risk),
          actionButtons(["Approve", "Refund", "Escalate"])
        ])
      ))}
    </div>
  `;
}

function vendorsSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Verified vendors", vendorRows.filter((vendor) => vendor.status === "Verified").length, "live sellers")}
      ${card("Review queue", vendorRows.filter((vendor) => vendor.status === "Review").length, "verification")}
      ${card("Payout cycle", formatIdr(vendorRows.reduce((sum, vendor) => sum + vendor.payout, 0)), "estimated")}
      ${card("Avg rating", "4.8", "quality score")}
    </div>
    <div class="mt-6">
      ${panel("Vendor management", table(
        ["Vendor", "Type", "Status", "Services", "Rating", "Payout", "Action"],
        vendorRows.map((vendor) => [
          vendor.name,
          vendor.type,
          statusPill(vendor.status),
          vendor.services,
          vendor.rating,
          formatIdr(vendor.payout),
          actionButtons(["Verify", "Suspend", "Open"])
        ])
      ))}
    </div>
  `;
}

function catalogSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Total services", services.length, "all listings")}
      ${card("Categories", healingCategories.length, "taxonomy")}
      ${card("Hybrid listings", services.filter((service) => service.mode === "Hybrid").length, "flexible sessions")}
      ${card("Online listings", services.filter((service) => service.mode === "Online").length, "remote-ready")}
    </div>
    <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      ${panel("Service catalog", table(
        ["Service", "Category", "Vendor", "Mode", "Price", "Action"],
        services.slice(0, 18).map((service) => [
          service.name,
          service.category,
          service.vendor,
          statusPill(service.mode),
          service.price,
          actionButtons(["Edit", "Rank", "Disable"])
        ])
      ))}
      ${panel("Category controls", healingCategories.map((category) => `
        <article class="rounded-lg border border-gold/10 bg-black/35 p-4">
          <div class="flex items-center justify-between gap-3"><p class="font-semibold text-white">${category.name}</p><span class="text-sm text-goldSoft">${services.filter((service) => service.category === category.name).length} services</span></div>
          <p class="mt-2 text-sm leading-6 text-mist/55">${category.description}</p>
        </article>
      `).join('<div class="h-3"></div>'))}
    </div>
  `;
}

function customersSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Customers", customerRows.length, "demo CRM")}
      ${card("VIP customers", customerRows.filter((customer) => customer.segment === "VIP").length, "high value")}
      ${card("Corporate leads", customerRows.filter((customer) => customer.segment === "Corporate").length, "B2B")}
      ${card("Lifetime value", formatIdr(customerRows.reduce((sum, customer) => sum + customer.spent, 0)), "tracked")}
    </div>
    <div class="mt-6">
      ${panel("Customer CRM", table(
        ["Name", "Email", "Segment", "Orders", "Spend", "Status", "Action"],
        customerRows.map((customer) => [
          customer.name,
          customer.email,
          customer.segment,
          customer.orders,
          formatIdr(customer.spent),
          statusPill(customer.status),
          actionButtons(["Profile", "Message", "Segment"])
        ])
      ))}
    </div>
  `;
}

function financeSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Gross payout", formatIdr(payouts.reduce((sum, item) => sum + item.gross, 0)), "vendor gross")}
      ${card("Commission", formatIdr(payouts.reduce((sum, item) => sum + item.commission, 0)), settings.commission)}
      ${card("Net payout", formatIdr(payouts.reduce((sum, item) => sum + item.payout, 0)), "release amount")}
      ${card("Open disputes", disputes.length, "finance risk")}
    </div>
    <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      ${panel("Payout batches", table(
        ["Vendor", "Period", "Gross", "Commission", "Payout", "Status", "Action"],
        payouts.map((item) => [item.vendor, item.period, formatIdr(item.gross), formatIdr(item.commission), formatIdr(item.payout), statusPill(item.status), actionButtons(["Release", "Hold"])])
      ))}
      ${panel("Disputes and refunds", disputes.map((item) => `
        <article class="rounded-lg border border-gold/10 bg-black/35 p-4">
          <div class="flex items-center justify-between gap-3"><p class="font-semibold text-white">${item.code} - ${item.order}</p>${statusPill(item.priority)}</div>
          <p class="mt-2 text-sm text-mist/60">${item.issue}</p>
          <p class="mt-2 text-xs uppercase tracking-[0.16em] text-goldSoft">Owner: ${item.owner}</p>
        </article>
      `).join('<div class="h-3"></div>'))}
    </div>
  `;
}

function contentSection() {
  return `
    <form data-settings-form class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      ${panel("Website identity", `
        <div class="rounded-lg border border-gold/15 bg-black/35 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">Logo preview</p>
          <div class="mt-3 flex items-center gap-4">
            <img data-logo-preview src="${settings.logo}" alt="Current logo preview" class="h-16 w-16 rounded-full border border-gold/45 bg-black object-contain" />
            <label class="cursor-pointer rounded-lg border border-gold/25 px-4 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold/10">
              Choose Logo From Device
              <input data-logo-upload name="logoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" class="hidden" />
            </label>
          </div>
          <p class="mt-3 text-xs leading-5 text-mist/45">Recommended: square PNG/WebP, transparent background, under 1 MB.</p>
        </div>
        ${inputField("Logo URL", "logo", settings.logo)}
        <div class="mt-4 rounded-lg border border-gold/15 bg-black/35 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">Hero video preview</p>
          <video data-hero-video-preview class="mt-3 aspect-video w-full rounded-lg border border-gold/20 bg-black object-cover" src="${settings.heroVideo}" controls muted playsinline></video>
          <label class="mt-3 inline-flex cursor-pointer rounded-lg border border-gold/25 px-4 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold/10">
            Choose Hero Video From Device
            <input data-hero-video-upload name="heroVideoFile" type="file" accept="video/mp4,video/webm,video/ogg" class="hidden" />
          </label>
          <p class="mt-3 text-xs leading-5 text-mist/45">Recommended: MP4/WebM landscape video. For production, upload to server storage instead of localStorage.</p>
        </div>
        ${inputField("Hero video URL", "heroVideo", settings.heroVideo)}
        ${inputField("Site name", "siteName", settings.siteName)}
        ${inputField("Support email", "supportEmail", settings.supportEmail)}
        ${inputField("Phone", "phone", settings.phone)}
        ${inputField("Marketplace commission", "commission", settings.commission)}
        ${inputField("Cancellation window", "cancellationWindow", settings.cancellationWindow)}
        <label class="mt-4 flex items-center gap-3 rounded-lg border border-gold/15 bg-black/35 p-4">
          <input name="maintenance" type="checkbox" class="accent-[#d6aa43]" ${settings.maintenance ? "checked" : ""} />
          <span class="text-sm text-mist/70">Enable maintenance mode</span>
        </label>
      `)}
      ${panel("Hero and SEO copy", `
        ${inputField("Hero title", "heroTitle", settings.heroTitle)}
        <label class="mt-4 block">
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">Hero subtitle</span>
          <textarea name="heroSubtitle" rows="5" class="mt-2 w-full resize-none rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold">${settings.heroSubtitle}</textarea>
        </label>
        <div class="mt-5 grid gap-3 md:grid-cols-2">
          <button class="rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black transition hover:bg-goldSoft">Save Website Settings</button>
          <button type="button" class="rounded-lg border border-gold/25 px-5 py-3 text-sm font-bold text-goldSoft transition hover:bg-gold/10">Preview Public Site</button>
        </div>
      `)}
    </form>
    <div class="mt-6 grid gap-6 xl:grid-cols-3">
      ${panel("Homepage modules", list(["Hero video", "Search box", "Promotions", "Services pagination", "Testimonials", "Footer links"]))}
      ${panel("Policy pages", list(["Terms of service", "Privacy policy", "Refund policy", "Vendor agreement", "Cancellation policy"]))}
      ${panel("SEO checklist", list(["Canonical URL", "Open Graph image", "Structured data", "Sitemap", "Robots noindex for admin"]))}
    </div>
  `;
}

function paymentSection() {
  return `
    <div class="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
      <form data-gateway-form class="rounded-lg border border-gold/15 bg-panel p-5">
        <h2 class="text-xl font-semibold text-white">Create gateway configuration</h2>
        ${inputField("Gateway name", "name", "")}
        ${inputField("Provider capabilities", "provider", "Card, VA, QRIS")}
        ${inputField("Currency", "currency", "IDR")}
        ${inputField("Fee", "fee", "2.9%")}
        ${inputField("Settlement SLA", "settlement", "T+2")}
        ${inputField("API secret / server key", "apiKey", "")}
        ${inputField("Client / publishable key", "clientKey", "")}
        ${inputField("Webhook URL", "webhookUrl", "https://balihealer.com/api/payments/provider/webhook")}
        ${inputField("Success redirect URL", "successUrl", "https://balihealer.com/payment/success")}
        ${inputField("Failure redirect URL", "failureUrl", "https://balihealer.com/payment/failed")}
        ${inputField("Fraud / risk rule", "fraudRule", "Manual review above Rp5,000,000")}
        <label class="mt-4 block">
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">Environment</span>
          <select name="mode" class="mt-2 w-full rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold">
            <option>Sandbox</option><option>Production</option>
          </select>
        </label>
        <label class="mt-4 block">
          <span class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">Status</span>
          <select name="status" class="mt-2 w-full rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold">
            <option>Active</option><option>Testing</option><option>Disabled</option>
          </select>
        </label>
        <label class="mt-4 flex items-center gap-3 rounded-lg border border-gold/15 bg-black/35 p-4">
          <input name="maintenance" type="checkbox" class="accent-[#d6aa43]" />
          <span class="text-sm text-mist/70">Put this gateway in maintenance mode</span>
        </label>
        <button class="mt-5 w-full rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black transition hover:bg-goldSoft">Create Gateway</button>
      </form>
      <div class="grid gap-6">
        ${panel("Payment gateway maintenance center", `
          <div class="grid gap-4">
            ${gateways.map((gateway) => gatewayConfigCard(gateway)).join("")}
          </div>
        `)}
        ${panel("Routing and checkout rules", `
          <div class="grid gap-3 md:grid-cols-2">
            ${[
              ["Primary gateway", gateways.find((gateway) => gateway.status === "Active")?.name || "Not selected"],
              ["Fallback strategy", "Use next active IDR gateway if primary fails"],
              ["Capture timing", "Authorize at checkout, capture after schedule approval"],
              ["Refund policy", "Admin approval required for partial/full refund"],
              ["Webhook retry", "5 attempts with exponential backoff"],
              ["Currency rule", "IDR primary, USD fallback for overseas cards"]
            ].map(([label, value]) => `
              <div class="rounded-lg border border-gold/10 bg-black/35 p-4">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-mist/35">${label}</p>
                <p class="mt-2 text-sm font-semibold text-white">${value}</p>
              </div>
            `).join("")}
          </div>
        `)}
      </div>
    </div>
  `;
}

function gatewayConfigCard(gateway) {
  return `
    <article class="rounded-lg border border-gold/10 bg-black/35 p-4">
      <div class="flex flex-col gap-3 border-b border-gold/10 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-lg font-semibold text-white">${gateway.name}</h3>
            ${statusPill(gateway.status)}
            ${gateway.maintenance ? statusPill("Maintenance") : ""}
          </div>
          <p class="mt-2 text-sm text-mist/55">${gateway.provider || "Payment provider"} - ${gateway.mode} - ${gateway.currency}</p>
        </div>
        <div class="shrink-0">
          <button data-toggle-gateway="${gateway.id}" class="rounded-md border border-gold/20 px-3 py-2 text-xs font-bold text-goldSoft">Toggle Active</button>
          <button data-toggle-maintenance-gateway="${gateway.id}" class="ml-2 rounded-md border border-gold/20 px-3 py-2 text-xs font-bold text-goldSoft">Maintenance</button>
          <button data-delete-gateway="${gateway.id}" class="ml-2 rounded-md border border-red-400/25 px-3 py-2 text-xs font-bold text-red-200">Delete</button>
        </div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        ${[
          ["API secret / server key", gateway.apiKey || "Not set"],
          ["Client / publishable key", gateway.clientKey || "Not set"],
          ["Webhook URL", gateway.webhookUrl || "Not set"],
          ["Success URL", gateway.successUrl || "Not set"],
          ["Failure URL", gateway.failureUrl || "Not set"],
          ["Fee & settlement", `${gateway.fee} - ${gateway.settlement || "T+2"}`],
          ["Fraud rule", gateway.fraudRule || "Default review"],
          ["Environment", gateway.mode],
          ["Currency", gateway.currency]
        ].map(([label, value]) => `
          <div class="rounded-lg border border-gold/10 bg-black/45 p-3">
            <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-mist/35">${label}</p>
            <p class="mt-2 break-words text-sm text-mist/70">${value}</p>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function marketingSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Campaigns", campaigns.length, "active planning")}
      ${card("Promo budget", formatIdr(campaigns.reduce((sum, item) => sum + item.budget, 0)), "this month")}
      ${card("Avg conversion", "6.8%", "campaign blend")}
      ${card("Promotions", promotions.length, "homepage assets")}
    </div>
    <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      ${panel("Campaign planner", table(
        ["Campaign", "Channel", "Budget", "Status", "Conversion", "Action"],
        campaigns.map((campaign) => [campaign.name, campaign.channel, formatIdr(campaign.budget), statusPill(campaign.status), campaign.conversion, actionButtons(["Edit", "Launch"])])
      ))}
      ${panel("Growth modules", list(["Coupon and voucher rules", "Homepage banner scheduler", "SEO content calendar", "Newsletter audience segments", "Partner referral tracking", "Abandoned checkout recovery"]))}
    </div>
  `;
}

function rolesSection() {
  return `
    <div class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      ${panel("Permission matrix", roleMatrix.map((role) => `
        <article class="rounded-lg border border-gold/10 bg-black/35 p-4">
          <div class="flex items-center justify-between gap-3"><p class="font-semibold text-goldSoft">${role.role}</p>${statusPill(role.role === "Super Admin" ? "Full access" : "Scoped access")}</div>
          <p class="mt-2 text-sm leading-6 text-mist/60">${role.scope}</p>
          <div class="mt-3 flex flex-wrap gap-2">${role.permissions.map((permission) => `<span class="rounded-full border border-gold/15 px-3 py-1 text-xs text-mist/55">${permission}</span>`).join("")}</div>
        </article>
      `).join('<div class="h-3"></div>'))}
      ${panel("Admin users", table(
        ["Name", "Username", "Role", "Status", "MFA", "Last login", "Action"],
        adminUsers.map((user) => [user.name, user.username, user.role, statusPill(user.status), user.mfa, user.lastLogin, actionButtons(["Edit", "Revoke"])])
      ))}
    </div>
  `;
}

function analyticsSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">${metricCards()}</div>
    <div class="mt-6 grid gap-6 xl:grid-cols-3">
      ${panel("Top categories", table(["Category", "Services", "Demand"], healingCategories.slice(0, 8).map((category, index) => [category.name, services.filter((service) => service.category === category.name).length, `${92 - index * 6}%`])))}
      ${panel("Top vendors", table(["Vendor", "GMV", "Rating"], vendorRows.slice(0, 8).map((vendor) => [vendor.name, formatIdr(vendor.payout * 1.22), vendor.rating])))}
      ${panel("Insights", list(["Sound Bath demand is rising in Canggu", "Hybrid bookings convert higher than offline for overseas guests", "Corporate wellness has high GMV but slower payment cycle", "Retreat packages need stronger availability visibility", "Tarot and astrology perform well for online sessions"]))}
    </div>
  `;
}

function systemSection() {
  return `
    <div class="grid gap-4 md:grid-cols-4">
      ${card("Admin auth", "Mock", "frontend demo")}
      ${card("Backups", "Daily", "02:00 WITA")}
      ${card("Queues", "Healthy", "jobs clear")}
      ${card("Audit logs", auditLogs.length, "latest actions")}
    </div>
    <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      ${panel("Audit log", table(["Time", "Actor", "Action", "Module"], auditLogs.map((log) => [log.time, log.actor, log.action, log.module])))}
      ${panel("System health", list(["Public site online", "Admin route noindex", "Payment provider fallback configured", "Image assets reachable", "Local settings persistence active", "Backend integration pending"]))}
    </div>
  `;
}

function inputField(label, name, value) {
  return `
    <label class="mt-4 block">
      <span class="text-xs font-bold uppercase tracking-[0.18em] text-mist/45">${label}</span>
      <input name="${name}" value="${value}" class="mt-2 w-full rounded-lg border border-gold/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold" />
    </label>
  `;
}

function list(items) {
  return `
    <div class="grid gap-3">
      ${items.map((item) => `
        <div class="flex items-center justify-between rounded-lg border border-gold/10 bg-black/35 p-3 text-sm text-mist/65">
          <span>${item}</span><span class="text-goldSoft">Ready</span>
        </div>
      `).join("")}
    </div>
  `;
}

function actionButtons(labels) {
  return labels.map((label) => `<button class="mr-2 rounded-md border border-gold/20 px-3 py-2 text-xs font-bold text-goldSoft last:mr-0">${label}</button>`).join("");
}

function table(headers, rows) {
  return `
    <div class="overflow-x-auto">
      <table class="w-full min-w-[860px] text-left text-sm">
        <thead class="border-b border-gold/15 text-xs uppercase tracking-[0.16em] text-goldSoft">
          <tr>${headers.map((header) => `<th class="py-3 pr-4">${header}</th>`).join("")}</tr>
        </thead>
        <tbody class="divide-y divide-gold/10 text-mist/65">
          ${rows.map((row) => `
            <tr>${row.map((cell, index) => `<td class="py-4 pr-4 ${index === 0 ? "font-semibold text-white" : ""}">${cell}</td>`).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function handleSettingsSave(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  settings = {
    logo: data.get("logo").trim(),
    heroVideo: data.get("heroVideo").trim(),
    siteName: data.get("siteName").trim(),
    heroTitle: data.get("heroTitle").trim(),
    heroSubtitle: data.get("heroSubtitle").trim(),
    supportEmail: data.get("supportEmail").trim(),
    phone: data.get("phone").trim(),
    commission: data.get("commission").trim(),
    cancellationWindow: data.get("cancellationWindow").trim(),
    maintenance: Boolean(data.get("maintenance"))
  };
  writeJson(SETTINGS_KEY, settings);
  renderDashboard();
}

function handleGatewayCreate(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  gateways = [
    ...gateways,
    {
      id: createId(),
      name: data.get("name").trim() || "New Gateway",
      provider: data.get("provider").trim() || "Card",
      mode: data.get("mode").trim() || "Sandbox",
      status: data.get("status"),
      currency: data.get("currency").trim() || "IDR",
      fee: data.get("fee").trim() || "0%",
      settlement: data.get("settlement").trim() || "T+2",
      apiKey: data.get("apiKey").trim(),
      clientKey: data.get("clientKey").trim(),
      webhookUrl: data.get("webhookUrl").trim(),
      successUrl: data.get("successUrl").trim(),
      failureUrl: data.get("failureUrl").trim(),
      fraudRule: data.get("fraudRule").trim(),
      maintenance: Boolean(data.get("maintenance"))
    }
  ];
  writeJson(GATEWAYS_KEY, gateways);
  renderDashboard();
}

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-settings-form]")) handleSettingsSave(event);
  if (event.target.matches("[data-gateway-form]")) handleGatewayCreate(event);
});

document.addEventListener("change", (event) => {
  const logoUpload = event.target.closest("[data-logo-upload]");
  if (logoUpload) {
    const file = logoUpload.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const logoValue = String(reader.result || "");
      const form = logoUpload.closest("form");
      const logoInput = form?.querySelector('input[name="logo"]');
      const preview = form?.querySelector("[data-logo-preview]");
      if (logoInput) logoInput.value = logoValue;
      if (preview) preview.src = logoValue;
    });
    reader.readAsDataURL(file);
    return;
  }

  const heroVideoUpload = event.target.closest("[data-hero-video-upload]");
  if (heroVideoUpload) {
    const file = heroVideoUpload.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const videoValue = String(reader.result || "");
      const form = heroVideoUpload.closest("form");
      const videoInput = form?.querySelector('input[name="heroVideo"]');
      const preview = form?.querySelector("[data-hero-video-preview]");
      if (videoInput) videoInput.value = videoValue;
      if (preview) {
        preview.src = videoValue;
        preview.load();
      }
    });
    reader.readAsDataURL(file);
    return;
  }

  const languageSelect = event.target.closest("[data-admin-language]");
  if (!languageSelect) return;
  selectedLanguage = languageSelect.value;
  localStorage.setItem(LANGUAGE_KEY, selectedLanguage);
  renderDashboard();
});

document.addEventListener("click", (event) => {
  const section = event.target.closest("[data-section]");
  if (section) {
    activeSection = section.dataset.section;
    renderDashboard();
    return;
  }

  if (event.target.closest("[data-logout]")) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username: credentials.username, role: "superadmin", loginAt: new Date().toISOString() }));
    activeSection = "command";
    renderDashboard();
    return;
  }

  const deleteButton = event.target.closest("[data-delete-gateway]");
  if (deleteButton) {
    gateways = gateways.filter((gateway) => gateway.id !== deleteButton.dataset.deleteGateway);
    writeJson(GATEWAYS_KEY, gateways);
    renderDashboard();
    return;
  }

  const toggleButton = event.target.closest("[data-toggle-gateway]");
  if (toggleButton) {
    gateways = gateways.map((gateway) => gateway.id === toggleButton.dataset.toggleGateway
      ? { ...gateway, status: gateway.status === "Active" ? "Disabled" : "Active" }
      : gateway);
    writeJson(GATEWAYS_KEY, gateways);
    renderDashboard();
    return;
  }

  const maintenanceButton = event.target.closest("[data-toggle-maintenance-gateway]");
  if (maintenanceButton) {
    gateways = gateways.map((gateway) => gateway.id === maintenanceButton.dataset.toggleMaintenanceGateway
      ? { ...gateway, maintenance: !gateway.maintenance }
      : gateway);
    writeJson(GATEWAYS_KEY, gateways);
    renderDashboard();
  }
});

localStorage.setItem(AUTH_KEY, JSON.stringify({ username: credentials.username, role: "superadmin", loginAt: new Date().toISOString() }));
renderDashboard();
