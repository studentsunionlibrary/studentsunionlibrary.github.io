(function () {
  "use strict";

  const API =
    "https://sularc1985.pythonanywhere.com/api/public/website-books";

  const grid = document.getElementById("website-books-grid");

  if (grid === null) {
    return;
  }

  function esc(value) {
    const div = document.createElement("div");
    div.textContent = value || "";
    return div.innerHTML;
  }

  function bookCard(book) {
    const title = esc(book.title || "Untitled Book");
    const author = esc(book.author || "");
    const category = esc(book.category || "");
    const language = esc(book.language || "");
    const type = esc(book.display_type || "Featured Book");
    const description = esc(book.description || "");

    const details = [author, category, language]
      .filter(Boolean)
      .join(" · ");

    const cover = book.cover_url
      ? '<div class="website-book-cover">' +
        '<img src="' + esc(book.cover_url) +
        '" alt="' + title + '" loading="lazy">' +
        '</div>'
      : '<div class="website-book-cover website-book-cover-empty">' +
        '<span>📚</span><small>No cover available</small></div>';

    const meta = details
      ? '<p class="website-book-meta">' + details + '</p>'
      : "";

    const desc = description
      ? '<p class="website-book-description">' +
        description + '</p>'
      : "";

    const link = book.detail_url
      ? '<a class="btn primary website-book-link" href="' +
        esc(book.detail_url) +
        '" target="_blank" rel="noopener">View Details</a>'
      : "";

    return (
      '<article class="website-book-card">' +
      cover +
      '<div class="website-book-content">' +
      '<span class="badge">' + type + '</span>' +
      '<h3>' + title + '</h3>' +
      meta +
      desc +
      link +
      '</div></article>'
    );
  }

  async function loadBooks() {
    try {
      const response = await fetch(API);

      if (response.ok === false) {
        throw new Error("API error");
      }

      const data = await response.json();
      const books = Array.isArray(data.books) ? data.books : [];

      if (books.length === 0) {
        grid.innerHTML =
          '<div class="empty-state">' +
          'No books are currently selected for website display.' +
          '</div>';
        return;
      }

      grid.innerHTML = books.map(bookCard).join("");
    } catch (error) {
      console.error("Website books:", error);

      grid.innerHTML =
        '<div class="empty-state">' +
        'Books could not be loaded right now.' +
        '</div>';
    }
  }

  loadBooks();
})();
