import Header from "@/components/widgets/header";
import PersonalInfo from "@/components/widgets/personal-info";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grid flex-grow place-items-center py-4">
        <div className="container grid grid-cols-[24rem_minmax(0,100%)] items-start gap-4">
          <PersonalInfo />
          {children}
        </div>
      </div>
    </div>
  );
}
