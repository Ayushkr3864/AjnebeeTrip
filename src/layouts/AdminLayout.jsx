import AdminTopNav from "../components/AdminTopNav";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <AdminTopNav />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
