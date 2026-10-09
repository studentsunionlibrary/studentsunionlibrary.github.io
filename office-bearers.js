// Public Office Bearers — Student's Union Library

(async function () {
    const API =
        "https://sularc1985.pythonanywhere.com/api/public/office-bearers";

    const section = document.querySelector("#office-bearers");
    if (!section) return;

    const grid = section.querySelector(".office-grid");
    if (!grid) return;

    try {
        const response = await fetch(API, { cache: "no-cache" });

        if (!response.ok) {
            throw new Error("Office bearers API unavailable");
        }

        const data = await response.json();
        const bearers = data.office_bearers;

        if (!Array.isArray(bearers) || bearers.length === 0) {
            return;
        }

        // Prepare cards without inserting API values as HTML.
        const fragment = document.createDocumentFragment();

        bearers.forEach(function (person) {
            const card = document.createElement("div");
            card.className = "office-card";

            const position = document.createElement("span");
            position.textContent = person.designation || "";

            const name = document.createElement("h3");
            name.textContent = person.name || "";

            card.appendChild(position);
            card.appendChild(name);
            fragment.appendChild(card);
        });

        // Replace existing cards only after API data loads.
        grid.replaceChildren(fragment);

        console.log("Office bearers updated from library software.");

    } catch (error) {
        // Keep existing names visible if API is unavailable.
        console.warn(
            "Using existing office bearers information:",
            error.message
        );
    }
})();
