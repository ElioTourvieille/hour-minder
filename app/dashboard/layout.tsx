import SideNav from "../../components/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container max-w-[1800px] mx-10 py-12 tablet:mx-4 tablet:py-4">
        <SideNav />
      {children}
    </div>
  );
}
