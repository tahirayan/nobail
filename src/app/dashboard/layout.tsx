import PersonalInfo from "@/components/widgets/personal-info";
import Header from "@/components/widgets/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grid place-items-center flex-grow py-4">
        <div className="container grid grid-cols-[24rem_minmax(0,100%)] items-start gap-4">
          <PersonalInfo />
          {children}
        </div>
      </div>
    </div>
  );
}