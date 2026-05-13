// \wsl.localhost\Ubuntu\home\tejas\projects\owlenforge\app\sat\page.tsx
import SatClient from "./SatClient";

export default async function SatPage() {
  // Static mock data for frontend-only display
  const dashboardStats = {
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    streak: 0,
    predictedScore: 0,
    targetScore: 1550,
    weakAreas: [],
    upcomingMock: "Digital SAT Mock #1 - This Sunday",
    recentActivity: [],
  };

  return (
    <SatClient
      username={null}
      isLoggedIn={false}
      dashboardStats={dashboardStats}
    />
  );
}