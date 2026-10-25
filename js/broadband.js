const broadbandPlans = [
  {
    id: "fibre50",
    name: "Wave Fibre 50",
    speed: 50,
    price: 399,
    categories: ["budget"],
    tag: "Best for 1–2 people",
    features: [
      "50 Mbps average speed",
      "Unlimited data",
      "Standard Wi-Fi router",
    ],

    details: {
      download: "50 Mbps",
      upload: "50 Mbps",
      devices: "Up to 5 devices",
      installation: "Free",
      contract: "12 months",
      goodFor: [
        "Browsing and social media",
        "HD streaming on 1–2 screens",
        "Video calls and online classes",
      ],
    },
  },
  {
    id: "fibre100",
    name: "Wave Fibre 100",
    speed: 100,
    price: 499,
    categories: ["best-offers", "budget", "family"],
    tag: "Best for small families",
    features: ["100 Mbps average speed", "Unlimited data", "Wi-Fi 6 router"],

    details: {
      download: "100 Mbps",
      upload: "100 Mbps",
      devices: "Up to 10 devices",
      installation: "Free",
      contract: "12 months",
      goodFor: [
        "HD and 4K streaming",
        "Working from home",
        "A small family sharing one connection",
      ],
    },
  },
  {
    id: "fibre300",
    name: "Wave Fibre 300",
    speed: 300,
    price: 799,
    popular: true,
    categories: ["best-offers", "family", "work-gaming"],
    tag: "Best for work, streaming and gaming",
    features: [
      "300 Mbps average speed",
      "Unlimited data",
      "Wi-Fi 6 router",
      "Priority support",
    ],

    details: {
      download: "300 Mbps",
      upload: "300 Mbps",
      devices: "Up to 25 devices",
      installation: "Free",
      contract: "12 months",
      goodFor: [
        "Work calls, streaming and gaming at the same time",
        "Uploading large files",
        "Homes with many smart devices",
      ],
    },
  },
  {
    id: "fibre500",
    name: "Wave Fibre 500",
    speed: 500,
    price: 999,
    categories: ["family", "work-gaming"],
    tag: "Best for large families",
    features: [
      "500 Mbps average speed",
      "Unlimited data",
      "Wi-Fi 6 router",
      "Priority support",
    ],

    details: {
      download: "500 Mbps",
      upload: "500 Mbps",
      devices: "Up to 40 devices",
      installation: "Free",
      contract: "12 months",
      goodFor: [
        "Large households online at night",
        "Several 4K streams at once",
        "Cloud backups and heavy downloads",
      ],
    },
  },
  {
    id: "gigawave",
    name: "GigaWave 1000",
    speed: 1000,
    price: 1499,
    categories: ["work-gaming"],
    tag: "Best for heavy users",
    features: [
      "1 Gbps average speed",
      "Unlimited data",
      "Mesh Wi-Fi included",
      "Priority support",
    ],

    details: {
      download: "1 Gbps",
      upload: "1 Gbps",
      devices: "Up to 60 devices",
      installation: "Free",
      contract: "12 months",
      goodFor: [
        "Creators and professionals moving big files",
        "Large smart homes",
        "Fast game and software downloads",
      ],
    },
  },
];

/* ---------- Categories shown in the sidebar ---------- */
const broadbandCategories = [
  { id: "all", label: "All Plans" },
  { id: "best-offers", label: "Best Offers" },
  { id: "budget", label: "Budget" },
  { id: "family", label: "Family" },
  { id: "work-gaming", label: "Work & Gaming" },
];

const formatPrice = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

/* ----------  PIN codes  ---------- */
const PIN_AVAILABLE = [
  "627001",
  "627002",
  "627003",
  "625001",
  "600001",
  "620001",
];
const PIN_COMING_SOON = ["628001", "629001", "641001"];

/* ---------- Where "Book now" sends the user ---------- */
const BOOK_URL = "register.html";

/* ---------- Reusable Tailwind class strings ---------- */
const BTN_BASE =
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-3 text-center font-extrabold no-underline transition";
const BTN_PRIMARY = `${BTN_BASE} border border-solid border-brand-blue bg-brand-blue text-white hover:bg-brand-dark hover:text-white`;
const BTN_OUTLINE = `${BTN_BASE} border border-solid border-brand-blue bg-transparent text-brand-blue hover:bg-brand-soft`;

const CAT_BASE =
  "flex shrink-0 cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-full border border-solid border-brand-line px-4 py-2.5 text-left text-sm transition lg:rounded-none lg:border-0 lg:border-b lg:px-5 lg:py-4 lg:last:border-b-0";
const CAT_ACTIVE = "bg-brand-soft font-extrabold text-brand-navy";
const CAT_IDLE = "bg-white font-medium text-brand-ink hover:bg-brand-soft";

const featureItems = (features) =>
  features
    .map(
      (f) =>
        `<li class="flex gap-2 border-b border-brand-line py-2 text-brand-ink last:border-b-0">
           <span class="font-extrabold text-emerald-600">✓</span><span>${f}</span>
         </li>`,
    )
    .join("");

/* ---------- Popup content (more than the card shows) ---------- */
const specBox = (label, value) => `
  <div class="rounded-xl bg-brand-soft px-4 py-3">
    <div class="text-xs font-bold text-brand-muted">${label}</div>
    <div class="mt-0.5 font-extrabold text-brand-navy">${value}</div>
  </div>`;

function renderModalContent(plan) {
  const d = plan.details;

  const specs = d
    ? `<div class="mb-5 grid grid-cols-2 gap-3">
         ${specBox("Download speed", d.download)}
         ${specBox("Upload speed", d.upload)}
         ${specBox("Data", "Unlimited")}
         ${specBox("Connected devices", d.devices)}
         ${specBox("Installation", d.installation)}
         ${specBox("Plan length", d.contract)}
       </div>`
    : "";

  const goodFor = d
    ? `<h3 class="m-0 mb-2 text-base font-extrabold text-brand-navy">Great for</h3>
       <ul class="m-0 mb-5 list-none p-0">
         ${d.goodFor
           .map(
             (g) =>
               `<li class="flex gap-2 py-1 text-brand-ink">
                  <span class="font-extrabold text-brand-blue">•</span><span>${g}</span>
                </li>`,
           )
           .join("")}
       </ul>`
    : "";

  const note = d
    ? `<p class="m-0 mb-4 rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-muted">
         Switching from another provider? Get up to ₹2,000 as bill credit towards your old provider's exit fee.
       </p>`
    : "";

  return `
    <div class="max-h-[75vh] overflow-y-auto pr-1">
      <h2 class="m-0 pr-8 text-2xl font-extrabold text-brand-navy">${plan.name}</h2>
      ${plan.tag ? `<p class="m-0 mt-1 text-sm font-bold text-brand-blue">${plan.tag}</p>` : ""}
      <p class="my-3 font-display text-4xl font-extrabold text-brand-navy">
        ${formatPrice(plan.price)}<small class="text-sm font-medium text-brand-muted"> / month</small>
      </p>

      ${specs}

      <h3 class="m-0 mb-1 text-base font-extrabold text-brand-navy">What's included</h3>
      <ul class="m-0 mb-5 list-none p-0">${featureItems(plan.features)}</ul>

      ${goodFor}
      ${note}

      <a href="${BOOK_URL}" class="${BTN_PRIMARY} mb-4 w-full">Book now</a>
      <p class="m-0 text-sm text-brand-muted">Illustrative pricing only; no purchase or sign-up is processed.</p>
    </div>
  `;
}

function renderCard(plan, isSelected) {
  const cardState = isSelected
    ? "border-brand-blue ring-2 ring-brand-blue"
    : "border-brand-line";

  const compareState = isSelected
    ? "border-solid border-brand-blue bg-brand-soft text-brand-dark"
    : "border-dashed border-[#cbd9e8] text-brand-ink";

  const popularBadge = plan.popular
    ? `<span class="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">Most popular</span>`
    : "";

  const tagLine = plan.tag
    ? `<p class="m-0 mt-1 text-sm font-bold text-brand-blue">${plan.tag}</p>`
    : "";

  return `
    <article class="relative flex h-full flex-col rounded-[18px] border bg-white p-6 shadow-sm ${cardState}">
      ${popularBadge}
      <span class="mb-3 w-fit rounded-full bg-[#e6f3ff] px-3 py-1 text-xs font-extrabold text-[#0a59c1]">${plan.speed} Mbps</span>
      <h3 class="m-0 text-xl font-extrabold text-brand-navy">${plan.name}</h3>
      ${tagLine}
      <p class="my-3 font-display text-4xl font-extrabold text-brand-navy">
        ${formatPrice(plan.price)}<small class="text-sm font-medium text-brand-muted"> / month</small>
      </p>
      <ul class="m-0 mb-5 flex-1 list-none p-0">${featureItems(plan.features)}</ul>

      <div class="grid grid-cols-2 gap-3">
        <a href="${BOOK_URL}" class="${BTN_PRIMARY}">Book now</a>
        <button type="button" class="${BTN_OUTLINE}" data-details="${plan.id}">View details</button>
      </div>
      <label class="mt-3 flex cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border p-2.5 font-semibold transition hover:bg-brand-soft ${compareState}">
        <input type="checkbox" class="compare-check h-4 w-4 accent-brand-blue" value="${plan.id}" ${isSelected ? "checked" : ""}>
        Compare this plan
      </label>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const plans = broadbandPlans;

  const grid = document.getElementById("plan-grid");
  const search = document.getElementById("plan-search");
  const maxPrice = document.getElementById("max-price");
  const minSpeed = document.getElementById("min-speed");
  const sort = document.getElementById("plan-sort");
  const resetBtn = document.getElementById("reset-filters");
  const resultCount = document.getElementById("result-count");
  const noResults = document.getElementById("no-results");
  const modal = document.getElementById("plan-modal");
  const compareSection = document.getElementById("compare");
  const categoryList = document.getElementById("category-list");

  if (!grid) {
    console.error("#plan-grid not found");
    return;
  }

  const selected = new Set();
  let activeCategory = "all";

  /* ---------- Category sidebar ---------- */
  function renderCategories() {
    if (!categoryList) return;

    categoryList.innerHTML = broadbandCategories
      .map((cat) => {
        const count =
          cat.id === "all"
            ? plans.length
            : plans.filter((p) => (p.categories || []).includes(cat.id)).length;
        const state = cat.id === activeCategory ? CAT_ACTIVE : CAT_IDLE;
        return `<button type="button" data-category="${cat.id}"
                  aria-pressed="${cat.id === activeCategory}"
                  class="${CAT_BASE} ${state}">
                  <span>${cat.label}</span>
                  <span class="text-xs text-brand-muted">(${count})</span>
                </button>`;
      })
      .join("");
  }

  if (categoryList) {
    categoryList.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-category]");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      renderCategories();
      render();
    });
  }

  /* ---------- Floating compare bar  ---------- */
  let compareInView = false; // true while the comparison section is on screen

  const compareBar = document.createElement("div");
  compareBar.id = "compare-bar";
  compareBar.setAttribute("aria-live", "polite");
  compareBar.className =
    "fixed inset-x-0 bottom-4 z-40 mx-auto hidden w-fit max-w-[90%] items-center justify-between gap-3 rounded-2xl bg-brand-navy px-5 py-3 text-sm font-bold text-white shadow-xl";
  compareBar.innerHTML = `
    <span id="compare-msg"></span>
    <a id="compare-link" href="#compare"
       class="hidden whitespace-nowrap rounded-lg bg-brand-cyan px-4 py-2 font-extrabold text-brand-navy no-underline">
      View comparison ↓
    </a>
    <button type="button" id="compare-close" aria-label="Clear comparison"
       class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 p-0 text-lg leading-none text-white transition hover:bg-white/30">
      ×
    </button>`;
  document.body.appendChild(compareBar);

  const compareMsg = compareBar.querySelector("#compare-msg");
  const compareLink = compareBar.querySelector("#compare-link");
  const compareClose = compareBar.querySelector("#compare-close");

  // X clears the whole comparison (same as "Clear comparison", without scrolling)
  compareClose.addEventListener("click", () => {
    selected.clear();
    render();
    renderComparison();
    updateCompareMsg();
  });

  /* ---------- PIN code check  ---------- */
  const pinForm = document.getElementById("pin-form");
  if (pinForm) {
    const pinInput = document.getElementById("pin-input");
    const pinMsg = document.getElementById("pin-msg");
    const pinClear = document.getElementById("pin-clear");
    const MSG_BASE = "mt-2 min-h-[1.25rem] text-sm font-bold";
    const MSG_HIDE_AFTER = 5000; // 5 seconds

    let msgTimer = null;

    const clearPinMsg = () => {
      clearTimeout(msgTimer);
      pinMsg.textContent = "";
    };

    const showPinMsg = (text, colorClass) => {
      clearTimeout(msgTimer); 
      pinMsg.textContent = text;
      pinMsg.className = `${MSG_BASE} ${colorClass}`;
      msgTimer = setTimeout(clearPinMsg, MSG_HIDE_AFTER);
    };

    // Show the X only when there is something to clear
    const toggleClearBtn = () => {
      const hasText = pinInput.value.length > 0;
      pinClear.classList.toggle("hidden", !hasText);
      pinClear.classList.toggle("flex", hasText);
    };

    // Only allow digits while typing
    pinInput.addEventListener("input", () => {
      pinInput.value = pinInput.value.replace(/\D/g, "");
      toggleClearBtn();
    });

    // X button
    pinClear.addEventListener("click", () => {
      pinInput.value = "";
      clearPinMsg();
      toggleClearBtn();
      pinInput.focus();
    });

    pinForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const pin = pinInput.value.trim();

      if (!/^\d{6}$/.test(pin)) {
        showPinMsg("Please enter a valid 6-digit PIN code.", "text-red-600");
        pinInput.focus();
        return;
      }

      if (PIN_AVAILABLE.includes(pin)) {
        showPinMsg(
          `Good news! WaveLink fibre is available at ${pin}.`,
          "text-emerald-600",
        );
        const target = document.getElementById("explore");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else if (PIN_COMING_SOON.includes(pin)) {
        showPinMsg(
          `Fibre is coming soon to ${pin}. We'll let you know when it's ready.`,
          "text-amber-600",
        );
      } else {
        showPinMsg(
          `Sorry, WaveLink is not available at ${pin} yet.`,
          "text-red-600",
        );
      }
    });
  }

  /* ---------- Compare bar helpers ---------- */
  function setCompareBar(text, showLink) {
    if (!text) {
      compareBar.classList.add("hidden");
      compareBar.classList.remove("flex");
      return;
    }
    compareMsg.textContent = text;
    compareLink.classList.toggle("hidden", !showLink);
    compareBar.classList.remove("hidden");
    compareBar.classList.add("flex");
  }

  function updateCompareMsg() {
    if (selected.size === 2) {
      // Already looking at the comparison? Then the bar is just in the way.
      if (compareInView) setCompareBar("", false);
      else setCompareBar("2 plans selected", true);
    } else if (selected.size === 1) {
      setCompareBar("1 plan selected. Pick one more to compare.", false);
    } else {
      setCompareBar("", false);
    }
  }

  /* ---------- Hide the bar while the comparison section is visible ---------- */
  if (compareSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        compareInView = entries[0].isIntersecting;
        updateCompareMsg();
      },
      { threshold: 0.1 },
    );
    observer.observe(compareSection);
  }

  function render() {
    const query = search ? search.value.trim().toLowerCase() : "";

    let matches = plans.filter((plan) =>
      `${plan.name} ${plan.tag || ""} ${plan.features.join(" ")}`
        .toLowerCase()
        .includes(query),
    );

    if (activeCategory !== "all") {
      matches = matches.filter((plan) =>
        (plan.categories || []).includes(activeCategory),
      );
    }

    if (maxPrice && maxPrice.value) {
      matches = matches.filter((plan) => plan.price <= Number(maxPrice.value));
    }
    if (minSpeed && minSpeed.value) {
      matches = matches.filter((plan) => plan.speed >= Number(minSpeed.value));
    }

    if (sort) {
      if (sort.value === "price-asc") matches.sort((a, b) => a.price - b.price);
      else if (sort.value === "price-desc")
        matches.sort((a, b) => b.price - a.price);
      else if (sort.value === "speed-desc")
        matches.sort((a, b) => b.speed - a.speed);
    }

    grid.innerHTML = matches
      .map((plan) => renderCard(plan, selected.has(plan.id)))
      .join("");

    if (resultCount) {
      resultCount.textContent = `${matches.length} plan${matches.length === 1 ? "" : "s"} found`;
    }
    if (noResults) noResults.classList.toggle("hidden", matches.length > 0);
  }

  [search, maxPrice, minSpeed, sort].filter(Boolean).forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (search) search.value = "";
      if (maxPrice) maxPrice.value = "";
      if (minSpeed) minSpeed.value = "";
      if (sort) sort.value = "default";
      activeCategory = "all";
      renderCategories();
      render();
    });
  }

  grid.addEventListener("click", (event) => {
    const detailBtn = event.target.closest("[data-details]");
    if (detailBtn && modal) {
      const plan = plans.find((p) => p.id === detailBtn.dataset.details);
      document.getElementById("modal-content").innerHTML =
        renderModalContent(plan);
      modal.classList.remove("hidden");
      document.getElementById("close-modal").focus();
    }
  });

  grid.addEventListener("change", (event) => {
    if (!event.target.matches(".compare-check")) return;

    const box = event.target;
    const id = box.value;

    if (box.checked && selected.size >= 2) {
      box.checked = false;
      setCompareBar(
        "You can compare two plans at a time. Untick one first.",
        false,
      );
      return;
    }

    if (box.checked) selected.add(id);
    else selected.delete(id);

    render();

    // render() rebuilt the grid, so give keyboard focus back to the same checkbox
    const again = grid.querySelector(`.compare-check[value="${id}"]`);
    if (again) again.focus();

    renderComparison();
    updateCompareMsg();
  });

  function renderComparison() {
    const area = document.getElementById("comparison");
    if (!area) return;

    if (selected.size !== 2) {
      area.innerHTML = "";
      if (compareSection) compareSection.classList.add("hidden");
      return;
    }
    if (compareSection) compareSection.classList.remove("hidden");

    const [a, b] = [...selected].map((id) => plans.find((p) => p.id === id));

    const cheaper = a.price === b.price ? null : a.price < b.price ? a : b;
    const faster = a.speed === b.speed ? null : a.speed > b.speed ? a : b;
    const perA = a.price / a.speed;
    const perB = b.price / b.speed;
    const bestValue = perA === perB ? null : perA < perB ? a : b;

    const TD = "border-b border-[#eaf0f7] px-5 py-4 align-top";
    const TD_LABEL = `${TD} w-[150px] font-bold text-brand-muted`;
    const VALUE = "text-lg font-extrabold text-brand-navy";

    const isWinner = (plan, winner) => winner && winner.id === plan.id;
    const badge = (plan, winner, text) =>
      isWinner(plan, winner)
        ? `<span class="ml-2 inline-block rounded-full bg-emerald-600 px-2.5 py-0.5 align-middle text-xs font-extrabold text-white">${text}</span>`
        : "";
    const cellBg = (plan, winner) =>
      isWinner(plan, winner) ? "bg-emerald-50" : "";

    const featureList = (plan, other) => `
      <ul class="m-0 grid list-none gap-2 p-0">
        ${plan.features
          .map((f) => {
            const unique = !other.features.includes(f);
            return `<li class="${unique ? "font-bold text-brand-dark" : "text-brand-ink"}">
                      <span class="font-extrabold text-emerald-600">✓</span> ${f}
                    </li>`;
          })
          .join("")}
      </ul>`;

    const valueRow = (label, winner, badgeText, getText) => `
      <tr>
        <td class="${TD_LABEL}">${label}</td>
        ${[a, b]
          .map(
            (p) => `<td class="${TD} ${cellBg(p, winner)}">
                      <span class="${VALUE}">${getText(p)}</span>${badge(p, winner, badgeText)}
                    </td>`,
          )
          .join("")}
      </tr>`;

    area.innerHTML = `
      <div class="overflow-hidden rounded-[20px] border border-brand-line bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[620px] table-fixed border-collapse text-left">
            <thead>
              <tr class="bg-gradient-to-br from-brand-navy to-brand-blue text-white">
                <th class="w-[150px] px-5 py-4 text-left text-sm font-bold text-[#cfe3ff]">Compare</th>
                <th class="px-5 py-4 text-left text-lg font-extrabold">${a.name}</th>
                <th class="px-5 py-4 text-left text-lg font-extrabold">${b.name}</th>
              </tr>
            </thead>
            <tbody>
              ${valueRow("Monthly price", cheaper, "Lower price", (p) => formatPrice(p.price))}
              ${valueRow("Speed", faster, "Faster", (p) => `${p.speed} Mbps`)}
              ${valueRow("Cost per Mbps", bestValue, "Best value", (p) => `₹${(p.price / p.speed).toFixed(2)}`)}
              <tr>
                <td class="${TD_LABEL} border-b-0">Features</td>
                <td class="${TD} border-b-0">${featureList(a, b)}</td>
                <td class="${TD} border-b-0">${featureList(b, a)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 bg-[#f7faff] px-5 py-4">
          <p class="m-0 text-sm text-brand-muted">Blue bold features are only in that plan.</p>
          <button id="clear-compare"
            class="cursor-pointer rounded-[10px] border border-brand-blue bg-transparent px-4 py-2 text-sm font-extrabold text-brand-blue transition hover:bg-brand-soft">
            Clear comparison
          </button>
        </div>
      </div>
    `;

    document.getElementById("clear-compare").addEventListener("click", () => {
      selected.clear();
      render();
      renderComparison();
      updateCompareMsg();
      const explore = document.getElementById("explore");
      if (explore) explore.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (modal) {
    document
      .getElementById("close-modal")
      .addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.classList.add("hidden");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.classList.add("hidden");
    });
  }

  renderCategories();
  render();
  renderComparison();
});
