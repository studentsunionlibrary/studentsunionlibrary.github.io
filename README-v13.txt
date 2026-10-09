SULARC WEBSITE v13 — PUBLIC PORTAL INTEGRATION

Base
----
Built from Website v12 (Office Bearers edition).

What v13 does
-------------
1. Keeps the existing homepage design and Office Bearers section.
2. Replaces the old placeholder catalogue search page with a safe portal bridge.
3. Adds safe bridge pages for:
   - catalogue.html -> /public-catalogue
   - new-member-form.html -> /apply-membership
   - member-login.html -> /member-login
4. Adds portal-config.js so the permanent portal address can be changed in ONE place.
5. Does NOT put the office computer's 127.0.0.1 or 192.168.x.x address on the public website.
6. Does NOT store admin passwords or member passwords in GitHub Pages.
7. Keeps the online-service buttons visible while showing that secure public hosting is still being connected.

IMPORTANT
---------
For now, portal-config.js contains:
  baseUrl: ""

LEAVE IT BLANK until the library has a permanent HTTPS portal address.

DO NOT use:
- http://127.0.0.1:5000
- http://192.168.x.x:5000
- a changing trycloudflare.com quick-tunnel URL

When permanent hosting is ready
-------------------------------
Edit ONLY portal-config.js:

window.SULARC_PORTAL = {
  baseUrl: "https://YOUR-PERMANENT-PORTAL-ADDRESS",
  paths: {
    catalogue: "/public-catalogue",
    membership: "/apply-membership",
    memberLogin: "/member-login"
  }
};

Files to upload/replace in GitHub
---------------------------------
- index.html
- styles.css
- catalogue.html
- member-login.html
- new-member-form.html
- portal-config.js

Keep your existing repository files such as:
- library-logo.png
- site.js
- events.html
- gallery.html
- notices.html
- content-data.js
and other current content files.

Security
--------
The GitHub Pages Admin Login remains a design preview only.
Real administration must stay inside the private library software/backend.
Never store LIB_PASSWORD, SECRET_KEY, member passwords or other credentials in GitHub.
