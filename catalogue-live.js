// Student's Union Library — Live Public Catalogue

(function () {
  "use strict";

  const API =
    "https://sularc1985.pythonanywhere.com/public-catalogue.json";

  async function searchBooks(query, category, language, availability, page = 1) {
    const url = new URL(API);

    if (query) {
      url.searchParams.set("q", query);
    }

    if (category) {
      url.searchParams.set("category", category);
    }

    if (language) {
      url.searchParams.set("language", language);
    }

    if (availability) {
      url.searchParams.set("availability", availability);
    }

    url.searchParams.set("page", page);

    const response = await fetch(url.toString(), {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error("Catalogue service unavailable");
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.books)) {
      throw new Error("Invalid catalogue response");
    }

    return data;
  }

  window.SULARC_SEARCH_BOOKS = searchBooks;

})();
