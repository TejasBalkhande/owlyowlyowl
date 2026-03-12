// app/account/dashboard/page.tsx
import { Suspense } from 'react';
import DashboardContent from './DashboardContent';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}