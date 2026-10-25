
const plans = [
  { id: 1, name: "Starter Lite",  category: "Prepaid",   price: 79,  dataPerDay: 1,   validity: 28, calls: "Unlimited", features: ["Unlimited calls", "100 SMS / day", "4G speed"],                   popular: false },
  { id: 2, name: "Daily Saver",   category: "Prepaid",   price: 99,  dataPerDay: 1.5, validity: 28, calls: "Unlimited", features: ["Unlimited calls", "100 SMS / day", "Free caller tune"],          popular: false },
  { id: 3, name: "Social Boost",  category: "Prepaid",   price: 149, dataPerDay: 2,   validity: 28, calls: "Unlimited", features: ["Unlimited calls", "5G speed", "Free music app"],                  popular: true  },
  { id: 4, name: "Binge Max",     category: "Prepaid",   price: 199, dataPerDay: 3,   validity: 28, calls: "Unlimited", features: ["Unlimited calls", "5G speed", "Free OTT subscription"],           popular: false },
  { id: 5, name: "Family Basic",  category: "Postpaid",  price: 179, dataPerDay: 2,   validity: 30, calls: "Unlimited", features: ["Monthly bill", "5G speed", "Data rollover"],                      popular: false },
  { id: 6, name: "Family Plus",   category: "Postpaid",  price: 249, dataPerDay: 3,   validity: 30, calls: "Unlimited", features: ["Monthly bill", "5G speed", "Free OTT subscription", "Hotspot"],  popular: true  },
  { id: 7, name: "Data Pack 20",  category: "Data Only", price: 129, dataPerDay: 4,   validity: 28, calls: "No calls",  features: ["Internet only", "Hotspot allowed", "4G speed"],                   popular: false },
  { id: 8, name: "Data Pack Pro", category: "Data Only", price: 229, dataPerDay: 6,   validity: 28, calls: "No calls",  features: ["Internet only", "5G speed", "Hotspot allowed"],                   popular: false }
];


// ---------- STEP 2: Get the HTML elements we need ----------
const planGrid      = document.getElementById("plan-grid");
const resultCount   = document.getElementById("result-count");
const noResults     = document.getElementById("no-results");
const searchBox     = document.getElementById("plan-search");
const priceSelect   = document.getElementById("max-price");
const sortSelect    = document.getElementById("plan-sort");
const resetBtn      = document.getElementById("reset-btn");
const categoryTabs  = document.getElementById("category-tabs");
const message       = document.getElementById("selection-message");
const modal         = document.getElementById("plan-modal");
const modalContent  = document.getElementById("modal-content");
const closeBtn      = document.getElementById("close-modal");
const usageSelect   = document.getElementById("usage-select");
const finderBtn     = document.getElementById("finder-btn");
const finderResult  = document.getElementById("finder-result");


// ---------- STEP 3: Variables that remember what the user chose ----------
let currentCategory = "all";

// Favourites: browser-la save aagum (page refresh pannaalum irukkum)
let favorites = [];
try {
  favorites = JSON.parse(localStorage.getItem("wlFavorites")) || [];
} catch (error) {
  favorites = [];
}


// ---------- STEP 4: Small helper functions ----------

// Total data = per day data x validity days
function getTotalData(plan) {
  return plan.dataPerDay * plan.validity;
}

// Find one plan using its id
function findPlan(id) {
  return plans.find(function (plan) {
    return plan.id === id;
  });
}

// Show / hide an element (we use the class "mp-hide")
function show(element) { element.classList.remove("mp-hide"); }
function hide(element) { element.classList.add("mp-hide"); }


// ---------- STEP 5: Filter + sort the plans ----------
function getVisiblePlans() {
  const searchText = searchBox.value.trim().toLowerCase();
  const maxPrice   = priceSelect.value;      // "" or "100" / "150" ...
  const sortType   = sortSelect.value;

  // 5a. Filter
  let list = plans.filter(function (plan) {
    // category check
    if (currentCategory === "favorites") {
      if (!favorites.includes(plan.id)) return false;
    } else if (currentCategory !== "all" && plan.category !== currentCategory) {
      return false;
    }

    // price check
    if (maxPrice !== "" && plan.price > Number(maxPrice)) return false;

    // search check (name, category and features)
    const allText = (plan.name + " " + plan.category + " " + plan.features.join(" ")).toLowerCase();
    if (!allText.includes(searchText)) return false;

    return true;
  });

  // 5b. Sort
  if (sortType === "price-asc") {
    list.sort(function (a, b) { return a.price - b.price; });
  } else if (sortType === "price-desc") {
    list.sort(function (a, b) { return b.price - a.price; });
  } else if (sortType === "data-desc") {
    list.sort(function (a, b) { return getTotalData(b) - getTotalData(a); });
  }
  // "default" = original order, so nothing to do

  return list;
}


// ---------- STEP 6: Draw the cards on the page ----------
function showPlans() {
  const list = getVisiblePlans();
  let html = "";

  list.forEach(function (plan) {
    const isFav = favorites.includes(plan.id);

    // list items for features
    let featureItems = "";
    plan.features.forEach(function (feature) {
      featureItems += "<li>" + feature + "</li>";
    });

    html += `
      <article class="mp-card">
        ${plan.popular ? '<span class="mp-badge">Popular</span>' : ""}
        <button class="mp-heart ${isFav ? "is-fav" : ""}" data-action="fav" data-id="${plan.id}"
                aria-label="Add to favourites">${isFav ? "♥" : "♡"}</button>

        <p class="mp-type">${plan.category}</p>
        <h3>${plan.name}</h3>
        <p class="mp-price">₹${plan.price}<small> / month</small></p>

        <p class="mp-data">${plan.dataPerDay} GB/day &bull; ${plan.validity} days</p>
        <ul class="mp-features">${featureItems}</ul>

        <div class="mp-card-buttons">
          <button class="mp-btn mp-btn-light"   data-action="details" data-id="${plan.id}">Details</button>
          <button class="mp-btn mp-btn-primary" data-action="choose"  data-id="${plan.id}">Choose</button>
        </div>
      </article>`;
  });

  planGrid.innerHTML = html;

  // result count text
  resultCount.textContent = list.length + (list.length === 1 ? " plan found" : " plans found");

  // empty message
  if (list.length === 0) {
    show(noResults);
  } else {
    hide(noResults);
  }
}


// ---------- STEP 7: Plan details popup ----------
function openModal(plan) {
  let featureItems = "";
  plan.features.forEach(function (feature) {
    featureItems += "<li>" + feature + "</li>";
  });

  modalContent.innerHTML = `
    <p class="mp-type">${plan.category}</p>
    <h3>${plan.name}</h3>
    <p class="mp-price">₹${plan.price}<small> / month</small></p>

    <table class="mp-table">
      <tr><td>Data per day</td><td>${plan.dataPerDay} GB</td></tr>
      <tr><td>Validity</td><td>${plan.validity} days</td></tr>
      <tr><td>Total data</td><td>${getTotalData(plan)} GB</td></tr>
      <tr><td>Calls</td><td>${plan.calls}</td></tr>
    </table>

    <ul class="mp-features">${featureItems}</ul>

    <button class="mp-btn mp-btn-primary mp-full" data-action="choose-modal" data-id="${plan.id}">
      Choose this plan
    </button>`;

  show(modal);
}

function closeModal() {
  hide(modal);
}


// ---------- STEP 8: Choose a plan ----------
function choosePlan(plan) {
  message.textContent = "✔ You selected " + plan.name + " (₹" + plan.price + "/month). This is a demo, so no real order is placed.";
  show(message);
  message.scrollIntoView({ behavior: "smooth", block: "center" });
}


// ---------- STEP 9: Favourite (heart) ----------
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    // remove it
    favorites = favorites.filter(function (favId) { return favId !== id; });
  } else {
    // add it
    favorites.push(id);
  }

  try {
    localStorage.setItem("wlFavorites", JSON.stringify(favorites));
  } catch (error) {
    // storage blocked - ignore, page still works
  }

  showPlans();
}


// ---------- STEP 10: Plan finder (quiz) ----------
function suggestPlan() {
  const usage = usageSelect.value;

  if (usage === "") {
    finderResult.textContent = "Please choose how much you use your phone first.";
    show(finderResult);
    return;
  }

  // light -> plan 1, medium -> plan 3, heavy -> plan 4
  let planId = 1;
  if (usage === "medium") planId = 3;
  if (usage === "heavy")  planId = 4;

  const plan = findPlan(planId);
  finderResult.textContent = "We suggest: " + plan.name + " - ₹" + plan.price + "/month with " + plan.dataPerDay + " GB/day.";
  show(finderResult);
}


// ---------- STEP 11: Listen for clicks and typing ----------

// Search box: every key press
searchBox.addEventListener("input", showPlans);

// Dropdowns
priceSelect.addEventListener("change", showPlans);
sortSelect.addEventListener("change", showPlans);

// Category buttons
categoryTabs.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  currentCategory = button.dataset.category;

  // move the "active" look to the clicked button
  const allTabs = categoryTabs.querySelectorAll(".mp-tab");
  allTabs.forEach(function (tab) { tab.classList.remove("active"); });
  button.classList.add("active");

  showPlans();
});

// Reset button
resetBtn.addEventListener("click", function () {
  searchBox.value = "";
  priceSelect.value = "";
  sortSelect.value = "default";
  currentCategory = "all";

  categoryTabs.querySelectorAll(".mp-tab").forEach(function (tab) {
    tab.classList.toggle("active", tab.dataset.category === "all");
  });

  hide(message);
  showPlans();
});

// Card buttons (one listener for all cards)
planGrid.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const id     = Number(button.dataset.id);
  const action = button.dataset.action;
  const plan   = findPlan(id);

  if (action === "details") openModal(plan);
  if (action === "choose")  choosePlan(plan);
  if (action === "fav")     toggleFavorite(id);
});

// Button inside the popup
modalContent.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "choose-modal") {
    choosePlan(findPlan(Number(button.dataset.id)));
    closeModal();
  }
});

// Close popup: X button, click outside, Escape key
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

// Plan finder button
finderBtn.addEventListener("click", suggestPlan);


// ---------- STEP 12: Show the cards when page opens ----------
showPlans();
