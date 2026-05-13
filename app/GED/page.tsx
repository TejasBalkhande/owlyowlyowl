// app/GED/page.tsx
import GEDClient from "./GEDClient";

export default async function GEDPage() {
  // Static mock data for frontend-only display
  const dashboardStats = {
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    streak: 0,
    predictedScore: 580, // GED typical starting prediction (out of 800)
    targetScore: 750,
    weakAreas: [],
    upcomingMock: "GED Full Practice #1 - This Sunday",
    recentActivity: [],
  };

  return (
    <GEDClient
      username={null}
      isLoggedIn={false}
      dashboardStats={dashboardStats}
    />
  );
}