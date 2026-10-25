document.addEventListener("DOMContentLoaded", function () {
    const broadband = document.getElementById("calc-broadband");
    const mobile = document.getElementById("calc-mobile");
    const tv = document.getElementById("calc-tv");

    const ottCheckboxes = document.querySelectorAll(
        '.ott-list input[name="ott"]'
    );

    const totalDisplay = document.getElementById("calc-total");
    const breakdownDisplay = document.getElementById("calc-breakdown");

    // Calculate the complete monthly package total
    function calculateTotal() {

        // Broadband price
        const broadbandPrice = Number(broadband.value);

        // Mobile price
        const mobilePrice = Number(mobile.value);

        // Optional TV price
        const tvPrice = tv.checked ? 1299 : 0;

        // Calculate selected OTT services
        let ottTotal = 0;
        let selectedOTT = [];

        ottCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                ottTotal += Number(checkbox.value);

                const serviceName =
                    checkbox.parentElement.querySelector("span").textContent
                    .replace(/₹\s*\d+/, "")
                    .trim();

                selectedOTT.push(serviceName);
            }
        });

        // Calculate final monthly amount
        const monthlyTotal =
            broadbandPrice + mobilePrice + tvPrice + ottTotal;

        // Display monthly total
        totalDisplay.textContent =
            "₹" + monthlyTotal.toLocaleString("en-IN") + " / month";

        // Display price breakdown
        let breakdown = "Broadband ₹" + broadbandPrice +
            " + Mobile ₹" + mobilePrice;

        if (tv.checked) {
            breakdown += " + TV ₹" + tvPrice;
        }

        if (selectedOTT.length > 0) {
            breakdown += " + OTT (" + selectedOTT.join(", ") +
                ") ₹" + ottTotal;
        }

        breakdownDisplay.textContent = breakdown;
    }

    // Recalculate whenever a selection changes
    broadband.addEventListener("change", calculateTotal);
    mobile.addEventListener("change", calculateTotal);
    tv.addEventListener("change", calculateTotal);

    ottCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", calculateTotal);
    });

    // Calculate initial total when the page loads
    calculateTotal();

});


/*check demo*/
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("postcode-form");
    const postcodeInput = document.getElementById("postcode");
    const result = document.getElementById("postcode-result");
    const map = document.querySelector(".map-box iframe");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const pincode = postcodeInput.value.trim();

        // Validate the six-digit Indian PIN code
        if (!/^[1-9][0-9]{5}$/.test(pincode)) {
            result.textContent = "Please enter a valid 6-digit Indian PIN code.";
            result.style.color = "#ffcccc";
            return;
        }

        // Show loading message
        result.textContent = "Finding your location...";
        result.style.color = "#ffffff";

        // Search the entered PIN code on Google Maps
        const locations = {
    "638401": "Sathyamangalam, Erode, Tamil Nadu, India",
    "638301": "Bhavani, Erode, Tamil Nadu, India"
};

const place = locations[pincode] || (pincode + ", Tamil Nadu, India");

map.src =
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(place) +
    "&z=12&output=embed";

result.textContent = "Showing location: " + place;
result.style.color = "#a9f4ff";
    });

});