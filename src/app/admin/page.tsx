import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = {
  title: "本机后台 | 99blog",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <AdminDashboard />
    </main>
  );
}
