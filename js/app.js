import { healingCategories } from "./data.js";

const app = document.querySelector("#app");
const links = () => [...document.querySelectorAll(".page-link")];
const categoryButtons = () => [...document.querySelectorAll(".category-link[data-category-filter]")];
let cleanupPage;
let initialRenderDone = false;
let currentPage = "home";
let selectedCategory = "";
let selectedLanguage = localStorage.getItem("baliHealerLanguage") || "en-US";
const selectedCurrency = "IDR";
let currencyRatesLastUpdated = "";
const splashStartedAt = performance.now();
const splashMinimumDuration = 2300;
const clientSessionKey = "baliHealerClientSession";
const registeredClientKey = "baliHealerRegisteredClient";
const demoClientAccount = {
  name: "Demo Client",
  email: "client@balihealer.com",
  password: "BaliHealer123"
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

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
  "healing-space": {
    hash: "healing-space",
    title: "Healing Space | Bali Healer",
    description: "Explore a healer's healing space with session packages, availability, philosophy, reviews, gallery, booking, and chat options."
  },
  vendor: {
    hash: "healers",
    title: "Verified Healers & Wellness Partners | Bali Healer",
    description: "Discover healers and wellness partners available through Bali Healer."
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
let selectedHealingService = "";
const currencyRatesFromIdr = {
  IDR: 1,
  USD: 1 / 16000,
  EUR: 1 / 17500,
  GBP: 1 / 20500,
  AUD: 1 / 10500,
  JPY: 1 / 105
};
const estimateCurrencies = ["USD", "EUR", "GBP", "AUD", "JPY"];
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
    "Healer": "Healer",
    "Partner": "Partner",
    "Discover Your Healing Journey in Bali": "Temukan Perjalanan Healing Anda di Bali",
    "Where are you going?": "Ke mana Anda akan pergi?",
    "What are you seeking?": "Apa yang Anda cari?",
    "Select date": "Pilih tanggal",
    "Location": "Lokasi",
    "Category": "Kategori",
    "Dates": "Tanggal",
    "Services can be offered by healers or registered wellness partners, with online, offline, or hybrid session options.": "Layanan dapat ditawarkan oleh healer atau partner wellness terdaftar, dengan pilihan sesi online, offline, atau hybrid.",
    "View all": "Lihat semua",
    "Enter Healing Space": "Masuk Healing Space",
    "Book": "Pesan",
    "Testimonials": "Testimoni",
    "Why Choose Bali Healer?": "Mengapa Memilih Bali Healer?",
    "Booking Service": "Pemesanan Layanan",
    "Vendor Profile": "Profil Vendor",
    "Complete your reservation details": "Lengkapi detail reservasi Anda",
    "Experience": "Pengalaman",
    "Sessions": "Sesi",
    "Rating": "Rating",
    "Service Includes": "Termasuk Layanan",
    "Vendor Details": "Detail Vendor",
    "Book This Service": "Pesan Layanan Ini",
    "Close": "Tutup",
    "Starting price": "Harga mulai",
    "Date": "Tanggal",
    "Time": "Waktu",
    "Session mode": "Mode sesi",
    "Guests": "Tamu",
    "Full name": "Nama lengkap",
    "WhatsApp / Email": "WhatsApp / Email",
    "WhatsApp Number": "Nomor WhatsApp",
    "Email": "Email",
    "Session notes": "Catatan sesi",
    "Cancel": "Batal",
    "Send Booking": "Kirim Pesanan",
    "Continue to Checkout": "Lanjut ke Checkout",
    "Checkout": "Checkout",
    "Review your booking request": "Periksa permintaan booking Anda",
    "Please make sure all booking details are correct before continuing to the next process.": "Pastikan semua detail booking sudah benar sebelum melanjutkan ke proses berikutnya.",
    "Service": "Layanan",
    "Healer": "Healer",
    "Back": "Kembali",
    "Complete Request": "Selesaikan Permintaan",
    "Proceed to Payment": "Lanjut ke Pembayaran",
    "Payment": "Pembayaran",
    "Complete payment details": "Lengkapi detail pembayaran",
    "Billing name": "Nama penagihan",
    "Billing email": "Email penagihan",
    "Phone number": "Nomor telepon",
    "Amount": "Jumlah",
    "Payment gateway": "Payment gateway",
    "Start Payment": "Mulai Pembayaran",
    "Payment Started": "Pembayaran Dimulai",
    "Payment gateway integration is prepared for Midtrans, HitPay, and Stripe. The selected gateway will handle the secure payment step.": "Integrasi payment gateway disiapkan untuk Midtrans, HitPay, dan Stripe. Gateway yang dipilih akan menangani langkah pembayaran aman.",
    "Payment will be confirmed after the healer or admin approves the requested schedule and session details.": "Pembayaran akan dikonfirmasi setelah healer atau admin menyetujui jadwal dan detail sesi yang diminta.",
    "Please make sure every field is filled in correctly and valid. You can continue to checkout only after all required booking details are complete.": "Pastikan setiap kolom terisi dengan benar dan valid. Anda hanya bisa lanjut ke checkout setelah semua detail booking wajib lengkap.",
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
    "Vendor Profile": "ベンダープロフィール",
    "Experience": "経験",
    "Sessions": "セッション",
    "Rating": "評価",
    "Service Includes": "サービス内容",
    "Vendor Details": "ベンダー詳細",
    "Book This Service": "このサービスを予約",
    "Close": "閉じる",
    "Online": "オンライン",
    "Offline": "対面",
    "Hybrid": "ハイブリッド",
    "Healer": "Healer",
    "Partner": "Partner",
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
    "WhatsApp Number": "WhatsApp番号",
    "Email": "メール",
    "Session notes": "セッションメモ",
    "Select time": "時間を選択",
    "Select mode": "形式を選択",
    "View all": "すべて見る",
    "Enter Healing Space": "Enter Healing Space",
    "Book": "予約",
    "Cancel": "キャンセル",
    "Send Booking": "予約を送信",
    "Continue to Checkout": "チェックアウトへ進む",
    "Checkout": "チェックアウト",
    "Review your booking request": "予約リクエストを確認",
    "Please make sure all booking details are correct before continuing to the next process.": "次の手順に進む前に、すべての予約内容が正しいことを確認してください。",
    "Service": "サービス",
    "Healer": "ヒーラー",
    "Back": "戻る",
    "Complete Request": "リクエストを完了",
    "Proceed to Payment": "支払いへ進む",
    "Payment": "支払い",
    "Complete payment details": "支払い情報を入力",
    "Billing name": "請求名",
    "Billing email": "請求メール",
    "Phone number": "電話番号",
    "Amount": "金額",
    "Payment gateway": "決済ゲートウェイ",
    "Start Payment": "支払い開始",
    "Payment Started": "支払い開始済み",
    "Payment gateway integration is prepared for Midtrans, HitPay, and Stripe. The selected gateway will handle the secure payment step.": "Midtrans、HitPay、Stripe の決済連携を準備しています。選択したゲートウェイが安全な支払い手順を処理します。",
    "Payment will be confirmed after the healer or admin approves the requested schedule and session details.": "支払いは、ヒーラーまたは管理者が希望日時とセッション内容を承認した後に確認されます。",
    "Please make sure every field is filled in correctly and valid. You can continue to checkout only after all required booking details are complete.": "すべての項目が正しく有効に入力されていることを確認してください。必須の予約情報がすべて完了した後にのみチェックアウトへ進めます。",
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
    "Vendor Profile": "Anbieterprofil",
    "Experience": "Erfahrung",
    "Sessions": "Sitzungen",
    "Rating": "Bewertung",
    "Service Includes": "Leistungsumfang",
    "Vendor Details": "Anbieterdetails",
    "Book This Service": "Diese Leistung buchen",
    "Close": "Schließen",
    "Online": "Online",
    "Offline": "Vor Ort",
    "Hybrid": "Hybrid",
    "Healer": "Healer",
    "Partner": "Partner",
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
    "WhatsApp Number": "WhatsApp-Nummer",
    "Email": "E-Mail",
    "Session notes": "Sitzungsnotizen",
    "Select time": "Uhrzeit wählen",
    "Select mode": "Modus wählen",
    "View all": "Alle anzeigen",
    "Enter Healing Space": "Enter Healing Space",
    "Book": "Buchen",
    "Cancel": "Abbrechen",
    "Send Booking": "Buchung senden",
    "Continue to Checkout": "Weiter zum Checkout",
    "Checkout": "Checkout",
    "Review your booking request": "Buchungsanfrage prüfen",
    "Please make sure all booking details are correct before continuing to the next process.": "Bitte stellen Sie sicher, dass alle Buchungsdetails korrekt sind, bevor Sie fortfahren.",
    "Service": "Leistung",
    "Healer": "Heiler",
    "Back": "Zurück",
    "Complete Request": "Anfrage abschließen",
    "Proceed to Payment": "Weiter zur Zahlung",
    "Payment": "Zahlung",
    "Complete payment details": "Zahlungsdetails ausfüllen",
    "Billing name": "Rechnungsname",
    "Billing email": "Rechnungs-E-Mail",
    "Phone number": "Telefonnummer",
    "Amount": "Betrag",
    "Payment gateway": "Payment Gateway",
    "Start Payment": "Zahlung starten",
    "Payment Started": "Zahlung gestartet",
    "Payment gateway integration is prepared for Midtrans, HitPay, and Stripe. The selected gateway will handle the secure payment step.": "Die Payment-Gateway-Integration ist für Midtrans, HitPay und Stripe vorbereitet. Das ausgewählte Gateway verarbeitet den sicheren Zahlungsschritt.",
    "Payment will be confirmed after the healer or admin approves the requested schedule and session details.": "Die Zahlung wird bestätigt, nachdem Heiler oder Admin den gewünschten Termin und die Sitzungsdetails genehmigt haben.",
    "Please make sure every field is filled in correctly and valid. You can continue to checkout only after all required booking details are complete.": "Bitte stellen Sie sicher, dass jedes Feld korrekt und gültig ausgefüllt ist. Sie können erst zum Checkout fortfahren, wenn alle erforderlichen Buchungsdetails vollständig sind.",
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

  const elapsed = performance.now() - splashStartedAt;
  const remaining = Math.max(0, splashMinimumDuration - elapsed);

  window.setTimeout(() => requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      document.body.classList.remove("app-booting");
      document.body.classList.add("app-ready");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }), remaining);
}

function parseIdrPrice(price) {
  return Number(String(price).replace(/[^\d]/g, ""));
}

async function refreshLiveCurrencyRates() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/IDR", {
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Currency service unavailable");

    const data = await response.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Currency rates unavailable");
    }

    estimateCurrencies.forEach((currency) => {
      const rate = Number(data.rates[currency]);
      if (Number.isFinite(rate) && rate > 0) {
        currencyRatesFromIdr[currency] = rate;
      }
    });
    currencyRatesLastUpdated = data.time_last_update_utc || new Date().toUTCString();
    document.dispatchEvent(new CustomEvent("prices:refresh"));
  } catch (error) {
    console.warn("Using fallback currency estimates.", error);
  }
}

function formatCurrencyAmount(amount, currency = selectedCurrency) {
  const fractionDigits = zeroDecimalCurrencies.has(currency) ? 0 : 2;

  return new Intl.NumberFormat(selectedLanguage, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount);
}

function formatPrice(price) {
  const idrPrice = parseIdrPrice(price);
  const convertedPrice = idrPrice * (currencyRatesFromIdr[selectedCurrency] || 1);

  return formatCurrencyAmount(convertedPrice);
}

function estimateCurrencyRows(price) {
  const idrPrice = parseIdrPrice(price);
  return estimateCurrencies.map((currency) => {
    const convertedPrice = idrPrice * (currencyRatesFromIdr[currency] || 1);
    return `
      <div class="flex items-center justify-between gap-4 border-b border-gold/10 py-2 last:border-b-0">
        <span class="font-semibold text-mist/65">${currency}</span>
        <span class="font-extrabold text-goldSoft">${formatCurrencyAmount(convertedPrice, currency)}</span>
      </div>
    `;
  }).join("");
}

function updateCurrencyEstimatePanel(panel, price) {
  panel.innerHTML = `
    <div class="space-y-1">${estimateCurrencyRows(price)}</div>
    <p class="mt-3 text-[10px] leading-4 text-mist/35">${currencyRatesLastUpdated ? `Live rates updated ${currencyRatesLastUpdated}` : "Live estimates use fallback rates until the currency service loads."}</p>
  `;
}

function ensureCurrencyEstimateControls(root = document.body) {
  root.querySelectorAll?.("[data-price-idr]").forEach((element) => {
    if (!element.dataset.priceIdr || ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) return;
    if (element.nextElementSibling?.hasAttribute("data-currency-estimates")) return;

    const wrapper = document.createElement("div");
    wrapper.dataset.currencyEstimates = "true";
    wrapper.className = "relative mt-1 text-center";
    wrapper.innerHTML = `
      <button type="button" data-currency-estimate-toggle class="text-[11px] font-semibold leading-4 text-mist/45 underline decoration-gold/35 underline-offset-4 transition hover:text-goldSoft">
        Click here for estimates in other countries' currencies.
      </button>
      <div data-currency-estimate-panel class="absolute bottom-full left-1/2 z-30 mb-2 hidden w-64 -translate-x-1/2 rounded-lg border border-gold/25 bg-[#11100e] p-3 text-left text-xs shadow-[0_18px_55px_rgba(0,0,0,0.55)]"></div>
    `;
    element.insertAdjacentElement("afterend", wrapper);
  });
}

function updateCurrencyEstimateControls(root = document.body) {
  ensureCurrencyEstimateControls(root);
  root.querySelectorAll?.("[data-currency-estimates]").forEach((wrapper) => {
    const priceElement = wrapper.previousElementSibling;
    const panel = wrapper.querySelector("[data-currency-estimate-panel]");
    if (!priceElement?.dataset.priceIdr || !panel) return;
    updateCurrencyEstimatePanel(panel, priceElement.dataset.priceIdr);
  });
}

function applyLocalizedPrices() {
  document.querySelectorAll("[data-price-idr]").forEach((element) => {
    if (!element.dataset.priceIdr) return;
    element.textContent = formatPrice(element.dataset.priceIdr);
  });
  updateCurrencyEstimateControls();
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

function hashState() {
  const rawHash = window.location.hash.slice(1);
  const [hashPath, query = ""] = rawHash.split("?");
  const page = hashToPage[hashPath] || "home";
  const params = new URLSearchParams(query);

  return {
    page,
    service: params.get("service") || ""
  };
}

function syncLocaleControls() {
  document.querySelectorAll("[data-language-select]").forEach((languageSelect) => {
    languageSelect.value = selectedLanguage;
  });
}

function updateCategoryBarVisibility(page = currentPage) {
  const categoryBar = document.querySelector("[data-category-bar]");
  if (!categoryBar) return;

  const hero = document.querySelector("[data-home-hero]");
  const heroLimit = hero ? hero.offsetTop + hero.offsetHeight - 120 : 0;
  const shouldShow = page === "home" && hero && window.scrollY < heroLimit;

  categoryBar.classList.toggle("max-h-24", shouldShow);
  categoryBar.classList.toggle("translate-y-0", shouldShow);
  categoryBar.classList.toggle("border-gold/10", shouldShow);
  categoryBar.classList.toggle("opacity-100", shouldShow);
  categoryBar.classList.toggle("max-h-0", !shouldShow);
  categoryBar.classList.toggle("-translate-y-2", !shouldShow);
  categoryBar.classList.toggle("border-transparent", !shouldShow);
  categoryBar.classList.toggle("opacity-0", !shouldShow);
  categoryBar.classList.toggle("pointer-events-none", !shouldShow);
}

async function loadPage(page, updateHash = true) {
  const route = routes[page] || routes.home;
  const nextPage = routes[page] ? page : "home";
  currentPage = nextPage;
  if (typeof cleanupPage === "function") {
    cleanupPage();
    cleanupPage = undefined;
  }
  const module = await import(`../modules/${nextPage}.js`);
  app.innerHTML = module.render({ selectedCategory, selectedService: selectedHealingService });
  if (typeof module.init === "function") {
    cleanupPage = module.init();
  }
  setMeta(route);
  if (updateHash && window.location.hash.slice(1) !== route.hash) {
    const serviceQuery = nextPage === "healing-space" && selectedHealingService
      ? `?service=${encodeURIComponent(selectedHealingService)}`
      : "";
    history.pushState(null, "", `#${route.hash}${serviceQuery}`);
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
  updateCategoryBarVisibility(nextPage);

  const isInitialRender = !initialRenderDone;
  revealInitialRender();

  window.scrollTo({ top: 0, left: 0, behavior: isInitialRender ? "auto" : "smooth" });
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

function openMobileMenu() {
  const menu = document.querySelector("[data-mobile-menu]");
  if (!menu) return;
  menu.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
  const menu = document.querySelector("[data-mobile-menu]");
  if (!menu) return;
  menu.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function clientSignedIn() {
  return Boolean(localStorage.getItem(clientSessionKey));
}

function updateClientHeader() {
  const signedIn = clientSignedIn();
  document.querySelectorAll("[data-client-signin-button]").forEach((button) => {
    const inMobileMenu = Boolean(button.closest("[data-mobile-menu]"));
    button.classList.toggle("hidden", signedIn || !inMobileMenu);
    button.classList.toggle("sm:flex", !signedIn && !inMobileMenu);
    button.classList.toggle("flex", !signedIn && inMobileMenu);
  });
  document.querySelector("[data-client-header-actions]")?.classList.toggle("hidden", !signedIn);
  document.querySelector("[data-client-header-actions]")?.classList.toggle("sm:flex", signedIn);
}

function openClientAuth(mode = "signin") {
  const modal = document.querySelector("[data-client-auth-modal]");
  if (!modal) return;
  setClientAuthMode(mode);
  setClientAuthError("");
  setClientSignupMessage("");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeClientAuth() {
  const modal = document.querySelector("[data-client-auth-modal]");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function showClientToast(type, message) {
  let toast = document.querySelector("[data-client-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.dataset.clientToast = "true";
    toast.className = "fixed right-4 top-24 z-[110] max-w-sm rounded-lg border px-4 py-3 text-sm font-bold shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition";
    document.body.appendChild(toast);
  }
  const success = type === "success";
  toast.className = `fixed right-4 top-24 z-[110] max-w-sm rounded-lg border px-4 py-3 text-sm font-bold shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition ${success ? "border-gold/35 bg-[#0d0c0b] text-goldSoft" : "border-red-400/35 bg-[#220b0b] text-red-100"}`;
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showClientToast.timer);
  showClientToast.timer = window.setTimeout(() => {
    toast?.classList.add("hidden");
  }, 3500);
}

function setClientAuthMode(mode) {
  const signInPanel = document.querySelector('[data-auth-panel="signin"]');
  const signUpPanel = document.querySelector('[data-auth-panel="signup"]');
  const switchText = document.querySelector("[data-auth-switch-text]");
  const isSignUp = mode === "signup";

  signInPanel?.classList.toggle("hidden", isSignUp);
  signUpPanel?.classList.toggle("hidden", !isSignUp);
  if (switchText) {
    switchText.innerHTML = isSignUp
      ? 'Already registered? <button data-show-client-signin class="font-extrabold text-goldSoft hover:text-gold">Sign in</button>'
      : 'Not registered yet? <button data-show-client-signup class="font-extrabold text-goldSoft hover:text-gold">Sign up</button>';
  }
}

function setClientAuthError(message) {
  const error = document.querySelector("[data-client-auth-error]");
  if (!error) return;
  error.textContent = message;
  error.classList.toggle("hidden", !message);
}

function setClientSignupMessage(message) {
  const notice = document.querySelector("[data-client-signup-message]");
  if (!notice) return;
  notice.textContent = message;
  notice.classList.toggle("hidden", !message);
}

function readRegisteredClient() {
  try {
    return JSON.parse(localStorage.getItem(registeredClientKey) || "null");
  } catch {
    return null;
  }
}

function completeClientAuth(method = "email", account = demoClientAccount) {
  localStorage.setItem(clientSessionKey, JSON.stringify({
    method,
    name: account.name || "Bali Healer Client",
    email: account.email,
    signedInAt: new Date().toISOString()
  }));
  closeClientAuth();
  updateClientHeader();
  showClientToast("success", "Login berhasil. Selamat datang di Bali Healer.");
}

function toggleClientPassword(button) {
  const field = button.closest("label")?.querySelector('input[type="password"], input[type="text"]');
  if (!field) return;
  const showPassword = field.type === "password";
  field.type = showPassword ? "text" : "password";
  button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
  button.querySelector("[data-password-slash]")?.classList.toggle("hidden", showPassword);
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
  const estimateToggle = event.target.closest("[data-currency-estimate-toggle]");
  if (estimateToggle) {
    const wrapper = estimateToggle.closest("[data-currency-estimates]");
    const panel = wrapper?.querySelector("[data-currency-estimate-panel]");
    if (!panel) return;

    document.querySelectorAll("[data-currency-estimate-panel]").forEach((openPanel) => {
      if (openPanel !== panel) openPanel.classList.add("hidden");
    });
    panel.classList.toggle("hidden");
    return;
  }

  if (!event.target.closest("[data-currency-estimates]")) {
    document.querySelectorAll("[data-currency-estimate-panel]").forEach((panel) => {
      panel.classList.add("hidden");
    });
  }

  if (event.target.closest("[data-open-client-auth]")) {
    event.preventDefault();
    closeMobileMenu();
    openClientAuth("signin");
    return;
  }

  if (event.target.closest("[data-client-wishlist]")) {
    event.preventDefault();
    if (!clientSignedIn()) {
      openClientAuth("signin");
      return;
    }
    const button = event.target.closest("[data-client-wishlist]");
    if (button.closest("[data-service-card]")) {
      button.classList.toggle("bg-gold");
      button.classList.toggle("text-black");
      button.classList.toggle("bg-black/55");
    } else {
      button.classList.toggle("text-goldSoft");
    }
    return;
  }

  if (event.target.closest("[data-close-client-auth]") || event.target === document.querySelector("[data-client-auth-modal]")) {
    closeClientAuth();
    return;
  }

  if (event.target.closest("[data-show-client-signup]")) {
    setClientAuthMode("signup");
    return;
  }

  if (event.target.closest("[data-show-client-signin]")) {
    setClientAuthMode("signin");
    return;
  }

  if (event.target.closest("[data-client-google-auth]")) {
    completeClientAuth("google", { name: "Google Demo Client", email: "google.client@balihealer.com" });
    return;
  }

  const passwordToggle = event.target.closest("[data-client-password-toggle]");
  if (passwordToggle) {
    toggleClientPassword(passwordToggle);
    return;
  }

  const link = event.target.closest(".page-link");
  if (link) {
    event.preventDefault();
    closeMobileMenu();
    loadPage(link.dataset.page);
    return;
  }

  const categoryButton = event.target.closest("[data-category-filter]");
  if (categoryButton) {
    chooseCategory(categoryButton.dataset.categoryFilter);
    return;
  }

  if (event.target.closest("[data-open-mobile-menu]")) {
    openMobileMenu();
    return;
  }

  if (event.target.closest("[data-close-mobile-menu]")) {
    closeMobileMenu();
  }

  if (event.target.closest("[data-open-category-menu]")) {
    closeMobileMenu();
    openCategoryMenu();
    return;
  }

  if (event.target.closest("[data-close-category-menu]") || event.target === document.querySelector("[data-category-modal]")) {
    closeCategoryMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll("[data-currency-estimate-panel]").forEach((panel) => {
      panel.classList.add("hidden");
    });
    closeCategoryMenu();
    closeMobileMenu();
    closeClientAuth();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-client-signin-form]")) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.target.reportValidity();
      return;
    }
    const data = new FormData(event.target);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const registeredClient = readRegisteredClient();
    const demoMatches = email === demoClientAccount.email.toLowerCase() && password === demoClientAccount.password;
    const registeredMatches = registeredClient && email === registeredClient.email?.toLowerCase() && password === registeredClient.password;

    if (!demoMatches && !registeredMatches) {
      const message = "Login gagal: email dan password tidak sesuai.";
      setClientAuthError(message);
      showClientToast("error", message);
      return;
    }
    completeClientAuth("email", demoMatches ? demoClientAccount : registeredClient);
    return;
  }

  if (event.target.matches("[data-client-signup-form]")) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.target.reportValidity();
      return;
    }
    const data = new FormData(event.target);
    const account = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      password: String(data.get("password") || "")
    };
    localStorage.setItem(registeredClientKey, JSON.stringify(account));
    setClientSignupMessage("Account created. You are signed in for this browser.");
    completeClientAuth("signup", account);
  }
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

  const select = event.target.closest("[data-service-category-select]");
  if (!select) return;
  chooseCategory(select.value);
});

document.addEventListener("prices:refresh", () => applyLocalization());

window.addEventListener("scroll", () => updateCategoryBarVisibility(), { passive: true });
window.addEventListener("focus", () => refreshLiveCurrencyRates());
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshLiveCurrencyRates();
});

window.addEventListener("hashchange", () => {
  const nextState = hashState();
  selectedHealingService = nextState.service;
  loadPage(nextState.page, false);
});

renderCategoryMenu();
syncLocaleControls();
updateClientHeader();
const initialState = hashState();
selectedHealingService = initialState.service;
loadPage(initialState.page, false);
refreshLiveCurrencyRates();
window.setInterval(refreshLiveCurrencyRates, 60 * 60 * 1000);
