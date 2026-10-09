(async function () {
  const API =
    "https://sularc1985.pythonanywhere.com/api/public/settings";

  try {
    const response = await fetch(API, { cache: "no-store" });
    if (!response.ok) throw new Error("Settings unavailable");

    const data = await response.json();
    const settings = data.settings || {};

    const name = typeof settings.library_name === "string"
      ? settings.library_name.trim() : "";

    if (name) {
      document.querySelectorAll(".identity b, .foot b")
        .forEach(element => {
          element.textContent = name;
        });

      document.querySelectorAll(".identity small")
        .forEach(element => {
          const parts = element.textContent.split("·");
          if (parts.length > 1) {
            element.textContent =
              parts.slice(1).join("·").trim();
          }
        });

      const parts = document.title.split("|");
      document.title = parts.length > 1
        ? parts[0].trim() + " | " + name : name;

      document.querySelectorAll(".hero p, .committee-intro")
        .forEach(element => {
          element.textContent = element.textContent.replace(
            /Students?'(?:s)? Union Library\s*&\s*Recreation Centre/g,
            () => name
          );
        });
    }

    const registration = document.querySelector(".hero .tag");
    if (registration && settings.registration_number) {
      registration.textContent =
        "REG. NO. " + settings.registration_number;
    }

    document.querySelectorAll(".section.soft .card")
      .forEach(card => {
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

    const address = document.querySelector(
      "#contact .wrap > div:first-child > p"
    );
    if (address && settings.address) {
      address.textContent = settings.address;
    }
  } catch (error) {
    console.warn("Website settings:", error.message);
  }
})();
