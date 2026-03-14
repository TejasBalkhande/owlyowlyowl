// app/account/dashboard/DashboardContent.tsx
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardContent() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account/login");
  }

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "4rem auto",
        padding: "2rem",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        Welcome, {user.username}!
      </h1>

      <p style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
        {user.email}
      </p>

      <p style={{ color: "#999", fontSize: "0.8rem" }}>
        Member since{" "}
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
      </p>

      <hr style={{ margin: "1.5rem 0", borderColor: "#f0f0f0" }} />

      <LogoutButton />
    </div>
  );
}