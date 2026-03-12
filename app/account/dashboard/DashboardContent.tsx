// app/account/dashboard/DashboardContent.tsx
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardContent() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>
        Member since:{' '}
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : 'N/A'}
      </p>
    </div>
  );
}