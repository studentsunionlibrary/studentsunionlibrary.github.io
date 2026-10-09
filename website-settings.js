// Public Website Settings — Student's Union Library
// Reads public information from PythonAnywhere.

(async function () {
    const API =
        "https://sularc1985.pythonanywhere.com/api/public/settings";

    try {
        const response = await fetch(API, { cache: "no-cache" });

        if (!response.ok) {
            throw new Error("Website settings unavailable");
        }

        const data = await response.json();
        const settings = data.settings || {};

        // Registration number in hero section
        const registration = document.querySelector(".hero .tag");

        if (registration && settings.registration_number) {
            registration.textContent =
                "REG. NO. " + settings.registration_number;
        }

        // Newspaper reading and book issue hours
        const hourCards = document.querySelectorAll(
            ".section.soft .card"
        );

        hourCards.forEach(function (card) {
            const heading = card.querySelector("h3");
            const paragraph = card.querySelector("p");

            if (!heading || !paragraph) return;

            if (
                heading.textContent.includes("Newspaper Reading") &&
                settings.newspaper_hours
            ) {
                paragraph.textContent = settings.newspaper_hours;
            }

            if (
                heading.textContent.includes("Book Issue") &&
                settings.book_issue_hours
            ) {
                paragraph.textContent = settings.book_issue_hours;
            }
        });

        // Postal address in Contact section
        const contact = document.querySelector("#contact");

        if (contact && settings.address) {
            const address = contact.querySelector(
                ".wrap > div:first-child > p"
            );

            if (address) {
                address.textContent = settings.address;
            }
        }

        console.log("Public website settings loaded.");

    } catch (error) {
        console.warn(
            "Using existing website information:",
            error.message
        );
    }
})();
