// SULARC Website v13 — Public Portal Integration
// Leave baseUrl blank until the library has a permanent HTTPS portal address.
// Do NOT use 127.0.0.1, a LAN IP, or a temporary trycloudflare URL.
window.SULARC_PORTAL = {
  baseUrl: "https://sularc1985.pythonanywhere.com",
  paths: {
    catalogue: "/public-catalogue",
    membership: "/apply-membership",
    memberLogin: "/member-login"
  }
};

window.SULARC_PORTAL_URL = function(service) {
  const cfg = window.SULARC_PORTAL || {};
  const base = (cfg.baseUrl || "").replace(/\/+$/, "");
  const path = cfg.paths && cfg.paths[service];
  if (!base || !path) return "";
  return base + path;
};
