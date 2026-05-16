export function packageItems(service) {
  const basePrice = Number(String(service.price).replace(/[^\d]/g, "")) || 500000;
  const premiumPrice = basePrice + 350000;
  const format = (value) => `Rp${value.toLocaleString("id-ID")}`;

  return [
    {
      name: service.name,
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

export function availabilityDays() {
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

function serviceModes() {
  return [
    "Online Video Consultation",
    "Visit Our Healing Space",
    "Healing in the Comfort of Your Home"
  ];
}

function reviewCount(profile) {
  return profile.reviews || 31;
}

export function bookingModal(service, profile, packages = packageItems(service), days = availabilityDays()) {
  const locations = ["Canggu", "Karangasem", "Singaraja", "Ubud", "Seminyak", "Denpasar", "Kuta", "Sanur", "Uluwatu", "Amed"];
  const modes = serviceModes(service.mode);
  const paymentMethods = ["Pay at Venue", "Bank Transfer", "Credit Card"];

  return `
    <div data-healing-booking-modal class="fixed inset-0 z-[90] hidden items-center justify-center bg-black/75 px-3 py-5 backdrop-blur-sm">
      <section class="grid h-[min(91vh,493px)] w-full max-w-[1080px] overflow-hidden rounded-[28px] border border-gold/30 bg-[#080402] text-mist shadow-[0_28px_110px_rgba(0,0,0,0.72)] md:grid-cols-[244px_minmax(0,1fr)]">
        <aside class="hidden min-h-0 p-4 md:block">
          <div class="flex h-full flex-col rounded-[18px] border border-gold/25 bg-[linear-gradient(155deg,rgba(40,28,55,0.94),rgba(3,8,18,0.98)_72%)] p-4">
            <h3 class="text-sm font-extrabold text-white">Service Details</h3>
            <div class="mt-3 flex items-center gap-3 rounded-lg bg-white/8 p-3">
              <img src="${profile.image || service.image}" alt="" class="h-11 w-11 shrink-0 rounded-lg object-cover grayscale" />
              <div class="min-w-0">
                <p class="line-clamp-2 text-xs font-extrabold leading-4 text-white">${service.name}</p>
                <p class="mt-1 text-xs font-bold text-goldSoft">${Number(service.rating || 5).toFixed(1)} (${reviewCount(profile)} reviews)</p>
              </div>
            </div>

            <h3 class="mt-6 text-sm font-extrabold text-white">Bookings</h3>
            <div class="mt-3 space-y-4">
              ${["Location", "Service Mode", "Service", "Date & Time", "Personal Information", "Cart", "Payment", "Confirmation"].map((label, index) => `
                <div data-booking-step-indicator="${index}" class="flex items-center gap-3 text-xs font-extrabold">
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]">${index + 1}</span>
                  <span>${index + 1}. ${label}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </aside>

        <div class="flex min-h-0 flex-col px-5 py-5 md:px-6">
          <header class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[0.34em] text-gold">Booking Service</p>
              <h2 data-booking-title class="mt-1 text-lg font-extrabold text-white">Location</h2>
            </div>
            <button type="button" data-close-healing-booking class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-goldSoft transition hover:bg-gold/10 hover:text-white" aria-label="Close booking">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </header>

          <div class="min-h-0 flex-1 overflow-y-auto py-9 pr-1">
            <section data-booking-panel="0">
              <p class="text-base font-semibold leading-7 text-mist/65">Choose where the client is located. This location is used to calculate mobile service transport cost.</p>
              <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                ${locations.map((location) => `
                  <button type="button" data-booking-location="${location}" class="rounded-xl border border-gold/20 bg-[#15100c] px-3 py-3 text-left text-base font-extrabold text-goldSoft transition hover:border-gold hover:bg-gold/10">${location}</button>
                `).join("")}
              </div>
            </section>

            <section data-booking-panel="1" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Choose how this session will be delivered.</p>
              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                ${modes.map((mode) => `
                  <button type="button" data-booking-mode-option="${mode}" class="rounded-xl border border-gold/20 bg-[#15100c] px-4 py-4 text-left font-extrabold text-goldSoft transition hover:border-gold hover:bg-gold/10">${mode}</button>
                `).join("")}
              </div>
            </section>

            <section data-booking-panel="2" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Select the service package for this booking.</p>
              <div class="mt-6 grid gap-3">
                ${packages.map((item, index) => `
                  <button type="button" data-package-option="${index}" class="grid gap-3 rounded-xl border border-gold/20 bg-[#15100c] p-4 text-left transition hover:border-gold hover:bg-gold/10 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <span>
                      <span class="block text-base font-extrabold text-white">${item.name}</span>
                      <span class="mt-1 block text-sm leading-6 text-mist/55">${item.detail}</span>
                    </span>
                    <span class="text-base font-extrabold text-goldSoft">${item.price}</span>
                  </button>
                `).join("")}
              </div>
            </section>

            <section data-booking-panel="3" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Choose the preferred date and time for this session.</p>
              <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                ${days.slice(0, 7).map((day) => `
                  <button type="button" data-booking-date="${day.iso}" data-date-label="${day.label}" data-day-index="${day.index}" class="rounded-xl border p-3 text-center transition ${day.available ? "border-gold/20 bg-[#15100c] text-goldSoft hover:border-gold hover:bg-gold/10" : "cursor-not-allowed border-white/5 bg-white/5 text-mist/30"}" ${day.available ? "" : "disabled"}>
                    <span class="block text-xs font-extrabold uppercase">${day.day}</span>
                    <span class="mt-1 block text-2xl font-black">${day.date}</span>
                    <span class="text-xs">${day.month}</span>
                  </button>
                `).join("")}
              </div>
              <div data-booking-times class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5"></div>
            </section>

            <section data-booking-panel="4" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Add the client details for confirmation and follow up.</p>
              <div class="mt-6 grid gap-4 md:grid-cols-2">
                <label class="block text-sm font-bold text-mist/70">Full name<input data-guest-name class="mt-2 h-12 w-full rounded-xl border border-gold/20 bg-[#15100c] px-4 text-sm text-white outline-none focus:border-gold" required /></label>
                <label class="block text-sm font-bold text-mist/70">WhatsApp / phone<input data-guest-phone class="mt-2 h-12 w-full rounded-xl border border-gold/20 bg-[#15100c] px-4 text-sm text-white outline-none focus:border-gold" required /></label>
                <label class="block text-sm font-bold text-mist/70">Email<input data-guest-email type="email" class="mt-2 h-12 w-full rounded-xl border border-gold/20 bg-[#15100c] px-4 text-sm text-white outline-none focus:border-gold" required /></label>
                <label class="block text-sm font-bold text-mist/70">Guests<input data-guest-count type="number" min="1" value="1" class="mt-2 h-12 w-full rounded-xl border border-gold/20 bg-[#15100c] px-4 text-sm text-white outline-none focus:border-gold" required /></label>
                <label class="block text-sm font-bold text-mist/70 md:col-span-2">Session notes<textarea data-guest-notes class="mt-2 min-h-24 w-full rounded-xl border border-gold/20 bg-[#15100c] px-4 py-3 text-sm text-white outline-none focus:border-gold" placeholder="Share your intention, exact location, language preference, or special condition."></textarea></label>
              </div>
            </section>

            <section data-booking-panel="5" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Review your cart before payment.</p>
              <div class="mt-6 rounded-xl border border-gold/20 bg-[#15100c] p-5">
                <dl class="grid gap-4 text-sm sm:grid-cols-2">
                  <div><dt class="text-mist/45">Location</dt><dd data-summary-location class="mt-1 font-extrabold text-white"></dd></div>
                  <div><dt class="text-mist/45">Mode</dt><dd data-summary-mode class="mt-1 font-extrabold text-white"></dd></div>
                  <div><dt class="text-mist/45">Service</dt><dd data-summary-service class="mt-1 font-extrabold text-white"></dd></div>
                  <div><dt class="text-mist/45">Schedule</dt><dd data-summary-schedule class="mt-1 font-extrabold text-white"></dd></div>
                  <div><dt class="text-mist/45">Guest</dt><dd data-summary-guest class="mt-1 font-extrabold text-white"></dd></div>
                  <div><dt class="text-mist/45">Total</dt><dd data-summary-price class="mt-1 font-extrabold text-goldSoft"></dd></div>
                </dl>
              </div>
            </section>

            <section data-booking-panel="6" class="hidden">
              <p class="text-base font-semibold leading-7 text-mist/65">Choose a payment method to secure the booking request.</p>
              <div class="mt-6 grid gap-3 sm:grid-cols-3">
                ${paymentMethods.map((method) => `
                  <button type="button" data-booking-payment="${method}" class="rounded-xl border border-gold/20 bg-[#15100c] px-4 py-4 text-left font-extrabold text-goldSoft transition hover:border-gold hover:bg-gold/10">${method}</button>
                `).join("")}
              </div>
            </section>

            <section data-booking-panel="7" class="hidden">
              <div class="rounded-xl border border-gold/20 bg-[#15100c] p-6">
                <p class="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Confirmation</p>
                <h3 class="mt-2 text-2xl font-extrabold text-white">Booking request ready</h3>
                <p class="mt-3 text-sm leading-6 text-mist/65">Your booking request will be sent to Bali Healer. The healer or marketplace admin will confirm schedule, location, and final payment instructions.</p>
                <dl class="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt class="text-mist/45">Payment</dt><dd data-summary-payment class="mt-1 font-extrabold text-goldSoft"></dd></div>
                  <div><dt class="text-mist/45">Reference</dt><dd class="mt-1 font-extrabold text-white">BH-${Date.now().toString().slice(-6)}</dd></div>
                </dl>
              </div>
            </section>
          </div>

          <footer class="flex items-center gap-3 border-t border-gold/20 py-4">
            <button type="button" data-booking-back class="hidden rounded-full border border-gold/20 bg-[#15100c] px-5 py-3 text-sm font-extrabold text-goldSoft transition hover:border-gold">Previous</button>
            <button type="button" data-booking-next class="ml-auto rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black transition hover:bg-goldSoft disabled:cursor-not-allowed disabled:opacity-45">Next</button>
          </footer>
        </div>
      </section>
    </div>
  `;
}

export function initBookingModal(root = document, { autoOpen = false, onClose } = {}) {
  const modal = root.querySelector("[data-healing-booking-modal]");
  const openButtons = [...root.querySelectorAll("[data-open-healing-booking]")];
  const closeButtons = [...root.querySelectorAll("[data-close-healing-booking]")];
  const panels = [...root.querySelectorAll("[data-booking-panel]")];
  const indicators = [...root.querySelectorAll("[data-booking-step-indicator]")];
  const title = root.querySelector("[data-booking-title]");
  const nextButton = root.querySelector("[data-booking-next]");
  const backButton = root.querySelector("[data-booking-back]");
  const locationButtons = [...root.querySelectorAll("[data-booking-location]")];
  const modeButtons = [...root.querySelectorAll("[data-booking-mode-option]")];
  const packageButtons = [...root.querySelectorAll("[data-package-option]")];
  const dateButtons = [...root.querySelectorAll("[data-booking-date]")];
  const paymentButtons = [...root.querySelectorAll("[data-booking-payment]")];
  const timesContainer = root.querySelector("[data-booking-times]");
  const guestName = root.querySelector("[data-guest-name]");
  const guestPhone = root.querySelector("[data-guest-phone]");
  const guestEmail = root.querySelector("[data-guest-email]");
  const guestCount = root.querySelector("[data-guest-count]");
  const guestNotes = root.querySelector("[data-guest-notes]");
  const summaries = {
    location: root.querySelector("[data-summary-location]"),
    mode: root.querySelector("[data-summary-mode]"),
    service: root.querySelector("[data-summary-service]"),
    schedule: root.querySelector("[data-summary-schedule]"),
    guest: root.querySelector("[data-summary-guest]"),
    price: root.querySelector("[data-summary-price]"),
    payment: root.querySelector("[data-summary-payment]")
  };

  if (!modal || !nextButton || !backButton || !timesContainer) return undefined;

  const stepTitles = ["Location", "Service Mode", "Service", "Date & Time", "Personal Information", "Cart", "Payment", "Confirmation"];
  const state = {
    step: 0,
    location: locationButtons[0]?.dataset.bookingLocation || "",
    mode: modeButtons[0]?.dataset.bookingModeOption || "",
    packageIndex: packageButtons.length ? 0 : -1,
    packageName: packageButtons[0]?.querySelector(".block")?.textContent?.trim() || "",
    packagePrice: packageButtons[0]?.querySelector("[class*='text-goldSoft']")?.textContent?.trim() || "",
    date: "",
    dateLabel: "",
    dayIndex: 0,
    time: "",
    payment: paymentButtons[0]?.dataset.bookingPayment || ""
  };

  const markChoice = (buttons, activeButton) => {
    buttons.forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("border-gold", active);
      button.classList.toggle("bg-gold/20", active);
      button.classList.toggle("shadow-[inset_0_0_0_1px_rgba(244,217,135,0.35)]", active);
    });
  };

  const renderTimes = () => {
    timesContainer.innerHTML = timeSlots(state.dayIndex).map((slot) => `
      <button type="button" data-booking-time="${slot.time}" class="rounded-xl border p-3 text-center text-sm font-extrabold transition ${slot.available ? "border-gold/20 bg-[#15100c] text-goldSoft hover:border-gold hover:bg-gold/10" : "cursor-not-allowed border-white/5 bg-white/5 text-mist/30"}" ${slot.available ? "" : "disabled"}>
        ${slot.time}
      </button>
    `).join("");
  };

  const chooseFirstAvailableDate = () => {
    const firstAvailable = dateButtons.find((button) => !button.disabled);
    if (!firstAvailable) return;
    state.date = firstAvailable.dataset.bookingDate;
    state.dateLabel = firstAvailable.dataset.dateLabel;
    state.dayIndex = Number(firstAvailable.dataset.dayIndex || 0);
    state.time = "";
    markChoice(dateButtons, firstAvailable);
    renderTimes();
  };

  const infoComplete = () => (
    guestName?.value.trim() &&
    guestPhone?.value.trim() &&
    guestEmail?.checkValidity() &&
    guestCount?.value
  );

  const canContinue = () => {
    if (state.step === 0) return Boolean(state.location);
    if (state.step === 1) return Boolean(state.mode);
    if (state.step === 2) return state.packageIndex >= 0;
    if (state.step === 3) return Boolean(state.date && state.time);
    if (state.step === 4) return Boolean(infoComplete());
    if (state.step === 6) return Boolean(state.payment);
    return true;
  };

  const updateSummary = () => {
    if (summaries.location) summaries.location.textContent = state.location;
    if (summaries.mode) summaries.mode.textContent = state.mode;
    if (summaries.service) summaries.service.textContent = state.packageName;
    if (summaries.schedule) summaries.schedule.textContent = `${state.dateLabel || "-"}${state.time ? `, ${state.time}` : ""}`;
    if (summaries.guest) summaries.guest.textContent = `${guestName?.value.trim() || "-"} - ${guestCount?.value || 1} guest(s)`;
    if (summaries.price) summaries.price.textContent = state.packagePrice;
    if (summaries.payment) summaries.payment.textContent = state.payment;
  };

  const setStep = (step) => {
    state.step = Math.max(0, Math.min(step, panels.length - 1));
    panels.forEach((panel, index) => panel.classList.toggle("hidden", index !== state.step));
    indicators.forEach((indicator, index) => {
      const active = index === state.step;
      const completed = index < state.step;
      indicator.classList.toggle("text-goldSoft", active || completed);
      indicator.classList.toggle("text-mist/45", !active && !completed);
      const circle = indicator.querySelector("span");
      circle?.classList.toggle("border-gold", active || completed);
      circle?.classList.toggle("bg-gold", active);
      circle?.classList.toggle("text-black", active);
      circle?.classList.toggle("border-mist/35", !active && !completed);
    });
    if (title) title.textContent = stepTitles[state.step];
    backButton.classList.toggle("hidden", state.step === 0);
    nextButton.textContent = state.step === panels.length - 1 ? "Send Booking" : "Next";
    if (state.step >= 5) updateSummary();
    nextButton.disabled = !canContinue();
  };

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    markChoice(locationButtons, locationButtons[0]);
    markChoice(modeButtons, modeButtons[0]);
    markChoice(packageButtons, packageButtons[0]);
    markChoice(paymentButtons, paymentButtons[0]);
    if (!state.date) chooseFirstAvailableDate();
    setStep(0);
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    onClose?.();
  };

  const handleNext = () => {
    if (!canContinue()) {
      if (state.step === 4) [guestName, guestPhone, guestEmail, guestCount].forEach((input) => input?.reportValidity());
      return;
    }
    if (state.step < panels.length - 1) {
      setStep(state.step + 1);
      return;
    }
    nextButton.textContent = "Booking Sent";
    nextButton.disabled = true;
    window.setTimeout(closeModal, 900);
  };

  const handleLocationClick = (event) => {
    state.location = event.currentTarget.dataset.bookingLocation;
    markChoice(locationButtons, event.currentTarget);
    nextButton.disabled = !canContinue();
  };

  const handleModeClick = (event) => {
    state.mode = event.currentTarget.dataset.bookingModeOption;
    markChoice(modeButtons, event.currentTarget);
    nextButton.disabled = !canContinue();
  };

  const handlePackageClick = (event) => {
    const button = event.currentTarget;
    state.packageIndex = Number(button.dataset.packageOption);
    state.packageName = button.querySelector(".block")?.textContent?.trim() || "";
    state.packagePrice = button.querySelector("[class*='text-goldSoft']")?.textContent?.trim() || "";
    markChoice(packageButtons, button);
    nextButton.disabled = !canContinue();
  };

  const handleDateClick = (event) => {
    const button = event.currentTarget;
    state.date = button.dataset.bookingDate;
    state.dateLabel = button.dataset.dateLabel;
    state.dayIndex = Number(button.dataset.dayIndex || 0);
    state.time = "";
    markChoice(dateButtons, button);
    renderTimes();
    nextButton.disabled = !canContinue();
  };

  const handleTimeClick = (event) => {
    const button = event.target.closest("[data-booking-time]");
    if (!button || button.disabled) return;
    state.time = button.dataset.bookingTime;
    markChoice([...timesContainer.querySelectorAll("[data-booking-time]")], button);
    nextButton.disabled = !canContinue();
  };

  const handlePaymentClick = (event) => {
    state.payment = event.currentTarget.dataset.bookingPayment;
    markChoice(paymentButtons, event.currentTarget);
    nextButton.disabled = !canContinue();
  };

  const handleBack = () => setStep(state.step - 1);

  const handleInfoInput = () => {
    if (state.step === 4) nextButton.disabled = !canContinue();
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") closeModal();
  };

  openButtons.forEach((button) => button.addEventListener("click", openModal));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  locationButtons.forEach((button) => button.addEventListener("click", handleLocationClick));
  modeButtons.forEach((button) => button.addEventListener("click", handleModeClick));
  packageButtons.forEach((button) => button.addEventListener("click", handlePackageClick));
  dateButtons.forEach((button) => button.addEventListener("click", handleDateClick));
  paymentButtons.forEach((button) => button.addEventListener("click", handlePaymentClick));
  timesContainer.addEventListener("click", handleTimeClick);
  nextButton.addEventListener("click", handleNext);
  backButton.addEventListener("click", handleBack);
  [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.addEventListener("input", handleInfoInput));
  document.addEventListener("keydown", handleEscape);
  if (autoOpen) openModal();

  return () => {
    openButtons.forEach((button) => button.removeEventListener("click", openModal));
    closeButtons.forEach((button) => button.removeEventListener("click", closeModal));
    locationButtons.forEach((button) => button.removeEventListener("click", handleLocationClick));
    modeButtons.forEach((button) => button.removeEventListener("click", handleModeClick));
    packageButtons.forEach((button) => button.removeEventListener("click", handlePackageClick));
    dateButtons.forEach((button) => button.removeEventListener("click", handleDateClick));
    paymentButtons.forEach((button) => button.removeEventListener("click", handlePaymentClick));
    timesContainer.removeEventListener("click", handleTimeClick);
    nextButton.removeEventListener("click", handleNext);
    backButton.removeEventListener("click", handleBack);
    [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.removeEventListener("input", handleInfoInput));
    document.removeEventListener("keydown", handleEscape);
    document.body.classList.remove("overflow-hidden");
  };
}
