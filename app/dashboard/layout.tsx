import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-24 container mx-20 pt-12">
        <SideNav />
      {children}
    </div>
  );
}
