import PersonalInfo from "@/components/widgets/personal-info";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid place-items-center">
      <div className="container grid grid-cols-[24rem_minmax(0,100%)] items-start gap-4">
        <PersonalInfo />
        {children}
      </div>
    </div>
  );
}