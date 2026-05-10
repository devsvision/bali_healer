import { healingCategories } from "./data.js";

const app = document.querySelector("#app");
const links = () => [...document.querySelectorAll(".page-link")];
const categoryButtons = () => [...document.querySelectorAll(".category-link[data-category-filter]")];
let cleanupPage;
let initialRenderDone = false;
let selectedCategory = "";
let selectedLanguage = localStorage.getItem("baliHealerLanguage") || "en-US";
let selectedCurrency = localStorage.getItem("baliHealerCurrency") || "IDR";

const routes = {
  home: {
    hash: "home",
    title: "Discover Your Healing Journey in Bali | Bali Healer",
    description: "Discover your healing journey in Bali with trusted Balinese healers, spiritual wellness sessions, sound baths, chakra balancing, melukat rituals, breathwork, yoga therapy, and online or offline healing services."
  },
  services: {
    hash: "services",
    title: "Healing Services in Bali | Bali Healer",
    description: "Browse online, offline, and hybrid healing services in Bali, including energy healing, sound bath meditation, melukat rituals, breathwork, yoga therapy, and retreats."
  },
  vendor: {
    hash: "healers",
    title: "Verified Healers & Wellness Vendors | Bali Healer",
    description: "Discover individual healers, wellness studios, retreat companies, and healing organizers available through Bali Healer."
  },
  dashboard: {
    hash: "dashboard",
    title: "Marketplace Dashboard Preview | Bali Healer",
    description: "Preview admin, vendor, and user dashboard workflows for the Bali Healer marketplace."
  },
  spec: {
    hash: "about",
    title: "About the Bali Healer Marketplace",
    description: "Learn about the core marketplace features for booking, vendor management, healing operations, reviews, and multi-vendor wellness services."
  }
};

const hashToPage = Object.fromEntries(Object.entries(routes).map(([page, route]) => [route.hash, page]));
const currencyRatesFromIdr = {
  IDR: 1,
  USD: 1 / 16000,
  AUD: 1 / 10500,
  JPY: 1 / 105,
  EUR: 1 / 17500
};
const zeroDecimalCurrencies = new Set(["IDR", "JPY"]);
const translations = {
  "id-ID": {
    "Home": "Beranda",
    "Healers": "Penyembuh",
    "Services": "Layanan",
    "About": "Tentang",
    "My Bookings": "Pesanan Saya",
    "Sign In": "Masuk",
    "All Categories": "Semua Kategori",
    "Healing Categories": "Kategori Healing",
    "Choose a category": "Pilih kategori",
    "Marketplace Service": "Layanan Marketplace",
    "Find services by healing mode.": "Temukan layanan berdasarkan mode healing.",
    "Show All Services": "Tampilkan Semua Layanan",
    "Search service or healer": "Cari layanan atau healer",
    "All categories": "Semua kategori",
    "Bali area": "Area Bali",
    "Booking": "Pesan",
    "Online": "Online",
    "Offline": "Offline",
    "Hybrid": "Hybrid",
    "Individual Healer": "Healer Individu",
    "Business Healer": "Healer Bisnis",
    "Discover Your Healing Journey in Bali": "Temukan Perjalanan Healing Anda di Bali",
    "Where are you going?": "Ke mana Anda akan pergi?",
    "What are you seeking?": "Apa yang Anda cari?",
    "Select date": "Pilih tanggal",
    "Location": "Lokasi",
    "Category": "Kategori",
    "Dates": "Tanggal",
    "Services can be offered by individual healers or registered wellness businesses, with online, offline, or hybrid session options.": "Layanan dapat ditawarkan oleh healer individu atau bisnis wellness terdaftar, dengan pilihan sesi online, offline, atau hybrid.",
    "View all": "Lihat semua",
    "View Profile": "Lihat Profil",
    "Book": "Pesan",
    "Testimonials": "Testimoni",
    "Why Choose Bali Healer?": "Mengapa Memilih Bali Healer?",
    "Booking Service": "Pemesanan Layanan",
    "Complete your reservation details": "Lengkapi detail reservasi Anda",
    "Starting price": "Harga mulai",
    "Date": "Tanggal",
    "Time": "Waktu",
    "Session mode": "Mode sesi",
    "Guests": "Tamu",
    "Full name": "Nama lengkap",
    "WhatsApp / Email": "WhatsApp / Email",
    "Session notes": "Catatan sesi",
    "Cancel": "Batal",
    "Send Booking": "Kirim Pesanan",
    "Booking Sent": "Pesanan Terkirim",
    "Select time": "Pilih waktu",
    "Select mode": "Pilih mode",
    "Your name": "Nama Anda",
    "+62 or email": "+62 atau email",
    "Share your session goals, special conditions, language preferences, or villa/hotel location.": "Bagikan tujuan sesi, kondisi khusus, preferensi bahasa, atau lokasi vila/hotel Anda.",
    "The Marketplace": "Marketplace",
    "Browse Healers": "Jelajahi Healer",
    "All Services": "Semua Layanan",
    "Become a Healer": "Menjadi Healer",
    "Helpful Links": "Tautan Bantuan",
    "Contact Support": "Hubungi Dukungan",
    "Terms of Service": "Syarat Layanan",
    "Privacy Policy": "Kebijakan Privasi",
    "Partner With Us": "Bermitra Dengan Kami",
    "Connect With Us": "Hubungi Kami",
    "All rights reserved.": "Hak cipta dilindungi.",
    "Energy Healing": "Healing Energi",
    "Chakra Balancing": "Penyeimbangan Chakra",
    "Sound Bath": "Sound Bath",
    "Corporate Wellness": "Wellness Korporat",
    "Melukat Ritual": "Ritual Melukat",
    "Breathwork": "Breathwork",
    "Yoga Therapy": "Terapi Yoga",
    "Meditation": "Meditasi",
    "Intuitive Reading": "Bacaan Intuitif",
    "Massage Healing": "Healing Pijat",
    "Couple Healing": "Healing Pasangan",
    "Retreat Package": "Paket Retreat",
    "Astrology": "Astrologi",
    "Tarot Reading": "Bacaan Tarot",
    "Reiki": "Reiki",
    "Life Coaching": "Life Coaching",
    "Balinese Energy Healing": "Healing Energi Bali",
    "Online Chakra Balancing": "Penyeimbangan Chakra Online",
    "Sound Bath Meditation": "Meditasi Sound Bath",
    "Melukat Purification Ritual": "Ritual Penyucian Melukat",
    "Balinese Massage Healing": "Healing Pijat Bali",
    "Balinese cleansing, aura care, and grounding sessions.": "Pembersihan Bali, perawatan aura, dan sesi grounding.",
    "Remote or in-person alignment for body and mind.": "Penyelarasan jarak jauh atau langsung untuk tubuh dan pikiran.",
    "Meditation with bowls, vibration, and deep rest.": "Meditasi dengan bowl, getaran, dan istirahat mendalam.",
    "Curated onsite programs for retreats and teams.": "Program onsite terkurasi untuk retreat dan tim.",
    "Sacred water purification with respectful temple guidance.": "Penyucian air suci dengan panduan pura yang penuh hormat.",
    "Guided breathing for release, clarity, and nervous-system reset.": "Pernapasan terpandu untuk pelepasan, kejernihan, dan reset sistem saraf.",
    "Gentle movement, mobility, and mindful recovery sessions.": "Gerakan lembut, mobilitas, dan sesi pemulihan sadar.",
    "Private or group sessions for stillness and focus.": "Sesi privat atau grup untuk ketenangan dan fokus.",
    "Reflective guidance for emotional insight and direction.": "Panduan reflektif untuk wawasan emosional dan arah.",
    "Bodywork for relaxation, circulation, and energetic balance.": "Bodywork untuk relaksasi, sirkulasi, dan keseimbangan energi.",
    "Shared rituals and connection sessions for two people.": "Ritual bersama dan sesi koneksi untuk dua orang.",
    "Multi-day healing journeys with curated activities.": "Perjalanan healing beberapa hari dengan aktivitas terkurasi.",
    "Birth chart reading and timing guidance.": "Pembacaan birth chart dan panduan waktu.",
    "Symbolic card reading for reflection and decision support.": "Pembacaan kartu simbolis untuk refleksi dan dukungan keputusan.",
    "Light-touch energy session for calm and restoration.": "Sesi energi sentuhan ringan untuk ketenangan dan pemulihan.",
    "Goal clarity, integration, and supportive personal guidance.": "Kejelasan tujuan, integrasi, dan bimbingan personal suportif."
  },
  "ja-JP": {
    "Home": "ホーム",
    "Healers": "ヒーラー",
    "Services": "サービス",
    "About": "概要",
    "My Bookings": "予約",
    "Sign In": "ログイン",
    "All Categories": "すべてのカテゴリー",
    "Healing Categories": "ヒーリングカテゴリー",
    "Choose a category": "カテゴリーを選択",
    "Marketplace Service": "マーケットプレイスサービス",
    "Find services by healing mode.": "ヒーリング形式でサービスを探す",
    "Show All Services": "すべて表示",
    "Search service or healer": "サービスまたはヒーラーを検索",
    "All categories": "すべてのカテゴリー",
    "Bali area": "バリのエリア",
    "Booking": "予約",
    "Online": "オンライン",
    "Offline": "対面",
    "Hybrid": "ハイブリッド",
    "Individual Healer": "個人ヒーラー",
    "Business Healer": "ビジネスヒーラー",
    "Location": "場所",
    "Category": "カテゴリー",
    "Dates": "日付",
    "Select date": "日付を選択",
    "Starting price": "開始価格",
    "Date": "日付",
    "Time": "時間",
    "Session mode": "セッション形式",
    "Guests": "人数",
    "Full name": "氏名",
    "Session notes": "セッションメモ",
    "Select time": "時間を選択",
    "Select mode": "形式を選択",
    "View all": "すべて見る",
    "View Profile": "プロフィール",
    "Book": "予約",
    "Cancel": "キャンセル",
    "Send Booking": "予約を送信",
    "Booking Sent": "送信済み",
    "Energy Healing": "エネルギーヒーリング",
    "Chakra Balancing": "チャクラ調整",
    "Sound Bath": "サウンドバス",
    "Corporate Wellness": "企業ウェルネス",
    "Melukat Ritual": "ムルカット儀式",
    "Breathwork": "ブレスワーク",
    "Yoga Therapy": "ヨガセラピー",
    "Meditation": "瞑想",
    "Intuitive Reading": "直感リーディング",
    "Massage Healing": "マッサージヒーリング",
    "Couple Healing": "カップルヒーリング",
    "Retreat Package": "リトリートパッケージ",
    "Astrology": "占星術",
    "Tarot Reading": "タロットリーディング",
    "Reiki": "レイキ",
    "Life Coaching": "ライフコーチング"
  },
  "de-DE": {
    "Home": "Start",
    "Healers": "Heiler",
    "Services": "Leistungen",
    "About": "Über uns",
    "My Bookings": "Meine Buchungen",
    "Sign In": "Anmelden",
    "All Categories": "Alle Kategorien",
    "Healing Categories": "Healing-Kategorien",
    "Choose a category": "Kategorie wählen",
    "Marketplace Service": "Marketplace-Leistung",
    "Find services by healing mode.": "Leistungen nach Healing-Modus finden.",
    "Show All Services": "Alle Leistungen anzeigen",
    "Search service or healer": "Leistung oder Heiler suchen",
    "All categories": "Alle Kategorien",
    "Bali area": "Bali-Region",
    "Booking": "Buchen",
    "Online": "Online",
    "Offline": "Vor Ort",
    "Hybrid": "Hybrid",
    "Individual Healer": "Einzelheiler",
    "Business Healer": "Business-Heiler",
    "Location": "Ort",
    "Category": "Kategorie",
    "Dates": "Daten",
    "Select date": "Datum wählen",
    "Starting price": "Startpreis",
    "Date": "Datum",
    "Time": "Uhrzeit",
    "Session mode": "Sitzungsmodus",
    "Guests": "Gäste",
    "Full name": "Vollständiger Name",
    "Session notes": "Sitzungsnotizen",
    "Select time": "Uhrzeit wählen",
    "Select mode": "Modus wählen",
    "View all": "Alle anzeigen",
    "View Profile": "Profil ansehen",
    "Book": "Buchen",
    "Cancel": "Abbrechen",
    "Send Booking": "Buchung senden",
    "Booking Sent": "Buchung gesendet",
    "Energy Healing": "Energieheilung",
    "Chakra Balancing": "Chakra-Ausgleich",
    "Sound Bath": "Sound Bath",
    "Corporate Wellness": "Corporate Wellness",
    "Melukat Ritual": "Melukat-Ritual",
    "Breathwork": "Atemarbeit",
    "Yoga Therapy": "Yoga-Therapie",
    "Meditation": "Meditation",
    "Intuitive Reading": "Intuitives Reading",
    "Massage Healing": "Massageheilung",
    "Couple Healing": "Paar-Healing",
    "Retreat Package": "Retreat-Paket",
    "Astrology": "Astrologie",
    "Tarot Reading": "Tarot-Reading",
    "Reiki": "Reiki",
    "Life Coaching": "Life Coaching"
  }
};
const categoryIcons = {
  "Energy Healing": `<path d="M12 3v18M5 8c3.5 0 7 2.4 7 6.2C12 10.4 15.5 8 19 8"/><path d="M7 16c2.2 0 4-1.4 5-3 1 1.6 2.8 3 5 3"/>`,
  "Chakra Balancing": `<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/>`,
  "Sound Bath": `<path d="M4 14h16"/><path d="M7 14a5 5 0 0 0 10 0"/><path d="M9 8c1.5-1.4 4.5-1.4 6 0M6 5c3-2.6 9-2.6 12 0"/>`,
  "Corporate Wellness": `<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M9 5V3h6v2M8 11h8M8 15h5"/>`,
  "Melukat Ritual": `<path d="M12 3c3 3.4 5 6.1 5 9a5 5 0 0 1-10 0c0-2.9 2-5.6 5-9Z"/><path d="M9 14c1.6 1.3 4.4 1.3 6 0"/>`,
  "Breathwork": `<path d="M4 12c2-3 6-3 8 0s6 3 8 0"/><path d="M4 16c2-3 6-3 8 0s6 3 8 0"/><path d="M4 8c2-3 6-3 8 0s6 3 8 0"/>`,
  "Yoga Therapy": `<circle cx="12" cy="5" r="2"/><path d="M12 7v6l-4 5M12 13l4 5M8 10h8"/>`,
  "Meditation": `<circle cx="12" cy="8" r="2"/><path d="M8 18c1.2-2 2.5-3 4-3s2.8 1 4 3"/><path d="M5 14c2 1.2 4.2 1.8 7 1.8s5-.6 7-1.8"/>`,
  "Intuitive Reading": `<path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h5"/><path d="M16 16l3 3"/>`,
  "Massage Healing": `<path d="M6 12h12"/><path d="M8 8c1.2-1.8 3-2.7 4-2.7S14.8 6.2 16 8"/><path d="M7 16c2.8 2.2 7.2 2.2 10 0"/>`,
  "Couple Healing": `<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>`,
  "Retreat Package": `<path d="M3 19h18"/><path d="M5 19V9l7-5 7 5v10"/><path d="M9 19v-6h6v6"/>`,
  "Astrology": `<circle cx="12" cy="12" r="7"/><path d="M12 5v14M5 12h14"/><path d="m8 8 8 8M16 8l-8 8"/>`,
  "Tarot Reading": `<rect x="7" y="3" width="10" height="16" rx="2"/><path d="M10 7h4M10 11h4M9 21h8"/>`,
  "Reiki": `<path d="M12 21c-3-2.2-5-5.2-5-8a5 5 0 0 1 10 0c0 2.8-2 5.8-5 8Z"/><path d="M9 12h6M12 9v6"/>`,
  "Life Coaching": `<path d="M12 19v-7"/><path d="M8 15l4 4 4-4"/><path d="M5 5h14v6H5z"/>`
};

function setMeta(route) {
  document.title = route.title;
  const description = document.querySelector("meta[name='description']");
  const ogTitle = document.querySelector("meta[property='og:title']");
  const ogDescription = document.querySelector("meta[property='og:description']");
  const twitterTitle = document.querySelector("meta[name='twitter:title']");
  const twitterDescription = document.querySelector("meta[name='twitter:description']");
  if (description) description.content = route.description;
  if (ogTitle) ogTitle.content = route.title;
  if (ogDescription) ogDescription.content = route.description;
  if (twitterTitle) twitterTitle.content = route.title;
  if (twitterDescription) twitterDescription.content = route.description;
}

function revealInitialRender() {
  if (initialRenderDone) return;
  initialRenderDone = true;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("app-booting");
      document.body.classList.add("app-ready");
    });
  });
}

function parseIdrPrice(price) {
  return Number(String(price).replace(/[^\d]/g, ""));
}

function formatPrice(price) {
  const idrPrice = parseIdrPrice(price);
  const convertedPrice = idrPrice * (currencyRatesFromIdr[selectedCurrency] || 1);
  const fractionDigits = zeroDecimalCurrencies.has(selectedCurrency) ? 0 : 2;

  return new Intl.NumberFormat(selectedLanguage, {
    style: "currency",
    currency: selectedCurrency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(convertedPrice);
}

function applyLocalizedPrices() {
  document.querySelectorAll("[data-price-idr]").forEach((element) => {
    if (!element.dataset.priceIdr) return;
    element.textContent = formatPrice(element.dataset.priceIdr);
  });
}

function dictionary() {
  return translations[selectedLanguage] || {};
}

function normalizeToEnglish(text) {
  for (const translationMap of Object.values(translations)) {
    const match = Object.entries(translationMap).find(([, translated]) => translated === text);
    if (match) return match[0];
  }
  return text;
}

function translateValue(value) {
  const text = normalizeToEnglish(String(value || "").trim());
  if (!text) return value;

  const entries = dictionary();
  if (entries[text]) return entries[text];

  const categoryServiceMatch = text.match(/^(.+) services$/);
  if (categoryServiceMatch && entries[categoryServiceMatch[1]]) {
    if (selectedLanguage === "id-ID") return `Layanan ${entries[categoryServiceMatch[1]]}`;
    if (selectedLanguage === "ja-JP") return `${entries[categoryServiceMatch[1]]}サービス`;
    if (selectedLanguage === "de-DE") return `${entries[categoryServiceMatch[1]]}-Leistungen`;
    return `${entries[categoryServiceMatch[1]]} services`;
  }

  const showingMatch = text.match(/^(.*) Showing (\d+) matching service(s?)\.$/);
  if (showingMatch) {
    const translatedDescription = entries[showingMatch[1]] || showingMatch[1];
    if (selectedLanguage === "id-ID") {
      return `${translatedDescription} Menampilkan ${showingMatch[2]} layanan yang sesuai.`;
    }
    if (selectedLanguage === "ja-JP") {
      return `${translatedDescription} 一致するサービスを${showingMatch[2]}件表示しています。`;
    }
    if (selectedLanguage === "de-DE") {
      return `${translatedDescription} ${showingMatch[2]} passende Leistung${showingMatch[2] === "1" ? "" : "en"} werden angezeigt.`;
    }
    return `${translatedDescription} Showing ${showingMatch[2]} matching service${showingMatch[3]}.`;
  }

  return value;
}

function applyLocalizedText(root = document.body) {
  document.documentElement.lang = selectedLanguage;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "SVG"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const original = node.nodeValue;
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${translateValue(original.trim())}${trailing}`;
  });

  root.querySelectorAll?.("[placeholder], [aria-label], option").forEach((element) => {
    if (element.hasAttribute("placeholder")) {
      element.setAttribute("placeholder", translateValue(element.getAttribute("placeholder")));
    }
    if (element.hasAttribute("aria-label")) {
      element.setAttribute("aria-label", translateValue(element.getAttribute("aria-label")));
    }
    if (element.tagName === "OPTION") {
      element.textContent = translateValue(element.textContent);
    }
  });
}

function applyLocalization(root = document.body) {
  applyLocalizedText(root);
  applyLocalizedPrices();
}

function syncLocaleControls() {
  const languageSelect = document.querySelector("[data-language-select]");
  const currencySelect = document.querySelector("[data-currency-select]");
  if (languageSelect) languageSelect.value = selectedLanguage;
  if (currencySelect) currencySelect.value = selectedCurrency;
}

async function loadPage(page, updateHash = true) {
  const route = routes[page] || routes.home;
  const nextPage = routes[page] ? page : "home";
  if (typeof cleanupPage === "function") {
    cleanupPage();
    cleanupPage = undefined;
  }
  const module = await import(`../modules/${nextPage}.js`);
  app.innerHTML = module.render({ selectedCategory });
  if (typeof module.init === "function") {
    cleanupPage = module.init();
  }
  setMeta(route);
  if (updateHash && window.location.hash.slice(1) !== route.hash) {
    history.pushState(null, "", `#${route.hash}`);
  }

  links().forEach((link) => {
    const active = link.dataset.page === nextPage;
    if (link.dataset.nav === "true") {
      link.classList.toggle("text-goldSoft", active);
      link.classList.toggle("text-mist/70", !active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  });

  categoryButtons().forEach((button) => {
    const active = button.dataset.categoryFilter === selectedCategory;
    button.classList.toggle("border-gold/60", active);
    button.classList.toggle("bg-gold/15", active);
    button.classList.toggle("text-goldSoft", active);
    button.classList.toggle("border-gold/15", !active);
    button.classList.toggle("text-mist/75", !active);
  });
  syncLocaleControls();
  applyLocalization();

  const isInitialRender = !initialRenderDone;
  revealInitialRender();

  window.scrollTo({ top: 0, behavior: isInitialRender ? "auto" : "smooth" });
}

function chooseCategory(category) {
  selectedCategory = category;
  closeCategoryMenu();
  loadPage("services");
}

function openCategoryMenu() {
  const modal = document.querySelector("[data-category-modal]");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeCategoryMenu() {
  const modal = document.querySelector("[data-category-modal]");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function renderCategoryMenu() {
  const list = document.querySelector("[data-category-menu-list]");
  if (!list) return;
  list.innerHTML = healingCategories.map((category) => `
    <button data-category-filter="${category.name}" class="category-link flex gap-4 rounded-lg border border-gold/15 bg-black/45 p-4 text-left transition hover:border-gold/45 hover:bg-gold/10">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-goldSoft">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${categoryIcons[category.name] || categoryIcons["Energy Healing"]}</svg>
      </span>
      <span class="min-w-0">
        <span class="block text-base font-semibold text-white">${category.name}</span>
        <span class="mt-2 block text-sm leading-6 text-mist/55">${category.description}</span>
      </span>
    </button>
  `).join("");
}

document.addEventListener("click", (event) => {
  const link = event.target.closest(".page-link");
  if (link) {
    event.preventDefault();
    loadPage(link.dataset.page);
    return;
  }

  const categoryButton = event.target.closest("[data-category-filter]");
  if (categoryButton) {
    chooseCategory(categoryButton.dataset.categoryFilter);
    return;
  }

  if (event.target.closest("[data-open-category-menu]")) {
    openCategoryMenu();
    return;
  }

  if (event.target.closest("[data-close-category-menu]") || event.target === document.querySelector("[data-category-modal]")) {
    closeCategoryMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCategoryMenu();
});

document.addEventListener("change", (event) => {
  const languageSelect = event.target.closest("[data-language-select]");
  if (languageSelect) {
    selectedLanguage = languageSelect.value;
    localStorage.setItem("baliHealerLanguage", selectedLanguage);
    syncLocaleControls();
    renderCategoryMenu();
    applyLocalization();
    return;
  }

  const currencySelect = event.target.closest("[data-currency-select]");
  if (currencySelect) {
    selectedCurrency = currencySelect.value;
    localStorage.setItem("baliHealerCurrency", selectedCurrency);
    syncLocaleControls();
    applyLocalizedPrices();
    return;
  }

  const select = event.target.closest("[data-service-category-select]");
  if (!select) return;
  chooseCategory(select.value);
});

document.addEventListener("prices:refresh", () => applyLocalization());

window.addEventListener("hashchange", () => {
  const page = hashToPage[window.location.hash.slice(1)] || "home";
  loadPage(page, false);
});

renderCategoryMenu();
syncLocaleControls();
loadPage(hashToPage[window.location.hash.slice(1)] || "home", false);
