export function getPasswordErrors(password) {
  const value = typeof password === "string" ? password : "";
  const errors = [];
  if (!/[A-Z]/.test(value)) {
    errors.push("Password must have an uppercase letter.");
  }
  if (!/[a-z]/.test(value)) {
    errors.push("Password must have a lowercase letter.");
  }
  if (value.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  return errors;
}

export function isValidHttpUrl(value) {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

// Only same-site paths are allowed, so a crafted link such as
// /login?redirect=https://other.site cannot send a user away after login.
export function safeRedirect(path) {
  if (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/\\")
  ) {
    return path;
  }
  return "/";
}
