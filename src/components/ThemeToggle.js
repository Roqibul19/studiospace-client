"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";

function savedTheme() {
  try {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") return theme;
  } catch {
    // Storage can be blocked. Fall through to the system preference.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  // In development React clears the attribute on its remount, so set it again.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", savedTheme());
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // The theme still changes for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-square"
      aria-label="Switch between light and dark theme"
      title="Switch between light and dark theme"
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
