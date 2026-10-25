

const broadbandPlans = [
    {
        id: 'fibre50',
        name: 'Wave Fibre 50',
        speed: 50,
        price: 24,
        features: [
            '50 Mbps average speed',
            'Unlimited data',
            'Standard Wi-Fi router'
        ]
    },
    {
        id: 'fibre100',
        name: 'Wave Fibre 100',
        speed: 100,
        price: 29,
        features: [
            '100 Mbps average speed',
            'Unlimited data',
            'Wi-Fi 6 router'
        ]
    },
    {
        id: 'fibre300',
        name: 'Wave Fibre 300',
        speed: 300,
        price: 36,
        features: [
            '300 Mbps average speed',
            'Unlimited data',
            'Wi-Fi 6 router',
            'Priority support'
        ]
    },
    {
        id: 'fibre500',
        name: 'Wave Fibre 500',
        speed: 500,
        price: 43,
        features: [
            '500 Mbps average speed',
            'Unlimited data',
            'Wi-Fi 6 router',
            'Priority support'
        ]
    },
    {
        id: 'gigawave',
        name: 'GigaWave 900',
        speed: 900,
        price: 55,
        features: [
            '900 Mbps average speed',
            'Unlimited data',
            'Premium Wi-Fi router',
            'Priority support'
        ]
    }
];



const mobilePlans = [
    {
        id: 'sim5',
        name: 'Wave Starter',
        data: 5,
        price: 9,
        features: [
            '5 GB monthly data',
            'Unlimited calls & texts',
            '4G/5G access'
        ]
    },
    {
        id: 'sim20',
        name: 'Wave Everyday',
        data: 20,
        price: 15,
        features: [
            '20 GB monthly data',
            'Unlimited calls & texts',
            '5G access'
        ]
    },
    {
        id: 'sim50',
        name: 'Wave Plus',
        data: 50,
        price: 22,
        features: [
            '50 GB monthly data',
            'Unlimited calls & texts',
            '5G access'
        ]
    },
    {
        id: 'sim100',
        name: 'Wave Max',
        data: 100,
        price: 30,
        features: [
            '100 GB monthly data',
            'Unlimited calls & texts',
            '5G access',
            'Priority support'
        ]
    }
];


function renderCard(plan, type) {

    // Display broadband speed or mobile data
    const detail = type === 'broadband'
        ? `${plan.speed} Mbps`
        : `${plan.data} GB data`;

    // Return HTML for each plan card
    return `
        <article class="card">

            <span class="pill">
                ${detail}
            </span>

            <h3>${plan.name}</h3>

            <p class="price">
                £${plan.price}
                <small> / month</small>
            </p>

            <ul class="features">
                ${plan.features.map(feature =>
                    `<li>${feature}</li>`
                ).join('')}
            </ul>

            <button
                class="btn btn-primary"
                data-details="${plan.id}">
                View details
            </button>

            ${
                type === 'broadband'
                    ? `
                        <label class="check-row">

                            <input
                                type="checkbox"
                                class="compare-check"
                                value="${plan.id}">

                            Compare this plan

                        </label>
                    `
                    : `
                        <button
                            class="btn btn-outline"
                            style="margin-top:10px"
                            data-select="${plan.id}">
                            Select plan
                        </button>
                    `
            }

        </article>
    `;
}




document.addEventListener('DOMContentLoaded', () => {

    // Identify whether the page is broadband or mobile
    const type = document.body.dataset.planType;

    if (!type) {
        return;
    }

    // Choose the appropriate plan list
    const plans = type === 'broadband'
        ? broadbandPlans
        : mobilePlans;



    const grid = document.getElementById('plan-grid');

    const search = document.getElementById('plan-search');

    const maxPrice = document.getElementById('max-price');

    const minSpeed = document.getElementById('min-speed');

    const sort = document.getElementById('plan-sort');

    // Store selected broadband plans for comparison
    const selected = new Set();



    function render() {

        // Get the search input value
        const query = search.value.trim().toLowerCase();

        // Search plans by name and features
        let matches = plans.filter(plan =>
            `${plan.name} ${plan.features.join(' ')}`
                .toLowerCase()
                .includes(query)
        );

        // Filter by maximum monthly price
        if (maxPrice.value) {

            matches = matches.filter(plan =>
                plan.price <= Number(maxPrice.value)
            );

        }

        // Filter broadband plans by minimum speed
        if (minSpeed && minSpeed.value) {

            matches = matches.filter(plan =>
                plan.speed >= Number(minSpeed.value)
            );

        }

        // Sort price from low to high
        if (sort.value === 'price-asc') {

            matches.sort((a, b) =>
                a.price - b.price
            );

        }

        // Sort price from high to low
        if (sort.value === 'price-desc') {

            matches.sort((a, b) =>
                b.price - a.price
            );

        }

        // Sort broadband speed or mobile data
        if (sort.value === 'speed-desc') {

            matches.sort((a, b) =>
                (b.speed ?? b.data) - (a.speed ?? a.data)
            );

        }

        // Display filtered plan cards
        grid.innerHTML = matches.map(plan =>
            renderCard(plan, type)
        ).join('');

        // Update the number of results
        document.getElementById('result-count').textContent =
            `${matches.length} plan${matches.length === 1 ? '' : 's'} found`;

        // Show or hide the no-results message
        document.getElementById('no-results')
            .classList.toggle('hidden', matches.length > 0);

        // Restore checked comparison boxes
        grid.querySelectorAll('.compare-check').forEach(box => {

            box.checked = selected.has(box.value);

        });

    }




    [search, maxPrice, sort, minSpeed]
        .filter(Boolean)
        .forEach(input => {

            input.addEventListener('input', render);

        });


  

    grid.addEventListener('click', event => {

        // Check whether View Details was clicked
        const detailBtn = event.target.closest('[data-details]');

        if (detailBtn) {

            // Find the selected plan
            const plan = plans.find(p =>
                p.id === detailBtn.dataset.details
            );

            // Add plan details to the popup
            document.getElementById('modal-content').innerHTML = `

                <h2>${plan.name}</h2>

                <p class="price">
                    £${plan.price}
                    <small> / month</small>
                </p>

                <ul class="features">

                    ${plan.features.map(item =>
                        `<li>${item}</li>`
                    ).join('')}

                </ul>

                <p class="subtle">
                    Illustrative pricing only;
                    no purchase or sign-up is processed.
                </p>
            `;

            // Open the popup
            document.getElementById('plan-modal')
                .classList.remove('hidden');

            // Focus the close button
            document.getElementById('close-modal').focus();

        }

        // Check whether Select Plan was clicked
        const selectBtn = event.target.closest('[data-select]');

        if (selectBtn) {

            // Find the selected mobile plan
            const plan = plans.find(p =>
                p.id === selectBtn.dataset.select
            );

            // Display the selection message
            document.getElementById('selection-message').textContent =
                `Selected ${plan.name} (£${plan.price}/month) for demonstration. No order has been placed.`;

        }

    });


    grid.addEventListener('change', event => {

        // Only handle comparison checkboxes
        if (!event.target.matches('.compare-check')) {
            return;
        }

        const box = event.target;

        // Allow a maximum of two plans
        if (box.checked && selected.size >= 2) {

            box.checked = false;

            alert('Please compare up to two plans.');

            return;
        }

        // Add or remove the selected plan
        box.checked
            ? selected.add(box.value)
            : selected.delete(box.value);

        // Update the comparison table
        renderComparison();

    });


  

    function renderComparison() {

        const area = document.getElementById('comparison');

        // Stop if comparison section does not exist
        if (!area) {
            return;
        }

        // Show message when fewer than two plans are selected
        if (selected.size !== 2) {

            area.innerHTML = `
                <p class="muted">
                    Select any two broadband plans
                    to compare them side by side.
                </p>
            `;

            return;
        }

        // Find the two selected plans
        const [a, b] = [...selected].map(id =>
            plans.find(plan => plan.id === id)
        );

        // Create the comparison table
        area.innerHTML = `

            <table>

                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>${a.name}</th>
                        <th>${b.name}</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Monthly price</td>
                        <td>£${a.price}</td>
                        <td>£${b.price}</td>
                    </tr>

                    <tr>
                        <td>Speed</td>
                        <td>${a.speed} Mbps</td>
                        <td>${b.speed} Mbps</td>
                    </tr>

                    <tr>
                        <td>Features</td>
                        <td>${a.features.join(', ')}</td>
                        <td>${b.features.join(', ')}</td>
                    </tr>

                </tbody>

            </table>

            <button
                class="btn btn-outline btn-small"
                id="clear-compare"
                style="margin-top:15px">
                Clear comparison
            </button>
        `;

        // Clear selected plans
        document.getElementById('clear-compare')
            .addEventListener('click', () => {

                selected.clear();

                render();

                renderComparison();

            });

    }


   

    const modal = document.getElementById('plan-modal');

    // Close popup using the close button
    document.getElementById('close-modal')
        .addEventListener('click', () => {

            modal.classList.add('hidden');

        });

    // Close popup by clicking outside
    modal.addEventListener('click', event => {

        if (event.target === modal) {

            modal.classList.add('hidden');

        }

    });

    // Close popup using Escape key
    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {

            modal.classList.add('hidden');

        }

    });



    

    // Display all plans when the page loads
    render();

    // Initialize the broadband comparison section
    renderComparison();

});
