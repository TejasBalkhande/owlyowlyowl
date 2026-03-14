// app/account/dashboard/LogoutButton.tsx
"use client";

import { useTransition } from "react";
import { logout } from "@/actions/auth";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(() => {
      logout();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      style={{
        marginTop: "1.5rem",
        padding: "0.5rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: isPending ? "#999" : "#fff",
        background: isPending ? "#ccc" : "#111",
        border: "none",
        borderRadius: "6px",
        cursor: isPending ? "not-allowed" : "pointer",
        transition: "background 0.2s",
      }}
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}