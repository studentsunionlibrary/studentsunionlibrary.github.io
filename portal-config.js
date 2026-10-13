// Secure SULARC public portal
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
