const app = document.querySelector("#app");
const links = () => [...document.querySelectorAll(".page-link")];
let cleanupPage;

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

async function loadPage(page, updateHash = true) {
  const route = routes[page] || routes.home;
  const nextPage = routes[page] ? page : "home";
  if (typeof cleanupPage === "function") {
    cleanupPage();
    cleanupPage = undefined;
  }
  const module = await import(`../modules/${nextPage}.js`);
  app.innerHTML = module.render();
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

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest(".page-link");
  if (!link) return;
  event.preventDefault();
  loadPage(link.dataset.page);
});

window.addEventListener("hashchange", () => {
  const page = hashToPage[window.location.hash.slice(1)] || "home";
  loadPage(page, false);
});

loadPage(hashToPage[window.location.hash.slice(1)] || "home", false);
