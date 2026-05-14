export function packageItems(service) {
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

export function bookingModal(service, profile, packages = packageItems(service), days = availabilityDays()) {
  return `
    <div data-healing-booking-modal class="fixed inset-0 z-[90] hidden items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <section class="grid h-[min(92vh,720px)] w-full max-w-6xl overflow-hidden rounded-xl border border-gold/20 bg-[#f4f6fb] text-[#2b3038] shadow-[0_28px_100px_rgba(0,0,0,0.55)] md:grid-cols-[230px_minmax(0,1fr)]">
        <aside class="hidden border-r border-black/10 bg-[#262c32] p-8 text-white md:block">
          <div class="space-y-8">
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
                <label class="block text-sm font-semibold text-[#4d5561]">Full name<input data-guest-name class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required /></label>
                <label class="block text-sm font-semibold text-[#4d5561]">WhatsApp / phone<input data-guest-phone class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required /></label>
                <label class="block text-sm font-semibold text-[#4d5561]">Email<input data-guest-email type="email" class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required /></label>
                <label class="block text-sm font-semibold text-[#4d5561]">Guests<input data-guest-count type="number" min="1" value="1" class="mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#6871f1]" required /></label>
                <label class="block text-sm font-semibold text-[#4d5561] md:col-span-2">Session notes<textarea data-guest-notes class="mt-2 min-h-28 w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#6871f1]" placeholder="Share your intention, location, language preference, or special condition."></textarea></label>
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

export function initBookingModal(root = document, { autoOpen = false, onClose } = {}) {
  const modal = root.querySelector("[data-healing-booking-modal]");
  const openButtons = [...root.querySelectorAll("[data-open-healing-booking]")];
  const closeButtons = [...root.querySelectorAll("[data-close-healing-booking]")];
  const panels = [...root.querySelectorAll("[data-booking-panel]")];
  const indicators = [...root.querySelectorAll("[data-booking-step-indicator]")];
  const title = root.querySelector("[data-booking-title]");
  const nextButton = root.querySelector("[data-booking-next]");
  const backButton = root.querySelector("[data-booking-back]");
  const packageButtons = [...root.querySelectorAll("[data-package-option]")];
  const dateButtons = [...root.querySelectorAll("[data-booking-date]")];
  const timesContainer = root.querySelector("[data-booking-times]");
  const guestName = root.querySelector("[data-guest-name]");
  const guestPhone = root.querySelector("[data-guest-phone]");
  const guestEmail = root.querySelector("[data-guest-email]");
  const guestCount = root.querySelector("[data-guest-count]");
  const guestNotes = root.querySelector("[data-guest-notes]");
  const summaries = {
    service: root.querySelector("[data-summary-service]"),
    date: root.querySelector("[data-summary-date]"),
    time: root.querySelector("[data-summary-time]"),
    guest: root.querySelector("[data-summary-guest]"),
    price: root.querySelector("[data-summary-price]")
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

  const renderTimes = () => {
    timesContainer.innerHTML = timeSlots(state.dayIndex).map((slot) => `
      <button type="button" data-booking-time="${slot.time}" class="rounded-lg border p-4 text-center text-sm font-bold transition ${slot.available ? "border-[#6871f1]/20 bg-white text-[#2b3038] hover:border-[#6871f1] hover:shadow-sm" : "cursor-not-allowed border-black/5 bg-[#e3e7ed] text-[#9aa2ad] opacity-60"}" ${slot.available ? "" : "disabled"}>
        <span>${slot.time}</span>
        <span class="mt-2 block rounded-full ${slot.available ? "bg-[#46cf67]/12 text-[#28a64a]" : "bg-black/5 text-[#8b929b]"} px-2 py-1 text-[11px]">${slot.available ? "Available" : "Full booked"}</span>
      </button>
    `).join("");
  };

  const canContinue = () => {
    if (state.step === 0) return state.packageIndex >= 0;
    if (state.step === 1) return Boolean(state.date && state.time);
    if (state.step === 2) return Boolean(guestName?.value.trim() && guestPhone?.value.trim() && guestEmail?.checkValidity() && guestCount?.value);
    return true;
  };

  const setStep = (step) => {
    state.step = Math.max(0, Math.min(step, panels.length - 1));
    panels.forEach((panel, index) => panel.classList.toggle("hidden", index !== state.step));
    indicators.forEach((indicator, index) => {
      const active = index === state.step || index < state.step;
      indicator.classList.toggle("text-white", active);
      indicator.classList.toggle("text-white/35", !active);
      const circle = indicator.querySelector("span");
      circle?.classList.toggle("bg-[#46cf67]", active);
      circle?.classList.toggle("bg-white/18", !active);
    });
    if (title) title.textContent = stepTitles[state.step];
    backButton.classList.toggle("hidden", state.step === 0);
    nextButton.textContent = state.step === panels.length - 1 ? "Complete Request" : "Next Step";
    if (state.step === 3) {
      if (summaries.service) summaries.service.textContent = state.packageName;
      if (summaries.date) summaries.date.textContent = state.dateLabel;
      if (summaries.time) summaries.time.textContent = state.time;
      if (summaries.guest) summaries.guest.textContent = `${guestName?.value.trim() || "-"} - ${guestCount?.value || 1} guest(s)`;
      if (summaries.price) summaries.price.textContent = state.packagePrice;
    }
    nextButton.disabled = !canContinue();
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    onClose?.();
  };

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    setStep(0);
    if (packageButtons[0]) setActivePackage(packageButtons[0]);
  };

  const chooseFirstAvailableDate = () => {
    const firstAvailable = dateButtons.find((button) => !button.disabled);
    if (!firstAvailable) return;
    state.date = firstAvailable.dataset.bookingDate;
    state.dateLabel = firstAvailable.dataset.dateLabel;
    state.dayIndex = Number(firstAvailable.dataset.dayIndex || 0);
    state.time = "";
    dateButtons.forEach((item) => item.classList.toggle("ring-2", item === firstAvailable));
    renderTimes();
  };

  const handleNext = () => {
    if (!canContinue()) {
      if (state.step === 2) [guestName, guestPhone, guestEmail, guestCount].forEach((input) => input?.reportValidity());
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
    dateButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("border-[#6871f1]", active);
      item.classList.toggle("bg-[#6871f1]/10", active);
      item.classList.toggle("ring-2", active);
    });
    renderTimes();
    nextButton.disabled = !canContinue();
  };

  const handleTimeClick = (event) => {
    const button = event.target.closest("[data-booking-time]");
    if (!button || button.disabled) return;
    state.time = button.dataset.bookingTime;
    timesContainer.querySelectorAll("[data-booking-time]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("border-[#6871f1]", active);
      item.classList.toggle("bg-[#6871f1]/10", active);
      item.classList.toggle("ring-2", active);
    });
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
  backButton.addEventListener("click", () => setStep(state.step - 1));
  [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.addEventListener("input", handleInfoInput));
  document.addEventListener("keydown", handleEscape);
  if (autoOpen) openModal();
  if (packageButtons[0]) setActivePackage(packageButtons[0]);

  return () => {
    openButtons.forEach((button) => button.removeEventListener("click", openModal));
    closeButtons.forEach((button) => button.removeEventListener("click", closeModal));
    packageButtons.forEach((button) => button.removeEventListener("click", handlePackageClick));
    dateButtons.forEach((button) => button.removeEventListener("click", handleDateClick));
    timesContainer.removeEventListener("click", handleTimeClick);
    nextButton.removeEventListener("click", handleNext);
    [guestName, guestPhone, guestEmail, guestCount, guestNotes].forEach((input) => input?.removeEventListener("input", handleInfoInput));
    document.removeEventListener("keydown", handleEscape);
    document.body.classList.remove("overflow-hidden");
  };
}
