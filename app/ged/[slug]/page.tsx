// app/GED/[slug]/page.tsx
import { PracticeSessionClient } from "./PracticeSessionClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ skills?: string }>;
}) {
  const { skills: skillsParam } = await searchParams;

  if (!skillsParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          No skills selected. Please go back and choose skills to practice.
        </p>
      </div>
    );
  }

  const skillIds = skillsParam.split(",").filter(Boolean);
  if (skillIds.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Invalid skills selection.</p>
      </div>
    );
  }

  return <PracticeSessionClient skillIds={skillIds} />;
}