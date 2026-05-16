import { bookings, services, vendors } from "../js/data.js";

const app = document.querySelector("#admin-app");
let activeMenu = "Dashboard";

const healerPartnerCount = Math.max(vendors.length, 4);
const serviceCount = services.length;
const bookingCount = Math.max(bookings.length * 4, 12);
const totalAmount = 1641.6;

const leads = [
  { name: "Maya Putri", type: "Villa guest", area: "Ubud", status: "Accept" },
  { name: "Daniel Carter", type: "Online client", area: "London", status: "Accept" },
  { name: "Retreat Group", type: "Corporate inquiry", area: "Canggu", status: "Review" }
];

const adminBookings = [
  { title: "Balinese Energy Healing", time: "08:52 - 09:52", guest: "Ayu Prameswari", status: "Open", image: services[0]?.image },
  { title: "Online Chakra Balancing", time: "10:00 - 11:00", guest: "Daniel Carter", status: "Open", image: services[1]?.image },
  { title: "Sound Bath Meditation", time: "14:00 - 15:30", guest: "Maya Putri", status: "In Progress", image: services[2]?.image },
  { title: "Melukat Purification Ritual", time: "16:00 - 17:30", guest: "Sofia Martinez", status: "In Progress", image: services[3]?.image },
  { title: "Corporate Wellness", time: "18:00 - 19:30", guest: "Beji Healing", status: "Open", image: services[4]?.image }
];

const users = [
  { name: "Ayu Prameswari", email: "ayu@example.com", segment: "Repeat guest", status: "Active" },
  { name: "Daniel Carter", email: "daniel@example.com", segment: "Online guest", status: "Active" },
  { name: "Maya Putri", email: "maya@example.com", segment: "Local guest", status: "Review" }
];

const staff = [
  { name: "Demo Admin", role: "Super Admin", access: "All modules", status: "Active" },
  { name: "Ayu Operations", role: "Operations", access: "Bookings, healers, support", status: "Active" },
  { name: "Komang Finance", role: "Finance", access: "Transactions, payout, refund", status: "Active" }
];

const transactions = [
  { code: "TRX-2041", guest: "Ayu Prameswari", amount: "$421.6", gateway: "Bank Transfer", status: "Paid" },
  { code: "TRX-2042", guest: "Daniel Carter", amount: "$180", gateway: "Credit Card", status: "Pending" },
  { code: "TRX-2043", guest: "Retreat Group", amount: "$630", gateway: "Invoice", status: "Review" }
];

const contentItems = [
  { title: "Homepage", type: "Page", owner: "Marketing", status: "Published" },
  { title: "Healer Directory", type: "Page", owner: "Operations", status: "Published" },
  { title: "Healing Journey Guide", type: "Blog", owner: "Content", status: "Draft" }
];

const navGroups = [
  {
    label: "Main",
    items: [["Dashboard", "dashboard"]]
  },
  {
    label: "Application",
    items: [
      ["Bookings", "bookings"],
      ["Calendar", "calendar"],
      ["Chat", "chat"],
      ["WhatsApp Chat", "whatsapp"],
      ["Chatbot", "bot"],
      ["Leads", "leads"],
      ["Services", "services"],
      ["Notification", "bell"],
      ["Addons", "plus"],
      ["Coupon", "percent"]
    ]
  },
  {
    label: "Content",
    items: [
      ["Pages", "page"],
      ["Menu Builder", "menu"],
      ["Footer Builder", "footer"],
      ["Testimonials", "quote"],
      ["FAQ", "help"],
      ["Newsletter", "mail"],
      ["Blogs", "blog"]
    ]
  },
  {
    label: "People",
    items: [
      ["Healers/Partners", "provider"],
      ["Users", "users"],
      ["Staffs", "staff"]
    ]
  },
  {
    label: "Finance",
    items: [
      ["Transactions", "transaction"],
      ["Healer/Partner Earning", "earning"],
      ["Healer/Partner Request", "request"],
      ["Refund", "refund"],
      ["Subscription List", "subscription"]
    ]
  },
  {
    label: "Support",
    items: [["Tickets", "ticket"]]
  },
  {
    label: "Settings",
    items: [
      ["General Settings", "settings"],
      ["Communication Settings", "communication"]
    ]
  },
  {
    label: "Feedback & Disputes",
    items: [
      ["Request Dispute List", "dispute"],
      ["Reviews", "star"]
    ]
  },
  {
    label: "User Management",
    items: [["Roles & Permissions", "roles"]]
  }
];

function icon(name, className = "h-4 w-4") {
  const icons = {
    dashboard: `<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>`,
    bookings: `<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
    chat: `<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>`,
    whatsapp: `<path d="M4 20l1.2-3A8 8 0 1 1 8 19.1Z"/><path d="M9 9c.4 2 2 3.6 4 4l1-1"/>`,
    bot: `<rect x="5" y="8" width="14" height="10" rx="2"/><path d="M12 4v4M9 13h.01M15 13h.01M8 21h8"/>`,
    leads: `<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>`,
    services: `<path d="M4 7h16M4 12h16M4 17h16"/><path d="M7 4v16"/>`,
    bell: `<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>`,
    plus: `<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>`,
    percent: `<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>`,
    page: `<path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>`,
    menu: `<path d="M4 6h16M4 12h16M4 18h16"/>`,
    footer: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 15h16"/>`,
    quote: `<path d="M8 11H5a4 4 0 0 1 4-4v8H5v-4M19 11h-3a4 4 0 0 1 4-4v8h-4v-4"/>`,
    help: `<circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 1 1 4.5 2.6c-1.2.7-2 1.3-2 2.4"/><path d="M12 17h.01"/>`,
    mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>`,
    blog: `<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>`,
    provider: `<circle cx="12" cy="7" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M19 8h2M20 7v2"/>`,
    users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`,
    staff: `<circle cx="12" cy="7" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M12 10v5"/>`,
    transaction: `<path d="M7 7h11l-2-2M17 17H6l2 2"/><rect x="4" y="9" width="16" height="6" rx="2"/>`,
    earning: `<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M12 14v5M9 17h6"/>`,
    request: `<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M19 4v4M17 6h4"/>`,
    refund: `<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 1 1 0 10h-1"/>`,
    subscription: `<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>`,
    ticket: `<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M9 9h6M9 15h6"/>`,
    settings: `<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3-.2-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V22h-3.4v-.3a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.2.1-2-3 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-3.4h.3a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3 .2.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V2h3.4v.3a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.2-.1 2 3-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.3v3.4h-.3a1.7 1.7 0 0 0-1.5 1Z"/>`,
    communication: `<path d="M4 4h16v12H7l-3 3z"/><path d="M8 9h8M8 13h5"/>`,
    dispute: `<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>`,
    star: `<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.9 6.6 19.8l1-6.1-4.4-4.3 6.1-.9Z"/>`,
    roles: `<path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6z"/><path d="M9 12l2 2 4-5"/>`
  };

  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.dashboard}</svg>`;
}

function renderSidebar() {
  return `
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-[236px] overflow-y-auto border-r border-gold/15 bg-black/95 px-3 py-4 text-sm shadow-[18px_0_60px_rgba(0,0,0,0.35)] lg:block">
      <div class="mb-6 flex items-center gap-3 rounded-lg border border-gold/15 bg-[#12100d] p-3">
        <img src="../assets/images/logo-bali-healer.png" alt="Bali Healer" class="h-10 w-10 rounded-full border border-gold/50 bg-black object-contain" />
        <div class="min-w-0">
          <p class="font-cinzel truncate text-sm font-extrabold uppercase text-gold">Bali Healer</p>
          <p class="text-xs text-mist/45">Marketplace Admin</p>
        </div>
      </div>
      <nav class="space-y-5">
        ${navGroups.map((group) => `
          <div>
            <p class="mb-2 px-1 text-[11px] font-extrabold text-goldSoft/75">${group.label}</p>
            <div class="space-y-1">
              ${group.items.map(([label, iconName]) => {
                const active = activeMenu === label;
                return `
                  <button data-nav-item="${label}" class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${active ? "bg-gold/20 text-goldSoft ring-1 ring-gold/30" : "text-mist/70 hover:bg-gold/10 hover:text-goldSoft"}">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 ${active ? "text-goldSoft" : "text-mist/55"}">${icon(iconName, "h-4 w-4")}</span>
                    <span class="min-w-0 flex-1 truncate font-semibold">${label}</span>
                    ${["Services", "Pages", "Newsletter", "Blogs", "Communication Settings"].includes(label) ? `<span class="text-mist/30">›</span>` : ""}
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        `).join("")}
      </nav>
    </aside>
  `;
}

function metricCard({ iconName, tint, value, label, leftLabel, leftValue, rightLabel, rightValue }) {
  return `
    <article class="rounded-lg border border-gold/15 bg-[#0f0d0a] p-5 shadow-[inset_0_1px_0_rgba(244,217,135,0.05)]">
      <div class="flex items-center gap-3">
        <span class="flex h-14 w-14 items-center justify-center rounded-md ${tint} text-black">${icon(iconName, "h-9 w-9")}</span>
        <div>
          <p class="text-2xl font-extrabold text-goldSoft">${value}</p>
          <p class="text-sm text-mist/55">${label}</p>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-[1fr_auto_1fr] items-center border-t border-gold/15 pt-4 text-sm">
        <p class="text-mist/65">${leftLabel}: <span class="font-extrabold text-white">${leftValue}</span></p>
        <span class="h-4 w-px bg-gold/15"></span>
        <p class="text-right text-mist/65">${rightLabel}: <span class="font-extrabold text-white">${rightValue}</span></p>
      </div>
    </article>
  `;
}

function statusBadge(status) {
  const isOpen = status === "Open" || status === "Accept";
  return `<span class="rounded-md px-3 py-1 text-xs font-extrabold ${isOpen ? "bg-gold text-black" : "bg-gold/10 text-goldSoft"}">${status}</span>`;
}

function leadRow(lead) {
  return `
    <article class="flex items-center gap-3 rounded-lg border border-gold/15 bg-black/35 p-4">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold/10 text-goldSoft">${icon("leads")}</span>
      <div class="min-w-0 flex-1">
        <p class="truncate font-semibold text-white">${lead.name}</p>
        <p class="text-xs text-mist/45">${lead.type} - ${lead.area}</p>
      </div>
      ${statusBadge(lead.status)}
    </article>
  `;
}

function bookingRow(booking) {
  return `
    <article class="flex items-center gap-3 rounded-lg border border-gold/15 bg-black/35 p-4">
      <img src="${booking.image || "../assets/images/logo-bali-healer.png"}" alt="" class="h-10 w-10 shrink-0 rounded-md object-cover" />
      <div class="min-w-0 flex-1">
        <p class="truncate font-semibold text-white">${booking.title}</p>
        <p class="mt-1 flex items-center gap-1 text-xs text-mist/55">${icon("calendar", "h-3.5 w-3.5 text-goldSoft")} ${booking.time}</p>
        <p class="text-xs text-mist/45">${booking.guest}</p>
      </div>
      ${statusBadge(booking.status)}
    </article>
  `;
}

function panel(title, body) {
  return `
    <section class="min-h-[420px] rounded-lg border border-gold/15 bg-[#0f0d0a] p-5">
      <div class="flex items-center justify-between">
        <h2 class="font-extrabold text-white">${title}</h2>
        <button class="rounded-md border border-gold/20 px-4 py-2 text-sm font-bold text-goldSoft transition hover:bg-gold hover:text-black">View All</button>
      </div>
      <div class="mt-5 space-y-4">${body}</div>
    </section>
  `;
}

function dashboardContent() {
  return `
    <section class="relative mt-7 overflow-hidden rounded-lg border border-gold/20 bg-[#1d2748] px-5 py-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
      <div class="absolute -right-8 -top-16 h-32 w-32 rounded-[32px] border-[10px] border-gold/35 rotate-45"></div>
      <div class="absolute right-[18%] top-12 h-20 w-20 rounded-[28px] border-[9px] border-gold/25 rotate-12"></div>
      <div class="absolute right-[6%] bottom-[-30px] h-20 w-20 rounded-[18px] border-[9px] border-gold/20 rotate-12"></div>
      <div class="relative">
        <h2 class="text-3xl font-extrabold">Welcome Back, Demo Admin</h2>
        <p class="mt-2 text-sm font-bold text-white/80">Have a Good day at work</p>
      </div>
    </section>

    <section class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      ${metricCard({ iconName: "provider", tint: "bg-rose-100", value: healerPartnerCount, label: "Total Healers/Partners", leftLabel: "Active", leftValue: healerPartnerCount, rightLabel: "Inactive", rightValue: 0 })}
      ${metricCard({ iconName: "services", tint: "bg-cyan-100", value: serviceCount, label: "Total Services", leftLabel: "Active", leftValue: serviceCount, rightLabel: "Inactive", rightValue: 0 })}
      ${metricCard({ iconName: "calendar", tint: "bg-goldSoft", value: bookingCount, label: "Total Bookings", leftLabel: "Completed", leftValue: 6, rightLabel: "Pending", rightValue: 6 })}
      ${metricCard({ iconName: "transaction", tint: "bg-emerald-100", value: `$${totalAmount}`, label: "Total Amount", leftLabel: "Completed", leftValue: "$831.6", rightLabel: "Pending", rightValue: "$810" })}
    </section>

    <section class="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
      ${panel("Leads", leads.map(leadRow).join(""))}
      ${panel("Bookings", adminBookings.map(bookingRow).join(""))}
    </section>
  `;
}

function table(headers, rows) {
  return `
    <div class="overflow-x-auto rounded-lg border border-gold/15">
      <table class="w-full min-w-[760px] text-left text-sm">
        <thead class="bg-black/45 text-xs uppercase tracking-[0.14em] text-goldSoft">
          <tr>${headers.map((header) => `<th class="px-4 py-3">${header}</th>`).join("")}</tr>
        </thead>
        <tbody class="divide-y divide-gold/10 bg-[#0f0d0a] text-mist/70">
          ${rows.map((row) => `<tr>${row.map((cell, index) => `<td class="px-4 py-4 ${index === 0 ? "font-semibold text-white" : ""}">${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function actionButtons(actions = ["View", "Edit", "Approve"]) {
  return actions.map((action) => `<button class="mr-2 rounded-md border border-gold/20 px-3 py-1.5 text-xs font-bold text-goldSoft transition hover:bg-gold hover:text-black">${action}</button>`).join("");
}

function featureRows(menu) {
  if (menu === "Bookings") return adminBookings.map((item) => [item.title, item.guest, item.time, statusBadge(item.status), actionButtons(["Open", "Reschedule", "Confirm"])]);
  if (menu === "Calendar") return adminBookings.map((item) => [item.time, item.title, item.guest, "Bali / Online", actionButtons(["Move", "Block", "Notify"])]);
  if (menu === "Leads") return leads.map((item) => [item.name, item.type, item.area, statusBadge(item.status), actionButtons(["Accept", "Assign", "Archive"])]);
  if (menu === "Services") return services.slice(0, 8).map((item) => [item.name, item.category, item.mode, item.price, actionButtons(["Edit", "Feature", "Disable"])]);
  if (menu === "Healers/Partners") return vendors.map((item) => [item.name, item.type, item.focus, statusBadge(item.verified), actionButtons(["Verify", "Profile", "Payout"])]);
  if (menu === "Users") return users.map((item) => [item.name, item.email, item.segment, statusBadge(item.status), actionButtons(["View", "Message", "Segment"])]);
  if (menu === "Staffs" || menu === "Roles & Permissions") return staff.map((item) => [item.name, item.role, item.access, statusBadge(item.status), actionButtons(["Edit Role", "Audit", "Disable"])]);
  if (["Transactions", "Healer/Partner Earning", "Healer/Partner Request", "Refund", "Subscription List"].includes(menu)) return transactions.map((item) => [item.code, item.guest, item.amount, statusBadge(item.status), actionButtons(["Review", "Release", "Export"])]);
  if (["Pages", "Menu Builder", "Footer Builder", "Testimonials", "FAQ", "Newsletter", "Blogs"].includes(menu)) return contentItems.map((item) => [item.title, item.type, item.owner, statusBadge(item.status), actionButtons(["Edit", "Preview", "Publish"])]);
  if (["Chat", "WhatsApp Chat", "Chatbot", "Tickets"].includes(menu)) return [
    ["Guest intake", "Ayu Prameswari", "Booking question", statusBadge("Open"), actionButtons(["Reply", "Assign", "Close"])],
    ["Payment support", "Daniel Carter", "Receipt request", statusBadge("In Progress"), actionButtons(["Reply", "Escalate", "Close"])],
    ["Healer availability", "Maya Putri", "Schedule sync", statusBadge("Open"), actionButtons(["Reply", "Assign", "Close"])]
  ];
  return [
    [`${menu} rule`, "Marketplace", "Configured", statusBadge("Active"), actionButtons(["Edit", "Test", "Disable"])],
    [`${menu} queue`, "Operations", "Needs review", statusBadge("Review"), actionButtons(["Review", "Assign", "Archive"])],
    [`${menu} report`, "Admin", "Ready", statusBadge("Published"), actionButtons(["Open", "Export", "Share"])]
  ];
}

function menuDescription(menu) {
  const descriptions = {
    Bookings: "Manage booking requests from location, service mode, schedule, guest data, cart, payment, and confirmation.",
    Calendar: "Control healer availability, mobile service schedules, online sessions, blocked dates, and reschedule requests.",
    Chat: "Handle marketplace conversations between guests, admin support, and healers/partners.",
    "WhatsApp Chat": "Track WhatsApp inquiries, assign operators, and convert conversations into bookings.",
    Chatbot: "Manage automated answers for booking, payment, refund, healer profile, and service availability questions.",
    Leads: "Review incoming leads and route them to the right healer/partner or support queue.",
    Services: "Moderate service listings, categories, prices, duration, mode, visibility, and featured placement.",
    "Healers/Partners": "Verify healer/partner profiles, credentials, payout readiness, services, and marketplace status.",
    Users: "Manage guest profiles, segments, communication preferences, booking history, and support status.",
    Staffs: "Manage internal admin operators and access to operational modules.",
    Transactions: "Monitor paid, pending, failed, refunded, and disputed marketplace payments.",
    "Healer/Partner Earning": "Review commission, service revenue, payout balance, and settlement status for healers/partners.",
    "Healer/Partner Request": "Approve healer/partner payout, profile change, service change, and verification requests.",
    Refund: "Review refund eligibility, evidence, payment gateway state, and guest communication.",
    "Subscription List": "Manage recurring packages, partner subscriptions, billing cycles, and renewal state.",
    Pages: "Edit public website pages and marketplace content blocks.",
    "Menu Builder": "Arrange public navigation, category links, and footer routing.",
    "Footer Builder": "Manage footer columns, legal links, contact details, and social links.",
    Testimonials: "Moderate reviews and testimonials shown on the public website.",
    FAQ: "Maintain guest, healer/partner, booking, payment, and refund FAQ content.",
    Newsletter: "Create campaigns for leads, guests, and healer/partner announcements.",
    Blogs: "Manage SEO articles, wellness guides, and marketplace stories.",
    Notification: "Configure booking, payment, refund, review, and support notifications.",
    Addons: "Manage optional service add-ons, transport fees, extra guests, and ritual materials.",
    Coupon: "Create promo codes, discount rules, usage limits, and campaign attribution.",
    Tickets: "Resolve guest, healer/partner, finance, technical, and dispute tickets.",
    "General Settings": "Control marketplace identity, commission, policies, currencies, and operational settings.",
    "Communication Settings": "Configure email, WhatsApp, chatbot, notification templates, and sender identity.",
    "Request Dispute List": "Review disputes, evidence, communication timeline, and resolution state.",
    Reviews: "Moderate service reviews, ratings, abuse reports, and public visibility.",
    "Roles & Permissions": "Control admin roles, module permissions, approval rights, and audit access."
  };
  return descriptions[menu] || "Manage this marketplace module and keep website, booking, finance, and support operations aligned.";
}

function featureContent(menu) {
  const rows = featureRows(menu);
  const headersByMenu = {
    Bookings: ["Service", "Guest", "Schedule", "Status", "Action"],
    Calendar: ["Time", "Service", "Guest", "Location", "Action"],
    Services: ["Service", "Category", "Mode", "Price", "Action"],
    "Healers/Partners": ["Healer/Partner", "Type", "Focus", "Status", "Action"],
    Transactions: ["Code", "Guest", "Amount", "Status", "Action"],
    "Healer/Partner Earning": ["Code", "Guest", "Amount", "Status", "Action"],
    "Healer/Partner Request": ["Code", "Guest", "Amount", "Status", "Action"],
    Refund: ["Code", "Guest", "Amount", "Status", "Action"],
    "Subscription List": ["Code", "Guest", "Amount", "Status", "Action"]
  };

  return `
    <section class="mt-7 grid gap-5 md:grid-cols-3">
      ${metricCard({ iconName: "bookings", tint: "bg-goldSoft", value: rows.length, label: `${menu} Items`, leftLabel: "Active", leftValue: Math.max(rows.length - 1, 0), rightLabel: "Review", rightValue: 1 })}
      ${metricCard({ iconName: "bell", tint: "bg-cyan-100", value: "24h", label: "SLA Target", leftLabel: "On time", leftValue: "96%", rightLabel: "Late", rightValue: "4%" })}
      ${metricCard({ iconName: "roles", tint: "bg-emerald-100", value: "Admin", label: "Owner Role", leftLabel: "Can edit", leftValue: "Yes", rightLabel: "Audit", rightValue: "On" })}
    </section>
    <section class="mt-6 rounded-lg border border-gold/15 bg-[#0f0d0a] p-5">
      <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 class="text-xl font-extrabold text-white">${menu}</h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-mist/60">${menuDescription(menu)}</p>
        </div>
        <button class="rounded-md bg-gold px-4 py-2 text-sm font-extrabold text-black transition hover:bg-goldSoft">Create New</button>
      </div>
      <div class="mt-5">${table(headersByMenu[menu] || ["Name", "Owner", "Detail", "Status", "Action"], rows)}</div>
    </section>
  `;
}

function pageContent() {
  return activeMenu === "Dashboard" ? dashboardContent() : featureContent(activeMenu);
}

function renderDashboard() {
  app.innerHTML = `
    <div class="min-h-screen bg-[#070604] text-mist lg:pl-[236px]">
      ${renderSidebar()}

      <header class="sticky top-0 z-20 border-b border-gold/15 bg-black/90 px-4 py-3 backdrop-blur lg:hidden">
        <div class="flex items-center gap-3">
          <img src="../assets/images/logo-bali-healer.png" alt="Bali Healer" class="h-9 w-9 rounded-full border border-gold/50" />
          <div>
            <p class="font-cinzel text-sm font-extrabold uppercase text-gold">Bali Healer</p>
            <p class="text-xs text-mist/45">Admin Dashboard</p>
          </div>
        </div>
      </header>

      <main class="min-h-screen overflow-hidden px-4 py-6 lg:px-7">
        <div>
          <h1 class="text-xl font-extrabold text-white">${activeMenu === "Dashboard" ? "Admin Dashboard" : activeMenu}</h1>
          <div class="mt-2 flex items-center gap-2 text-sm text-mist/55">
            <span>Dashboard</span>
            <span>/</span>
            <span class="text-goldSoft">${activeMenu}</span>
          </div>
        </div>
        ${pageContent()}
      </main>
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const navItem = event.target.closest("[data-nav-item]");
  if (!navItem) return;
  activeMenu = navItem.dataset.navItem;
  renderDashboard();
});

renderDashboard();
